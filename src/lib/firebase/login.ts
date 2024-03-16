import { OAuthProvider, signInWithPopup, signOut as signOut_ } from 'firebase/auth';

// import { auth, db, user } from "$lib/firebase/client";
import { auth, user } from '$lib/firebase/client/auth';
import { doc, getDoc } from 'firebase/firestore';
import { goto } from '$app/navigation';

import { get } from 'svelte/store';

import { firestore } from '$lib/firebase/client/firestore';

async function signIn() {
	const provider = new OAuthProvider('microsoft.com');
	provider.setCustomParameters({
		tenant: '4a5378f9-29f4-4d3e-be89-669d03ada9d8'
	});

	const credential = await signInWithPopup(auth, provider);

	// const accessToken = OAuthProvider.credentialFromResult(credential)?.accessToken;

	const idToken = await credential.user.getIdToken();

	const res = await fetch('/api/auth', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ idToken })
	});

	if (res.ok) {
		const snap = await getDoc(doc(firestore.users, get(user)?.uid ?? ''));
		if (!snap.exists()) goto('/signup');
	}
}

async function signOut() {
	await fetch('/api/auth', { method: 'delete' });
	await signOut_(auth);
	goto('/');
}

export { signIn, signOut };
