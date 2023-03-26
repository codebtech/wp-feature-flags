import { Modal } from '@wordpress/components';
import Snippet from './Snippet';
import { useMemo } from '@wordpress/element';
import { Flag } from '../../types';
import { __ } from '@wordpress/i18n';
import TsSupport from './TsSupport';
import Clipboard from './Clipboard';

interface SdkModalProps {
	item: Flag;
	closeSdkModal: () => void;
}

const SdkModal = ({ item, closeSdkModal }: SdkModalProps): JSX.Element => {
	const jsSnippet = useMemo(() => {
		return `import domReady from '@wordpress/dom-ready';
domReady(function () {
	if (
		typeof window?.mrFeatureFlags !== 'undefined' &&
		window.mrFeatureFlags.isEnabled('Menus')
	) {
		// js code goes here...
	}
});`;
	}, [item.name]);

	const phpSnippet = useMemo(() => {
		return `if ( class_exists( 'MR\\FeatureFlags\\Utils' ) && MR\\FeatureFlags\\Utils::is_enabled( '${item.name}' ) ) {
	// php code goes here...
}`;
	}, [item.name]);

	return (
		<Modal title={`SDK snippets`} onRequestClose={closeSdkModal}>
			<div className="mr-feature-flag-php-snippet-container">
				<h3>{__('PHP Snippet', 'mr-feature-flags')}</h3>
				<Clipboard
					text={phpSnippet}
					style={{
						color: 'darkgray',
						float: 'right',
						position: 'relative',
						right: 40,
					}}
				/>
				<Snippet data={phpSnippet} language={'php'} />
			</div>
			<div className="mr-feature-flag-js-snippet-container">
				<h3>{__('JavaScript Snippet', 'mr-feature-flags')}</h3>
				<Clipboard
					text={jsSnippet}
					style={{
						color: 'darkgray',
						float: 'right',
						position: 'relative',
						right: 40,
					}}
				/>
				<Snippet data={jsSnippet} language={'typescript'} />
			</div>
			<div className="mr-feature-flags-ts-snipper-container">
				<TsSupport />
			</div>
		</Modal>
	);
};

export default SdkModal;
