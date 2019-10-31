/* This function puts one image into a gallery. Since we have two
   galleries, this function makes the gallery ID be a parameter; if you
   have only one gallery, you could hard-code the ID and remove the
   paramter. We make the alt be the same as the caption.

   Should we use cloning here? */

function addToGallery(galleryID,thumbsrc,bigsrc,alt) {
    console.log("add figure "+thumbsrc);
    var img = $("<img>")
        .attr("src",thumbsrc)
        .attr("alt",alt);
    var cap = $("<figcaption>"+alt+"</figcaption>");
    $("<figure>")
        .attr("data-bigsrc",bigsrc)
        .attr("data-alt",alt)
        .append(img)
        .append(cap)
        .appendTo(galleryID);
}

// Use the preceding function to add particular images to the gallery.

addToGallery("#gallery1",
             "../potterpics/harry-potter-thumb.jpeg",
             "../potterpics/harry-potter-big.jpeg",
             "Harry Potter");
addToGallery("#gallery1",
             "../potterpics/ron-weasley-thumb.jpeg",
             "../potterpics/ron-weasley-big.jpeg",
             "Ron Weasley");
addToGallery("#gallery1",
             "../potterpics/hermione-granger-thumb.jpeg",
             "../potterpics/hermione-granger-big.jpeg",
             "Hermione Granger");
addToGallery("#gallery1",
             "../potterpics/draco-malfoy-thumb.jpeg",
             "../potterpics/draco-malfoy-big.jpeg",
             "Draco Malfoy");

/* Handler for clicks on gallery images. Retrieve the necessary info from
 * the thumbnail and update the big version. */

function enlargeGalleryImage() {
    var bigsrc = $(this).attr("data-bigsrc");
    var alt = $(this).attr("data-alt");
    $("#large_image img")
        .attr("src",bigsrc)
        .attr("alt",alt);
    $("#large_image figcaption").html(alt);
}
                  
$("#gallery1 figure").click(enlargeGalleryImage);

// ================================================================
// Lightbox version

// Use the first function to add particular images to the lightbox gallery.

addToGallery("#lightbox_gallery",
             "../potterpics/harry-potter-thumb.jpeg",
             "../potterpics/harry-potter-big.jpeg",
             "Harry Potter");
addToGallery("#lightbox_gallery",
             "../potterpics/ron-weasley-thumb.jpeg",
             "../potterpics/ron-weasley-big.jpeg",
             "Ron Weasley");
addToGallery("#lightbox_gallery",
             "../potterpics/hermione-granger-thumb.jpeg",
             "../potterpics/hermione-granger-big.jpeg",
             "Hermione Granger");
addToGallery("#lightbox_gallery",
             "../potterpics/draco-malfoy-thumb.jpeg",
             "../potterpics/draco-malfoy-big.jpeg",
             "Draco Malfoy");

function openLightboxImage() {
    var bigsrc = $(this).attr("data-bigsrc");
    var alt = $(this).attr("data-alt");
    $("#lightbox_display img")
        .attr("src",bigsrc)
        .attr("alt",alt);
    $("#lightbox_display figcaption").html(alt);
    $("#lightbox_display").show();
}

$("#lightbox_gallery figure").click(openLightboxImage);

function closeLightboxImage() {
    $("#lightbox_display").hide();
}

$("#lightbox_display").click(closeLightboxImage);

