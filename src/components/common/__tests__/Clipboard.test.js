import Clipboard from '../Clipboard';
import { render } from '@testing-library/react';

describe('Clipboard', () => {
	test('Clipboard function', async () => {
		const text = 'test clipboard';

		const { getByLabelText } = render(<Clipboard text={text} />);
		const clipboardButton = getByLabelText('Copy to clipboard');

		expect(clipboardButton).toBeInTheDocument();
	});
});
