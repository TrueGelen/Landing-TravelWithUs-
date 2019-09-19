$(window).on('load', (function () {
	console.log("script from responsiveSection6 is working")

	function checkSize() {
		if (window.innerWidth <= 1100) {
			let owl = $('.section6 .container .section6_content').owlCarousel({
				loop: false,
				items: 3,
				margin: 10,
				dotsClass: 'sec6dotsForOwl',
				responsiveClass: true,
				responsive: {
					0: {
						items: 1
					},
					560: {
						items: 3
					}
				}
			})
			setTimeout(function () {
				owl.trigger('refresh.owl.carousel')
			}, 100)
		} else
			$('.section6 .container .section6_content').trigger('destroy.owl.carousel');
	}

	$(window).resize(function () {
		checkSize()
	});

	checkSize()
}))