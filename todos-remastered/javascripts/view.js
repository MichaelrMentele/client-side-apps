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
		console.log("Rendering Panels...")
		// Refactor: Could refactor for generic panels in the future
		var panel_template = this.templates.side_panel_template;

		var all_todos_container = $("#all_todos");
		var completed_todos_container = $("#completed_todos");

		var all_todos = panels[0];
		var completed_todos = panels[1];

		this.clearAndRender(all_todos_container, panel_template, all_todos);
		this.clearAndRender(completed_todos_container, panel_template, completed_todos);
	},
	display: function(list, category) {
		var categoryInfo = category || {title: "All Todos", todo_count: "?"};

		console.log("clearAndRendering display...");

		var header_tmp = this.templates.page_info_template;
		var list_tmp = this.templates.todo_list_template;

		var page_info_container = $("#page_info");
		var todo_list_container = $("#todo_list");

		this.clearAndRender(page_info_container, header_tmp, categoryInfo);
		this.clearAndRender(todo_list_container, list_tmp, {todos: list.todos});
	},
	modal: function(todo) {
		var todo = todo || {};
		var modal_tmp = this.templates.modal_template;
		var modal_container = $("#modal");
		this.clearAndRender(modal_container, modal_tmp, todo);
	},
	categories: function(categories) {
		// get categories template
	},
	clearAndRender: function(container, template, object) {
		// Refactor: Will need to clear out current object won't we?
		this.clear(container);
		this.render(container, template, object);
	},
	render: function(container, template, object) {
		// Refactor: Will need to clear out current object won't we?
		container.append(template(object));
	},
	clear: function(container){
		container.empty();
	},
	counts: function(list, panels, catCounts){
		console.log("Rendering Counts...");

		// Render Panels
		this.sidebarPanels(panels);
		$("#all_todos #panel_count").text(list.todos.length);
		$("#completed_todos #panel_count").text(list.completed.length);

		// Dynamic Categories
		var counts_templates = this.templates.categories_template;

		var all_todos_container = $("#all_todos");
		var completed_todos_container = $("#completed_todos");

		this.render(all_todos_container, counts_templates, {categories: catCounts.all});
		this.render(completed_todos_container, counts_templates, {categories: catCounts.completed});
	},
};
