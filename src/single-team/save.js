// import { __ } from '@wordpress/i18n';
import { 
	useBlockProps,
	RichText
 } from '@wordpress/block-editor';

export default function save({attributes}) {

	// distruct variables from attributes
	const { name, bio, mediaUrl, mediaAlt, mediaID } = attributes;
	return (
		<div {...useBlockProps.save()}>
			{mediaUrl && <img src={mediaUrl} alt={mediaAlt} className={ mediaID ? `wp-image-${mediaID}` : null} />}
			<RichText.Content
				tagName='h4'
				value={name}
			/>
			<RichText.Content
				tagName='p'
				value={bio}
			/>
		</div>
	);
}
