import {
	ToggleControl,
	TextControl,
	Flex,
	FlexItem,
	Button,
	BaseControl,
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { Flag } from '../../types';
import DeleteModal from './DeleteModal';
import SdkModal from './SdkModal';

interface LineItemProps {
	flags: Flag[];
	setFlags: (flags: Flag[]) => void;
	item: Flag;
	setDisableSave: (toggle: boolean) => void;
}

const LineItem = ({
	flags,
	setFlags,
	item,
	setDisableSave,
}: LineItemProps): JSX.Element => {
	const [isOpen, setOpen] = useState(false);

	const [isSdkOpen, setIsSdkOpen] = useState(false);

	const [hasError, setHasError] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current && '' === item.name) {
			inputRef.current.focus();
		}
	}, [inputRef, item]);

	const handleDeleteFlag = (flagId: number) => {
		const updatedFlags = flags.filter((flag: Flag) => flag.id !== flagId);
		setFlags(updatedFlags);
		closeModal();
	};

	const handleFlagToggle = (flagId: number, flagEnv = 'prod') => {
		const updatedFlags = flags.map((flag: Flag) => {
			if (flag.id === flagId) {
				if (flagEnv === 'prod') {
					flag.enabled = !flag.enabled;
				} else {
					flag.preProdEnabled = !flag.preProdEnabled;
				}
			}
			return flag;
		});
		setFlags(updatedFlags);
	};

	const handleFlagEdit = (value: string, flagId: number) => {
		if (value.match(/^[a-zA-Z0-9\_-]*$/)) {
			setHasError(false);
			setDisableSave(false);
		} else {
			setHasError(true);
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
							ref={inputRef}
							value={item.name}
							onChange={(value) => handleFlagEdit(value, item.id)}
						/>
					</FlexItem>
					<FlexItem style={{ marginTop: 7, marginLeft: 40 }}>
						<ToggleControl
							checked={item.enabled}
							onChange={() => handleFlagToggle(item.id)}
						/>
					</FlexItem>

					<FlexItem style={{ marginLeft: 60 }}>
						<Button
							variant="secondary"
							label="Click to see SDK setting"
							showTooltip
							tooltipPosition="top right"
							onClick={handleSdkModal}
						>
							{'</> SDK'}
						</Button>
					</FlexItem>
					<FlexItem style={{ marginBottom: 6, marginLeft: 50 }}>
						<Button
							icon={'trash'}
							isDestructive
							variant="tertiary"
							label="Delete Flag"
							onClick={() => handleDeleteModal(item)}
						/>
					</FlexItem>
				</Flex>
				{hasError && (
					<>
						<BaseControl
							className="flag-name-error"
							help="Flag name should not contain spaces. Allowed special characters are - and _"
							id={`${item.id}`}
						>
							{}
						</BaseControl>
						<BaseControl
							help="Example flag names formats: Registration, AB-testing, Auth0_Login"
							id={`${item.id}`}
						>
							{}
						</BaseControl>
					</>
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

export default LineItem;
