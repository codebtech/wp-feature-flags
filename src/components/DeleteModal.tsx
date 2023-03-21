import { Modal, Button } from '@wordpress/components';
const DeleteModal = (props: any): JSX.Element => {
	const { closeModal, item, handleDeleteFlag } = props;
	return (
		<Modal title={`Delete Feature Flag`} onRequestClose={closeModal}>
			<p>
				Are you sure want to delete flag &quot;{item.name}
				&quot;?
			</p>
			<Button
				isDestructive
				variant="secondary"
				onClick={() => handleDeleteFlag(item.id)}
				style={{ marginRight: 10 }}
			>
				Yes
			</Button>
			<Button variant="tertiary" onClick={closeModal}>
				Cancel
			</Button>
		</Modal>
	);
};

export default DeleteModal;
