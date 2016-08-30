if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position) {
		success(position);
	});
} else {
	console.log("Geo locate not enabled.")
}


function success(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	$("body").html('<p>latitude is ' + latitude + "<br>" +
									'longitude is ' + longitude + '</p>');

	var img = new Image();
	img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" +
							latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

	$("body").append(img);
}
