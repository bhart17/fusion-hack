import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

import { auth } from '$lib/firebase/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { idToken } = await request.json();

	const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days

	const decodedIdToken = await auth.verifyIdToken(idToken);

	if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 5 * 60)
		throw error(401, 'Recent sign in required');

	const cookie = await auth.createSessionCookie(idToken, { expiresIn });

	const options: CookieSerializeOptions = {
		maxAge: expiresIn,
		httpOnly: true,
		secure: true,
		path: '/'
	};

	cookies.set('__session', cookie, options);

	return json({ status: 'signedIn' });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
