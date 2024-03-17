import { firestore } from '$lib/firebase/server/firestore';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const projectDoc = await firestore.projects.doc(params.project.substring(8)).get();
	if (!projectDoc.exists) error(404);
	const project = projectDoc.data();
	const user = (await firestore.users.doc(project?.host ?? '').get()).data();
	return { project, id: projectDoc.id, user };
}) satisfies PageServerLoad;
