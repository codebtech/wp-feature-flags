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
		<div className="mr-feature-flags-ts-snippet-container">
			<h3>{__('TypeScript support', 'mr-feature-flags')}</h3>
			<p>
				Create a file named{' '}
				<span className="mr-feature-flags-filename">flags.d.ts</span> at
				the entrypoint of TS code of plugin / theme ( usually{' '}
				<span className="mr-feature-flags-slug">src</span> directory )
				and add below declaration.
			</p>
			<Clipboard
				text={tsSnippet}
				style={{
					color: 'darkgray',
					float: 'right',
					position: 'relative',
					right: 40,
				}}
			/>
			<Snippet data={tsSnippet} language={'typescript'} />
		</div>
	);
};

export default TsSupport;
