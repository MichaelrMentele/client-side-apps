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

//////////////////////
// TEMPLATE TESTING //
//////////////////////

// Note: Used to test templates in isolation.

// PASS: Todo List Test
var todo_list = templates.todo_list_template
var todo = templates.todo_item_template

var example_todo = {complete: true, title: "test", date: "1/1"};
var todos = {example_todo};
$("#todo_list").append(todo_list({todos: todos}));

// PASS: Side Panel Test
var side_panel = templates.side_panel_template;
var category = templates.category_template;

var example_category = {date: "1/1" , todos_in_category: 10};
var categories = {example_category};

$(".status_panel").append(side_panel({icon_path: "assets/completed_icon.png", title: "test", todos_in_category: 15, todo_categories: categories}));

// PASS: Main Page Test
var main_page = templates.page_info_template;
$("#page_info").append(main_page({title: "All Todos", todos_in_category: 10}));

// PASS: Modal Write-to Test
var modal = templates.modal_template;
$("#modal").append(modal({title: "Item 1", day: 10, month: 2, year: 2011, description: "BLAH"}));
$("#modal").addClass("modal");
