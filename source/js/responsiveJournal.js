$(window).on('load', (function () {
	console.log("script from responsiveJournal is working")

	/* let arrOfJournalSingle = [...$('.section3 .container .WrapJournal .journalPair .journalPair_Single'), ...$('.section3 .container .WrapJournal .journalSingle')]
	console.log(arrOfJournalSingle) */

	let arrOfJournalSingle = $('.section3 .container .WrapJournal .journalPair')
	console.log($('.section3 .container .owl-carousel'))

	function checkSize() {
		console.log(this.innerWidth)
		if (window.innerWidth <= 560) {
			$('.section3 .container .owl-carousel').owlCarousel({
				loop: true,
				items: 1,
				margin: 0,
				responsiveClass: false,
				responsive: false
			})
		} else
			$('.section3 .container .owl-carousel').trigger('destroy.owl.carousel');
	}

	$(window).resize(function () {
		checkSize()
	});

	checkSize()
}))

/* let btn = $('header .container .headerTitleWrapper .headerBtn')
	let mobMenu = $('header .container .navWrapper .navMob')
	let nav = $('header .container .navWrapper .logoNavWrap .nav')

	mobMenu.click(function () {
		nav.fadeToggle(function () {
			if (nav.css('display') == 'flex') {
				console.log(nav.css('display'))
				btn.css('visibility', 'hidden')
			}

			else
				btn.css('visibility', 'visible')
		}).css('display', 'flex')
	})

	$(window).resize(function () {
		btn.css('visibility', 'visible')
		if (this.innerWidth > 960)
			nav.css('display', 'block')
		else
			nav.css('display', 'none')
	}); */