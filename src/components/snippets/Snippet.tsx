import ReactHighlightSyntax from 'react-highlight-syntax';
import type { Language } from 'react-highlight-syntax';

const Snippet = ({ data, language }: { data: string; language: Language }) => {
	return (
		<ReactHighlightSyntax
			theme={'Base16Darcula'}
			language={language}
			copy={true}
			copyBtnTheme={'Dark'}
		>
			{data}
		</ReactHighlightSyntax>
	);
};

export default Snippet;
