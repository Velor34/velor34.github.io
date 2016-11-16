var serviceInformation = null;
var wind = $(window);
var sliders = null;

function echo(){
	console.log.apply(console, arguments);
}

serviceInformation = {
	getWindowWidth: function(){
		return $(window).width();
	},
	getWindowHeight: function(){
		return $(window).height();
	},
	getWindowScrollTop: function(){
		return $(window).scrollTop();
	},
}

sliders = {
	settings: {
		sliderBoxLk: {
			//effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			//slidesPerView: 5,
			spaceBetween: 30,
			loop: true,
			// coverflow: {
			// 	rotate: 50,
			// 	stretch: 0,
			// 	depth: 100,
			// 	modifier: 1,
			// 	slideShadows : true
			// }
		}
	},
	slider: {
		sliderBoxLk: null
	},
	call: {
		sliderBoxLk: function(){
			sliders.slider.sliderBoxLk = new Swiper('.js-yourself-box-lk', sliders.settings.sliderBoxLk);
		},
		init: function(){
			this.sliderBoxLk();
		}
	},
	init: function(){
		this.call.init();
	}
}

$(function(){
	sliders.init();
});
