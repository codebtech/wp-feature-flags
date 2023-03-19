import './styles/index.scss';

const { mrFeatureFlags } = window;

mrFeatureFlags.isEnabled = (flag: string) => {
	const isFlagExist = mrFeatureFlags.flags.find(
		(item: { name: string; enabled: boolean }) =>
			item.name === flag && item.enabled === true
	);

	if (isFlagExist) return true;

	return false;
};
