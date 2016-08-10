var Renderer = {
	// have all the templates
	// you pass it the object and it spits it out to the template
	getTemplates: function(selector) {
		this.templates = {};
		var self = this;
		$(selector).each(function() {
			var $template = $(this); // context of jquery object
			self.templates[$template.attr("id")] = Handlebars.compile($template.html());
		});
	},
	registerPartials: function(selector) {
		$(selector).each(function () {
			var $partial = $(this); // context of jquery object
			Handlebars.registerPartial($partial.attr("id"), $partial.html());
		});
	},
	sidebarPanels: function(panels) {
		// Refactor: Could refactor for generic panels in the future
		var panel_template = this.templates.side_panel_template;

		var all_todos_container = $("#all_todos");
		var completed_todos_container = $("#completed_todos");

		var all_todos = panels[0];
		var completed_todos = panels[1];

		this.render(all_todos_container, panel_template, all_todos);
		this.render(completed_todos_container, panel_template, completed_todos);
	},
	todoDisplay: function(category) {
		console.log("Rendering display...");
		var header_tmp = this.templates.page_info_template;
		var list_tmp = this.templates.todo_list_template;

		var page_info_container = $("#page_info");
		var todo_list_container = $("#todo_list");


		this.render(page_info_container, header_tmp, category);
		this.render(todo_list_container, list_tmp, {todos: category.todos});
	},
	categorySelection: function() {

	},
	render: function(container, template, object) {
		// Refactor: Will need to clear out current object won't we?
		this.clear(container);
		container.append(template(object));
	},
	clear(container){
		container.empty();
	},
};
