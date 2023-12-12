import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';

// new widgets
import './single-team'

registerBlockType('create-block/team-member-block', {
	attributes:{
		columns: {
			type: "number",
			default: 2
		}
	},
	edit: Edit,
	save,
});
