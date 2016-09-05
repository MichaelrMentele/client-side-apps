////////////////////////
// Helper Collections //
////////////////////////
function fetchStoredList() {
	var storedParams = localStorage.getItem("list");
	return JSON.parse(storedParams);
}

// Object creation factory.
var ObjectFactory = {
	newController: function(storedList) {
		var todoList = this.newTodoList(storedList);
		var pageRenderer = this.newRenderer();

		var controller = Object.create(Controller)
		controller.init({pageRenderer: pageRenderer, todoList: todoList});

		return controller;
	},
	newRenderer: function () {
		console.log("Initializing rendering object...")
		var viewRenderer = Object.create(Renderer);
		viewRenderer.init();
	
		return viewRenderer;
	},
	newTodoList: function (todosParams) {
		console.log("Initializing todo list...")
		
		var list = Object.create(TodoList);
		list.init();
		
		// Write saved todos to todoList
		if (todosParams) {
			self = this;
			todoParams.forEach(function(param) {
				list.add(self.createTodo(param));
			});
		}

		return list;
	},
	newTodo: function(params){
		var todo = Object.create(Todo);
		todo.init(params);

		return todo;
	},
}

var ModalHelpers = {
	getModalInput: function() {
		var title = $("#title_input").val();
		var day = $("#date_inputs > input").val();
		var month = $("#date_inputs > input").next().next().val();
		var year = $("#date_inputs input:last-child").val();
		var description = $("textarea").val();

		if (year != "" && month != "" && day != "") {
			var dueDate = new Date(year, month - 1, day); // Date takes a month as a 0 based index 0 - 11
		}
		

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

		if (todo.hasDueDate) {
			var day = todo.getDay();
			var month = todo.getMonth();
			var year = todo.getYear();

			$("#date_inputs > input").val(day);
			$("#date_inputs > input").next().next().val(month);
			$("#date_inputs input:last-child").val(year);
		}
	},
}


