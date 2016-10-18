'use strict';

// Set up Jquery clock plugin -- Flipclock.js (Get time)

// Get time from clock and store in variable (breakfast - lunch - dinner)

// Get value from check-box ( Allergies ) ( Diet restrictions )

// $Ajax call - Get information from Yummly API

// Print on html

// Print button -send to printer

// Add more function

// Light box for about content

var coolApp = {};

coolApp.appId = '9a82c4a1';

coolApp.appKey = 'd750f8a3c48c097b49c0082762f6a0ae';

var mealtime = '';

var allergy = [];

var diet = [];

var start = 1;

var recipeid = '';

var displayRecipes = [];

coolApp.init = function () {

	coolApp.gettime();
	coolApp.getinputs();
	coolApp.getMore();
	$('#button').on('click', function (e) {
		$('#about').fadeIn();
	});

	$('#overlay-close').on('click', function (e) {
		$('#about').fadeOut();
	});
};

coolApp.gettime = function () {
	//code to gather info on time and inputs
	// var currentTime = $.now();
	// console.log(currentTime);
	var dt = new Date();
	var time = dt.getHours();
	console.log(time);
	if (time < 5) {
		// console.log('works');
		mealtime = 'pub';
	} else if (time >= 5 && time < 11) {
		mealtime = 'breakfast';
	} else if (time >= 11 && time < 16) {
		mealtime = 'lunch';
	} else if (time >= 16) {
		mealtime = 'dinner';
	};
};

// coolApp.gettime();

coolApp.getinputs = function () {
	$('.whatToEat').submit(function (e) {
		$('#recipes').empty();
		allergy = [];
		e.preventDefault();
		$('.Allergies input:checked').each(function (i, event) {
			allergy.push(event.value);
		});

		allergy = allergy.join(' ');
		console.log(allergy);
		diet = [];
		$('.diet input:checked').each(function (i, event) {
			diet.push(event.value);
		});
		diet = diet.join(' ');
		console.log(diet);
		coolApp.getRecipe(allergy, diet);
		// coolApp.getMore(allergy, diet);
		// start = Math.floor(Math.random() * 10 + 1);
	});
};

// coolApp.getinputs();

coolApp.getRecipe = function (allergy, diet) {
	console.log(mealtime);
	// console.log(allergy, diet);
	start = Math.floor(Math.random() * 50);
	console.log(start);
	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes?_app_id=9a82c4a1&_app_key=d750f8a3c48c097b49c0082762f6a0ae',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			requirePictures: true,
			q: mealtime,
			'allowedAllergy[]': allergy,
			'allowedDiet[]': diet,
			maxResult: 3,
			start: start
		}

	}).then(function (res) {
		console.log(res);
		$.each(res.matches, function (i, object) {

			console.log(object);
			console.log(object.id);

			recipeid = object.id;
			$.ajax({
				url: 'http://api.yummly.com/v1/api/recipe/' + recipeid + '?_app_id=9a82c4a1&_app_key=d750f8a3c48c097b49c0082762f6a0ae',
				type: 'GET',
				dataType: 'jsonp'
			}).then(function (meal) {
				console.log(meal);
				var info = {};
				info.name = meal.name;
				info.time = meal.totalTime;
				info.rating = meal.rating;
				info.source = meal.source.sourceRecipeUrl;
				info.ingredient = meal.ingredientLines;
				info.image = meal.images[0].hostedLargeUrl;
				coolApp.displayRecipes(info);
			});
		});
	});
};

coolApp.getMore = function () {
	$('.more').on('click', function () {
		start = start + 3;
		console.log(start);
		coolApp.getRecipe(allergy, diet, start);
	});
};

coolApp.displayRecipes = function (info) {
	console.log(info);
	var recipeHtml = $('#recipeTemplate').html();
	var template = Handlebars.compile(recipeHtml);
	$('#recipes').append(template(info));

	// window.scrollTo(0, 420);

	// var location = $('body').scrollTop();
	// location += 900;
	// $('body').scrollTop(location);
	// console.log(location);
	setTimeout(function () {
		$('body,html').animate({
			scrollTop: document.body.scrollHeight
		}, 400);
	}, 200);

	$('.more').addClass('open');

	coolApp.clickToggle();
};

coolApp.clickToggle = function () {
	$('oneRecipe').click(function () {
		$('oneRecipe').toggleClass('hover');
	});
};

$(function () {
	coolApp.init();
});