import { Modal, Button } from '@wordpress/components';

const SdkModal = (props: any): JSX.Element => {
	const { item, closeSdkModal } = props;
	return (
		<Modal title={`SDK snippets`} onRequestClose={closeSdkModal}>
			<p>{`<?php
						use MR\FeatureFlags\FeatureFlags;
						if ( FeatureFlags::is_enabled( '${item.name}' ) ) {
  							add_theme_support('menus');
						}`}</p>

			<Button variant="tertiary" onClick={closeSdkModal}>
				Close
			</Button>
		</Modal>
	);
};

export default SdkModal;
