(function($) {
    function afterTitleMetaPlaceholder() {
        let that = this;
        this.$sortables = $('#after-title-sortables');
        this.$placeholder =$('<div>', { class: 'postbox' }).css({ height: '100px', background: 'transparent', border: '1px dashed #b4b9be', });
        this.$wpSortable = $('.meta-box-sortables');
        if ( ! this.$sortables.find( '.postbox' ).length ) {
            this.$wpSortable.on('sortstart', function(event, ui) {
                that.$sortables.append( that.$placeholder );
            })
        }

        this.$wpSortable.on('sortstop', function( event, ui ) {
            that.$placeholder.remove();
        });

    }
    afterTitleMetaPlaceholder();


})(jQuery);