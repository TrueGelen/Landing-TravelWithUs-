$(window).on('load', (function () {
	console.log("script from responsiveSection5 is working")

	function checkSize() {
		if (window.innerWidth <= 560) {
			let owl = $('.section5 .container .sec5_content').owlCarousel({
				loop: true,
				items: 1,
				margin: 0,
				responsiveClass: false,
				responsive: false,
				dotsClass: 'sec5dotsForOwl'
			})
			setTimeout(function () {
				owl.trigger('refresh.owl.carousel')
			}, 100)
		} else
			$('.section5 .container .sec5_content').trigger('destroy.owl.carousel');
	}

	$(window).resize(function () {
		checkSize()
	});

	checkSize()
}))