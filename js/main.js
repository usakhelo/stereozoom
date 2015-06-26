var container, left_div, right_div;
var scale = 1;
var image_width;
var image_left, image_top, image_right, image_bottom;

function init() {
	container = document.getElementById("content");
	left_div = container.getElementsByClassName("left")[0];
	right_div = container.getElementsByClassName("right")[0];
	left_div.addEventListener( 'click', onViewClick, false );
	left_div.addEventListener( 'wheel', onViewWheel, false );
	right_div.addEventListener( 'click', onViewClick, false );
	right_div.addEventListener( 'wheel', onViewWheel, false );
	loadImage();
}

function loadImage() {
	img = new Image();
	img.src = "images/Art_Institute_of_Chicago_Lion_Statue.jpg";
	img.addEventListener( 'load', onImageLoad, false );
}

function onImageLoad(event) {
	var img_aspect = img.width / img.height;
	var cont_width = container.getBoundingClientRect().width;
	var cont_height = cont_width / img_aspect;
	var right_width = right_div.getBoundingClientRect().width;
	image_width = right_width * 2.0;
	container.style.height = cont_height.toString() + "px";
	left_div.style.backgroundImage = "url(" + img.src + ")";
	right_div.style.backgroundImage = "url(" + img.src + ")";
	right_div.style.backgroundSize = image_width.toString() + "px auto";
	left_div.style.backgroundSize = image_width.toString() + "px auto";
	right_div.style.backgroundPosition = (cont_width / -2.0).toString() + "px 0";

	image_left = 0;
	image_top = 0;
	image_right = image_width;
}

function onViewClick(event) {
	var local_rect = event.target.getBoundingClientRect();
	var click_x = event.clientX - local_rect.x;
	var click_y = event.clientY - local_rect.y;
}

function onViewWheel(evt) {
	console.log(evt.deltaY);
	var target_rect = evt.target.getBoundingClientRect();
	var target_width = target_rect.width;
	var click_x = evt.clientX - target_rect.left;
	var click_y = evt.clientY - target_rect.top;

  var scale = (evt.deltaY > 0) ? 1.05 : .95;

	image_left = ((image_left - click_x) * scale) + click_x;
	image_top = ((image_top - click_y) * scale) + click_y;
	image_right = ((image_right - click_x) * scale) + click_x;
	if (image_left > 0) image_left = 0;
	if (image_top > 0) image_top = 0;
	if (image_right < (target_width * 2)) image_right = (target_width * 2);

	console.log(scale);
	displayImage(target_width);

	evt.preventDefault();
}

function displayImage(div_width) {
	var image_width = (image_right - image_left);
	right_div.style.backgroundSize = left_div.style.backgroundSize = image_width.toString() + "px auto";
	left_div.style.backgroundPosition = image_left.toString() + "px " + image_top.toString() + "px";
	right_div.style.backgroundPosition = (image_left - (image_width/2)).toString() + "px " + image_top.toString() + "px";
}
