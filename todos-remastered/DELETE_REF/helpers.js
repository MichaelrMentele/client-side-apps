////////////////////////
// Helper Collections //
////////////////////////
function fetchStoredList() {
	var storedParams = localStorage.getItem("list");
	return JSON.parse(storedParams);
}

// Object creation factory.
// var ObjectFactory = {
// 	newController: function(storedList) {
// 		var todoList = this.newTodoList(storedList);
// 		var pageRenderer = this.newRenderer();

// 		var controller = Object.create(Controller)
// 		controller.init({pageRenderer: pageRenderer, todoList: todoList});

// 		return controller;
// 	},
	// newRenderer: function () {
	// 	console.log("Initializing rendering object...")
	// 	var viewRenderer = Object.create(Renderer);
	// 	viewRenderer.init();
	
	// 	return viewRenderer;
	// },
	// newTodoList: function (todosParams) {
	// 	console.log("Initializing todo list...")
		
	// 	var list = Object.create(TodoList);
	// 	list.init();
		
	// 	// Write saved todos to todoList
	// 	if (todosParams) {
	// 		self = this;
	// 		todoParams.forEach(function(param) {
	// 			list.add(self.createTodo(param));
	// 		});
	// 	}

	// 	return list;
	// },
	// newTodo: function(params){
	// 	var todo = Object.create(Todo);
	// 	todo.init(params);

	// 	return todo;
	// },
}



