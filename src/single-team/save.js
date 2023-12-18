// import { __ } from '@wordpress/i18n';
import { 
	useBlockProps,
	RichText
 } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';



export default function save({attributes}) {

	// distruct variables from attributes
	const { name, bio, mediaUrl, mediaAlt, mediaID, socialLinks } = attributes;
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

			{socialLinks.map((item, index) => {
				return (
					<li key={index}>
						<a href={item.sLink}>
							<Icon icon={item.sIcon} />
						</a>
					</li>
				)
			})}

		</div>
	);
}
