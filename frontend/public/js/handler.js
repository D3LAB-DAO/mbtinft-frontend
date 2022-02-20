$( ".left-balloon" ).hover(
    function() {
        $(this).find( ".set-like" ).css( "visibility", "visible" );
    }, function() {
        $(this).find( ".set-like" ).css( "visibility", "hidden" );
    }
);