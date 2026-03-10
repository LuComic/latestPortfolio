import { error } from '@sveltejs/kit';

import { getThoughtBySlug } from '$lib/server/thoughts';

export const load = async ({ params }) => {
	const thought = await getThoughtBySlug(params.slug);

	if (!thought) {
		throw error(404, 'Thought not found');
	}

	return {
		thought
	};
};
