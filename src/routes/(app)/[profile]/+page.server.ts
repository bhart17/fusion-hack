import type { PageServerLoad } from './$types';
import type { ProjectDoc } from '$lib/firebase/types';
import { firestore } from '$lib/firebase/server/firestore';

export const load = (async ({params}) => {
    const profile: { watching: { title: string; description: string; image: string; }[], hosted:  { title: string; description: string; image: string; }[] } = { watching: [], hosted: [] };

    const user = (await firestore.users.where("username", "==",params.profile).limit(1).get()).docs[0].data();

    // console.log(projects);
    // await firestore.projects.get();
    return user;
}) satisfies PageServerLoad;