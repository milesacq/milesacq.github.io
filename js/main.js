(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

})(jQuery);

//B722B2DF3D9D1CC7C19BBC81D410AD65D9FF
//D2294FE518B092703E0E62927723B34CE162
//ED0B17A1C2E380B92DE21B76DB37B8FA0E64
//esports password D293421B88C53E4CBE7DD3E76DBB3448B35F


function showUpcoming() {
	document.getElementById("newMenu").style.visibility = "hidden";
}

function openGame(year, name, people, tracklist, demolink, playlist) {
	sessionStorage.setItem("year", year);
	sessionStorage.setItem("name", name);
	// sessionStorage.setItem("people", year);
	// sessionStorage.setItem("tracklist", tracklist);
}
