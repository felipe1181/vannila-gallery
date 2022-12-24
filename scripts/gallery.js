const WIDTH_IMAGE_PREVIEW = 200; //VALUE DEFAULT WIDTH IMAGE PREVIEW

// close modal that shows the full image
function onClosePreview() {
  document.querySelector("#galleryWallpapers").style.display = "none";
}

// open modal that shows the full image
function onOpenPreview(event) {
  document.querySelector("#galleryWallpapers").style.display = "flex";
  document
    .querySelector("#galleryWallpapers .image-preview")
    .setAttribute("src", event.target.src);
}

// shows previous images on carrossel images
function onPressPrev(event) {
  const indexGallery = event.target.getAttribute("id");
  const targetGallery = document.querySelector(`#gallery-${indexGallery}`);
  targetGallery.scrollTo({
    left: targetGallery.scrollLeft - WIDTH_IMAGE_PREVIEW * 2,
    behavior: "smooth",
  });
}

// shows next images on carrossel images
function onPressNext(event) {
  const indexGallery = event.target.getAttribute("id");
  const targetGallery = document.querySelector(`#gallery-${indexGallery}`);
  targetGallery.scrollTo({
    left: targetGallery.scrollLeft + WIDTH_IMAGE_PREVIEW * 2,
    behavior: "smooth",
  });
}

// load images carrossel images on gallery
async function onLoadImagesIntoGallery() {
  // get element father where render carrossel gallery
  const galleries = document.querySelectorAll(".gallery");

  // if site has many galleries returns list/array elements, so create "for" for render gallery in all .gallery site
  for (let indexGallery = 0; indexGallery < galleries.length; indexGallery++) {
    const targetGallery = galleries[indexGallery];

    const pathStringImage = targetGallery.getAttribute("src");
    // convert string in array, with partner "name01.jpg,name02.jpg", where has "," creates new item in array
    const listPathImages = pathStringImage.split(",");
    let elementsOfGallery = "";
    targetGallery.innerHTML = elementsOfGallery;

    if (listPathImages.length) {
      elementsOfGallery += `<div id="gallery-${indexGallery}" class="content"><ul>`;
    }

    // render images carrossel
    for (let indexImage = 0; indexImage < listPathImages.length; indexImage++) {
      const pathImage = listPathImages[indexImage];
      elementsOfGallery += `<li><img class="image-gallery" src="${pathImage}"/></li>`;
    }

    if (listPathImages.length) {
      elementsOfGallery += "<ul/></div>";
      elementsOfGallery += `<div class="controls"><button id="${indexGallery}" class="bt-prev"><</button>`;
      elementsOfGallery += `<button id="${indexGallery}" class="bt-next" >></button></div>`;
      targetGallery.innerHTML = elementsOfGallery;

      // create actions carrossel

      const imagesGallery = targetGallery.querySelectorAll(".image-gallery");

      for (
        let indexImagesGallery = 0;
        indexImagesGallery < imagesGallery.length;
        indexImagesGallery++
      ) {
        const imageGallery = imagesGallery[indexImagesGallery];
        imageGallery.addEventListener("click", onOpenPreview);
      }

      targetGallery
        .querySelector(".bt-prev")
        .addEventListener("click", onPressPrev);

      targetGallery
        .querySelector(".bt-next")
        .addEventListener("click", onPressNext);
    }
  }
}

document
  .querySelector("#galleryWallpapers .close")
  .addEventListener("click", onClosePreview);
window.addEventListener("load", onLoadImagesIntoGallery);
