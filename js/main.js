function resizingStuff() {
	//var navigationHeight = $('nav').height();
	//$('body').css('padding-top', navigationHeight);
	var pageHeight = $(window).height();
	//var panelHeight = pageHeight - navigationHeight;
	$('.wrapper').css('height', pageHeight);
}
function randRange (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var colors = [
'#4b727f',
'#7da3ac',
'#444444',
'#594e70',
'#6c6b6b',
'#9c89ba',
'#00a2a0',
'#a5478e'
];

function resetColors(){
	for ( var i = 0; i < 6; i++ ) {
		colorPicks[i] = 'none';
	}
}
var colorPicks = [];
resetColors();

function makeBlock() {
	var n = randRange(0,colorPicks.length-1);
	var c = colorPicks[n];
	var block = '<div class="block" style="background: ' + c + '"></div>';
	colorPicks.splice(n,1);
	return block;
}

function buildRow(nb) {
	var row = '<div class="pixel-row group">';
	for(var i = 0; i < nb; i++){
		row += makeBlock();
	}
	row += '</div>';
	$('div.pixels').append(row);
}

function makeRow(nb) {
	resetColors();
	for(var ii = 0; ii < nb; ii++){
		var n = randRange(0, colors.length-1);
		colorPicks[ii] = colors[n];
	}
	buildRow(6);
}
function identInit(){
	if ( $('section.ident') ) {
		for ( var i = 0; i < 5; i++ ) {
			if ( i === 0 ) {
				makeRow(5);
			}
			if ( i === 1 ) {
				makeRow(5);
			}
			if ( i === 2 ) {
				makeRow(4);
			}
			if ( i === 3 ) {
				makeRow(2);
			}
			if ( i === 4 ) {
				makeRow(1);
			}
		}
	}
}

// Element Centering
(function($){
	$.fn.extend({
		center: function () {
			return this.each(function() {
				var top = ($(window).height() - $(this).outerHeight()) / 2.5 ;
				var left = ($(window).width() - $(this).outerWidth()) / 2;
				$(this).css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
			});
		}
	});
})(jQuery);
function centerSummary(){
	$('.summary').css({
		position:'absolute',
		left: ($(window).width() - $('.summary').outerWidth())/2,
		top: ($(window).height() - $('.summary').outerHeight())/2
	});
}
(function ($) {
$.fn.vAlign = function() {
	return this.each(function(i){
		$(this).children().wrapAll('<div class="nitinh-vAlign" style="position:relative;"></div>');
		var div = $(this).children('div.nitinh-vAlign');
		var ph = $(this).innerHeight();
		var dh = div.height();
		var mh = (ph - dh) / 2;
		div.css('top', mh);
	});
};
})(jQuery);

function weather(){
	$.getJSON(
		'http://api.wunderground.com/api/596362d58571f6b2/geolookup/conditions/q/autoip.json?callback=?',
		function(parsed_json) {
			var location = parsed_json.location.city;
			var temp_c = parsed_json.current_observation.temp_c;
			$('body').append("<p>" + location + " - " + temp_c + "&deg;C</p>");
		}
	);
}
function tube(){
	$.get(
	'http://cloud.tfl.gov.uk/TrackerNet/LineStatus',
	function(d){
		$(d).find('LineStatus').each(
			function(){
				var line = $(this);
				var name = line.find('Line').attr('Name');
				var status = line.find('Status').attr('Description');
				var css = line.find('Status').attr('CssClass');
				
				if(name === 'Northern'){
					//var s = name + ' ' + status;
					var ln = name + ' Line';
					$('div.tube div.line-name').html(ln);
					$('div.tube div.status').html(status).addClass(css);
				}
			}
			);
	}
	);
}
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results===null){
		return null;
	}else{
		return results[1] || 0;
	}
};
function welcome(){
	if($.urlParam('client')){
		var c = decodeURIComponent($.urlParam('client'));
		var welcomeString = '<div class="preface">Welcome</div><p>' + c + '</p>';
	} else {
		var welcomeString = '<p>Welcome</p>';
	}
	
	$('div.welcome').html(welcomeString);
}
function initInfoboard(){
	//weather();
	welcome();
	tube();
}
$(function() {
	resizingStuff();
	//$('.container').center(true);
	//$('.summary').vAlign();
	//centerSummary();
	identInit();
	initInfoboard();
	$('div.temp').bigtext(
		{
			childSelector: '> p'
		}
	);
	WebFont.load({
		custom: {
			families: ['MeteoconsRegular', 'novecento_widelight'], // font-family name
			urls : ['css/style.css'] // URL to css
		},
		active: function() {
			$('div.icon').bigtext(
				{
					childSelector: '> p'
				}
			);
			$('div.temp').bigtext(
				{
					childSelector: '> p'
				}
			);
		}
	});
});

/* TODO: Display results */
/* TODO: Condition as font icon */
/* TODO: Condition description */

/*
) Unknown	unknown	
B Clear	clear	
B Mostly Sunny	mostlysunny	
B Sunny	sunny	

E Fog	fog	

H Partly Cloudy	partlycloudy	
H Partly Sunny	partlysunny	
H Scattered Clouds	partlycloudy

J Haze	hazy	

N Cloudy	cloudy	
N Mostly Cloudy	mostlycloudy	
N Overcast	cloudy	

P Chance of a Thunderstorm	chancetstorms	
P Chance of Thunderstorms	chancetstorms	
P Thunderstorm	tstorms	
P Thunderstorms	tstorms	

Q Chance of Rain	chancerain	

R Rain	rain	

U Chance of Flurries	chanceflurries	
U Flurries	flurries	

W Chance of Snow	chancesnow	
W Snow	snow	

X Chance of Freezing Rain	chancesleet	
X Chance of Sleet	chancesleet	
X Freezing Rain	sleet	
X Sleet	sleet	
*/