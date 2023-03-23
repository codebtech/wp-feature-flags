import { Modal, Button } from '@wordpress/components';
import Snippet from './Snippet';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { useCopyToClipboard } from '@wordpress/compose';
import { Flag } from '../../types';

interface SdkModalProps {
	item: Flag;
	closeSdkModal: () => void;
}

const SdkModal = ({ item, closeSdkModal }: SdkModalProps): JSX.Element => {
	const [hasJsCopied, setHasJsCopied] = useState(false);
	const [hasPhpCopied, setHasPhpCopied] = useState(false);

	useEffect(() => {
		let jsTimeout: number | null = null;
		let phpTimeout: number | null = null;

		if (hasJsCopied) {
			jsTimeout = setTimeout(() => {
				setHasJsCopied(false);
			}, 4000);
		}

		if (hasPhpCopied) {
			phpTimeout = setTimeout(() => {
				setHasPhpCopied(false);
			}, 4000);
		}
		return () => {
			if (jsTimeout) {
				window.clearTimeout(jsTimeout);
			}
			if (phpTimeout) {
				window.clearTimeout(phpTimeout);
			}
		};
	}, [hasJsCopied, hasPhpCopied]);

	const jsSnippet = useMemo(() => {
		return `import domReady from '@wordpress/dom-ready';
domReady(function () {
	if (window.mrFeatureFlags.isEnabled('${item.name}')) {
		// js code goes here...
	}
 });`;
	}, [item.name]);

	const phpSnippet = useMemo(() => {
		return `if ( MR\\FeatureFlags\\FeatureFlags::is_enabled( '${item.name}' ) ) {
	// php code goes here...
}`;
	}, [item.name]);

	const jsRef = useCopyToClipboard<HTMLButtonElement>(jsSnippet, onJsCopy);

	function onJsCopy() {
		setHasJsCopied(true);
	}

	const phpRef = useCopyToClipboard<HTMLButtonElement>(phpSnippet, onPhpCopy);

	function onPhpCopy() {
		setHasPhpCopied(true);
	}

	return (
		<Modal title={`SDK snippets`} onRequestClose={closeSdkModal}>
			<div className="mr-feature-flag-php-snippet-container">
				<h3>PHP Snippet</h3>
				<Button
					icon={hasPhpCopied ? 'yes-alt' : 'clipboard'}
					style={{
						position: 'absolute',
						right: 40,
						width: 40,
						height: 40,
						top: 142,
						color: 'darkgray',
					}}
					isPressed={false}
					variant={'tertiary'}
					ref={phpRef}
				/>
				<Snippet data={phpSnippet} />
			</div>
			<div className="mr-feature-flag-js-snippet-container">
				<h3>JS Snippet</h3>
				<Button
					icon={hasJsCopied ? 'yes-alt' : 'clipboard'}
					style={{
						position: 'absolute',
						right: 40,
						width: 40,
						height: 40,
						color: 'darkgray',
					}}
					isPressed={false}
					variant={'tertiary'}
					ref={jsRef}
				/>
				<Snippet data={jsSnippet} />
			</div>
		</Modal>
	);
};

export default SdkModal;
