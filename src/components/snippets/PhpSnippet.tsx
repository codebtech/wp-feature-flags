import Snippet from './Snippet';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Clipboard from '../common/Clipboard';

export default function ({ flag }: { flag: string }): JSX.Element {
	const phpSnippet = useMemo(() => {
		return `if ( class_exists( '\\MR\\FeatureFlags\\Utils' ) && \\MR\\FeatureFlags\\Utils::is_enabled( '${flag}' ) ) {
	// php code goes here...
}`;
	}, [flag]);
	return (
		<div className="mr-feature-flag-php-snippet-container">
			<h3>{__('PHP Snippet', 'mr-feature-flags')}</h3>
			<Clipboard
				text={phpSnippet}
				style={{
					color: 'darkgray',
					float: 'right',
					position: 'relative',
					right: 40,
					top: 24,
				}}
			/>
			<Snippet data={phpSnippet} language={'php'} />
		</div>
	);
}
