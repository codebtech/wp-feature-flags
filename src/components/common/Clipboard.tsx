import { useCopyToClipboard } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';

type CSSStyle = Record<string, string | number>;

const Clipboard = ({
	text,
	style,
}: {
	text: string;
	style: CSSStyle;
}): JSX.Element => {
	const [hasCopied, setHasCopied] = useState(false);

	useEffect(() => {
		let clipTimeout: NodeJS.Timeout | null = null;

		if (hasCopied) {
			clipTimeout = setTimeout(() => {
				setHasCopied(false);
			}, 4000);
		}

		return () => {
			if (clipTimeout) {
				window.clearTimeout(clipTimeout);
			}
		};
	}, [hasCopied]);

	const onCopy = () => setHasCopied(true);

	const clipRef = useCopyToClipboard<HTMLButtonElement>(text, onCopy);

	return (
		<>
			<Button
				icon={hasCopied ? 'yes-alt' : 'clipboard'}
				style={style}
				isPressed={false}
				variant={'tertiary'}
				ref={clipRef}
			/>
		</>
	);
};

export default Clipboard;
