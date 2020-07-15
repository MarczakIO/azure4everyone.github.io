(function (app, $) {

    $(document).ready(function() {
        $(".iframe-button").click(function() {
            var src = $(this).parent().attr("src");
            $(this).parent().removeClass("inactive")
            $(this).siblings("iframe")
                .attr("src", src);
        });

        function isScrolledIntoView(el) {
            var r = el.getBoundingClientRect();
            var isVisible = (r.top >= 0) && (r.top <= window.innerHeight) || 
                (r.bottom >= 0) && (r.bottom <= window.innerHeight);
            return isVisible;
        }
        var lazyLoad = function() {
            $(".lazy > img[src='']").each(function() { 
                if(isScrolledIntoView($(this).parent().get(0)))
                    $(this).attr("src", $(this).attr('data-src'));
            });
        }
        lazyLoad();
        $( window ).scroll(lazyLoad).resize(lazyLoad);

        $('.check-answer').click(function(e){
            var el = $(this);
            var form = $(this).parent();
            form.addClass('check-answer');
            var answeredOk = form.find('.answer > input:checked').length;
            var answers = form.find('.answer').length;
            var answersNotOk = form.find(':not(.answer) > input:checked').length;
            if (answeredOk === answers && answersNotOk === 0) {
                form.addClass('perfect-score');
            } else {
                form.removeClass('perfect-score');
            }
        });
        $('.reset-answer').click(function(e){
            var el = $(this);
            var form = $(this).parent();
            form.removeClass('check-answer').removeClass('perfect-score');
            $(this).siblings('div').find('input').prop('checked', false);
        });
        $('.input-answer').change(function(e) {
            $(this).parent().parent().removeClass('check-answer').removeClass('perfect-score');;
        });
    });

})(window.app = window.app || {}, jQuery);