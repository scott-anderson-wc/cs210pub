var slideIndex = 1;   // why not zero based?

function showSlides(n) {
    var $slides = $(".slideshow-container figure");
    if( n > $slides.length ) {
        slideIndex = 1;
    }
    if( n < 1 ) {
        slideIndex = $slides.length;
    }
    // done with n; use slideIndex from now on
    $slides.hide();
    console.log($slides.length+" slides; showing slide "+slideIndex);
    $($slides[slideIndex-1]).one().removeClass("mySlides").show();
    var $dots = $("#dots .dot");
    $dots.removeClass("active");
    $($dots[slideIndex-1]).one().addClass("active");
}
    

function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

function nextSlide() {
    plusSlides(1);
}

function prevSlide() {
    plusSlides(-1);
}

// ================================================================

function makeSlides(descriptions) {
    var n = descriptions.length;
    var cont = $(".slideshow-container").one();
    var dots = $("#dots").one();
    descriptions.forEach(function (elt, index) {
        console.log(elt);
        var clone = $("#slideshow-template > figure").one().clone();
        clone.find("img").attr('src', elt.src);
        clone.find("figcaption").text(elt.alt);
        clone.find(".numbertext").text((1+index) +" / "+n);
        clone.appendTo(cont);
        var dot = $("<span>")
                .addClass("dot")
                .attr("data-index",index+1)
                .appendTo(dots);
    });
}
