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
			initialSlide: 2,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
		},
		sliderTraining: {
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 14,
			initialSlide: 1,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		},
		sliderProperNutrition: {
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 36,
			initialSlide: 1,
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
			pagination: '.swiper-pagination',
			paginationClickable: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		},
		sliderPersonalAccountBlockSlider: {
			spaceBetween: 0,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			nextButton: '.swiper-button-next-box-buy',
			prevButton: '.swiper-button-prev-box-buy',
			onSlideChangeEnd: function(swiper){
				var activeIndex = swiper.activeIndex;
				$('.personal-account-block-content__item').removeClass('is-active');
				$('.personal-account-block-content__item').eq(activeIndex).addClass('is-active');
			}
		},
		sliderBoxBuy: {
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			initialSlide: 2,
			simulateTouch: false,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			breakpoints: {
				initialSlide: 2,
				simulateTouch: true
			}
		},
	},
	slider: {
		sliderBoxLk: null,
		sliderTraining: null,
		sliderProperNutrition: null,
		sliderParticipantsProject: null,
		sliderPersonalAccountBlockSlider: null,
		sliderBoxBuy: null
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
		sliderBoxBuy: function(){
			sliders.slider.sliderBoxBuy = new Swiper('.js-yourself-box-buy', sliders.settings.sliderBoxBuy);
		},
		init: function(){
			this.sliderBoxLk();
			this.sliderTraining();
			this.sliderProperNutrition();
			this.sliderParticipantsProject();
			this.sliderPersonalAccountBlockSlider();
			this.sliderBoxBuy();
		}
	},
	init: function(){
		this.call.init();
	}
}

allEvents = {
	handler: function(){
		$('[data-scroll]').on('click', allEvents.scrooTo);
		$('[data-switch]').on('click', allEvents.switcher);
		$('.js-burger').on('click', allEvents.mobileMenu);
		$('[data-rates]').on('click', allEvents.popUpRates);
	},
	scrooTo: function(){
		var self = $(this);
		var sData = self.data('scroll');
		var topTo = $('[data-scroll-to=' + sData + ']').offset().top;
		if(self.parents('.js-mobile-menu').length){
			allEvents.closeMobileMenu();
		}
		if(sData == 'page-top'){
			$('html, body').animate({
				scrollTop: topTo
			});
		}
		$('html, body').animate({
			scrollTop: topTo - $('.menu-fixed').outerHeight(true)
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
	addRemoveClass: function(remove, add, name){
		remove.removeClass(name);
		add.addClass(name);
	},
	switcher: function(){
		var self = $(this);
		var sData = self.data('switch');
		allEvents.addRemoveClass($('[data-switch-to]'), $('[data-switch-to=' + sData + ']'), 'is-active');
		allEvents.addRemoveClass($('[data-switch]'), self, 'is-active');
	},
	mobileMenu: function(){
		var self = $(this);
		if(self.hasClass('is-active')){
			allEvents.closeMobileMenu();
		}else{
			allEvents.openMobileMenu();
		}
	},
	openMobileMenu: function(){
		$('.js-burger').addClass('is-active');
		$('html, body').addClass('is-hidden');
		$('.mobile-menu').show();
		$('body').addClass('is-menu-open');
	},
	closeMobileMenu: function(){
		$('.js-burger').removeClass('is-active');
		$('html, body').removeClass('is-hidden');
		$('.mobile-menu').hide();
		$('.pop-up').hide();
		$('body').removeClass('is-menu-open');
	},
	openPopUp: function(){
		$('.js-burger').addClass('is-active');
		$('html, body').addClass('is-hidden');
		$('body').addClass('is-menu-open');
		$('.pop-up').show();
	},
	popUpRates: function(){
		var self = $(this);
		var sData = self.data('rates');
		$('[data-rates-to]').hide();
		$('[data-rates-to=' + sData + ']').show();
		allEvents.openPopUp();
		$('.pop-up__inner').scrollTop(0);
	},
	init: function(){
		this.handler();
		this.menuFixed();
	}
}

// (data-rates="rates-1") (data-rates-to="rates-1")

$(function(){
	sliders.init();
	allEvents.init();
	$(".chosen-select").chosen({no_results_text: "Не найдено"});
	$('.chosen-search input').attr('placeholder', 'Моментальный поиск')
});
