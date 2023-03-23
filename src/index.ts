const { mrFeatureFlags } = window;
import { Flag } from '../types';

mrFeatureFlags.isEnabled = (flag: string) => {
	const isFlagExist: Flag | undefined = mrFeatureFlags.flags.find(
		(item: Flag) => {
			return item.name === flag && item.enabled === true;
		}
	);

	if (isFlagExist) return true;

	return false;
};

export {};
