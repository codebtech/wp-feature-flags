import Snippet from './Snippet';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Clipboard from '../common/Clipboard';

export default function ({ flag }: { flag: string }): JSX.Element {
	const phpSnippet = useMemo(() => {
		return `use MR\\FeatureFlags\\Flag;
if ( class_exists( '\\MR\\FeatureFlags\\Flag' ) && Flag::is_enabled( '${flag}' ) ) {
	// php code goes here...
}`;
	}, [flag]);
	return (
		<div className="mr-feature-flag-php-snippet-container">
			<h3>{__('PHP Snippet', 'mr-feature-flags')}</h3>
			<Clipboard text={phpSnippet} />
			<Snippet data={phpSnippet} language={'php'} />
		</div>
	);
}
