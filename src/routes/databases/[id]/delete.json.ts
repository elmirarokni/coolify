import { getUserDetails } from '$lib/common';
import * as db from '$lib/database';
import { ErrorHandler, stopDatabase } from '$lib/database';
import { stopTcpHttpProxy } from '$lib/haproxy';
import type { RequestHandler } from '@sveltejs/kit';

export const del: RequestHandler = async (event) => {
	const { teamId, status, body } = await getUserDetails(event);
	if (status === 401) return { status, body };
	const { id } = event.params;
	try {
		const database = await db.getDatabase({ id, teamId });
		if (database.destinationDockerId) {
			const everStarted = await stopDatabase(database);
			if (everStarted) await stopTcpHttpProxy(id, database.destinationDocker, database.publicPort);
		}
		await db.removeDatabase({ id });
		return { status: 200 };
	} catch (error) {
		return ErrorHandler(error);
	}
};
