import apiFetch from '@wordpress/api-fetch';
import { FEATURE_FLAG_NAMESPACE, FEATURE_FLAG_ROUTE } from '../constants';

export const getFlags = async (): Promise<any> => {
	const result: any = await apiFetch({
		method: 'GET',
		path: `${FEATURE_FLAG_NAMESPACE}/${FEATURE_FLAG_ROUTE}`,
	});
	return result;
};

export const updateFlags = async (
	flags: any
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
