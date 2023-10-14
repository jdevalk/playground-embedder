=== Playground Embedder ===
Contributors: joostdevalk
Tested up to: 6.2
Stable tag: 1.1
Requires at least: 6.0
Requires PHP: 7.4
License: GPL v3
License URI: https://www.gnu.org/licenses/gpl-3.0.en.html

Embeds the WordPress playground through a shortcode.

== Description ==
Add the WordPress playground by adding a `[wp_playground]` shortcode to your pages. This plugin supports all the attributes the playground supports, which [you can find here](https://wordpress.github.io/wordpress-playground/docs/query-api#available-options).

An additional feature is that you can lazy load the playground by adding `lazy=1` to the shortcode, like so:

```[wp_playground lazy=1]```

At this point the plugin renders a button and only loads the playground when that button is pressed.


== Changelog ==

= 1.1 =

Added the lazy loading option.

= 1.0 =

Initial release.

== Installation ==
1. Install & activate the plugin.
2. Add a `[wp_playground]` shortcode to one of your pages.
3. You're done.
