import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Snippet = ({ data }: { data: string }): JSX.Element => {
	return (
		<SyntaxHighlighter language="javascript" style={a11yDark}>
			{data}
		</SyntaxHighlighter>
	);
};

export default Snippet;
