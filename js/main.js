(function(){

    var $slides = [...document.querySelectorAll('.slide')]; 
    var currentSlide = 0;
    
    TweenLite.set($slides.filter(index => index > 0), {left:"960px"});    
    TweenLite.delayedCall(1, nextSlide);                

    function nextSlide(){                   
            TweenLite.to( $slides[currentSlide], 1, {left:"-960px"} );       
            
            if (currentSlide < $slides.length - 1) {
                currentSlide++;
            }
            else {
                currentSlide = 0;
            }
                                                
            TweenLite.fromTo( $slides[currentSlide], 1, {left: "960px"}, {left:"0px"} );
            TweenLite.delayedCall(4, nextSlide);                                
    }
    
})();
