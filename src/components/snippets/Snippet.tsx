import SyntaxHighlighter from 'react-syntax-highlighter';

const Snippet = ({
	data,
	language,
}: {
	data: string;
	language: string;
}): JSX.Element => {
	return <SyntaxHighlighter language={language}>{data}</SyntaxHighlighter>;
};

export default Snippet;
