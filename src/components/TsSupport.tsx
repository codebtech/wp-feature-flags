import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Flag } from '../../types';

import Snippet from './Snippet';

const TsSupport = ({ flag }: { flag: Flag }): JSX.Element => {
	const tsSnippet = useMemo(() => {
		return `
declare namespace mrFeatureFlags {
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

	const tsIgnoreSnippet = useMemo(() => {
		return `import domReady from '@wordpress/dom-ready';
        domReady(function () {
            //@ts-ignore
            if (window.mrFeatureFlags.isEnabled('${flag.name}')) {
                // js code goes here...
            }
         });`;
	}, [flag.name]);

	return (
		<div className="mr-feature-flag-php-snippet-container">
			<h3>{__('TypeScript support', 'mr-feature-flags')}</h3>
			<p>
				Create `flags.d.ts` file at the root of the plugin / theme to
				add typescript declaration for feature flags.
			</p>
			<Snippet data={tsSnippet} language={'typescript'} />
			<p>
				Alternatively, you can ignore typescript warning using below
				approach
			</p>
			<Snippet data={tsIgnoreSnippet} language={'typescript'} />
		</div>
	);
};

export default TsSupport;
