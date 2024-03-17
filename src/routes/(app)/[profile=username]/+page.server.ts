import type { PageServerLoad } from './$types';
import type { ProjectDoc } from '$lib/firebase/types';
import { firestore } from '$lib/firebase/server/firestore';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const profile: {
		watching: { title: string; description: string; image: string }[];
		hosted: { title: string; description: string; image: string }[];
	} = { watching: [], hosted: [] };

	const userQuery = 
		await firestore.users.where('username', '==', params.profile.substring(1)).limit(1).get();

	if (userQuery.empty) error(404);

	const userDoc = userQuery.docs[0];

	const user = userDoc.data();

	// console.log(projects);
	// await firestore.projects.get();
	return { uid: userDoc.id, user };
}) satisfies PageServerLoad;
