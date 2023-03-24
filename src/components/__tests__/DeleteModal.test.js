import { render, screen } from '@testing-library/react';
import DeleteModal from '../DeleteModal';

jest.mock('@wordpress/components', () => ({
	...jest.requireActual('@wordpress/components'),
	Modal: jest
		.fn()
		.mockImplementation(({ children }) => <div>{children}</div>),
	Button: jest
		.fn()
		.mockImplementation(({ children }) => <div>{children}</div>),
}));

describe('DeleteModal component', () => {
	it('should display given `flag name` in the modal', () => {
		const flag = { name: 'Test' };
		render(<DeleteModal item={flag} />);

		const modalText = screen.getByText(
			`Are you sure want to delete flag "${flag.name}"?`
		);
		expect(modalText).toBeInTheDocument();
	});
});
