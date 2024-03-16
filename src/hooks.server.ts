import type { Handle } from "@sveltejs/kit";
import { auth } from "$lib/firebase/server/auth";

export const handle = (async ({ event, resolve }) => {
  event.locals.user = null;

  const sessionCookie = event.cookies.get("__session");

  if (sessionCookie) {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie);
      event.locals.user = decodedClaims;
    } catch (e) {
      console.error(e);
    }
  }

  return resolve(event);
}) satisfies Handle;
