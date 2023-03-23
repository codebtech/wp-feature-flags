import { Flex, FlexItem } from '@wordpress/components';
export default function (): JSX.Element {
	return (
		<Flex justify={'flex-start'}>
			<FlexItem>
				<h4>Flag Name</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 140 }}>
				<h4>Status</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 80 }}>
				<h4>SDK Settings</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 30 }}>
				<h4>Delete Flag</h4>
			</FlexItem>
		</Flex>
	);
}
