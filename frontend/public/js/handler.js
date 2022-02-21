// temp handler for lorem ipsum initial msg
$( ".left-balloon" ).hover(
    function() {
        $(this).find( ".set-like" ).css( "visibility", "visible" );
    }, function() {
        $(this).find( ".set-like" ).css( "visibility", "hidden" );
    }
);