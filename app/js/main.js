var serviceInformation = null;
var wind = $(window);
var sliders = null;
var allEvents = null;

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
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 12,
			//loop: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		},
		sliderTraining: {
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 14,
			//loop: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		},
		sliderProperNutrition: {
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 36,
			//loop: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		},
		sliderParticipantsProject: {
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 36,
			initialSlide: 1,
			//loop: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		},
		sliderPersonalAccountBlockSlider: {
			centeredSlides: true,
			spaceBetween: 0,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		}
	},
	slider: {
		sliderBoxLk: null,
		sliderTraining: null,
		sliderProperNutrition: null,
		sliderParticipantsProject: null,
		sliderPersonalAccountBlockSlider: null
	},
	call: {
		sliderBoxLk: function(){
			sliders.slider.sliderBoxLk = new Swiper('.js-yourself-box-lk', sliders.settings.sliderBoxLk);
		},
		sliderTraining: function(){
			sliders.slider.sliderTraining = new Swiper('.js-yourself-box-training', sliders.settings.sliderTraining);
		},
		sliderProperNutrition: function(){
			sliders.slider.sliderProperNutrition = new Swiper('.js-yourself-box-proper-nutrition', sliders.settings.sliderProperNutrition);
		},
		sliderParticipantsProject: function(){
			sliders.slider.sliderParticipantsProject = new Swiper('.js-yourself-box-participants-project', sliders.settings.sliderParticipantsProject);
		},
		sliderPersonalAccountBlockSlider: function(){
			sliders.slider.sliderPersonalAccountBlockSlider = new Swiper('.js-personal-account-block-slider', sliders.settings.sliderPersonalAccountBlockSlider);
		},
		init: function(){
			this.sliderBoxLk();
			this.sliderTraining();
			this.sliderProperNutrition();
			this.sliderParticipantsProject();
			this.sliderPersonalAccountBlockSlider();
		}
	},
	init: function(){
		this.call.init();
	}
}

allEvents = {
	handler: function(){
		$('[data-scroll]').on('click', allEvents.scrooTo);
	},
	scrooTo: function(){
		var self = $(this);
		var sData = self.data('scroll');
		var topTo = $('[data-scroll-to=' + sData + ']').offset().top;
		$('html, body').animate({
			scrollTop: topTo
		});
	},
	menuFixed: function(){
		$(window).scroll(function(){
			if($(window).scrollTop() > serviceInformation.getWindowHeight() / 2){
				$('.js-menu-fixed').addClass('is-active');
			}else{
				$('.js-menu-fixed').removeClass('is-active');
			}
		});
	},
	init: function(){
		this.handler();
		this.menuFixed();
	}
}

$(function(){
	sliders.init();
	allEvents.init();
});
