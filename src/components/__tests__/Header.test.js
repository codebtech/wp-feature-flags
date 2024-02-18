import { render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('@wordpress/components', () => ({
	...jest.requireActual('@wordpress/components'),
	Flex: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
	FlexItem: jest
		.fn()
		.mockImplementation(({ children }) => <div>{children}</div>),
}));

describe('Header component', () => {
	it('renders component with all header fields', () => {
		render(<Header />);
		const flagName = screen.getByText('Flag Name');
		expect(flagName).toBeInTheDocument();

		const status = screen.getByText('Status');
		expect(status).toBeInTheDocument();

		const sdk = screen.getByText('SDK Settings');
		expect(sdk).toBeInTheDocument();

		const deleteFlag = screen.getByText('Delete Flag');
		expect(deleteFlag).toBeInTheDocument();
	});
});
