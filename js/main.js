var container, left_div, right_div;
var scale = 1;
var image_width;

function init() {
	container = document.getElementById("content");
	left_div = container.getElementsByClassName("left")[0];
	right_div = container.getElementsByClassName("right")[0];
	left_div.addEventListener( 'click', onViewClick, false );
	left_div.addEventListener( 'wheel', onViewWheel, false );
	left_div.addEventListener( 'mousemove', onMouseMove, false );
	right_div.addEventListener( 'click', onViewClick, false );
	right_div.addEventListener( 'wheel', onViewWheel, false );
	loadImage();
}

function loadImage() {
	img = new Image();
	img.src = "images/Art_Institute_of_Chicago_Lion_Statue.jpg";
	img.addEventListener( 'load', onImageLoad, false );
}

var image_left, image_top, image_right, image_bottom;

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

	console.log(cont_width);
	console.log(right_width);
}

function onViewClick(event) {
	var local_rect = event.target.getBoundingClientRect();
	var click_x = event.clientX - local_rect.x;
	var click_y = event.clientY - local_rect.y;
	console.log(click_x);
	console.log(click_y);
}

var mouse_moved = false;
function onMouseMove(event) {
	mouse_moved = true;
	console.log("mouse_moved:" + mouse_moved);
}

// var x_ratio, y_ratio;
function onViewWheel(event) {
	var target = event.target;
	var target_rect = target.getBoundingClientRect();
	var target_width = target_rect.width;
	var target_height = target_rect.height;
	var click_x = event.clientX - target_rect.x;
	var click_y = event.clientY - target_rect.y;

	scale = (event.deltaY * 1.2);
	image_left = ((image_left - click_x) * scale) + click_x;
	image_top = ((image_top - click_y) * scale) + click_y;
	image_right = ((image_right - click_x) * scale) + click_x;

	target.style.backgroundSize = (image_right - image_left).toString() + "px auto";
	target.style.backgroundPosition = image_left.toString() + "px " + image_top.toString() + "px";

	console.log(event.deltaY);
	event.preventDefault();
}
