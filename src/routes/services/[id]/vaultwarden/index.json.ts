import { getUserDetails } from '$lib/common';
import * as db from '$lib/database';
import { ErrorHandler } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async (event) => {
	const { status, body } = await getUserDetails(event);
	if (status === 401) return { status, body };
	const { id } = event.params;

	let { name, fqdn, exposePort } = await event.request.json();
	if (fqdn) fqdn = fqdn.toLowerCase();
	if (exposePort) exposePort = Number(exposePort);

	try {
		await db.updateService({ id, fqdn, name, exposePort });
		return { status: 201 };
	} catch (error) {
		return ErrorHandler(error);
	}
};
