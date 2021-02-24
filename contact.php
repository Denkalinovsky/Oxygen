<?php
/*
	Template Name: Contact
*/

/**
 *	Oxygen WordPress Theme
 *
 *	Laborator.co
 *	www.laborator.co
 */
defined( 'ABSPATH' ) || exit;

// Enqueue necessary resources
add_action( 'wp_footer', function(){
	wp_enqueue_script( 'oxygen-contact' );
	wp_enqueue_script( 'oxygen-google-map' );
} );

// Header
get_header();

// Contact page template
get_template_part( 'tpls/contact' );

// Footer
get_footer();