import { render } from '@testing-library/react';
import TsSupport from '../TsSupport';

describe('Typescript snippet component', () => {
	test('renders without any error', async () => {
		const { asFragment } = render(<TsSupport />);
		expect(asFragment()).toMatchSnapshot();
	});
});
