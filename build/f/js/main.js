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
		questionsControl: {
			slidesPerView: 'auto',
			spaceBetween: 48,
			simulateTouch: false,
			breakpoints: {
				939: {
					simulateTouch: true,
					scrollbarHide: true,
					slidesPerView: 'auto',
					spaceBetween: 20,
				}
			}
		}
	},
	slider: {
		sliderBoxLk: null,
		sliderTraining: null,
		sliderProperNutrition: null,
		sliderParticipantsProject: null,
		sliderPersonalAccountBlockSlider: null,
		sliderBoxBuy: null,
		questionsControl: null
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
		questionsControl: function(){
			sliders.slider.questionsControl = new Swiper('.js-questions-control', sliders.settings.questionsControl);
		},
		init: function(){
			this.sliderBoxLk();
			this.sliderTraining();
			this.sliderProperNutrition();
			this.sliderParticipantsProject();
			this.sliderPersonalAccountBlockSlider();
			this.sliderBoxBuy();
			this.questionsControl();
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
		$('.js-more-text').on('click', allEvents.more);
		$('.js-landing-player').on('click', allEvents.playVideo);
		$('.js-hint').on('click', allEvents.hint);
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
	playVideo: function(){
		var self = $(this);
		var sFind = self.next().find('.player__frame');
		var sData = sFind.data('video');
		self.hide();
		sFind.attr('src', sData);
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
	more: function(){
		var self = $(this);
		var parents = self.parents('.questions-and-answers-answer');
		var pTop = parents.offset().top;
		$('html, body').animate({
			scrollTop: pTop
		});
		parents.css({
			'max-height': 'none'
		});
		self.hide();
	},
	hint: function(){
		var self = $(this);
		if(self.hasClass('is-active')){
			$('.rates__text_icon').removeClass('is-active');
			$('.rates__hint').hide();
		}else{
			$('.rates__text_icon').removeClass('is-active');
			$('.rates__hint').hide();
			self.addClass('is-active');
			self.find('.rates__hint').show();
		}
	},
	documentClick: function(){
		$(document).on('click', function(e){
			if($(e.target).hasClass('js-hint') || $(e.target).parents('.js-hint').length){
				return true;
			}
			$('.rates__text_icon').removeClass('is-active');
			$('.rates__hint').hide();
		});
		
	},
	init: function(){
		this.handler();
		this.menuFixed();
		this.documentClick();
	}
}

$(function(){
	sliders.init();
	allEvents.init();
	$(".js-select").select2({
		placeholder: "Способ оплаты:",
	});

	$(".js-select").on('select2:open', function (evt) {
		$('.select2-results__message').text('Не найдено');
		$('.select2-search__field').attr('placeholder', 'Моментальный поиск');
	});
});
