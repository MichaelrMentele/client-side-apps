////////////////////////
// Helper Collections //
////////////////////////
// Contains ObjectFactory and ModalHelpers function collections.

// Object creation factory.
var ObjectFactory = {
	fetchStoredList: function() {
		var storedParams = localStorage.getItem("list");
		return JSON.parse(storedParams);
	},
	newPanels: function () {
		var allTodosPanel = Object.create(Category);
		allTodosPanel.init({icon_path: "assets/todos_icon.png", title: "All Todos"});

		var completedTodosPanel = Object.create(Category);
		completedTodosPanel.init({icon_path: "assets/completed_icon.png", title: "Completed"});

		return [allTodosPanel, completedTodosPanel]
	},
	newRenderer: function () {
		console.log("Initializing rendering object...")
		var templateSelector = "script[type='text/x-handlebars']";
		var partialSelector = "[data-type=partial]";

		var viewRenderer = Object.create(Renderer);
		viewRenderer.init(templateSelector, partialSelector)
	
		return viewRenderer;
	},
	newTodoList: function (todoParams) {
		console.log("Initializing todo list...")
		
		var list = Object.create(TodoList);
		list.init();
		
		// Write saved todos to todoList
		if (todoParams) {
			self = this;
			todoParams.forEach(function(param) {
				list.add(self.createTodo(param));
			});
		}

		return list;
	},
	createTodo: function(params){
		var todo = Object.create(Todo);
		todo.init(params);

		return todo;
	},
}

var ModalHelpers = {
	getModalInput: function() {
		var title = $("#title_input").val();
		var dueDate = $("#date_inputs > input").val() + $("#date_inputs > input").next().next().val() + $("#date_inputs input:last-child").val();
		var description = $("textarea").val();

		return {title: title, dueDate: dueDate, description: description};
	},
	cleanUpModal: function() {
		$("#modal").removeClass("modal");
		$("#modal").empty();
	},
	importTodoInfo: function(todo) {
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
	},
}


