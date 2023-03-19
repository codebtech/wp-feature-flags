import {
	ToggleControl,
	TextControl,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

interface flag {
	name: string;
	enabled: boolean;
}
const Layout = (): JSX.Element => {
	const [flags] = useState(window.mrFeatureFlags.flags);
	return (
		<div id="mr-feature-flag-layout">
			<h1>Feature Flags settings</h1>
			<p>You can manage all available flags here.</p>
			<div id="mr-feature-flag-content">
				{flags.map((flag: flag) => {
					return (
						<div id="mr-feature-flag-item" key={flag.name}>
							<Flex justify={'flex-start'}>
								<FlexItem>
									<TextControl
										value={flag.name.toUpperCase()}
										disabled
										onChange={() => null}
									/>
								</FlexItem>
								<FlexItem>
									<ToggleControl
										label={flag.name}
										checked={flag.enabled}
										onChange={() => null}
									/>
								</FlexItem>
							</Flex>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Layout;
