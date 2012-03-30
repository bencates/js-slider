"use strict";

var current = 0;

function slidePrev () {
    slideTo(current-1);
}

function slideNext () {
    slideTo(current+1);
}

function slideTo (target) {
    if (target >= 0 && target < 3) {
        current = target;
        document.getElementById('slider').scrollLeft = 600 * current;
    }
}
