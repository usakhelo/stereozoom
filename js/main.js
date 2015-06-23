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

var x_ratio, y_ratio;
var image_left, image_top, image_right, image_bottom;
function onViewWheel(event) {
	var target = event.target;
	var target_rect = target.getBoundingClientRect();
	var target_width = target_rect.width;
	var target_height = target_rect.height;
	var click_x = event.clientX - target_rect.x;
	var click_y = event.clientY - target_rect.y;

	if (mouse_moved) {
		x_ratio = click_x / target_width / scale;
		y_ratio = click_y / target_height / scale;
		mouse_moved = false;
	}

	target.style.backgroundSize = (image_width * scale).toString() + "px auto";

	scale = scale + (event.deltaY / 3);
	var delta_x = (((target_width * scale) - target_width)) * -x_ratio;
	var delta_y = (((target_height * scale) - target_height)) * -y_ratio;
	// if(target.className == "left")
	target.style.backgroundPosition = delta_x.toString() + "px " + delta_y.toString() + "px";
	// else {
	// 	target.style.backgroundPosition = (target_width + delta_x).toString() + "px " + delta_y.toString() + "px";
	// }
	console.log(x_ratio);
	// console.log(delta_x);
	// console.log(delta_x);
	// console.log(target.style.backgroundSize);
	// console.log(target.style.backgroundPosition);
	// console.log(event.deltaY/2);
	event.preventDefault();
}
