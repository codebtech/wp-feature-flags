import { Flex, FlexItem, Button } from '@wordpress/components';
import { Flag } from '../../types';
import { updateFlags } from '../utils';
import { useState } from '@wordpress/element';
import Notices from './Snackbar';
import { dispatch } from '@wordpress/data';

const SubmitControls = (props: any): JSX.Element => {
	const { isNew, flags, setFlags, lastFlag, disableSave } = props;
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

		dispatch('core/notices').createSuccessNotice('✅ Saved successfully!', {
			type: 'snackbar',
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
						Add Flag
					</Button>
				</FlexItem>
				{!isNew && (
					<>
						<FlexItem>
							<Button
								variant="primary"
								onClick={handleSave}
								disabled={disableSave || isSaving}
							>
								{isSaving ? 'Saving' : 'Save'}
							</Button>
						</FlexItem>
						<FlexItem>
							<Button
								variant="tertiary"
								onClick={() => location.reload()}
							>
								Cancel
							</Button>
						</FlexItem>
					</>
				)}
			</Flex>

			<Notices />
		</div>
	);
};

export default SubmitControls;
