module.exports = {
	setupFilesAfterEnv: ['./jest-setup.js'],
	moduleNameMapper: {
		'@wordpress/(.*)$': '<rootDir>/node_modules/@wordpress/$1',
	},
	modulePathIgnorePatterns: ['<rootDir>/vendor/'],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
};
