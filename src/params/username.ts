import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return /^@(?=[a-zA-Z0-9._]{3,16}$).*$/.test(param);
}) satisfies ParamMatcher;