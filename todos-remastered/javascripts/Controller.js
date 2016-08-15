
var Controller = {
	init: function(params) {
		this.pageRenderer = params.pageRenderer;
		this.todoList = params.todoList;
		this.bindTodoEditor();
		this.bindRememberTodos();
	},
	page: function() {
		this.bindDeletable();
		this.bindEditable();
		this.bindSelectable();
		this.bindTodoToggleUpdate();
	},
	bindDeletable: function () {
		var self = this;
		$("a[href='#deletable']").on("click", function(event){
			event.preventDefault();
			self.deleteTodo(event.target);
			self.updatePage();
		});
	},
	bindTodoToggleUpdate: function() {
		var self = this;
		$(".todo_toggle").on("click", function(event) {
			var index = self.findTodoIndex(event.target);
			self.todoList.todos[index].toggle();
			console.log("Checkbox: " + index + " Toggled...")
			self.updatePage();
		});
	},
	bindEditable: function() {
		var self = this;
		$("a[href='#editable']").on("click", function(event){
			event.preventDefault();
			console.log("Editing...");
			var index = self.findTodoIndex(event.target);
			var todo = self.todoList.todos[index];

			self.todoEdit(todo);
			self.deleteTodo(event.target);
			self.updatePage();
		});
	},
	bindSelectable: function() {
		var self = this;
		// Binds selectable to categories
		$("a[href='#selectable']").on("click", function(event){
			event.preventDefault();
			console.log("Selecting");

			$(".selected").removeClass("selected");
			$(event.target.closest("tr")).addClass("selected");

			self.pageRenderer.updateDisplay();
			self.page();
		});
	},
	// Handle Create New Todo
	bindTodoEditor: function(){
		var self = this;
		$("#new_todo").on("click", function(event){
			event.preventDefault();
			self.todoEdit();
		});
	},
	bindRememberTodos: function() {
		$(window).on("unload", function(event){
			localStorage.setItem("list", JSON.stringify(todoList.todos));
		});
	},
	findTodoIndex: function(todo) {
		return Number($(todo).closest("li").data('id'));
	},
	deleteTodo: function(todo) {
		index = this.findTodoIndex(todo);
		console.log("Deleting Todo " + index);
		
		this.todoList.delete(index);
	},
	// References globals ObjectFactory and ModalHelpers
	saveTodo: function(complete) {
		console.log("Saving todo...");

		var complete = complete || false;
		var params = ModalHelpers.getModalInput();
		params.complete = complete;
		
		todo = ObjectFactory.createTodo(params);
		this.todoList.add(todo);
	},

	todoEdit: function(todo) {
		console.log("Enter todo details...");
		var self = this;

		// Bring up todo editor
		$("#modal").addClass("modal");
		this.pageRenderer.modal();

		// If current todo, import info
		if (todo) {	ModalHelpers.importTodoInfo(todo) };

		// Bind Handle Save
		$("#save_todo").on("click", function(event){
			event.preventDefault();
			self.saveTodo();
			self.updatePage();
			ModalHelpers.cleanUpModal();
		});

		// Bind Handle Save as Complete
		$("#save_and_complete_todo").on("click", function(event){
			event.preventDefault();
			
			self.saveTodo(true);
			self.updatePage();
			ModalHelpers.cleanUpModal();
		});
	},
	updateCategories: function() {
		// Update counts and returns object of counts
		this.todoList.generateBasicCategories();
		var allCatCounts = this.todoList.countCategories(todoList.todos);
		var completedCatCounts = this.todoList.countCategories(todoList.completed);
		return {all: allCatCounts, completed: completedCatCounts};
	},
	// !!! Refactor: Redundant parallel solutions for selection memory...
	updatePage: function() {
		var superCategories = this.todoList.superCategories;
		var superSelectedTitle = $(".selected a").text();

		// Remembers super category selection
		superCategories.forEach( function(category) {
			category.selected = false;
			if (category.title === superSelectedTitle) {
				category.selected = true;
			}
		});

		// Remebers sub category selection
		// !!! Broken for duplicate category names (AKA no due date)
		var subCategoryid= $(".category.selected").data("categoryid");

		var catCounts = this.updateCategories();
		this.pageRenderer.updateDisplay();
		this.pageRenderer.counts(this.todoList, this.todoList.superCategories, catCounts);

		this.page();

	},
}
	
