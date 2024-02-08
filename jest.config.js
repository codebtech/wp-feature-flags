module.exports = {
	setupFilesAfterEnv: ['./jest-setup.js'],
	moduleNameMapper: {
		'@wordpress/(.*)$': '<rootDir>/node_modules/@wordpress/$1',
	},
	modulePathIgnorePatterns: ['<rootDir>/vendor/'],
	testEnvironment: 'jsdom',
};
