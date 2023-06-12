<?php
/*
Plugin Name: Playground Embedder
Plugin URI: https://wordpress.org/plugins/playground-embedder/
Description: Embeds the WordPress playground through a shortcode.
Version: 1.0
Author: Joost de Valk
Author URI: https://joost.blog/
License: GPL v3
License URI: https://www.gnu.org/licenses/gpl-3.0.en.html
*/

class playground_embedder {
	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'plugins_loaded', [ $this, 'init' ] );
	}

	/**
	 * Initializes the shortcode.
	 *
	 * @return void
	 */
	public function init() {
		add_shortcode( 'wp_playground', [ $this, 'shortcode_output' ] );
	}

	/**
	 * Returns the shortcode output, adding the attributes to the URL.
	 *
	 * @param array $attributes An array of attributes.
	 *
	 * @return string Shortcode output.
	 */
	public function shortcode_output( $attributes, $blueprint = '' ) {
		$attributes = shortcode_atts(
			[
				'width'        => 800,
				'height'       => 600,
				'start_button' => 1,
			],
			$attributes
		);

		$blueprint = wp_json_encode( json_decode( $blueprint ) );
		$url       = add_query_arg( [ 'start_button' => $attributes['start_button'] ], 'https://playground.wordpress.net/remote.html' );

		$random_id = rand( 0, 5000 );

		return '<iframe id="wp-' . $random_id . '" style="width: ' . $attributes['width'] . 'px; height: ' . $attributes['height'] . 'px"></iframe>
<script type="module">
    import { startPlaygroundWeb } from \'https://unpkg.com/@wp-playground/client/index.js\';
    const client = await startPlaygroundWeb({
        iframe: document.getElementById(\'wp-' . $random_id . '\'),
        remoteUrl: \'' . $url . '\',
        blueprint: ' . $blueprint . ',
    } );
</script>';
	}
}

new playground_embedder();
