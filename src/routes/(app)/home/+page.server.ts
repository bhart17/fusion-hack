import type { PageServerLoad } from './$types';
import type { ProjectDoc } from '$lib/firebase/types';
import { firestore } from '$lib/firebase/server/firestore';

export const load = (async ({ locals }) => {
	const projects: {
		watching: { title: string; description: string; image: string }[];
		hosted: { title: string; description: string; image: string }[];
	} = { watching: [], hosted: [] };
	if (!locals.user) return projects;
	const userDoc = (await firestore.users.doc(locals.user.uid).get()).data();
	// console.log(userDoc)
	for (const hostedProject of userDoc?.hostprojects ?? []) {
		console.log();
		const project = (await firestore.projects.doc(hostedProject).get()).data() as ProjectDoc;
		projects.hosted.push({
			title: project.title,
			description: project.description,
			image: project.image
		});
	}
	for (const watchingProject of userDoc?.watching ?? []) {
		const project = (await firestore.projects.doc(watchingProject).get()).data() as ProjectDoc;
		projects.watching.push(project);
	}
	// console.log(projects);
	// await firestore.projects.get();
	return projects;
}) satisfies PageServerLoad;
