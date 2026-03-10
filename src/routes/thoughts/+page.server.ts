import { getThoughtPreviews } from '$lib/server/thoughts';

export const load = async () => {
	return {
		thoughts: await getThoughtPreviews()
	};
};
