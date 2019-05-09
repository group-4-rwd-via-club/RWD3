/*globals $:false, window:false, document:false */

// Start animations upon load
$(document).ready(function () {
	animateRandom('#fish1Id', false);
	animateRandom('#fish2Id', false);
	onHover('#fish2Id');
	animateBubbles('#bubble1Id');
	animateBubbles('#bubble2Id');
	animateBubbles('#bubble3Id'); 
    $('#bubble4Id').hide();
	dblclickfish('#fish1Id');
});




/// OBJECT: THREE BUBBLES
/// Behavior: Each bubble moves into the view of the aquarium from the 
/// bottom of the screen and exits in the top. 
/// When a bubble moves out of view in the top it will enter anew in 
/// the bottom. Where it will enter will be random. 
/// In addition, when you click on a bubble, it will disappear 
/// in a fading manner, but will immediately after reappear 
/// at a random entry point in the bottom of the screen.

var bubbleAnimationTime = 10000;

function animateBubbles(itemId) {
    
	var sw = getRandomStartPosBottom(itemId);
	var sh = $(window).height();
	$(itemId).offset({
		top: sh,
		left: sw
	})
	$(itemId).animate({
		top: -100
	}, bubbleAnimationTime, function () {
		//rerun the animation
		animateBubbles(itemId);
	}).click(function () {
		// stop animations and start fadeout
		$(itemId).stop();
		$(itemId).fadeOut(400, function () {
			// make sure every animation is stopped before contineuing 
			// this removes a ms delay in the animation
			$(itemId).stop(true);
			// make sure it is faded in again before start
			$(itemId).fadeIn(1);
			animateBubbles(itemId);
		});


	});
}



function getRandomStartPosBottom(itemId) {
	var offsetW = $(itemId).innerWidth();
	var w = $(window).width() - offsetW;
	var nw = Math.floor(Math.random() * w);
	return nw;
}


/// OBJECT: BOTH FISH
/// Behavior: When a fish is not otherwise being interacted with,
/// it will slowly move around in random directions on its own. 
/// It will never move outside of the aquarium view though.



// Returns random position within window screen minus
// items height and width.
function moveToRandomPosition(dx, dy) {

	// dx dy makes sure items move within screen window
	var h = $(window).height() - dy;
	var w = $(window).width() - dx;

	var nh = Math.floor(Math.random() * h);
	var nw = Math.floor(Math.random() * w);

	return [nh, nw];

}
// variable to set movespeed of the fish
var fishMovementTime = 10000;
// Randomly moves the item
function animateRandom(itemId, fast) {

	var fishSpeed = fishMovementTime;
	if (fast) {
		fishSpeed = 500;
	}
	// get items height and width.
	var x = $(itemId).innerWidth();
	var y = $(itemId).innerHeight();
	// get random pos as x,y array.
	var newPos = moveToRandomPosition(x, y);
	$(itemId).animate({
		top: newPos[0],
		left: newPos[1]
	}, fishSpeed, function () {
		//rerun the animation
		animateRandom(itemId, false);
	});

}

function onHover(itemId) {
	$(itemId).mouseover(function () {
		$(itemId).stop(true);
		animateRandom(itemId, true);


	})
}

//orange fish
 

function dblclickfish(itemId) {
	var img = $(itemId);

	$(img).dblclick(function () {
		img.animate({"height": "400px", "width": "400px"});
		setTimeout(function () {
			img.animate({
				"height":"250px","width":"250px"
			});
		}, 690);
	})
}
$(document).click(function (event) {
    $("#fish1Id").stop(true);
    $("#fish1Id").animate({left: event.pageX - 100, top: event.pageY - 100}, 700, function() {
		animateRandom('#fish1Id', false);
	});
    smallBubble();
});

//orange fish double click zoom(JH)
//$("#fish1Id").dblclick(function () {
//	
//    $(this).stop(true).animate({width: 400, height: 400}, 2500, function () {
//			$(this).animate({width: 250, height: 250}, 2500, function() {
//				animateRandom('#fish1Id', false);
//			});
//		// perhaps setTimeout can be used? google it
//	});
//
//
//}); 

// double click event fish1
//function dblclickfish(itemId) {
//	
//	// stop all current animations and animate width, height
//    $(this).stop(true).animate({width: 400, height: 400});
//	// set a timer for 2500 ms.
//	
//    setTimeout(function () {   
//		$(itemId).animate({width: 250, height: 250}, 500);		
//    }, 2500);
//	
//};

/*
/// HUGH

// NOTE: Still working on animate small Bubbles

// add to document at top of script
	animateSmlBubble('#smlBubbleClass', 0);
    animateSmlBubble('#smlBubbleClass', 1);
    animateSmlBubble('#smlBubbleClass', 2);
    animateSmlBubble('#smlBubbleClass', 3);
// !! OR INSTEAD !!
//not sure if will work, cannot test until function complete
	for (i = 0; i < 4 ; i++) {
		animateSmlBubble('#smlBubbleClass', i);
	}

/// OBJECT: SMALL BUBBLES
var smlBubbleSpeed = animateBubbles 
+ Math.floor((Math.random() - 0.5) * animateBubbles * 0.5);

function animateSmlBubble(itemClass, quarterIndex){
    var sw = getQuarterRSPB(itemClass, q);
    var sh = $(window).height();
    // section will create 4 bubbles randomly each
    for (i = 0; i < 4 ; i++) {
    	$(itemClass).offset({top: sh, left sw})
    $(itemId).delay(100 * Math.random()).animate({
    	top: -100}, smlBubbleSpeed, )
    }
}

function getQuarterRSPB(itemClass, quarterIndex) {
    var offsetW = $(itemClass).innerWidth();
    var qw = Math.floor($(window).width() * 0.25);
    var nw = (qw * quarterIndex) + Math.floor(Math.random() * (qw - offsetW));
    return nw;
*/
// Orange fish bobble 
function smallBubble (){
   $("#bubble4Id").width(25).height(25).stop(true).stop(false).offset({top: $("#fish1Id").position().top + 100, left: $("#fish1Id").position().left + 50 }).fadeIn().animate({top: -100}, bubbleAnimationTime);
}
