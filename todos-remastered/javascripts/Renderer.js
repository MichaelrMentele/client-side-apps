var Renderer = {
	init: function(templateSelector, partialSelector) {
		this.templates = {};
		this.getTemplates(templateSelector);
		this.registerPartials(partialSelector);
	},
	getTemplates: function(selector) {
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
	// Renders Supercategories
	sidebarPanels: function(panels) {
		console.log("Rendering Panels...")
		var panel_template = this.templates.side_panel_template;

		var all_todos_container = $("#all_todos");
		var completed_todos_container = $("#completed_todos");

		var all_todos = panels[0];
		var completed_todos = panels[1];

		this.clearAndRender(all_todos_container, panel_template, all_todos);
		this.clearAndRender(completed_todos_container, panel_template, completed_todos);
	},
	display: function(list, category) {
		console.log("Clearing and rendering display...");

		var header_tmp = this.templates.page_info_template;
		var list_tmp = this.templates.todo_list_template;

		var page_info_container = $("#page_info");
		var todo_list_container = $("#todo_list");

		var sublist = list.select(category);		

		this.clearAndRender(page_info_container, header_tmp, category);
		this.clearAndRender(todo_list_container, list_tmp, {todos: sublist});
	},
	updateDisplay() {
		var title = $(".selected a").text(); // Title of current category
		var todo_count = $(".selected span").text(); // Count of current cateogry

		// This is one of the panels AKA All Todos or Completed
		var supercategory_title = $(".selected a").parents("tr").siblings().children("td").children("a").children("h2").text()
		var category = {title: title, todo_count: todo_count, parent_title: supercategory_title}; // Create catagory object from info

		this.display(todoList, category);
	},
	counts: function(list, categories, catCounts){
		console.log("Rendering Counts...");

		// Render Super Categories
		this.sidebarPanels(categories);
		$("#all_todos #panel_count").text(list.todos.length);
		$("#completed_todos #panel_count").text(list.completed.length);

		// Dynamic Categories
		var counts_templates = this.templates.categories_template;

		var all_todos_container = $("#all_todos");
		var completed_todos_container = $("#completed_todos");

		this.render(all_todos_container, counts_templates, {categories: catCounts.all});
		this.render(completed_todos_container, counts_templates, {categories: catCounts.completed});
	},
	modal: function(todo) {
		var todo = todo || {};
		var modal_tmp = this.templates.modal_template;
		var modal_container = $("#modal");
		this.clearAndRender(modal_container, modal_tmp, todo);
	},
	clearAndRender: function(container, template, object) {
		// Refactor: Will need to clear out current object won't we?
		this.clear(container);
		this.render(container, template, object);
	},
	render: function(container, template, object) {
		container.append(template(object));
	},
	clear: function(container){
		container.empty();
	},
};
