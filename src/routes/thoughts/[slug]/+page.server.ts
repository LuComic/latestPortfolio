import { error } from '@sveltejs/kit';

import { getThoughtBySlug, getThoughtPreviews } from '$lib/server/thoughts';

export const load = async ({ params }) => {
	const thought = await getThoughtBySlug(params.slug);
	const allThoughts = await getThoughtPreviews();

	if (!thought || !allThoughts) {
		throw error(404, 'Thought not found');
	}

	return {
		thought,
		allThoughts
	};
};
