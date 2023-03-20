import { useState } from '@wordpress/element';
import LineItem from './LineItem';
import { Flag } from '../../types';
import SubmitControls from './SubmitControls';

const Layout = (): JSX.Element => {
	const [flags, setFlags] = useState(window.mrFeatureFlags.flags);
	if (!flags.length) {
		return (
			<>
				<p>
					Welcome to feature flag dashboard. You can add new flags
					`Add flags` action.
				</p>
				<SubmitControls isNew={true} />
			</>
		);
	}
	return (
		<>
			<div id="mr-feature-flag-layout">
				<h1>Feature Flags settings</h1>
				<p>Manage all feature flags.</p>
				<div id="mr-feature-flag-content">
					{flags.map((flag: Flag) => {
						return (
							<LineItem
								key={flag.id}
								item={flag}
								flags={flags}
								setFlags={setFlags}
							/>
						);
					})}
					<SubmitControls />
				</div>
			</div>
		</>
	);
};

export default Layout;
