import { __ } from '@wordpress/i18n';
import { useEffect, useState } from "@wordpress/element"
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls
} from '@wordpress/block-editor';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	TextControl,
	PanelBody
} from "@wordpress/components"
import './editor.scss';
import { isBlobURL, revokeBlobURL } from "@wordpress/blob"



function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {

	// distract vars from attributes
	const { name, bio, mediaUrl, mediaID, mediaAlt } = attributes;
	const [blobUrl, setBlobUrl] = useState();


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
		if (media && media.url) {
			setAttributes({
				mediaUrl: media.url,
				mediaID: media.id,
				mediaAlt: media.alt
			})
		} else {
			setAttributes({
				mediaUrl: undefined,
				mediaID: undefined,
				mediaAlt: ''
			})
		}
	}

	const onSelectURL = (url) => {
		if (url) {
			setAttributes({
				mediaUrl: url,
				mediaID: undefined,
				mediaAlt: undefined
			})
		} else {
			setAttributes({
				mediaUrl: undefined,
				mediaID: undefined,
				mediaAlt: ''
			})
		}
	}

	// remove media url
	const removeMediaUrl = () => {
		setAttributes({
			mediaUrl: undefined,
			mediaID: undefined,
			mediaAlt: ''
		})
	}

	// error handle
	const onError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	}

	// changing alter text
	const onAltChange = (altText) => {
		setAttributes({ mediaAlt: altText})
	}

	// use effect
	useEffect(() => {
		if (!mediaID && isBlobURL(mediaUrl)) {
			setAttributes({ mediaUrl: undefined });
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(mediaUrl)) {
			setBlobUrl(mediaUrl);
		} else {
			revokeBlobURL(blobUrl);
			setBlobUrl();
		}
	}, [mediaUrl])

	return (
		<>

			{ mediaUrl && 
				<BlockControls group="inline">
					<MediaReplaceFlow
						onSelect={onMediaSelect}
						onSelectURL={onSelectURL}
						onError={onError}
						accept='image/*'
						allowedTypes={['image']}
						notices={noticeUI}
						mediaId={mediaID}
						mediaUrl={mediaUrl}
					/>
					<ToolbarButton
						icon="trash"
						label="Remove Image"
						onClick={removeMediaUrl}
					/>
				</BlockControls>
			}

			<InspectorControls>
				<PanelBody
					title={__('Box Controls')}
					icon="admin-appearance"
					initialOpen
				>
					<TextControl
						label={ __("Alt Text") }
						placeholder={ __("Enter Place holder") }
						value={mediaAlt}
						onChange={onAltChange}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div
					className={`team-member-thumbnail ${isBlobURL(mediaUrl) ? "is-loading" : ""}`} >
					<img
						src={mediaUrl}
						alt=''
					/>
					{
						isBlobURL(mediaUrl) ? <Spinner /> : ''

					}
				</div>
				{
					!mediaUrl &&
					<MediaPlaceholder
						onSelect={onMediaSelect}
						onSelectURL={onSelectURL}
						onError={onError}
						accept='image/*'
						allowedTypes={['image']}
						notices={noticeUI}
					/>
				}


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

export default withNotices(Edit)