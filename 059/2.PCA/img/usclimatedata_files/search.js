// JavaScript Document
/* Zoeken ---------------------------------------------------- */
	jQuery(document).ready(function($) {
	
  $(".form-text").formDefaults({
  activeColor: '#000',
  inactiveColor: '#ccc' 
});

});
	jQuery(function() {
		
  jQuery("#searchfield").autocomplete({
	  html: true,
    source: function(request, response) {
		console.log("in");
		
      jQuery.ajax({
        url: "/php/search.php",
        type: "post",
        dataType: "json",
        data: {
          term: request.term
		          },
        success: function(data) {
		
          response(jQuery.map(data, function(item) {
            return {
                url: item.url,
                value: item.value
            }
          }))
        }
      })
    },	
    select: function( event, ui ) {	
	
	/* Link naar pagina */
      window.location.href = ui.item.url;
	  /* Verwijderen van HTML code */
	  $("ul.ui-autocomplete li a").each(function()
	  {
        var htmlString = $(searchfield).html().replace(/&lt;/g, '<');
        htmlString = htmlString.replace(/&gt;/g, '>');
        $(this).html(htmlString);
       });
       $(htmlString).html(ui.item.value);
    },
    minLength: 2
  });
});