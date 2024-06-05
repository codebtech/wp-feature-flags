const { codebFeatureFlags } = window;
import { Flag } from '../types';

//Appends isEnabled method to global window object.
codebFeatureFlags.isEnabled = (flag: string) => {
	const isFlagExist: Flag | undefined = codebFeatureFlags.flags.find(
		(item: Flag) => {
			return item.name === flag && item.enabled === true;
		}
	);

	return !!isFlagExist;
};

export {};
