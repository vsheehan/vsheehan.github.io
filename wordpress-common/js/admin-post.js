(function($) {
    function afterTitleMetaPlaceholder() {
        let that = this;
        this.$sortables = $('#after-title-sortables');
        this.$placeholder = $('<span>', { class: 'after-title-helper' }).html('&nbsp;');
        this.$wpSortable = $('.meta-box-sortables');

        this.$sortables.prepend( this.$placeholder );
        this.$wpSortable.on('sortstart', function(event, ui) {
            console.log( 'start' );
            that.$sortables.toggleClass( 'sorting', true );

        }).on('sortstop', function( event, ui ) {
            that.$sortables.toggleClass( 'sorting', false );
            if ( ! that.$sortables.find( '.postbox:visible' ).length ) {
                that.$sortables.toggleClass( 'empty', true );
            } else {
                that.$sortables.toggleClass('empty', false);
            }
        });

    }
    afterTitleMetaPlaceholder();


})(jQuery);