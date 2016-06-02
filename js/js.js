$(document).ready(function($) {

	$('.js-select').selectric();
	//----------------SLIDER------------
	var SLIDE_WIDTH = parseInt($(".slider__viewport").css("width"));
	$(".slider__slide").width(SLIDE_WIDTH);
	var slideCount = $(".slider__slidewrapper").children().size();
	var sliderTimer;
	$(".slider__slidewrapper").width(slideCount*SLIDE_WIDTH);
	sliderTimer = setInterval(nextSlide, 3000);
	$(".slider__viewport").hover(function() {
		clearInterval(sliderTimer);
	}, function(){
		sliderTimer = setInterval(nextSlide, 3000);
	});
	$(".js-prev").click(function() {
		clearInterval(sliderTimer);
		prevSlide();
		sliderTimer = setInterval(nextSlide, 3000);
	});
	$(".js-next").click(function() {
		clearInterval(sliderTimer);
		nextSlide();
		sliderTimer = setInterval(nextSlide, 3000);
	});

	function nextSlide() {
		var currentSlide = parseInt($(".slider__slidewrapper").data("current"));
		currentSlide++;
		if (currentSlide >= slideCount) {
			$('.slider__slidewrapper').css('left',-(currentSlide-2)*SLIDE_WIDTH);
			$('.slider__slidewrapper').append($('.slider__slidewrapper').children().first().clone()); 
            $('.slider__slidewrapper').children().first().remove();
            currentSlide--;
		}
		$(".slider__slidewrapper").animate({left: -currentSlide*SLIDE_WIDTH}, 600).data("current", currentSlide);
	};

	function prevSlide() {
		var currentSlide = parseInt($(".slider__slidewrapper").data("current"));
		currentSlide--;
		if (currentSlide < 0) {
			$('.slider__slidewrapper').css('left',-(currentSlide+2)*SLIDE_WIDTH);
			$('.slider__slidewrapper').prepend($('.slider__slidewrapper').children().last().clone()); 
            $('.slider__slidewrapper').children().last().remove();
            currentSlide++;
		}
		$(".slider__slidewrapper").animate({left: -currentSlide*SLIDE_WIDTH}, 600).data("current", currentSlide);
	};


     //-------------------------ACCORDION--------------
     //---default
     $(".services__base:first").addClass("services__base_active");
     $(".services__base:first").find(".services__switcher").text("-");
     $(".services__base:first").next().css("display", "block");
     $(".progress-bar:first").css("display", "inline-block");


	$(".services__info").prev().click(function() {

		$(".services__info").not("this").slideUp();
		$(this).next().not(":visible").slideDown();
		$(this).toggleClass("services__base_active");
		if ($(this).hasClass("services__base_active")) {
			$(this).find(".services__switcher").text("-");
		} else {
			$(this).find(".services__switcher").text("+");
		}

		var indexTarget = $(this).parent().index(".services__toogle");
		if ($(".progress-bar:eq(" + indexTarget + ")").css("display") == "none") {

			$(".progress-bar:eq(" + indexTarget + ")").css("display", "inline-block");

		} else {
			$(".progress-bar:eq(" + indexTarget + ")").css("display", "none");
		}

		$(".progress-bar").not(".progress-bar:eq(" + indexTarget + ")").css("display", "none");
		$(".services__base").not(this).removeClass("services__base_active");
		$(".services__base").not(this).find(".services__switcher").text("+");
	});


	//----------------------Progress Bar----------
	var $progressBar = $(".progress-bar__item-filler");

	$progressBar.each(function(i, elem) {
		var barWidth = parseInt($(elem).find(".js-percent").text());
		$(elem).css("width", barWidth + "%");
	});

	
	$(".progress-bar__item").click(function(event) {
		var $pxWidth = $(this).width();
		var $posBar = $(this).offset().left;
		var $posClick = event.pageX;
		var $barWidth = ($posClick - $posBar) / $pxWidth * 100;
		$(this).find(".progress-bar__item-filler").animate({"width": $barWidth + "%"}, 400);
		$(this).find(".js-percent").text(Math.round($barWidth) + "%");
	});



	//-------------------CUSTOMER REVIEWS-----------
	var sizeReviews = $(".reviews__item").size();
	var countVisibleReviews ;


	$(".js-select").change(function() {
		if ($(this).val() == "all") {
		countVisibleReviews = sizeReviews;
		$(".reviews__switcher-box").css("display", "none");
	} else {
		countVisibleReviews = $(this).val();
		$(".reviews__switcher-box").css("display", "block");
	}

	$(".reviews__item").removeClass("reviews__item_state_visible");
	$(".reviews__switcher").removeClass("reviews__switcher_active");
	$(".reviews__switcher:first").addClass("reviews__switcher_active");
	$(".reviews__item:lt(" + countVisibleReviews + ")").addClass("reviews__item_state_visible");

	var sizeSwitcher = $(".reviews__switcher").size();
	if (sizeReviews/countVisibleReviews > sizeSwitcher) {
		for (var i = 0; i < Math.ceil(sizeReviews/countVisibleReviews) - sizeSwitcher; i++) {
			$(".reviews__switcher-box").append($(".reviews__switcher:first").clone().removeClass("reviews__switcher_active"));
		}
	} else if (Math.ceil(sizeReviews/countVisibleReviews) < sizeSwitcher) {
		for (var i = 0; i < sizeSwitcher - Math.ceil(sizeReviews/countVisibleReviews); i++) {
			$(".reviews__switcher:last").remove();
		}
	}
	});
	$(".js-select").trigger("change");

	var indexSwitcher;
	$(".reviews__switcher-box").delegate( ".reviews__switcher", "click", function() {
		$(".reviews__switcher").not(this).removeClass("reviews__switcher_active");
		$(this).addClass("reviews__switcher_active");

		indexSwitcher = $(this).index(".reviews__switcher");

		$(".reviews__item").removeClass("reviews__item_state_visible");
		for (var i = 0; i < countVisibleReviews; i++) {
			$(".reviews__item:eq(" + (countVisibleReviews*indexSwitcher+i) + ")").addClass("reviews__item_state_visible");
		}
	});



	//---------------------------WORKS_GALLERY---------------

	var COUNT_VISIBLE_WORKS = 6;
	var sizeWorksAll = $(".works__item").size();


	$(".works__filter:first").addClass("works__filter_active");
	$(".works__item:lt(" + COUNT_VISIBLE_WORKS + ")").css("display", "inline-block");
	$(".works__item:nth-child(3n)").css("margin-right", "0");

	var filterType = $(".works__filter_active").text();
	var sizeWorksFilter;
	var indexVisibleWork = COUNT_VISIBLE_WORKS;


	$(".works__arrow_next").click(function () {
		
		if ( filterType == "All") {

			if ( indexVisibleWork < sizeWorksAll ) {
				$(".works__item").fadeOut("fast");
				$(".works__item:gt(" + (indexVisibleWork-1) + "):lt(" + COUNT_VISIBLE_WORKS + ")").css("display", "inline-block").fadeIn("fast");
				indexVisibleWork += COUNT_VISIBLE_WORKS;
			}
		} else {
			if ( indexVisibleWork < sizeWorksFilter ) {
				
				$(".works__item").fadeOut("fast");
				$('.works__item[data-image-type="' + filterType + '"]:gt(' + (indexVisibleWork-1) + '):lt(' + COUNT_VISIBLE_WORKS + ')').css("display", "inline-block").fadeIn("fast");
				indexVisibleWork += COUNT_VISIBLE_WORKS;
			}
		}
		
	});

	$(".works__arrow_prev").click(function () {

		if ( filterType == "All") {

			if ( indexVisibleWork > COUNT_VISIBLE_WORKS ) {
				indexVisibleWork -= COUNT_VISIBLE_WORKS;
				$(".works__item").fadeOut("fast");
				$(".works__item:lt(" + indexVisibleWork + "):gt(" + ((-1 * COUNT_VISIBLE_WORKS) - 1) + ")").fadeIn("fast");
			}
		} else {
			if ( indexVisibleWork > COUNT_VISIBLE_WORKS ) {
				indexVisibleWork -= COUNT_VISIBLE_WORKS;
				$(".works__item").fadeOut("fast");
				$('.works__item[data-image-type="' + filterType + '"]:lt(' + indexVisibleWork + '):gt(' + ((-1 * COUNT_VISIBLE_WORKS) - 1) + ')').fadeIn("fast");
			}
		}
		
	});

	var typeImage;
	$(".works__filter").click(function() {
		$(".works__filter").removeClass("works__filter_active");
		$(this).addClass("works__filter_active");

		typeImage = $(this).text();
		filterType = typeImage;
		sizeWorksFilter = $('.works__item[data-image-type="' + filterType + '"]').size();
		indexVisibleWork = COUNT_VISIBLE_WORKS;

		 $(".works__item").css("margin-right", "25px");
		 $(".works__item").css("display", "none");

		 if ( filterType == "All") {
		 	$(".works__item:lt(" + COUNT_VISIBLE_WORKS + ")").css("display", "inline-block");
		 	$(".works__item:nth-child(3n)").css("margin-right", "0");

		 } else {
		 $('.works__item[data-image-type="' + filterType +'"]:lt(' + COUNT_VISIBLE_WORKS + ')').css("display", "inline-block");
		 $('[data-image-type="' + filterType + '"]').each(function(i) {
		 	if ( !((( 1 + (i+1)/3 )+"").indexOf(".") > 0) ) {	 
		 	 $(this).css("margin-right", "0");		
    		} 
		 });
		}
	});

//----------------------------GALLERY-ZOOM-----------------------
	$(".works__btn_type_zoom").click( function() {
		var path = $(this).parents(".works__image").css("backgroundImage");
		var imagesPos = path.indexOf("images");
		path = path.slice(imagesPos, -2);

		$(".featherlight__image").css("height", "1%");

		$(".featherlight").css("display", "block");
		$(".featherlight__image").attr("src", path);
		$(".featherlight__content").animate({"opacity": "1"}, 400);

		var imageHeight = $(".featherlight__image").height();
		var contentHeight = $(".featherlight__content").height();
		
		if ( imageHeight > contentHeight ) {
			$(".featherlight__image").css("height", contentHeight +"");
		} 

		return false;
	});

	$(".featherlight").click(function(event) {
		if ($(event.target).hasClass("featherlight")) {
			$(this).css("display", "none");
			$(".featherlight__content").css("opacity", "0");
		}
	});

	$(".featherlight__close").click(function() {
		$(this).parents(".featherlight").css("display", "none");
		$(".featherlight__content").css("opacity", "0");
	});
});