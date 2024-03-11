import { checkIfFlagExists } from './index';

describe('Function: checkIfFlagExists', () => {
	let flags;
	let flagName;

	beforeEach(() => {
		flags = [
			{ id: 1, name: 'flag1', enabled: true },
			{ id: 2, name: 'flag2', enabled: false },
			{ id: 3, name: 'flag3', enabled: true },
		];

		flagName = 'flag1';
	});

	test('should return true if flag exists', async () => {
		const result = checkIfFlagExists(flags, flagName);
		expect(result).toBe(true);
	});

	test('should return false if flag does not exist', async () => {
		flagName = 'nonExistentFlag';

		const result = checkIfFlagExists(flags, flagName);
		expect(result).toBe(false);
	});

	test('should return false when flags array is empty', async () => {
		flags = [];
		const result = checkIfFlagExists(flags, flagName);
		expect(result).toBe(false);
	});

	test('should return false when flagName is empty', async () => {
		flagName = '';
		const result = checkIfFlagExists(flags, flagName);
		expect(result).toBe(false);
	});
});
