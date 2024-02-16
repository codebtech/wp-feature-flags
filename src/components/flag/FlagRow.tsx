import {
	ToggleControl,
	TextControl,
	Flex,
	FlexItem,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalText as Text,
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { Flag } from '../../../types';
import DeleteModal from '../modals/DeleteModal';
import SdkModal from '../modals/SdkModal';
import { __ } from '@wordpress/i18n';
import { checkIfFlagExists } from '../../utils';

interface LineItemProps {
	flags: Flag[];
	setFlags: React.Dispatch<React.SetStateAction<Flag[]>>;
	item: Flag;
	setDisableSave: React.Dispatch<React.SetStateAction<boolean>>;
	handleSave: () => Promise<void>;
	handleDeleteFlag: (id: number) => Promise<void>;
}

const FlagRow = ({
	flags,
	setFlags,
	item,
	setDisableSave,
	handleSave,
	handleDeleteFlag,
}: LineItemProps): JSX.Element => {
	const [isOpen, setOpen] = useState(false);

	const [isSdkOpen, setIsSdkOpen] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current && '' === item.name) {
			inputRef.current.focus();
		}
	}, [inputRef, item]);

	const handleFlagToggle = (flagId: number) => {
		const updatedFlags = flags.map((flag: Flag) => {
			if (flag.id === flagId) {
				flag.enabled = !flag.enabled;
			}
			return flag;
		});
		setFlags(updatedFlags);
		handleSave();
	};

	const handleFlagEdit = (value: string, flagId: number) => {
		//Flag alphanumeric validation
		if (checkIfFlagExists(flags, value)) {
			setErrorMessage('Flag name already exists.');
			setDisableSave(true);
		} else if (value.match(/^[a-zA-Z0-9\_-]*$/)) {
			setErrorMessage('');
			setDisableSave(false);
		} else {
			setErrorMessage(
				`Flag name should not contain spaces or special characters other than hypens(-) and underscores(_).`
			);
			setDisableSave(true);
		}

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

	const openSdkModal = () => {
		setIsSdkOpen(true);
	};

	const closeSdkModal = () => setIsSdkOpen(false);

	const handleDeleteModal = (flag: Flag) => {
		if (flag.name) {
			openModal();
			return;
		}

		handleDeleteFlag(flag.id);
	};

	const handleSdkModal = () => {
		openSdkModal();
	};

	return (
		<>
			<div id="mr-feature-flag-item" key={item.id}>
				<Flex justify={'flex-start'}>
					<FlexItem>
						<TextControl
							style={{ width: 180 }}
							ref={inputRef}
							value={item.name}
							onChange={(value) => handleFlagEdit(value, item.id)}
						/>
					</FlexItem>
					<FlexItem
						style={{
							marginTop: 7,
							marginLeft: 40,
							minWidth: 150,
						}}
					>
						<ToggleControl
							checked={item.enabled}
							disabled={!!errorMessage}
							onChange={() => handleFlagToggle(item.id)}
							label={`Flag ${item.enabled ? 'enabled' : 'disabled'}`}
						/>
					</FlexItem>

					<FlexItem style={{ marginLeft: 60 }}>
						<Button
							variant="secondary"
							label={__(
								'Click to see SDK setting',
								'mr-feature-flags'
							)}
							showTooltip
							tooltipPosition="top right"
							onClick={handleSdkModal}
						>
							{__('</> SDK', 'mr-feature-flags')}
						</Button>
					</FlexItem>
					<FlexItem style={{ marginBottom: 6, marginLeft: 50 }}>
						<Button
							icon={'trash'}
							isDestructive
							variant="tertiary"
							label={__('Delete Flag', 'mr-feature-flags')}
							onClick={() => handleDeleteModal(item)}
						/>
					</FlexItem>
				</Flex>

				{errorMessage && <Text color="#cc1818">{errorMessage}</Text>}

				<hr />
			</div>
			{isOpen && (
				<DeleteModal
					closeModal={closeModal}
					item={item}
					handleDeleteFlag={handleDeleteFlag}
				/>
			)}
			{isSdkOpen && (
				<SdkModal item={item} closeSdkModal={closeSdkModal} />
			)}
		</>
	);
};

export default FlagRow;
