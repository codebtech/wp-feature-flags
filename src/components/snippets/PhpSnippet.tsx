import Snippet from './Snippet';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Clipboard from '../common/Clipboard';

const PhpSnippet = ({ flag }: { flag: string }) => {
	const phpSnippet = useMemo(() => {
		return `use CodeB\\FeatureFlags\\Flag;
if ( class_exists( '\\CodeB\\FeatureFlags\\Flag' ) && Flag::is_enabled( '${flag}' ) ) {
	// php code goes here...
}`;
	}, [flag]);
	return (
		<div className="mr-feature-flag-php-snippet-container">
			<h3>{__('PHP Snippet', 'codeb-feature-flags')}</h3>
			<Clipboard text={phpSnippet} />
			<Snippet data={phpSnippet} language={'php'} />
		</div>
	);
};

export default PhpSnippet;
