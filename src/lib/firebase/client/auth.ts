import { browser } from '$app/environment';
import { app } from '$lib/firebase/client/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { derived, readable, type Readable } from 'svelte/store';
import { firestore } from '$lib/firebase/client/firestore';
import type { UserDoc } from '$lib/firebase/types';

export const auth = getAuth(app);

const userStore = () => {
	let unsubscribe = () => {};

	if (!auth || !browser) {
		const { subscribe } = readable<User | null>();
		return { subscribe };
	}

	const { subscribe } = readable<User | null>(auth.currentUser ?? undefined, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => set(user));
		return unsubscribe;
	});

	const known = new Promise<void>((resolve) => {
		let knownUnsubscribe = () => {};
		knownUnsubscribe = subscribe((auth) => {
			if (auth !== undefined) {
				resolve();
				knownUnsubscribe();
			}
		});
	});

	return {
		subscribe,
		known
	};
};

const userDataStore = () => {
	let unsubscribe = () => {};

	const { subscribe } = derived<Readable<User | null>, UserDoc | null | undefined>(
		user,
		($user, set) => {
			if ($user) {
				const docRef = doc(firestore.users, $user.uid);
				unsubscribe = onSnapshot(docRef, (snapshot) => {
					set(snapshot.data());
				});
				return unsubscribe;
			} else if ($user === null) {
				set(null);
			} else {
				set(undefined);
			}
		}
	);

	const known = new Promise<void>((resolve) => {
		let knownUnsubscribe = () => {};
		knownUnsubscribe = subscribe((data) => {
			if (data !== undefined) {
				resolve();
				knownUnsubscribe();
			}
		});
	});

	return {
		subscribe,
		known
	};
};

export const user = userStore();
export const userData = userDataStore();
