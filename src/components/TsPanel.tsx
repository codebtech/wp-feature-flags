import { PanelBody, PanelRow } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

import Snippet from './Snippet';

const TsPanel = (): JSX.Element => {
	const jsSnippet = useMemo(() => {
		return `declare namespace mrFeatureFlag {
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

export {};`;
	}, []);
	return (
		<PanelBody title="Typescript support" initialOpen={false}>
			<PanelRow>
				<Snippet data={jsSnippet} language={'typescript'} />
			</PanelRow>
		</PanelBody>
	);
};

export default TsPanel;
