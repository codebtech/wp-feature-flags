import { Flex, FlexItem } from '@wordpress/components';
export default function (): JSX.Element {
	return (
		<Flex justify={'flex-start'}>
			<FlexItem>
				<h4>Flag Name</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 150 }}>
				<h4>Prod</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 15 }}>
				<h4>SDK Settings</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 20 }}>
				<h4>Delete Flag</h4>
			</FlexItem>
		</Flex>
	);
}
