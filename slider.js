"use strict";

window.Slider = function(slider, controls, options) {
    var div, buttons, i, data;
    
    this.slider = document.getElementById(slider || 'slider');
    this.slides = this.slider.getElementsByClassName('slide');
    
    this.options = {
        width   : 600,
        height  : 400,
        initial : 0
    };
    
    for (key in (options || {})) {
        this.options[key] = options[key];
    }
    
    if (!this.options.size) {
        this.options.size = this.slides.length;
    }
    
    this.setupSlider();
    this.makeControls(controls || 'controls');
    
    this.current = 0;
    this.moveTo(this.options.initial);
};

window.Slider.prototype = {
    setupSlider : function () {
        var div, slide, i;
        
        div = document.createElement('div');
        while (this.slider.firstChild) {
            slide = this.slider.removeChild(this.slider.firstChild);
            if (slide.className && ~slide.className.indexOf('slide')) {
                div.appendChild(slide);
            }
        }
        this.slider.appendChild(div);
        
        this.slider.style.width = this.options.width + 'px';
        this.slider.style.height = this.options.height + 'px';
        this.slider.style.overflow = 'hidden';
        
        div.style.width = (this.options.width * this.options.size) + 'px';
        div.style.height = this.options.height + 'px';
        
        for (i = 0; i < this.slides.length; i++) {
            this.slides[i].style.width = this.options.width + 'px';
            this.slides[i].style.height = this.options.height + 'px';
            this.slides[i].style.cssFloat = 'left';
        }
    },
    
    makeControls : function(controls) {
        var button, buttons = [], i, self = this;
        
        this.controls = document.getElementById(controls);
        
        if (!this.controls) {
            this.controls = document.createElement('div');
            this.controls.id = controls;
            document.body.insertBefore(this.controls, this.slider.nextSibling);
        }
        
        button = document.createElement('button');
        button.innerHTML = '&larr;';
        this.controls.appendChild(button);
        button.addEventListener('click', function(event) {
            self.prev();
        });
        
        for (i = 0; i < this.slides.length; i++) {
            button = document.createElement('button');
            button.appendChild(document.createTextNode(i+1));
            button.dataset.sliderTarget = i;
            this.controls.appendChild(button);
            button.addEventListener('click', function(event) {
                var data = event.currentTarget.dataset;
                self.moveTo(+data.sliderTarget);
            });
        }
        
        button = document.createElement('button');
        button.innerHTML = '&rarr;';
        this.controls.appendChild(button);
        button.addEventListener('click', function(event) {
            self.next();
        });
    },
    
    prev : function () {
        this.moveTo(this.current-1);
    },
    
    next : function () {
        this.moveTo(this.current+1);
    },
    
    moveTo : function (target) {
        if (target != this.current && target >= 0 && target < this.options.size) {
            this.current = target;
            new SliderAnimation(this.slider, this.options.width * this.current);
        }
    }
};

window.SliderAnimation = function (target, endValue, duration, fps) {
    duration = duration || 1;
    fps = fps || 40;
    this.target = target;
    this.startValue = target.scrollLeft;
    this.offset = endValue - this.startValue;
    this.frame = 0;
    this.frameTime = 1000 / fps;
    this.frameCount = duration * fps;
    
    this.nextFrame();
};

window.SliderAnimation.prototype = {
    nextFrame : function () {
        this.frame++;
        this.target.scrollLeft = this.getOffset();
        
        var self = this;
        if (this.frame !== this.frameCount) {
            setTimeout(function () {
                self.nextFrame();
            }, this.frameTime);
        }
    },
    
    getOffset : function () {
        var t = this.frame,
            b = this.startValue,
            c = this.offset,
            d = this.frameCount;
        
        // linear
        // return c*t/d + b
        
        // quadratic in/out
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
};

window.addEventListener('DOMContentLoaded', function() {
    var slider = new Slider();
});
