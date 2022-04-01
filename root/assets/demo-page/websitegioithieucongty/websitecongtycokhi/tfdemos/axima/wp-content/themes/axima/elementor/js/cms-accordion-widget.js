( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var WidgetCMSAccordionHandler = function( $scope, $ ) {
        $scope.find(".cms-accordion .cms-accordion-item .cms-ac-title").on("click", function(e){
            e.preventDefault();
            var target = $(this).data("target");
            var parent = $(this).parents(".cms-accordion");
            var active_items = parent.find(".cms-ac-title.active");
            $.each(active_items, function (index, item) {
                var item_target = $(item).data("target");
                if(item_target != target){
                    $(item).removeClass("active");
                    $(this).parent().removeClass("active");
                    $(item_target).slideUp(400);
                }
            });
            $(this).parent().toggleClass("active");
            $(this).toggleClass("active");
            $(target).slideToggle(400);
        });
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_accordion.default', WidgetCMSAccordionHandler );
    } );
} )( jQuery );