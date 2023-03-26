import { Flex, FlexItem, Button } from '@wordpress/components';
import { Flag } from '../../../types';
import { updateFlags } from '../../utils';
import { useState } from '@wordpress/element';
import Notices from '../common/Snackbar';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

interface SubmitControlsProps {
	flags: Flag[];
	setFlags: (flags: Flag[]) => void;
	lastFlag: number;
	disableSave: boolean;
}

const SubmitControls = ({
	flags,
	setFlags,
	lastFlag,
	disableSave,
}: SubmitControlsProps): JSX.Element => {
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const handleNewFlag = () => {
		const newFlag = {
			id: lastFlag + 1,
			name: '',
			enabled: false,
		};

		let latestFlags = [];

		if (flags?.length) {
			latestFlags = [...flags, newFlag];
		} else {
			latestFlags = [newFlag];
		}

		setFlags(latestFlags);
	};

	const handleSave = async () => {
		setIsSaving(true);
		const cleanFlags: Flag[] = flags.filter(
			(item: Flag) => item.name !== ''
		);

		await updateFlags({ ...cleanFlags });

		setIsSaving(false);

		dispatch('core/notices').createSuccessNotice('Saved successfully!', {
			type: 'snackbar',
			id: 'mr-feature-flags-snackbar',
			icon: <>✅</>,
		});
	};
	return (
		<div id="mr-feature-flag-submit-controls">
			<Flex justify={'flex-start'}>
				<FlexItem>
					<Button
						variant="primary"
						onClick={handleNewFlag}
						style={{ marginRight: 15 }}
						icon={'plus'}
					>
						{__('Add Flag', 'mr-feature-flags')}
					</Button>
				</FlexItem>

				<FlexItem>
					<Button
						variant="primary"
						onClick={handleSave}
						disabled={disableSave || isSaving}
					>
						{isSaving
							? __('Saving', 'mr-feature-flags')
							: __('Save', 'mr-feature-flags')}
					</Button>
				</FlexItem>
				<FlexItem>
					<Button
						variant="tertiary"
						onClick={() => location.reload()}
					>
						{__('Cancel', 'mr-feature-flags')}
					</Button>
				</FlexItem>
			</Flex>

			<Notices />
		</div>
	);
};

export default SubmitControls;
