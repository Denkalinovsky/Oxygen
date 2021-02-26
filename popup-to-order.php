<?php
global $post, $get_title_post;
//var_dump( wc_get_product($post));
$courseID = wc_get_product($post->ID);
if ($courseID) {
    $get_title_post = $courseID->get_id();
//    var_dump($get_title_post);
}
?>
<script>
    // при загрузке страницы получить "name" товара и записать в контактную форму
    var size = '<?php echo $get_title_post;?>';
    jQuery(document).ready(() => {
        jQuery('[name = "text-354"]')[0].value = size;
    });
</script>
<div class="container-popup">
    <div class="popup-order" novalidate="">
        <button class="btn-exit-popup" type="button">X</button>
        <?php echo do_shortcode('[contact-form-7 id="3217" title="popup-order"]'); ?>
    </div>
</div>