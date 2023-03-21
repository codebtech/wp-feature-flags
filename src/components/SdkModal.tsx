import { Modal, Button } from '@wordpress/components';

const SdkModal = (props: any): JSX.Element => {
	const { item, closeSdkModal } = props;
	return (
		<Modal title={`SDK snippets`} onRequestClose={closeSdkModal}>
			<p>{`if (window.mrFeatureFlags.isEnabled('DeskNet')) {
	render(<SettingsPage />, document.getElementById('desknet_settings'));
}`}</p>
			<p>{`if ( \MR\FeatureFlags\FeatureFlags::is_enabled( 'Teal' ) ) {
    add_theme_support('menus');
}`}</p>
			<Button variant="tertiary" onClick={closeSdkModal}>
				Close
			</Button>
		</Modal>
	);
};

export default SdkModal;
