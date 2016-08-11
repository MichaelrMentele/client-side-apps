///////////////
// APP LOGIC //
///////////////

// INIT
var todoList = initializeModel();
var pageRenderer = intializeView();

var allTodosPanel = Object.create(Panel);
allTodosPanel.init({icon_path: "assets/todos_icon.png", title: "All Todos"});
var completedTodosPanel = Object.create(Panel);
completedTodosPanel.init({icon_path: "assets/completed_icon.png", title: "Completed Todos"});

var pageIndex = [allTodosPanel, completedTodosPanel]

pageRenderer.sidebarPanels(pageIndex);
$("#all_todos a[href='#selectable']").closest("tr").addClass("selected");
updateDisplay();
rebind();

/////////////
// Helpers //
/////////////

// Refector: push this to an init method on the renderer object
function intializeView() {
	console.log("Initializing rendering object...")
	var templateSelector = "script[type='text/x-handlebars']";
	var partialSelector = "[data-type=partial]";

	var viewRenderer = Object.create(Renderer);
	viewRenderer.getTemplates(templateSelector);
	viewRenderer.registerPartials(partialSelector);

	return viewRenderer;
}

function initializeModel() {
	console.log("Initializing todo list...")
	
	var list = Object.create(TodoList);
	list.init();
	
	list.superCategories = [{icon_path: "assets/todos_icon.png", title: "All Todos", tag: /.*/},
													{icon_path: "assets/completed_icon.png", title: "Completed", tag: /.*/}];
	return list;
}

function createTodo(params){
	var todo = Object.create(Todo);
	todo.init(params);

	return todo;
}

function getModalInput() {
	var title = $("#title_input").val();
	var dueDate = $("#date_inputs > input").val() + $("#date_inputs > input").next().next().val() + $("#date_inputs input:last-child").val();
	var description = $("textarea").val();

	return {title: title, dueDate: dueDate, description: description};
}

function cleanUpModal() {
	$("#modal").removeClass("modal");
	$("#modal").empty();
}

function updateDisplay() {
	var title = $(".selected a").text();
	var todo_count = $(".selected span").text();
	var category = {title: title, todo_count: todo_count};

	pageRenderer.display(todoList, category);
}

// set selected status on model

function updatePage() {
	var selected = $(".selected a").text(); // get title, use title to get handle on object
	pageIndex.forEach( function(category) {
		category.selected = false;

		if (category.title === selected) {
			category.selected = true;
		}
	});

	pageRenderer.sidebarPanels([allTodosPanel, completedTodosPanel]);
	updateDisplay();
	
	// rebuild categorie
	rebind();
}

function saveTodo(complete) {
	console.log("Saving todo...");

	var complete = complete || false;
	var params = getModalInput();
	params.complete = complete;
	
	todo = createTodo(params);
	todoList.add(todo);
}

function findTodoIndex(todo) {
	return Number($(todo).closest("li").data('id'));
}

function deleteTodo(todo) {
	index = findTodoIndex(todo);
	console.log("Deleting Todo " + index);
	
	todoList.delete(index);
}

function openTodoEdit(todo) {
	console.log("Enter todo details...");

	$("#modal").addClass("modal");
	pageRenderer.modal();

	if (todo) {
		var title = todo.title;
		var description = todo.description;

		$("#title_input").val(title);
		$("textarea").val(description);

		if (Number(todo.dueDate)) {
			var day = todo.getDay();
			var month = todo.getMonth();
			var year = todo.getYear();

			$("#date_inputs > input").val(day);
			$("#date_inputs > input").next().next().val(month);
			$("#date_inputs input:last-child").val(year);
		}
	}

	// Handle Save
	$("#save_todo").on("click", function(event){
		event.preventDefault();
		
		saveTodo();
		updatePage();
		cleanUpModal();
	});

	// Handle Save
	$("#save_and_complete_todo").on("click", function(event){
		event.preventDefault();
		
		saveTodo(true);
		updatePage();
		cleanUpModal();
	});
}

function rebind() {
	// Handle Deletion
	$("a[href='#deletable']").on("click", function(event){
		event.preventDefault();
		deleteTodo(event.target);
		updatePage();
	});

	// Handle Edit of Todo
	$("a[href='#editable']").on("click", function(event){
		event.preventDefault();
		console.log("Editing...");
		var index = findTodoIndex(event.target);
		var todo = todoList.todos[index];

		openTodoEdit(todo);
		deleteTodo(event.target);
		updatePage();
	});

	// Handle Selection of Category
	$("a[href='#selectable']").on("click", function(event){
		event.preventDefault();
		console.log("selecting");

		$(".selected").removeClass("selected");
		$(event.target.closest("tr")).addClass("selected");

		updateDisplay();
		// identify selected category (should have index when added)
		// render selected category todo list to display
		// add class to selected category of "selected"
	});
}

////////////
// EVENTS //
////////////

// Handle Create New Todo
$("#new_todo").on("click", function(event){
	event.preventDefault();
	openTodoEdit();
});

// PANEL
// On click of category, set class to selected and display it on main
// If a category is empty we shouldn't display it
// dynamically add categories based on new todos
// update todos counts

// MAIN
// On click of todo item, add modal class to bottom section as well as render form template
// On click of new todo item, add modal class to bottom section and render form (will be blank)
// click on trash can to delete object

// MODAL
// Bind events for making a todo item from a modal submission 
// -> save: will need to parse the modal form into an object
// -> markascomplete: same as save, also set complete to true
