"use strict";

window.Slider = {
    current : 0,
    
    prev : function () {
        this.moveTo(this.current-1);
    },
    
    next : function () {
        this.moveTo(this.current+1);
    },
    
    moveTo : function (target) {
        if (target >= 0 && target < 3) {
            this.current = target;
            document.getElementById('slider').scrollLeft = 600 * this.current;
        }
    }
};

window.addEventListener('DOMContentLoaded', function() {
    var buttons, i, data;
    
    buttons = document.getElementById('controls').getElementsByTagName('button');
    
    for (i = 0; i < buttons.length; i++) {
        data = buttons[i].dataset || {};
        
        if (data.sliderTarget) {
            data.sliderAction = 'moveTo';
        }
        
        if (data.sliderAction) {
            buttons[i].addEventListener('click', function(event) {
                var data = event.currentTarget.dataset;
                Slider[data.sliderAction](parseInt(data.sliderTarget, 10));
            });
        }
    }
});
