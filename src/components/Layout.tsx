import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import LineItem from './LineItem';
import { Flag } from '../../types';
import SubmitControls from './SubmitControls';
import { getFlags } from '../utils';
import Header from './Header';

const Layout = (): JSX.Element => {
	const [flags, setFlags] = useState<Flag[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const logFlags = async () => {
			const fetchedFlags = await getFlags();

			if (fetchedFlags) {
				setFlags(fetchedFlags);
			}

			setIsLoading(false);
		};
		logFlags();
	}, [getFlags, setFlags, setIsLoading]);

	const [disableSave, setDisableSave] = useState(false);

	const lastFlag = flags?.at(-1)?.id || 0;

	return (
		<>
			<div id="mr-feature-flag-layout">
				<h1>Feature Flags settings</h1>
				<div id="mr-feature-flag-content">
					{lastFlag ? <Header /> : ''}
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
							lastFlag={lastFlag}
							disableSave={disableSave}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Layout;
