function draw_b() {
  var b_canvas = document.getElementById("viewer");
  var b_context = b_canvas.getContext("2d");
  b_context.fillRect(50, 25, 150, 100);
}

function draw_image() {
	var canvas = document.getElementById("viewer");
	var container = document.getElementById("content");
	var context = canvas.getContext("2d");
	var img = new Image();
	img.src = "images/Art_Institute_of_Chicago_Lion_Statue.jpg";
	img.onload = function() {
		console.log(img.width);
		console.log(img.height);
		var c_width = container.width;
		var img_aspect = img.width / img.height;
		canvas.height = canvas.width / img_aspect;
		// canvas.width = img.width;
		console.log(img_aspect);
	  context.drawImage(img, 0, 0, canvas.width, canvas.height);
	};
}