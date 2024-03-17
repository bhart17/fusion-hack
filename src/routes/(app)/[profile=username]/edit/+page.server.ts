import type { PageServerLoad } from './$types';
// import { adminDB } from '$lib/firebase/server';
// import type { FirebaseUserDoc } from '$lib/firebase/types';
import { error, redirect } from '@sveltejs/kit';
import { firestore } from '$lib/firebase/server/firestore';

export const load = (async ({ locals, params }) => {
    if (!locals.user)
        throw redirect(302, "/?error=no-auth");

    const userDoc = await firestore
        .users
        .doc(locals.user.uid)
        .get();

    const userData = userDoc.data();
    if (userData) {
        const { username } = userData;
        if (params.profile.substring(1) !== username)
            throw error(401, "That username doesn't belong to you");
    }
}) satisfies PageServerLoad;