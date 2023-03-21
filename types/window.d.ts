declare namespace mrFeatureFlag {
	interface flags {
		id: number;
		name: string;
		enabled: boolean;
	}
	export interface FeatureFlagProps {
		isEnabled: (flag: string) => boolean;
		flags: flags[];
	}
}

declare global {
	interface Window {
		mrFeatureFlags: mrFeatureFlag.FeatureFlagProps;
	}
}

export {};
