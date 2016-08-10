///////////////
// Templates //
///////////////

// Fetch and compile templates
var templates = {};
$("script[type='text/x-handlebars']").each(function() {
		var $template = $(this);
		templates[$template.attr("id")] = Handlebars.compile($template.html());
});

// Register partial templates
$("[data-type=partial]").each(function () {
		var $partial = $(this);
		Handlebars.registerPartial($partial.attr("id"), $partial.html());
});

/////////////
// HELPERS //
/////////////
function initializeObjects() {
	// If you want more panels, add them here. Todos and other Categories
	// created dynamically at runtime.

	// Default categories
	var CompleteTodosDefaultCategory = Object.create(Category);
	var AllTodosDefaultCategory = Object.create(Category);

	CompleteTodosDefaultCategory.init({title: "No Due Date"});
	AllTodosDefaultCategory.init({title: "No Due Date"});

	// Default Panels
	var AllTodos = Object.create(Panel);
	var CompleteTodos = Object.create(Panel);
	var panels = [];

	AllTodos.init({icon_path: "assets/todos_icon.png", title: "All Todos"});
	AllTodos.addCategory(AllTodosDefaultCategory);

	CompleteTodos.init({icon_path: "assets/completed_icon.png", title: "Completed"});
	CompleteTodos.addCategory(CompleteTodosDefaultCategory);

	panels.push(AllTodos);
	panels.push(CompleteTodos);

	// Sidebar Object
	var PageSidebar = Object.create(Sidebar);
	PageSidebar.init({panels});

	return PageSidebar;
}

///////////////
// APP LOGIC //
///////////////



var pageData = initializeObjects();
// !!! Need to validate categories before rendering
// Parses data from the pageData object and passes it to the handlebars template.
var sidebarRenderer = {
	panels: pageData.panels,
	render: function() {
		this.renderPanels();
	},
	renderPanels: function() {
		// Refactor: Could refactor for generic panels in the future
		var panel_template = templates.side_panel_template;

		var all_todos_container = $("#all_todos");
		var all_todos = this.panels[0];

		var completed_todos_container = $("#completed_todos");
		var completed_todos = this.panels[1];

		all_todos_container.append(panel_template(all_todos));
		completed_todos_container.append(panel_template(completed_todos));
	},
}

sidebarRenderer.render();



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
