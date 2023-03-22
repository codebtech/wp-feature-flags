import { SelectControl } from '@wordpress/components';

export default function ({ env, setEnv }: { env: string; setEnv: any }) {
	return (
		<div style={{ width: 200 }}>
			<SelectControl
				label="Choose current environment"
				onChange={(value) => setEnv(value)}
				value={env}
				options={[
					{
						disabled: true,
						label: 'Set environment',
						value: '',
					},
					{
						label: 'Pre Production',
						value: 'pre-prod',
					},
					{
						label: 'Production',
						value: 'prod',
					},
				]}
			/>
		</div>
	);
}
