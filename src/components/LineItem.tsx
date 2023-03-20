import {
	ToggleControl,
	TextControl,
	Flex,
	FlexItem,
	Button,
	Modal,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Flag } from '../../types';

const LineItem = ({ flags, setFlags, item }: any): JSX.Element => {
	const [isOpen, setOpen] = useState(false);

	const handleDeleteFlag = (flagId: number) => {
		const updatedFlags = flags.filter((flag: Flag) => flag.id !== flagId);
		setFlags(updatedFlags);
		closeModal();
	};

	const handleFlagToggle = (flagId: number) => {
		const updatedFlags = flags.map((flag: Flag) => {
			if (flag.id === flagId) {
				flag.enabled = !flag.enabled;
			}
			return flag;
		});
		setFlags(updatedFlags);
	};

	const handleFlagEdit = (value: string, flagId: number) => {
		const updatedFlags = flags.map((flag: Flag) => {
			if (flag.id === flagId) {
				flag.name = value;
			}
			return flag;
		});
		setFlags(updatedFlags);
	};

	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => setOpen(false);

	return (
		<>
			<div id="mr-feature-flag-item" key={item.id}>
				<Flex justify={'flex-start'}>
					<FlexItem>
						<TextControl
							value={item.name}
							onChange={(value) => handleFlagEdit(value, item.id)}
						/>
					</FlexItem>
					<FlexItem style={{ marginTop: 7, marginLeft: 10 }}>
						<ToggleControl
							checked={item.enabled}
							onChange={() => handleFlagToggle(item.id)}
						/>
					</FlexItem>
					<FlexItem style={{ marginBottom: 6 }}>
						<Button
							icon={'trash'}
							isDestructive
							variant="tertiary"
							label="Delete Flag"
							onClick={() => openModal()}
						/>
					</FlexItem>
				</Flex>
				<hr />
			</div>
			{isOpen && (
				<Modal
					title={`Delete Feature Flag`}
					onRequestClose={closeModal}
				>
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
			)}
		</>
	);
};

export default LineItem;
