/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverageFrom: [
		'**/*.{ts,js,tsx,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/lib/**',
		'!**/coverage/**',
	],
};
