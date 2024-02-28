import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Clipboard from '../common/Clipboard';

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
		<div className="codeb-feature-flags-ts-snippet-container">
			<h3>{__('TypeScript support', 'codeb-feature-flags')}</h3>
			<p>
				Create a file named{' '}
				<span className="codeb-feature-flags-filename">flags.d.ts</span>{' '}
				at the entrypoint of TypeScript code for the plugin/theme (
				usually
				<span className="codeb-feature-flags-slug"> src</span> directory
				) and add the following declaration.
			</p>
			<Clipboard text={tsSnippet} />
			<Snippet data={tsSnippet} language={'typescript'} />
		</div>
	);
};

export default TsSupport;
