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
		register_block_type( __DIR__ . '/build');
	}

	/**
	 * Returns the shortcode output, adding the attributes to the URL.
	 *
	 * @param array $attributes An array of attributes.
	 *
	 * @return string Shortcode output.
	 */
	public function shortcode_output( $attributes ) {
		$query_parameters = shortcode_atts(
			[
				'width'        => 1200,
				'height'       => 800,
				'wp'           => 'latest',
				'php'          => '8.0',
				'plugin'       => '',
				'theme'        => '',
				'url'          => '/wp-admin/',
				'mode'         => 'seamless',
				'login'        => 1,
				'gutenberg-pr' => '',
				'start_button' => 1,
			],
			$attributes
		);
		$query_parameters = array_filter( $query_parameters, static function( $element ) {
			return ! empty( $element );
		} );

		$url = add_query_arg( $query_parameters, 'https://playground.wordpress.net/' );

		return sprintf( '<iframe src="%1$s" width="%2$s" height="%3$s"></iframe>', $url, $query_parameters['width'], $query_parameters['height'] );
	}
}

new playground_embedder();
