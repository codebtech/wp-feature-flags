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
import { Flag } from '../../types';
import DeleteModal from './modals/DeleteModal';
import SdkModal from './modals/SdkModal';
import { __ } from '@wordpress/i18n';
import { checkIfFlagExists } from '../utils';
import { ERROR_FLAG_EXISTS, ERROR_FLAG_INVALID } from '../constants';

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
		if (checkIfFlagExists(flags, value)) {
			// eslint-disable-next-line @wordpress/i18n-no-variables
			setErrorMessage(__(ERROR_FLAG_EXISTS, 'mr-feature-flags'));
			setDisableSave(true);
		} //Alphanumeric,hypen and underscore validation
		else if (value.match(/^[a-zA-Z0-9\_-]*$/)) {
			setErrorMessage('');
			setDisableSave(false);
		} else {
			// eslint-disable-next-line @wordpress/i18n-no-variables
			setErrorMessage(__(ERROR_FLAG_INVALID, 'mr-feature-flags'));
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
							className="mr-feature-flags-input"
							ref={inputRef}
							value={item.name}
							onChange={(value) => handleFlagEdit(value, item.id)}
						/>
					</FlexItem>
					<FlexItem className="mr-feature-flags-toggle">
						<ToggleControl
							checked={item.enabled}
							disabled={!!errorMessage}
							onChange={() => handleFlagToggle(item.id)}
							label={`Flag ${item.enabled ? 'enabled' : 'disabled'}`}
						/>
					</FlexItem>

					<FlexItem className="mr-feature-flags-sdk">
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
					<FlexItem className="mr-feature-flags-delete">
						<Button
							icon={'trash'}
							isDestructive
							variant="tertiary"
							label={__('Delete Flag', 'mr-feature-flags')}
							onClick={() => handleDeleteModal(item)}
						/>
					</FlexItem>
				</Flex>

				{errorMessage && (
					<Text color="#cc1818" data-test-id="flag-error-message">
						{errorMessage}
					</Text>
				)}

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
