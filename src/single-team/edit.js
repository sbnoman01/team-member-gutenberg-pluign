import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { Spinner } from "@wordpress/components"
import './editor.scss';
import { isBlobURL } from "@wordpress/blob"


export default function Edit({ attributes, setAttributes }) {

	// distract vars from attributes
	const { name, bio,  mediaUrl } = attributes;

	// changing name
	const onNameChange = (newName) => {
		setAttributes({ name: newName });
	}

	// on Bio change
	const onBioChange = (newBio) => {
		setAttributes({ bio: newBio });
	}

	// uploading image from media
	const onMediaSelect = (media) => {
		console.log(media);
		if( media && media.url ){
			setAttributes( { 
				mediaUrl: media.url,
				mediaID: media.id,
				mediaAlt: media.alt
			 } )
		}else{
			setAttributes( { 
				mediaUrl: undefined,
				mediaID: undefined,
				mediaAlt: ''
			 } )
		}
	} 

	const onSelectURL = ( url ) => {
		if( url ){
			setAttributes( { 
				mediaUrl: url,
				mediaID: undefined,
				mediaAlt: undefined
			 } )
		}else{
			setAttributes( { 
				mediaUrl: undefined,
				mediaID: undefined,
				mediaAlt: ''
			 } )
		}
	} 

	return (
		<>
			<div {...useBlockProps()}>
				
				<MediaPlaceholder
					onSelect={onMediaSelect}
					onSelectURL= {onSelectURL}
					onError={(err) => console.log(err)}
					accept='image/*'
					allowedTypes={['image']}
				>
					<div 
						className={`team-member-thumbnail ${ isBlobURL(mediaUrl) ? "is-loading" : "" }`} >
						<img 
							src={mediaUrl}
							alt=''
						/>
						{
							isBlobURL( mediaUrl ) ? <Spinner/> : ''
							
						}
					</div>
				</MediaPlaceholder>
				<RichText
					placeholder={__("Member Name", "textdomain")}
					tagName='h4'
					value={name}
					onChange={onNameChange}
				/>
				<RichText
					placeholder={__("Member Bio", "textdomain")}
					tagName='p'
					value={bio}
					onChange={onBioChange}
				/>
			</div>
		</>
	);
}
