import { Flex, FlexItem, Button } from '@wordpress/components';

const SubmitControls = (props: any): JSX.Element => {
	const { isNew, flags, setFlags, flagsCount } = props;
	const handleNewFlag = () => {
		const newFlag = { id: flagsCount + 1, name: '', enabled: false };
		const clonedFlags = [...flags, newFlag];
		setFlags(clonedFlags);
	};

	const handleSave = () => {
		console.log(flags);
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
							<Button variant="primary" onClick={handleSave}>
								Save
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
		</div>
	);
};

export default SubmitControls;
