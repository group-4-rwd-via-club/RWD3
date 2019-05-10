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
    var size = getRandomBubbleSize(95, 5);
    var sw = getRandomStartPosBottom(itemId);
    var sh = $(window).height();
    $(itemId).offset({
        top: sh
        , left: sw
    })
    $(itemId).height(size).width(size).animate({
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

function getRandomBubbleSize(maxSize, minSize) {
    var size = Math.floor(Math.random() * maxSize) + minSize;
    return size;
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
        top: newPos[0]
        , left: newPos[1]
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
        img.animate({
            "height": "400px"
            , "width": "400px"
        });
        setTimeout(function () {
            img.animate({
                "height": "250px"
                , "width": "250px"
            });
        }, 690);
    })
}
$(document).click(function (event) {
    $("#fish1Id").stop(true);
    $("#fish1Id").animate({
        left: event.pageX - 100
        , top: event.pageY - 100
    }, 700, function () {
        animateRandom('#fish1Id', false);
    });
    smallBubble();
});
// Orange fish bobble 
function smallBubble() {
    var size = getRandomBubbleSize(25, 10);
    $("#bubble4Id").width(size).height(size).stop(true).stop(false).offset({
        top: $("#fish1Id").position().top + 100
        , left: $("#fish1Id").position().left + 50
    }).fadeIn().animate({
        top: -100
    }, bubbleAnimationTime);
}