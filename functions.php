<?php
/**
 *    Oxygen WordPress Theme
 *
 *    Laborator.co
 *    www.laborator.co
 */

if (!defined('ABSPATH')) {
    exit; // Direct access not allowed.
}

// Theme content width
$GLOBALS['content_width'] = isset($GLOBALS['content_width']) ? $GLOBALS['content_width'] : 1170;

// Theme demo file
if (file_exists(get_stylesheet_directory() . '/theme-demo/theme-demo.php')) {
    require "theme-demo/theme-demo.php";
}
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('newscript', get_template_directory_uri() . '/assets/js/to-order.js');
    wp_localize_script('newscript', 'MyCustomAjax', array('ajaxurl' => admin_url('admin-ajax.php')));
});
// Core files
require 'inc/lib/smof/smof.php';
require 'inc/laborator_classes.php';
require 'inc/laborator_functions.php';
require 'inc/laborator_actions.php';
require 'inc/laborator_filters.php';

// Advanced Custom Fields
require 'inc/acf-fields.php';

// WooCommerce integration
if (oxygen_is_shop_supported()) {
    require_once 'inc/woocommerce-core.php';
    require_once 'inc/woocommerce-loop.php';
    require_once 'inc/woocommerce-single.php';
    require_once 'inc/woocommerce-cart.php';
    require_once 'inc/woocommerce-checkout.php';
    require_once 'inc/woocommerce-other.php';
}

// Library Files
require 'inc/lib/dynamic_image_downsize.php';
require 'inc/lib/class-tgm-plugin-activation.php';
require 'inc/lib/laborator/laborator_custom_css.php';
require 'inc/lib/widgets/laborator_subscribe.php';
require 'inc/lib/laborator/laborator-demo-content-importer/laborator_demo_content_importer.php';
require 'inc/lib/wpml-embedder/wpml-embedder.php';

// Visual Composer
if (oxygen_is_plugin_active('js_composer/js_composer.php') || defined('WPB_VC_VERSION')) {
    require 'inc/lib/visual-composer/config.php';
}

// Revslider Field for ACF
if (oxygen_is_plugin_active('revslider/revslider.php') && function_exists('register_field_group')) {
    require 'inc/lib/acf-revslider/acf-revslider.php';
}

// Laborator SEO
if (!defined('WPSEO_PATH')) {
    require 'inc/lib/laborator/laborator_seo.php';
}

// Thumbnail sizes
add_image_size('blog-thumb-1', 410, 410, true);
add_image_size('shop-thumb-2', 180, 220, true);
add_image_size('blog-thumb-3', 540, 360, true);

function post_message()
{
//    var_dump( $_POST );
//    var_dump( isset($data['action'], $data['name'], $data['email'], $data['count'], $data['size'], $data['telephone']));
    if( ! variable_valid( $_POST ) ){
//        var_dump(1241);
        wp_send_json_error( "Some form data is incorrect" );
        return;
    }
    $data = $_POST;
//    var_dump($data);
    $address = array(
        'first_name'  => $data['name'],
        'email' => $data['email'],
        'phone' => $data['telephone'],
    );
    $order = wc_create_order();
    if( ! $order->get_id() ) {
        wp_send_json_error( "Order not created" );
        return;
    }
    $order->add_product(get_product($data['size']), $data['count']); // This is an existing SIMPLE product
    $order->calculate_totals();
    $order->set_address( $address, 'billing' );
    $order->update_status("Completed", 'Imported order', TRUE);
//    var_dump($order);
    wp_send_json_success( "Order is created" );
}
add_action('wp_ajax_post_message', 'post_message');
add_action('wp_ajax_nopriv_post_message', 'post_message');

function variable_valid( $data ) {
    // проверка полей, если не заполнены
    if ( $data['action'] === "" || $data['name'] === "" || $data['email'] === "" || $data['count'] === "" || $data['size'] === "" || $data['telephone'] === ""  ) {
        return false;
    }
    // проверка емейла
    if ( ! preg_match( '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $data['email'] ) ) {
        return false;
    }
    //проверка на количество
    if ( intval($data['count']) <= 0) {
        return false;
    }
    return true;
}