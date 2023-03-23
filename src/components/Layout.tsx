import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import LineItem from './LineItem';
import { Flag } from '../../types';
import SubmitControls from './SubmitControls';
import { getFlags } from '../utils';
import Header from './Header';
import Environment from './Environment';

const Layout = (): JSX.Element => {
	const [flags, setFlags] = useState<Flag[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [env, setEnv] = useState<string>('');

	useEffect(() => {
		const logFlags = async () => {
			const result = await getFlags();
			// console.log(result);
			if (result.env) {
				setEnv(result.env);
			}
			if (result.flags) {
				setFlags(result.flags);
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
					<Environment env={env} setEnv={setEnv} />
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
							env={env}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Layout;
