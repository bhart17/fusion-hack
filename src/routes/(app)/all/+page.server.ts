import type { PageServerLoad } from './$types';
import { firestore } from '$lib/firebase/server/firestore';
import { error } from '@sveltejs/kit';
import type { ProjectDoc } from '$lib/firebase/types';

export const load = (async ({ locals }) => {
	const projects: { id: string; project: ProjectDoc }[] = [];

	const projectsQuery = await firestore.projects.get();
	for (const projectDoc of projectsQuery.docs) {
		const project = projectDoc.data();
		if (!project) continue;
		projects.push({ id: projectDoc.id, project });
	}

	return { projects };
}) satisfies PageServerLoad;
