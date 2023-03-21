import apiFetch from '@wordpress/api-fetch';
import { FEATURE_FLAG_NAMESPACE, FEATURE_FLAG_ROUTE } from '../constants';
import { Flag } from '../../types';

export const getFlags = async (): Promise<Flag[] | Error> => {
	const result: Flag[] | Error = await apiFetch({
		method: 'GET',
		path: `${FEATURE_FLAG_NAMESPACE}/${FEATURE_FLAG_ROUTE}`,
	});

	return result;
};

export const updateFlags = async (
	flags: Flag[]
): Promise<{ status: number; success: boolean } | Error> => {
	const result: { status: number; success: boolean } | Error = await apiFetch(
		{
			method: 'POST',
			path: `${FEATURE_FLAG_NAMESPACE}/${FEATURE_FLAG_ROUTE}`,
			data: flags,
		}
	);

	return result;
};
