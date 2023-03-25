import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Snippet = ({
	data,
	language,
}: {
	data: string;
	language: string;
}): JSX.Element => {
	return (
		<SyntaxHighlighter language={language} style={a11yDark}>
			{data}
		</SyntaxHighlighter>
	);
};

export default Snippet;
