$('#multiple-select-custom-field').select2({
    theme: "bootstrap-5",
    width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    placeholder: $(this).data('placeholder'),
    closeOnSelect: false,
    tags: true
});

$("li").hover(
    function () {
        $(this).find("span").stop().animate({
            width: "100%",
            opacity: "1",
        }, 400, function () {
        })
    }, function () {
        $(this).find("span").stop().animate({
            width: "0%",
            opacity: "0",
        }, 400, function () {
        })
    }
);