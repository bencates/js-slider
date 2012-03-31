"use strict";

window.Slider = function(slider, controls, options) {
    var buttons, i, data, self = this;
    
    this.slider = document.getElementById(slider || 'slider');
    this.controls = document.getElementById(controls || 'controls');
    this.slides = this.slider.getElementsByClassName('slide');
    
    this.options = {
        width   : 600,
        initial : 0
    };
    
    for (key in (options || {})) {
        this.options[key] = options[key];
    }
    
    if (!this.options.size) {
        this.options.size = this.slides.length;
    }
    
    buttons = this.controls.getElementsByTagName('button');
    for (i = 0; i < buttons.length; i++) {
        data = buttons[i].dataset || {};
        
        if (data.sliderTarget) {
            data.sliderAction = 'moveTo';
        }
        
        if (data.sliderAction) {
            buttons[i].addEventListener('click', function(event) {
                var data = event.currentTarget.dataset;
                self[data.sliderAction](+data.sliderTarget);
            });
        }
    }
    
    this.moveTo(this.options.initial);
};

window.Slider.prototype = {
    prev : function () {
        this.moveTo(this.current-1);
    },
    
    next : function () {
        this.moveTo(this.current+1);
    },
    
    moveTo : function (target) {
        if (target >= 0 && target < this.options.size) {
            this.current = target;
            this.slider.scrollLeft = this.options.width * this.current;
        }
    }
};

window.addEventListener('DOMContentLoaded', function() {
    var slider = new Slider();
});
