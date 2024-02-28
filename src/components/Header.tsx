import { Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function (): JSX.Element {
	return (
		<Flex justify={'flex-start'}>
			<FlexItem>
				<h4>{__('Flag Name', 'codeb-feature-flags')}</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 160 }}>
				<h4>{__('Status', 'codeb-feature-flags')}</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 160 }}>
				<h4>{__('SDK Settings', 'codeb-feature-flags')}</h4>
			</FlexItem>
			<FlexItem style={{ marginLeft: 30 }}>
				<h4>{__('Delete Flag', 'codeb-feature-flags')}</h4>
			</FlexItem>
		</Flex>
	);
}
