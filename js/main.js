var container, left_div, right_div;
var scale = 1;
var image_left, image_top, image_right, image_bottom, min_height, min_width;

function init() {
	container = document.getElementById("content");
	left_div = container.getElementsByClassName("left")[0];
	right_div = container.getElementsByClassName("right")[0];
	left_div.addEventListener( 'wheel', onViewWheel, false );
	left_div.addEventListener("dragstart", function() { console.log(event.button); event.preventDefault(); return false; }, false );
	left_div.addEventListener("mousedown", onMouseDown, false );
	right_div.addEventListener("dragstart", function() { console.log(event.button); event.preventDefault(); return false; }, false );
	right_div.addEventListener("mousedown", onMouseDown, false );
	right_div.addEventListener( 'wheel', onViewWheel, false );
	loadImage();
}

function loadImage() {
	img = new Image();
	img.src = "images/ship_yard__cross_eye_stereo_by_artbytheo.jpg";
	img.addEventListener( 'load', onImageLoad, false );
}

function onImageLoad(event) {
	var img_aspect = img.width / img.height;
	var cont_width = container.getBoundingClientRect().width;
	var cont_height = min_height = cont_width / img_aspect;
	var right_width = min_width = right_div.getBoundingClientRect().width;
	left_div.style.height = right_div.style.height = min_height.toString() + "px";
	left_div.style.backgroundImage = "url(" + img.src + ")";
	right_div.style.backgroundImage = "url(" + img.src + ")";
	right_div.style.backgroundSize = (min_width * 2).toString() + "px auto";
	left_div.style.backgroundSize = (min_width * 2).toString() + "px auto";
	right_div.style.backgroundPosition = (-min_width).toString() + "px 0";

	image_left = 0;
	image_top = 0;
	image_right = (min_width * 2);
	image_bottom = min_height;
}

function onViewClick(event) {
	console.log(event.button);
	var local_rect = event.target.getBoundingClientRect();
	var click_x = event.clientX - local_rect.left;
	var click_y = event.clientY - local_rect.top;
}

var start_x, start_y;
function onMouseMove(event) {
	console.log(event.target.className);
	var target_rect = event.target.getBoundingClientRect();
	var click_x = event.clientX - target_rect.left;
	var click_y = event.clientY - target_rect.top;
	var dist_x = click_x - start_x;
	var dist_y = click_y - start_y;
	start_x = click_x;
	start_y = click_y;
	image_left = image_left + dist_x;
	image_top = image_top + dist_y;
	var image_width= image_right - image_left;
	var target_width = target_rect.width;

	if(image_top > 0) image_top = 0;
	if (event.target.className == "left") {
		if (image_left > 0)
			image_left = 0;
		else if ((image_width / 2) + image_left < target_width ) image_left = image_left - dist_x;
		else
			image_right = image_right + dist_x;
	} else {
	}
	displayImage();
}

function onMouseUp(event) {
	console.log(event);
	event.target.removeEventListener( 'mousemove', onMouseMove );
	event.target.removeEventListener( 'mouseup', onMouseUp );
}

function onMouseDown(event) {
	console.log(event);
	var local_rect = event.target.getBoundingClientRect();
	start_x = event.clientX - local_rect.left;
	start_y = event.clientY - local_rect.top;
	if (event.buttons == 1) {
		event.target.addEventListener( 'mousemove', onMouseMove, false );
		event.target.addEventListener( 'mouseup', onMouseUp, false );
		event.target.addEventListener( 'mouseleave', onMouseUp, false );
	}
}

function onViewWheel(evt) {
	// console.log(evt.deltaY);
	var target_rect = evt.target.getBoundingClientRect();

	var click_x = evt.clientX - target_rect.left;
	var click_y = evt.clientY - target_rect.top;

  var scale = (evt.deltaY > 0) ? 1.05 : .95;

	image_left = ((image_left - click_x) * scale) + click_x;
	image_top = ((image_top - click_y) * scale) + click_y;
	image_right = ((image_right - click_x) * scale) + click_x;
	image_bottom = ((image_bottom - click_y) * scale) + click_y;

	var image_width = image_right - image_left;
	var image_height = image_bottom - image_top;

	if (image_width <= (min_width * 2) || image_height <= min_height) {
		image_right = (min_width * 2);
		image_bottom = min_height;
		image_left = 0;
		image_top = 0;
	}

	var image_width = image_right - image_left;
	var image_height = image_bottom - image_top;

	if (image_left > 0){
		image_left = 0;
	}
	else if (image_left < min_width - (image_width / 2)) {
		var correct_width = min_width - (image_width / 2);
		image_right = image_right - (image_left - correct_width);
		image_left = correct_width;
	}

 	if (image_top > 0){
		image_top = 0;
	}
	else if (image_top < (min_height - image_height)) {
		var correct_top = (min_height - image_height);
		image_bottom = image_bottom - (image_top - correct_top);
		image_top = correct_top;
	}

	displayImage();
	evt.preventDefault();
}

function displayImage() {
	var image_width = (image_right - image_left);
	right_div.style.backgroundSize = left_div.style.backgroundSize = image_width.toString() + "px auto";
	left_div.style.backgroundPosition = image_left.toString() + "px " + image_top.toString() + "px";
	right_div.style.backgroundPosition = (image_left - (image_width/2)).toString() + "px " + image_top.toString() + "px";
}
