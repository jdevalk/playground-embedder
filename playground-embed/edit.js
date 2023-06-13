/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, SelectControl, ToggleControl } from "@wordpress/components";


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const {
		width,
		height,
		wp,
		php,
		theme,
		plugin,
		mode
	} = attributes;

	let queryParams = {
		height: height,
		width: width,
		wp: wp,
		php: php,
		theme: theme,
		plugin: plugin,
		mode: mode
	};


	// queryParams = Object.fromEntries(Object.entries(queryParams).filter(([_, v]) => (v != null) || v != ""));
	if( typeof queryParams === 'object' ){
		console.log('is object');
	}
	Object.fromEntries(Object.entries(queryParams).filter(x => x[1] !==''));
	console.log(queryParams)

	const urlParams = new URLSearchParams(queryParams);

	const url = `https://playground.wordpress.net/?${urlParams}`;

	return (
		<div { ...useBlockProps() }className="wordress-playground wp-block">
			<InspectorControls>
				<PanelBody title="Size" initialOpen={ true }>
					<TextControl
						label="Width"
						value={ width }
						onChange={ (val) => setAttributes( {width: val }) }
					/>
					<TextControl
						label="Height"
						value={ height }
						onChange={ (val) => setAttributes( {height: val }) }
					/>
				</PanelBody>
				<PanelBody title="Versions" initialOpen={ false }>
					<SelectControl
						label="WordPress"
						value={ wp }
						options={ [
							{ label: 'Latest', value: 'latest' },
							{ label: '6.2', value: '6.2' },
							{ label: '6.1', value: '6.1' },
							{ label: '6.0', value: '6.0' },
							{ label: '5.9', value: '5.9' },
						] }
						onChange={ ( val ) => setAttributes( {wp: val } ) }
					/>
					<SelectControl
						label="PHP"
						value={ php }
						options={ [
							{ label: 'Latest', value: 'latest' },
							{ label: '8.2', value: '8.2' },
							{ label: '8.1', value: '8.1' },
							{ label: '8.0', value: '8.0' },
							{ label: '7.4', value: '7.4' },
							{ label: '7.3', value: '7.3' },
							{ label: '7.2', value: '7.2' },
							{ label: '7.1', value: '7.1' },
							{ label: '7.0', value: '7.0' },
							{ label: '5.6', value: '5.6' },

						] }
						onChange={ ( val ) => setAttributes( {php: val } ) }
					/>
				</PanelBody>
				<PanelBody title="Themes & Plugins " initialOpen={ false }>
					<TextControl
						label="Theme"
						value={ theme }
						onChange={ (val) => setAttributes( {theme: val }) }
					/>
					<TextControl
						label="Plugin"
						value={ plugin }
						onChange={ (val) => setAttributes( {plugin: val }) }
					/>
				</PanelBody>
				<PanelBody title="Settings" initialOpen={ false }>
					<ToggleControl
						label="Mode"
						help={
							mode
								? 'Displays WordPress on a full-page.'
								: 'Wrapped in a browser UI'
						}
						checked={ mode }
						onChange={ () => {
							setAttributes( ( mode ) => ! mode );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<iframe src={url} width={width} height={height}	></iframe>
		</div>
	);
}
