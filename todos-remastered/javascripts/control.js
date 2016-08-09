// Get and Compile Templates
var templates = {};
$("script[type='text/x-handlebars']").each(function() {
		var $template = $(this);
		templates[$template.attr("id")] = Handlebars.compile($template.html());
	});

// Register partial templates
$("[data-type=partial]").each(function () {
		var $partial = $(this);
		Handlebars.registerPartial($partial.attr("id"), $partial.html());
	})

// Take object collections and modify views accordingly


