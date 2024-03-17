import {firestore} from "$lib/firebase/server/firestore"
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    console.log(params.project.substring(8))
    const projectdoc = await firestore.projects.doc(params.project.substring(8)).get()
    if (!projectdoc.exists) error(404)
    return projectdoc.data()
}) satisfies PageServerLoad;