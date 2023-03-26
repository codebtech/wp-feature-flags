import { Modal } from '@wordpress/components';
import { Flag } from '../../../types';
import TsSupport from '../snippets/TsSupport';
import PhpSnippet from '../snippets/PhpSnippet';
import JsSnippet from '../snippets/JsSnippet';

interface SdkModalProps {
	item: Flag;
	closeSdkModal: () => void;
}

const SdkModal = ({ item, closeSdkModal }: SdkModalProps): JSX.Element => {
	return (
		<Modal
			title={`SDK for feature flag: ${item.name}`}
			onRequestClose={closeSdkModal}
		>
			<PhpSnippet flag={item.name} />
			<JsSnippet flag={item.name} />
			<TsSupport />
		</Modal>
	);
};

export default SdkModal;
