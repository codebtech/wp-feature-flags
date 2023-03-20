import { Flex, FlexItem, Button } from '@wordpress/components';

const SubmitControls = ({ isNew }: { isNew?: boolean }): JSX.Element => {
	return (
		<div id="mr-feature-flag-submit-controls">
			<Flex justify={'flex-start'}>
				<FlexItem>
					<Button
						variant="primary"
						onClick={() => null}
						style={{ marginRight: 15 }}
						icon={'plus'}
					>
						Add Flag
					</Button>
				</FlexItem>
				{!isNew && (
					<>
						<FlexItem>
							<Button variant="primary" onClick={() => null}>
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
