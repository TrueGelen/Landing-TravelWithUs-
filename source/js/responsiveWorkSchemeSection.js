$(window).on('load', (function () {
	console.log("script from responsiveSection5 is working")

	function checkSize() {
		if (window.innerWidth <= 560) {
			let owl = $('.workSchemeSection .container .workSchemeSection__scheme').owlCarousel({
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
			$('.workSchemeSection .container .workSchemeSection__scheme').trigger('destroy.owl.carousel');
	}

	$(window).resize(function () {
		checkSize()
	});

	checkSize()
}))