$(window).on('load', (function () {
	console.log("script from responsiveGallery is working")

	function checkSize() {
		if (window.innerWidth <= 780) {
			let owl = $('.section7 .container .section7_content').owlCarousel({
				loop: false,
				items: 3,
				margin: 10,
				dotsClass: 'sec7dotsForOwl',
				responsiveClass: true,
				responsive: {
					0: {
						items: 1,
						dots: true
					},
					560: {
						items: 1,
						dots: true,
						nav: false
					}
				}
			})
			setTimeout(function () {
				owl.trigger('refresh.owl.carousel')
			}, 100)
		} else
			$('.section7 .container .section7_content').trigger('destroy.owl.carousel');
	}

	$(window).resize(function () {
		checkSize()
	});

	checkSize()
}))