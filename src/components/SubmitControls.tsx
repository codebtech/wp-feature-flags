import { Flex, FlexItem, Button } from '@wordpress/components';
import { Flag } from '../../types';
import Notices from './common/Snackbar';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

interface SubmitControlsProps {
	flags: Flag[];
	setFlags: (flags: Flag[]) => void;
	lastFlag: number;
	disableSave: boolean;
	isSaving: boolean;
	handleSave: () => Promise<void>;
}

const SubmitControls = ({
	flags,
	setFlags,
	lastFlag,
	disableSave,
	isSaving,
	handleSave,
}: SubmitControlsProps): JSX.Element => {
	const handleNewFlag = () => {
		const defaultStatus = applyFilters(
			'mrFeatureFlags.newFlag.defaultStatus',
			true
		) as boolean;
		const newFlag = {
			id: lastFlag + 1,
			name: '',
			enabled: defaultStatus,
		};

		let latestFlags = [];

		if (flags?.length) {
			latestFlags = [...flags, newFlag];
		} else {
			latestFlags = [newFlag];
		}

		setFlags(latestFlags);
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
						id="add-flag"
					>
						{__('Add Flag', 'codeb-feature-flags')}
					</Button>
				</FlexItem>
				{lastFlag > 0 && (
					<>
						<FlexItem>
							<Button
								variant="primary"
								onClick={handleSave}
								disabled={disableSave || isSaving}
							>
								{isSaving
									? __('Saving', 'codeb-feature-flags')
									: __('Save', 'codeb-feature-flags')}
							</Button>
						</FlexItem>
						<FlexItem>
							<Button
								variant="tertiary"
								onClick={() => location.reload()}
							>
								{__('Cancel', 'codeb-feature-flags')}
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
