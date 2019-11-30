window.addEventListener('load', function () {

	//getting link elements
	let navLinks = window.document.querySelectorAll('header .container .header__navWrap .header__logoAndMenuWrap .navigation .navigation__link')
	let btnorderNow = window.document.querySelector('header .container .header__contentWrap .header__mainBtn')
	let links = [...navLinks, btnorderNow]

	//get id then get element to which we need to go and set listeners on click
	links.forEach(item => {
		let id = item.getAttribute('href').replace('#', '')
		let elem = document.querySelector(`#${id}`)
		item.addEventListener('click', function (e) {
			e.preventDefault()
			elem.scrollIntoView({
				behavior: "smooth",
				block: "start"
			})
		})
	})
})