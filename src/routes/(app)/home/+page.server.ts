import type { PageServerLoad } from './$types';
import { firestore } from '$lib/firebase/server/firestore';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const projects: {
		watching: { title: string; description: string; image: string; id: string }[];
		hosted: { title: string; description: string; image: string; id: string }[];
	} = { watching: [], hosted: [] };

	if (!locals.user) return projects;

	const userDoc = (await firestore.users.doc(locals.user.uid).get()).data();
	if (!userDoc) error(500, 'User not found');

	await Promise.all(
		userDoc.hostprojects.map(async (hostedProject) => {
			const project = (await firestore.projects.doc(hostedProject).get()).data();
			if (!project) return;
			projects.hosted.push({
				id: hostedProject,
				title: project.title,
				description: project.description,
				image: project.image
			});
		})
	);

	await Promise.all(
		userDoc.watching.map(async (watchingProject) => {
			const project = (await firestore.projects.doc(watchingProject).get()).data();
			if (!project) return;
			projects.watching.push({
				id: watchingProject,
				title: project.title,
				description: project.description,
				image: project.image
			});
		})
	);

	return projects;
}) satisfies PageServerLoad;
