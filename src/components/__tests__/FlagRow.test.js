import { render, fireEvent } from '@testing-library/react';
import FlagRow from '../FlagRow';

test('FlagRow Function Test', async () => {
	const item = {
		id: 1,
		name: 'Test Flag',
		enabled: false,
	};
	const flags = [{ ...item }];
	const setFlags = jest.fn();
	const setDisableSave = jest.fn();
	const handleSave = jest.fn();
	const handleDeleteFlag = jest.fn();

	const { getByRole, getByLabelText } = render(
		<FlagRow
			flags={flags}
			setFlags={setFlags}
			item={item}
			setDisableSave={setDisableSave}
			handleSave={handleSave}
			handleDeleteFlag={handleDeleteFlag}
		/>
	);

	// Test flipping the toggle
	fireEvent.click(getByRole('checkbox'));
	expect(setFlags).toHaveBeenCalledTimes(1);
	expect(handleSave).toHaveBeenCalledTimes(1);

	// Test editing the flag name
	const input = getByRole('textbox');
	fireEvent.change(input, { target: { value: 'New Flag' } });
	expect(setFlags).toHaveBeenCalledTimes(2);

	const sdkButton = getByLabelText('Click to see SDK setting');
	expect(sdkButton).toBeInTheDocument();

	const deleteButton = getByLabelText('Delete Flag');
	expect(deleteButton).toBeInTheDocument();
});
