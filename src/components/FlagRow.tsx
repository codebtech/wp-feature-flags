import {
	ToggleControl,
	TextControl,
	Flex,
	FlexItem,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalText as Text,
} from '@wordpress/components';
import { useState, useRef, useEffect, useCallback } from '@wordpress/element';
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

const updateToggleHandler = (flags: Flag[], id: number): Flag[] =>
	flags.map((flag) =>
		flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
	);

const updateFlagHandler = (flags: Flag[], value: string, id: number): Flag[] =>
	flags.map((flag) => (flag.id === id ? { ...flag, name: value } : flag));

const FlagRow = ({
	flags,
	setFlags,
	item,
	setDisableSave,
	handleSave,
	handleDeleteFlag,
}: LineItemProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

	const [isSdkOpen, setIsSdkOpen] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current && '' === item.name) {
			inputRef.current.focus();
		}
	}, [inputRef, item]);

	const handleFlagToggle = useCallback(
		async (flagId: number) => {
			const updatedFlags = updateToggleHandler(flags, flagId);
			setFlags(updatedFlags);
			await handleSave();
		},
		[flags, handleSave, setFlags]
	);

	const handleFlagEdit = useCallback(
		(value: string, flagId: number) => {
			if (checkIfFlagExists(flags, value)) {
				// eslint-disable-next-line @wordpress/i18n-no-variables
				setErrorMessage(__(ERROR_FLAG_EXISTS, 'codeb-feature-flags'));
				setDisableSave(true);
			} //Alphanumeric,hyphen and underscore validation
			else if (value.match(/^[a-zA-Z0-9_-]*$/)) {
				setErrorMessage('');
				setDisableSave(false);
			} else {
				// eslint-disable-next-line @wordpress/i18n-no-variables
				setErrorMessage(__(ERROR_FLAG_INVALID, 'codeb-feature-flags'));
				setDisableSave(true);
			}

			const updatedFlags = updateFlagHandler(flags, value, flagId);

			setFlags(updatedFlags);
		},
		[flags, setDisableSave, setErrorMessage, setFlags]
	);

	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => setIsOpen(false);

	const openSdkModal = () => {
		setIsSdkOpen(true);
	};

	const closeSdkModal = () => setIsSdkOpen(false);

	const handleDeleteModal = useCallback(
		async (flag: Flag) => {
			if (flag.name) {
				openModal();
				return;
			}

			await handleDeleteFlag(flag.id);
		},
		[handleDeleteFlag]
	);

	const handleSdkModal = () => {
		openSdkModal();
	};

	return (
		<>
			<div id="mr-feature-flag-item" key={item.id}>
				<Flex justify={'flex-start'}>
					<FlexItem>
						<TextControl
							className="codeb-feature-flags-input"
							ref={inputRef}
							value={item.name}
							onChange={(value) => handleFlagEdit(value, item.id)}
						/>
					</FlexItem>
					<FlexItem className="codeb-feature-flags-toggle">
						<ToggleControl
							checked={item.enabled}
							disabled={!!errorMessage}
							onChange={() => handleFlagToggle(item.id)}
							label={`Flag ${item.enabled ? 'enabled' : 'disabled'}`}
						/>
					</FlexItem>

					<FlexItem className="codeb-feature-flags-sdk">
						<Button
							variant="secondary"
							label={__(
								'Click to see SDK setting',
								'codeb-feature-flags'
							)}
							showTooltip
							tooltipPosition="top right"
							onClick={handleSdkModal}
						>
							{__('</> SDK', 'codeb-feature-flags')}
						</Button>
					</FlexItem>
					<FlexItem className="codeb-feature-flags-delete">
						<Button
							icon={'trash'}
							isDestructive
							variant="tertiary"
							label={__('Delete Flag', 'codeb-feature-flags')}
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
