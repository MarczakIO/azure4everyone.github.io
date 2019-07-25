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
    });

})(window.app = window.app || {}, jQuery);