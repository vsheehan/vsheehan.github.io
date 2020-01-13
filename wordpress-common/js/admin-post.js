(function($) {
    function afterTitleMetaPlaceholder() {
        let that = this;
        this.$sortables = $('#after-title-sortables');
        this.$placeholder =$('<div>', { class: 'sortable-placeholder' }).css({ height: '100px' });

        $('.meta-box-sortables').on('sortstart', function(event, ui) {
            console.log( ui );

            that.$sortables.append( that.$placeholder );
        }).on('sortstop', function( event, ui ) {
            that.$placeholder.remove();
        });

    }
    afterTitleMetaPlaceholder();


})(jQuery);