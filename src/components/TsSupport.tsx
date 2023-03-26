import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import Snippet from './Snippet';

const TsSupport = (): JSX.Element => {
	const tsSnippet = useMemo(() => {
		return `declare namespace mrFeatureFlags {
	export interface FeatureFlagProps {
        isEnabled: (flag: string) => boolean;
    }
}
declare global {
    interface Window {
        mrFeatureFlags: mrFeatureFlags.FeatureFlagProps;
    }
}
export {};`;
	}, []);

	return (
		<div className="mr-feature-flags-php-snippet-container">
			<h3>{__('TypeScript support', 'mr-feature-flags')}</h3>
			<p>
				Create a file named{' '}
				<span className="mr-feature-flags-slug">flags.d.ts</span> at the
				root of the plugin / theme and add below declaration.
			</p>
			<Snippet data={tsSnippet} language={'typescript'} />
		</div>
	);
};

export default TsSupport;
