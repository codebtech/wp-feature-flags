import Snippet from './Snippet';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Clipboard from '../common/Clipboard';

const JsSnippet = ({ flag }: { flag: string }) => {
	const jsSnippet = useMemo(() => {
		return `import domReady from '@wordpress/dom-ready';
domReady(function () {
	if (
		typeof window?.codebFeatureFlags !== 'undefined' &&
		window.codebFeatureFlags.isEnabled('${flag}')
	) {
		// js code goes here...
	}
});`;
	}, [flag]);
	return (
		<div className="mr-feature-flag-js-snippet-container">
			<h3>{__('JavaScript Snippet', 'codeb-feature-flags')}</h3>
			<Clipboard text={jsSnippet} />
			<Snippet data={jsSnippet} language={'typescript'} />
		</div>
	);
};

export default JsSnippet;
