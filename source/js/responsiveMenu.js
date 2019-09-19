$(window).on('load', (function () {
	console.log("script from responsiveMenu is working")

	let btn = $('header .container .headerTitleWrapper .headerBtn')
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
	});
}))