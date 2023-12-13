// import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	RangeControl,
} from "@wordpress/components"
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	// distructure the columns
	const { columns } = attributes;
	// columdn change callback
	const onColumnChange = (newColumn) => {
		setAttributes({ columns: newColumn })
	}
	return (
		<>
			<InspectorControls>
				<PanelBody
					title='Columns'
					icon="columns"
					initialOpen
				>
					<RangeControl
						label='Column'
						max={6}
						min={1}
						onChange={onColumnChange}
						value={columns}
						marks
						step={1}
					/>
					<PanelRow>My Panel Inputs and Labels</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({
				className: `has-${columns}-columns`
			})}>
				<InnerBlocks
					allowedBlocks={['create-block/single-team']}
					template={[
						[
							'create-block/single-team',
							{
								name: 'Abdullah An-Noman',
								bio: 'WordPress Developer'
							}
						],
						[
							'create-block/single-team',
							{
								name: 'MD Jaser Hossain',
								bio: 'FullStack Developer'
							}
						],
						[
							'create-block/single-team',
							{
								name: 'Kamal Kader',
								bio: 'QA Tester '
							}
						]
					]}
				/>
			</div>
		</>
	);
}
