// $(function () {

	///////////////
	// VARIABLES //
	///////////////

	var templates = {},
			photos;

	// grab all handle bar templates and store it with the name of it's id as a property on the templates object
	$("script[type='text/x-handlebars']").each(function() {
		var $tmpl = $(this);
		templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html()); // Handlebars needs to take html
	});

	$("[data-type=partial]").each(function () {
		var $partial = $(this);
		Handlebars.registerPartial($partial.attr("id"), $partial.html());
	})

	var slideshow = {
		$el: $("#slideshow"),
		duration: 500,
		prevSlide: function(event) {
			event.preventDefault();
			var $current = this.$el.find("figure:visible"),
					$prev = $current.prev("figure");

			if (!$prev.length) {
				$prev = this.$el.find("figure").last();
			}

			$current.fadeOut(this.duration);
			$prev.fadeIn(this.duration);
			this.renderPhotoContent($prev.attr("data-id"));
		},
		nextSlide: function(event) {
			event.preventDefault();
			var $current = this.$el.find("figure:visible"),
					$next = $current.next("figure");

			if (!$next.length) {
				$next = this.$el.find("figure").first();
			}

			$current.fadeOut(this.duration);
			$next.fadeIn(this.duration);
			this.renderPhotoContent($next.attr("data-id"));
		},
		renderPhotoContent: function(idx) {
			$("[name=photo_id]").val(idx);

			idx = +idx;
			renderPhotoInfo(idx);
			getCommentsFor(idx);
			// render comments
		},
		bind: function() {
			this.$el.find("a.prev").on("click", $.proxy(this.prevSlide, this));
			this.$el.find("a.next").on("click", $.proxy(this.nextSlide, this));
		},
		init: function() {
			this.bind();
		},
	};

	/////////////
	// HELPERS //
	/////////////
	function renderPhotos() {
		$("#slides").html(templates.photos({ photos: photos })); // pass the photos array of objects in
	}

	function renderPhotoInfo(idx) {
		var photo = photos.filter(function(item) {
			return item.id === idx;
		})[0];
		$("footer > header").html(templates.photo_information(photo)); // pass in the first one by default
	}

	function getCommentsFor(idx) {
		$.ajax({
			url: "/comments",
			data: "photo_id=" + idx,
			success: function(comment_json) {
				$("#comments ul").html(templates.comments({ comments: comment_json}));
			},
		});
	}

	//////////////
	// REQUESTS //
	//////////////

	// make a request to the server for photos
	$.ajax({
		url: "/photos",
		success: function(json) {
			photos = json;
			renderPhotos();
			renderPhotoInfo(photos[0].id);
			slideshow.init();
			getCommentsFor(photos[0].id);
		}
	});

	$("footer > header").on("click", ".actions a", function(event) {
		event.preventDefault();
		var $event = $(event.target);

		$.ajax({
			url: $event.attr("href"),
			type: "post",
			data: "photo_id=" + $event.attr("data-id"),
			success: function(json) {
				$event.text(function(i, txt) {
					return txt.replace(/\d+/, json.total);
				});
			}
		});
	});

	$("form").on("submit", function(event) {
		event.preventDefault();
		var $f = $(this);

		$.ajax({
			url: $f.attr("action"),
			type: $f.attr("method"),
			data: $f.serialize(),
			success: function(json) {
				$("#comments ul").append(templates.comment(json));
			}
		})
	});	
	
// })