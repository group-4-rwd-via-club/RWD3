/*globals $:false, window:false, document:false */

// Start animations upon load
$(document).ready(function(){
    animateRandom('#fish1Id', false);
    animateRandom('#fish2Id', false);
    onHover('#fish2Id');
    animateBubbles('#bubble1Id');
    animateBubbles('#bubble2Id');
    animateBubbles('#bubble3Id');
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
function animateBubbles(itemId){
    
    
    
    var sw = getRandomStartPosBottom(itemId);
    var sh = $(window).height();
    $(itemId).offset({top: sh, left: sw})
    $(itemId).animate({ top: -100}, bubbleAnimationTime,   function(){
        //rerun the animation
        animateBubbles(itemId);        
    }).click(function(){
        // stop animations and start fadeout
        $(itemId).stop();
        $(itemId).fadeOut(400, function(){
            // make sure every animation is stopped before contineuing 
            // this removes a ms delay in the animation
            $(itemId).stop(true);
            // make sure it is faded in again before start
            $(itemId).fadeIn(1);
            animateBubbles(itemId);
        });

        
    });
}



function getRandomStartPosBottom(itemId)
{
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
function moveToRandomPosition(dx, dy){
    
    // dx dy makes sure items move within screen window
    var h = $(window).height() - dy;
    var w = $(window).width() - dx;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}
// variable to set movespeed of the fish
var fishMovementTime = 10000;
// Randomly moves the item
function animateRandom(itemId, fast){

    var fishSpeed = fishMovementTime;
    if (fast){
        fishSpeed = 500;
    }
    // get items height and width.
    var x = $(itemId).innerWidth();
    var y = $(itemId).innerHeight();
    // get random pos as x,y array.
    var newPos = moveToRandomPosition(x,y);
    $(itemId).animate({ top: newPos[0], left: newPos[1] }, fishSpeed,   function(){
        //rerun the animation
        animateRandom(itemId, false);        
    });
    
}

function onHover(itemId){
    $(itemId).mouseover(function(){
        $(itemId).stop(true);
        animateRandom(itemId, true);

        
    })
}