import PhpSnippet from '../PhpSnippet';
import { render } from '@testing-library/react';

describe('PhpSnippet component', () => {
	it('it should render the correct PHP snippet', () => {
		const { getByText } = render(<PhpSnippet flag={'testFlag'} />);
		expect(getByText(/testFlag/i)).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<PhpSnippet flag={'testFlag'} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
