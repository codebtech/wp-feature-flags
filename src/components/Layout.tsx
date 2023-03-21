import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import LineItem from './LineItem';
import { Flag } from '../../types';
import SubmitControls from './SubmitControls';
import { getFlags } from '../utils';

const Layout = (): JSX.Element => {
	const [flags, setFlags] = useState<Flag[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const logFlags = async () => {
			const result = await getFlags();
			if (Array.isArray(result)) {
				setFlags(result);
				setIsLoading(false);
			}
		};
		logFlags();
	}, [getFlags, setFlags, setIsLoading]);

	const [disableSave, setDisableSave] = useState(false);

	const flagsCount = flags?.length || 0;

	if (!flagsCount && !isLoading) {
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
					{isLoading ? (
						<div className="feature-flag-loader">
							<Spinner />
						</div>
					) : (
						flags?.map((flag: Flag) => {
							return (
								<LineItem
									key={flag.id}
									item={flag}
									flags={flags}
									setFlags={setFlags}
									setDisableSave={setDisableSave}
								/>
							);
						})
					)}

					{!isLoading && (
						<SubmitControls
							setFlags={setFlags}
							flags={flags}
							isNew={false}
							flagsCount={flagsCount}
							disableSave={disableSave}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Layout;
