(function($) {
    function afterTitleMetaPlaceholder() {
        let that = this;
        this.$sortables = $('#after-title-sortables');
        this.$placeholder =$('<div>', { class: 'postbox' }).css({ height: '100px', background: 'transparent', border: '1px dashed #b4b9be', });
        this.$wpSortable = $('.meta-box-sortables');

        this.$wpSortable.on('sortstart', function(event, ui) {
            if ( ! this.$sortables.find( '.postbox' ).length ) {
                that.$sortables.append(that.$placeholder);
            }
        }).on('sortstop', function( event, ui ) {
            that.$placeholder.remove();
        });

    }
    afterTitleMetaPlaceholder();


})(jQuery);