import Snippet from './Snippet';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Clipboard from '../common/Clipboard';

export default function ({ flag }: { flag: string }): JSX.Element {
	const jsSnippet = useMemo(() => {
		return `import domReady from '@wordpress/dom-ready';
domReady(function () {
	if (
		typeof window?.mrFeatureFlags !== 'undefined' &&
		window.mrFeatureFlags.isEnabled('${flag}')
	) {
		// js code goes here...
	}
});`;
	}, [flag]);
	return (
		<div className="mr-feature-flag-js-snippet-container">
			<h3>{__('JavaScript Snippet', 'mr-feature-flags')}</h3>
			<Clipboard text={jsSnippet} />
			<Snippet data={jsSnippet} language={'typescript'} />
		</div>
	);
}
