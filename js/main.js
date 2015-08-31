var stereozoom = (function() {
	var container, left_div, right_div, img;
	var start_x, start_y;
	var scale = 1;
	var image_left, image_top, image_right, image_bottom, div_height, div_width;
	
	function init(source_container) {
		container = source_container;
		left_div = container.getElementsByClassName("left")[0];
		right_div = container.getElementsByClassName("right")[0];
		left_div.addEventListener( 'wheel', onViewWheel, false );
		left_div.addEventListener("dragstart", function(event) { event.preventDefault(); return false; }, false );
		left_div.addEventListener("mousedown", onMouseDown, false );
		right_div.addEventListener("dragstart", function(event) { event.preventDefault(); return false; }, false );
		right_div.addEventListener("mousedown", onMouseDown, false );
		right_div.addEventListener( 'wheel', onViewWheel, false );
	}

	function loadImage(url) {
		img = new Image();
		img.src = url; //"images/ship_yard__cross_eye_stereo_by_artbytheo.jpg";
		img.addEventListener( 'load', onImageLoad, false );
	}

	function onImageLoad(event) {
		var img_aspect = img.width / img.height;
		var cont_width = container.getBoundingClientRect().width;
		div_height = cont_width / img_aspect;
		div_width = right_div.getBoundingClientRect().width;
		left_div.style.height = right_div.style.height = div_height.toString() + "px";
		left_div.style.backgroundImage = "url(" + img.src + ")";
		right_div.style.backgroundImage = "url(" + img.src + ")";
		right_div.style.backgroundSize = (div_width * 2).toString() + "px auto";
		left_div.style.backgroundSize = (div_width * 2).toString() + "px auto";
		right_div.style.backgroundPosition = (-div_width).toString() + "px 0";

		image_left = 0;
		image_top = 0;
		image_right = (div_width * 2);
		image_bottom = div_height;

		displayImage()
	}

	function onViewClick(event) {
		var local_rect = event.target.getBoundingClientRect();
		var click_x = event.clientX - local_rect.left;
		var click_y = event.clientY - local_rect.top;
	}

	function onMouseMove(event) {
		var target_rect = event.target.getBoundingClientRect();
		var click_x = event.clientX - target_rect.left;
		var click_y = event.clientY - target_rect.top;
		var dist_x = click_x - start_x;
		var dist_y = click_y - start_y;
		start_x = click_x;
		start_y = click_y;
		var image_width= image_right - image_left;
		var image_height= image_bottom - image_top;

		image_top = image_top + dist_y;
		image_bottom = image_bottom + dist_y;
		image_left = image_left + dist_x;
		image_right = image_right + dist_x;
		
		if (image_left > 0) {
			image_left = 0;
			image_right = image_left + image_width;
		}
		else if ((image_width / 2) + image_left < div_width ) {
			image_left = image_left - dist_x;
			image_right = image_right - dist_x;
		}

		if (image_top > 0) {
			image_top = 0;
			image_bottom = image_top + image_height;
		}
		else if (image_bottom < div_height) {
			image_bottom = div_height;
			image_top =  image_bottom - image_height;
		}

		displayImage();
		return;
	}

	function onMouseUp(event) {
		event.target.removeEventListener( 'mousemove', onMouseMove );
		event.target.removeEventListener( 'mouseup', onMouseUp );
	}

	function onMouseDown(event) {
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

		if (image_width <= (div_width * 2) || image_height <= div_height) {
			image_right = (div_width * 2);
			image_bottom = div_height;
			image_left = 0;
			image_top = 0;
		}

		var image_width = image_right - image_left;
		var image_height = image_bottom - image_top;

		if (image_left > 0){
			image_left = 0;
		}
		else if (image_left < div_width - (image_width / 2)) {
			var correct_width = div_width - (image_width / 2);
			image_right = image_right - (image_left - correct_width);
			image_left = correct_width;
		}

	 	if (image_top > 0){
			image_top = 0;
		}
		else if (image_top < (div_height - image_height)) {
			var correct_top = (div_height - image_height);
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

	return {
		init: init,
		loadImage: loadImage
	}
})();