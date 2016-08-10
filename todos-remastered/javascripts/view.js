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
		var header_tmp = this.templates.page_info_template;
		var list_tmp = this.templates.todo_list_template;
		var todo_tmp = this.templates.todo_item_template;

		var page_info_container = $("#page_info");
		var todo_list_container = $("#todo_list");


		render(page_info_container, header_tmp, category);
	},
	categorySelection: function() {

	},
	render: function(container, template, object) {
		// Refactor: Will need to clear out current object won't we?
		container.append(template(object));
	}
};

//////////////////////
// TEMPLATE TESTING //
//////////////////////

// PASS: Side Panel Test
// var side_panel = templates.side_panel_template;
// var category = templates.category_template;

// $(".status_panel").append(side_panel(AllTodos));

// // PASS: Todo List Test
// var todo_list = templates.todo_list_template
// var todo = templates.todo_item_template

// var example_todo = {complete: true, title: "test", date: "1/1"};
// var todos = {example_todo};
// $("#todo_list").append(todo_list({todos: todos}));


// // PASS: Main Page Test
// var main_page = templates.page_info_template;
// $("#page_info").append(main_page({title: "All Todos", todos_in_category: 10}));

// PASS: Modal Write-to Test
// var modal = templates.modal_template;
// $("#modal").append(modal({title: "Item 1", day: 10, month: 2, year: 2011, description: "BLAH"}));
// $("#modal").addClass("modal");
