import { __ } from '@wordpress/i18n';
import { useEffect, useState } from "@wordpress/element"
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store
} from '@wordpress/block-editor';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	TextControl,
	PanelBody,
	SelectControl,
	Icon
} from "@wordpress/components"
import { usePrevious } from "@wordpress/compose"
import './editor.scss';
import { isBlobURL, revokeBlobURL } from "@wordpress/blob"
import { useSelect } from "@wordpress/data"



function Edit({ attributes, setAttributes, noticeOperations, noticeUI, isSelected }) {

	// distract vars from attributes
	const { name, bio, mediaUrl, mediaID, mediaAlt, socialLinks } = attributes;

	const [blobUrl, setBlobUrl] = useState();
	const [selectedLink, setSelectedLink] = useState();
	const [PrevIsSelected, setPrevIsSelected] = useState();


	const imageObj = useSelect((select) => {
		const { getMedia } = select("core");

		return mediaID ? getMedia(mediaID) : null;
	}, [mediaID]);

	const mediaSizes = useSelect((select) => {
		return select(store).getSettings().imageSizes;
	}, [])

	const addNewLinks = () => {
		setAttributes({
			socialLinks: [...socialLinks, {sLink: "https://twitter.com", sIcon: "wordpress"}]
		})
	}

	// image size options
	const getSizeOptions = () => {
		if (!imageObj) return []
		const options = [];
		const sizes = imageObj.media_details.sizes;

		for (const key in sizes) {
			const size = sizes[key];
			const mediaSize = mediaSizes.find((s) => s.slug == key);

			if (mediaSize) {
				options.push({
					label: mediaSize.name,
					value: size.source_url
				});
			}
		}
		return options;
	}

	// media size changes
	const onMediaSizeChange = (url) => {
		setAttributes({ mediaUrl: url });
	};

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
		setAttributes({ mediaAlt: altText })
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

	useEffect( () => {
		if(setPrevIsSelected && !PrevIsSelected){
			setSelectedLink()
		}
	}, [PrevIsSelected, setPrevIsSelected]);

	return (
		<>

			{mediaUrl &&
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
						label={__("Alt Text")}
						placeholder={__("Enter Place holder")}
						value={mediaAlt}
						onChange={onAltChange}
					/>
				</PanelBody>

				{mediaID &&
					<PanelBody
						title='Media Sizes'
					>
						<SelectControl
							onChange={onMediaSizeChange}
							options={getSizeOptions()}
							value={mediaUrl}
						/>
					</PanelBody>
				}
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
				<div className='socialLinks'>	
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li key={index} className={ selectedLink === index ? 'link_selected' : null }>
									<button
										onClick={ () => setSelectedLink(index)}
									>
										<Icon icon={item.sIcon} />
									</button>
								</li>
							)
						})}
						{isSelected && 
							<li 
								className='add__new_social'
								onClick={addNewLinks}
							>
								<Icon icon="plus" />
							</li>
						}
						
					</ul>
				</div>
			</div>
		</>
	);
}

export default withNotices(Edit)