import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return /^project-.+$/.test(param);
}) satisfies ParamMatcher;