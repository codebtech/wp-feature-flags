import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SdkModal from '../SdkModal';

describe('SdkModal component', () => {
	test('should render modal correctly', async () => {
		const item = { id: 1, name: 'Test Flag', enabled: false };
		const closeSdkModal = jest.fn();
		render(<SdkModal item={item} closeSdkModal={closeSdkModal} />);

		expect(
			screen.getByText(`SDK for feature flag: ${item.name}`)
		).toBeInTheDocument();

		await userEvent.click(screen.getByLabelText('Close'));

		expect(closeSdkModal).toHaveBeenCalled();
	});
});
