import {
	createUserWithEmailAndPassword,
	// OAuthProvider,
	signInWithEmailAndPassword,
	// signInWithPopup,
	signOut as signOut_
} from 'firebase/auth';

// import { auth, db, user } from "$lib/firebase/client";
import { auth, user } from '$lib/firebase/client/auth';
// import { doc, getDoc } from 'firebase/firestore';
import { goto } from '$app/navigation';

// import { get } from 'svelte/store';

// import { firestore } from '$lib/firebase/client/firestore';

async function signIn(email: string, password: string) {
	const credential = await signInWithEmailAndPassword(auth, email, password);
	const idToken = await credential.user.getIdToken();

	const res = await fetch('/api/auth', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ idToken })
	});

	// if (res.ok) {
	// 	const snap = await getDoc(doc(firestore.users, get(user)?.uid ?? ''));
	// 	if (!snap.exists()) goto('/signup');
	// }
}

async function signOut() {
	await fetch('/api/auth', { method: 'delete' });
	await signOut_(auth);
	goto('/');
}

async function signUp(email: string, password: string) {
	const credential = await createUserWithEmailAndPassword(auth, email, password);
	const idToken = await credential.user.getIdToken();

	const res = await fetch('/api/auth', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ idToken })
	});
}

export { signIn, signOut, signUp };
