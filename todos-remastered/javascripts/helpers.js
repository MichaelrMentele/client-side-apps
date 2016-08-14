////////////////////////
// Helper Collections //
////////////////////////

// Object creation factory.
var Initializer = {
	Panel: {
		init: function(params) {
			this.icon_path = params.icon_path;
			this.title = params.title;
			this.todo_count = params.todo_count || 0;
			this.selected = false;
		}
	},
	fetchStoredList: function() {
		var storedParams = localStorage.getItem("list");
		return JSON.parse(storedParams);
	},
	initializeIndex: function () {
		var allTodosPanel = Object.create(this.Panel);
		allTodosPanel.init({icon_path: "assets/todos_icon.png", title: "All Todos"});

		var completedTodosPanel = Object.create(this.Panel);
		completedTodosPanel.init({icon_path: "assets/completed_icon.png", title: "Completed"});

		return [allTodosPanel, completedTodosPanel]
	},
	intializeView: function () {
		console.log("Initializing rendering object...")
		var templateSelector = "script[type='text/x-handlebars']";
		var partialSelector = "[data-type=partial]";

		var viewRenderer = Object.create(Renderer);
		viewRenderer.getTemplates(templateSelector);
		viewRenderer.registerPartials(partialSelector);

		return viewRenderer;
	},
	initializeModel: function (savedParams) {
		console.log("Initializing todo list...")
		
		var list = Object.create(TodoList);
		list.init();
		
		list.superCategories = [{icon_path: "assets/todos_icon.png", title: "All Todos", tag: /.*/},
														{icon_path: "assets/completed_icon.png", title: "Completed", tag: /.*/}];

		// Refactor: move this as option to init
		// Write saved todos
		if (savedParams) {
			savedParams.forEach(function(param) {
				list.add(createTodo(param));
			});
		}

		return list;
	},
}

var EventBinder = {
	// Reminder: Dependent on global helpers
	modal: function() {

	},
	page: function() {
		this.bindDeletable();
		this.bindEditable();
		this.bindSelectable();
		this.bindCreateTodo();
		this.bindRememberTodos();
	},
	bindDeletable: function () {
		$("a[href='#deletable']").on("click", function(event){
			event.preventDefault();
			deleteTodo(event.target);
			updatePage();
		});
	},
	bindEditable: function() {
		$(".todo_toggle").on("click", function(event) {
			console.log("Checkbox Toggled...")
			var index = findTodoIndex(event.target);
			var todo = todoList.todos[index];
			todo.toggle();
		});

		$("a[href='#editable']").on("click", function(event){
			event.preventDefault();
			console.log("Editing...");
			var index = findTodoIndex(event.target);
			var todo = todoList.todos[index];

			openTodoEdit(todo);
			deleteTodo(event.target);
			updatePage();
		});
	},
	bindSelectable: function() {
		// Binds selectable to categories
		$("a[href='#selectable']").on("click", function(event){
			event.preventDefault();
			console.log("selecting");

			$(".selected").removeClass("selected");
			$(event.target.closest("tr")).addClass("selected");


			updateDisplay();
			EventBinder.page();
		});
	},
	bindCreateTodo: function(){
		// Handle Create New Todo
		// Note: This event doesn't need to be rebound--it's here for grouping 
		$("#new_todo").on("click", function(event){
			event.preventDefault();
			openTodoEdit();
		});
	},
	bindRememberTodos: function() {
		// Note: This event doesn't need to be rebound--it's here for grouping 
		$(window).on("unload", function(event){
			localStorage.setItem("list", JSON.stringify(todoList.todos));
		});
	},
}

//////////////////////
// Assorted Helpers //
//////////////////////

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

function updateCategories() {
	// Update panel counts
	todoList.generateBasicCategories();
	var allCatCounts = todoList.countCategories(todoList.todos);
	var completedCatCounts = todoList.countCategories(todoList.completed);
	var catCounts = {all: allCatCounts, completed: completedCatCounts};
	pageRenderer.counts(todoList, pageIndex, catCounts);
}

function updateDisplay() {
	var title = $(".selected a").text();
	var todo_count = $(".selected span").text();
	var category = {title: title, todo_count: todo_count};

	pageRenderer.display(todoList, category);
}

// !!! Error: only keeps selection for panels
function updatePage() {
	var selected = $(".selected a").text();
	pageIndex.forEach( function(category) {
		category.selected = false;

		if (category.title === selected) {
			category.selected = true;
		}
	});

	updateCategories();
	updateDisplay();
	
	EventBinder.page();
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


