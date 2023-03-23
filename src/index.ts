const { mrFeatureFlags } = window;
import { Flag } from '../types';

mrFeatureFlags.isEnabled = (flag: string, env = 'prod') => {
	let envFlag = 'enabled';
	if (env === 'pre-prod') {
		envFlag = 'preProdEnabled';
	}
	const isFlagExist: Flag | undefined = mrFeatureFlags.flags.find(
		(item: Flag) => {
			//@ts-ignore
			return item.name === flag && item[envFlag] === true;
		}
	);

	if (isFlagExist?.name) return true;

	return false;
};

export {};
