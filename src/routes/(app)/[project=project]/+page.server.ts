import { firestore } from "$lib/firebase/server/firestore"
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const projectDoc = await firestore.projects.doc(params.project.substring(8)).get();
    if (!projectDoc.exists) error(404);
    return {project: projectDoc.data(), id: projectDoc.id} ;
}) satisfies PageServerLoad;