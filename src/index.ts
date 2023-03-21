const { mrFeatureFlags } = window;
import { Flag } from '../types';

mrFeatureFlags.isEnabled = (flag: string) => {
	const isFlagExist: Flag[] = mrFeatureFlags.flags.filter(
		(item: Flag) => item.name === flag && item.enabled === true
	);

	if (isFlagExist[0]?.name) return true;

	return false;
};

export {};
