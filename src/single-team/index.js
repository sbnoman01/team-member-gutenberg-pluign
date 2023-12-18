import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';

registerBlockType('create-block/single-team', {
	title: __('Single team', 'team-member'),
	description: __('Single team member item', 'team-member'),
	icon: 'admin-users',
	parent: ["create-block/team-member-block"],
	supports: {
		html: false,
		reusable: false
	},
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h4"
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p"
		},
		mediaID: {
			type: "number"
		},
		mediaUrl: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
			default: ""
		},
		mediaAlt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt"
		},
		socialLinks: {
			type: "array",
			default: [
				{ sLink: "https://facebook.com", sIcon: "facebook-alt"},
				{ sLink: "https://instagram.com", sIcon: "instagram"}
			]
		}
		
	},
	edit: Edit,
	save
});
