import { Modal, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Flag } from '../../types';
interface DeleteModalProps {
	closeModal: () => void;
	item: Flag;
	handleDeleteFlag: (id: number) => void;
}

const DeleteModal = ({
	closeModal,
	item,
	handleDeleteFlag,
}: DeleteModalProps): JSX.Element => {
	return (
		<Modal
			title={__(`Delete Feature Flag`, 'mr-feature-flags')}
			onRequestClose={closeModal}
		>
			<p>
				{
					// eslint-disable-next-line @wordpress/i18n-no-variables
					__(
						`Are you sure want to delete flag "${item.name}" ?`,
						'mr-feature-flags'
					)
				}
			</p>
			<Button
				isDestructive
				variant="secondary"
				onClick={() => handleDeleteFlag(item.id)}
				style={{ marginRight: 10 }}
			>
				{__('Yes', 'mr-feature-flags')}
			</Button>
			<Button variant="tertiary" onClick={closeModal}>
				{__('Cancel', 'mr-feature-flags')}
			</Button>
		</Modal>
	);
};

export default DeleteModal;
