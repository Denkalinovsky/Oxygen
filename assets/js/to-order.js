$ = jQuery;
$(() => {
    //открытие popup
    $('.btn-to-order').on('click', function (e) {
        $('.popup-order')[0].style.display = 'block';
    });
    //закрытие popup
    $('.btn-exit-popup').on('click', function (e) {
        $('.popup-order')[0].style.display = 'none';
    });
    //отправить данные
    $('input.wpcf7-submit').on('click', function (e){
        // e.preventDefault();
        // let thisForm = $(e.currentTarget);
        // console.log($(thisForm).find('[name = "name-user"]').val());
        let submitData = {
            action: "post_message",
            name: $('[name = "your-name"]').val(),
            email: $('[name = "your-email"]').val(),
            count: $('[name = "number-859"]').val(),
            size: $('[name = "text-354"]').val(),
            telephone: $('[name = "tel-978"]').val(),
        };
        console.log(submitData);
        console.log(MyCustomAjax.ajaxurl);
        $.ajax({
            url: MyCustomAjax.ajaxurl, // обработчик
            action: "post_message",
            data: submitData, // данные
            dataType: "JSON",
            type: "POST", // тип запроса
            success: function (data) {
                var msg = data.data;
                alert(msg);
            },
            error: function (data) {
                console.log(data);
                var msg = data.data;
                alert(msg);
            },
        });
    });
});