import JsSnippet from '../JsSnippet';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('JsSnippet component', () => {
	test('should render JsSnippet correctly with passed flag prop', async () => {
		render(<JsSnippet flag="testFlag" />);
		const result = screen.getByText(/JavaScript Snippet/i);
		expect(result).toBeInTheDocument();
	});

	test('should render the correct JavaScript snippet with the passed flag', async () => {
		render(<JsSnippet flag="testFlag" />);
		const snip = screen.getByText(/.codebFeatureFlags.isEnabled/i);
		expect(snip).toBeInTheDocument();
	});

	test('should update the JavaScript snippet when the flag prop changes', async () => {
		const { rerender, asFragment } = render(<JsSnippet flag="testFlag1" />);
		let snip = screen.getByText(/testFlag1'/i);
		expect(snip).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();

		rerender(<JsSnippet flag="testFlag2" />);
		snip = screen.queryByText(/'testFlag1'/i);
		expect(snip).toBeNull();

		snip = screen.getByText(/'testFlag2'/i);
		expect(snip).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});
});
