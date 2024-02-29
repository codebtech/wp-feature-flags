import { useState, useEffect, useCallback } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import FlagRow from './FlagRow';
import { Flag } from '../../types';
import SubmitControls from './SubmitControls';
import { getFlags, updateFlags } from '../utils';
import Header from './Header';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';

const Layout = (): JSX.Element => {
	const [flags, setFlags] = useState<Flag[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [disableSave, setDisableSave] = useState<boolean>(false);

	const { createErrorNotice, createSuccessNotice } =
		useDispatch('core/notices');

	useEffect(() => {
		const logFlags = async () => {
			const fetchedFlags = await getFlags();
			if (fetchedFlags) {
				setFlags(fetchedFlags);
			}

			setIsLoading(false);
		};
		logFlags();
	}, [setFlags, setIsLoading]);

	const remoteApi = useCallback(
		async (input: Flag[]) => {
			try {
				const response = await updateFlags({ ...input });
				if ('status' in response && response.status === 200) {
					createSuccessNotice(
						__('Saved successfully!', 'codeb-feature-flags'),
						{
							type: 'snackbar',
							id: 'codeb-feature-flags-snackbar',
							icon: <>✅</>,
						}
					);
				}
			} catch (error: unknown) {
				//@ts-ignore
				createErrorNotice(error?.message, {
					type: 'snackbar',
					id: 'codeb-feature-flags-snackbar',
					icon: <>❌</>,
				});
			}
		},
		[createErrorNotice, createSuccessNotice]
	);

	const lastFlag = flags?.at(-1)?.id || 0;

	const handleSave = async () => {
		setIsSaving(true);

		setFlags((prevFlags: Flag[]) => {
			return prevFlags.filter((f) => f.name !== '');
		});

		remoteApi(flags);
		setIsSaving(false);
	};

	const handleDeleteFlag = async (flagId: number) => {
		setIsSaving(true);

		const latestFlags = flags.filter((f) => f.id !== flagId);
		setFlags(latestFlags);

		remoteApi(latestFlags);
		setIsSaving(false);
	};

	return (
		<>
			<div id="mr-feature-flag-layout">
				<h1>{__('Feature Flags', 'codeb-feature-flags')}</h1>
				<div id="mr-feature-flag-content">
					{lastFlag ? <Header /> : ''}
					{isLoading ? (
						<div className="feature-flag-loader">
							<Spinner />
						</div>
					) : (
						flags?.map((flag: Flag) => {
							return (
								<FlagRow
									key={flag.id}
									item={flag}
									flags={flags}
									setFlags={setFlags}
									setDisableSave={setDisableSave}
									handleSave={handleSave}
									handleDeleteFlag={handleDeleteFlag}
								/>
							);
						})
					)}

					{!isLoading && (
						<SubmitControls
							setFlags={setFlags}
							flags={flags}
							lastFlag={lastFlag}
							disableSave={disableSave}
							isSaving={isSaving}
							handleSave={handleSave}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Layout;
