import { Modal, Button } from '@wordpress/components';
import Snippet from './Snippet';

const SdkModal = (props: any): JSX.Element => {
	const { item, closeSdkModal } = props;

	const jsSnippet = `if (window.mrFeatureFlags.isEnabled('${item.name}')) {
	// js code goes here...
}`;

	const phpSnippet = `if ( /\MR/\FeatureFlags/\FeatureFlags::is_enabled( '${item.name}' ) ) {
	// php code goes here...
}`;
	return (
		<Modal title={`SDK snippets`} onRequestClose={closeSdkModal}>
			<h3>JS Snippet</h3>
			<Snippet data={jsSnippet} />
			<h3>PHP Snippet</h3>
			<Snippet data={phpSnippet} />
			<Button variant="tertiary" onClick={closeSdkModal}>
				Close
			</Button>
		</Modal>
	);
};

export default SdkModal;
