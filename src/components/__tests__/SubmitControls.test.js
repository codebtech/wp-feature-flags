import { render, screen, fireEvent } from '@testing-library/react';

import SubmitControls from '../SubmitControls';

describe('SubmitControls component', () => {
	let mockHandleSave, mockSetFlags;

	beforeEach(() => {
		mockHandleSave = jest.fn();
		mockSetFlags = jest.fn();
	});

	it('renders component with all header fields', () => {
		render(
			<SubmitControls
				flags={[]}
				setFlags={mockSetFlags}
				lastFlag={0}
				disableSave={false}
				isSaving={false}
				handleSave={mockHandleSave}
			/>
		);

		const addFlagButton = screen.getByText('Add Flag');
		const saveButton = screen.queryByText('Save');
		const cancelButton = screen.queryByText('Cancel');

		// Click on Add Flag button
		fireEvent.click(addFlagButton);

		// Assert setFlags is called
		expect(mockSetFlags).toHaveBeenCalled();

		// Assert Save & Cancel buttons do not exist when `lastFlag` is 0
		expect(saveButton).toBeNull();
		expect(cancelButton).toBeNull();
	});

	test('save button interaction', () => {
		render(
			<SubmitControls
				flags={[]}
				setFlags={mockSetFlags}
				lastFlag={1}
				disableSave={false}
				isSaving={false}
				handleSave={mockHandleSave}
			/>
		);

		const saveButton = screen.getByText('Save');

		// Click on Save button
		fireEvent.click(saveButton);

		// Assert handleSave is called
		expect(mockHandleSave).toHaveBeenCalled();
	});

	test('display saving text', () => {
		render(
			<SubmitControls
				flags={[]}
				setFlags={mockSetFlags}
				lastFlag={1}
				disableSave={false}
				isSaving={true}
				handleSave={mockHandleSave}
			/>
		);

		const savingButton = screen.getByText('Saving');

		// Assert Save button is now displaying "Saving"
		expect(savingButton).toBeTruthy();
	});
});
