var Renderer = {
	init: function() {
		this.templates = {};
		this.getTemplates("script[type='text/x-handlebars']");
		this.registerPartials("[data-type=partial]");
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
	displaySidebar: function(allTodosCount, allCatCounts, completedTodosCount, completeCatCounts) {
		console.log("Rendering Sidebar")

		// Render All Todos Panel
		var allTodosContainer = $("#all_todos");
		var allTodosTemplate = this.templates.all_todos_template;
		var allTodosInfo = {todo_count: allTodosCount}
		this.clearAndRender(allTodosContainer, allTodosTemplate, allTodosInfo);

		// Render All Todos Sub-Categories
		var categoriesTemplate = this.templates.categories_template;
		this.render(allTodosContainer, categoriesTemplate, {categories: allCatCounts});

		// Render Completed Panel
		var completedTodosContainer = $("#completed_todos");
		var completedTemplate = this.templates.completed_template;
		var completedTodosInfo = {todo_count: completedTodosCount}
		this.clearAndRender(completedTodosContainer, completedTemplate, completedTodosInfo);

		// Render Completed Sub-Categories
		this.render(completedTodosContainer, categoriesTemplate, {categories: completeCatCounts});
	},
	displayCategoryTodos: function(sublist, categoryName) {
		console.log("Clearing and rendering display...");

		// Render Header
		var pageInfoTemplate = this.templates.page_info_template;
		var pageInfoContainer = $("#page_info");
		this.clearAndRender(pageInfoContainer, pageInfoTemplate, {title: categoryName, todo_count: sublist.length});

		// Render Body
		var listTemplate = this.templates.todo_list_template;
		var listContainer = $("#todo_list");	
		this.clearAndRender(listContainer, listTemplate, {todos: sublist});
	},
	modal: function(todo) {
		var todo = todo || {};
		var modal_tmp = this.templates.modal_template;
		var modal_container = $("#modal");
		this.clearAndRender(modal_container, modal_tmp, todo);
	},
	clearAndRender: function(container, template, object) {
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
