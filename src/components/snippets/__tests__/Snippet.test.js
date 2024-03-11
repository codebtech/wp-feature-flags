import { render, screen } from '@testing-library/react';
import Snippet from '../Snippet';

describe('Snippet component', () => {
	it('renders without crashing', () => {
		const data = "console.log('Hello, World!')";
		const language = 'javascript';

		render(<Snippet data={data} language={language} />);

		expect(screen.getByText(/'Hello, World!'/)).toBeInTheDocument();
	});
});
