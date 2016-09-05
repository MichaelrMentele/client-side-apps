
var Controller = {
	init: function(params) {
		this.pageRenderer = params.pageRenderer;
		this.todoList = params.todoList;

		// Initial Selection On Load
		this.selectedSectionID = "all_todos";
		this.selectedCategory = "All Todos";

		this.bindTodoEditor();
		this.bindRememberTodos();
	},
	updatePage: function() {
		// Sort Todo List
		this.todoList.sort();
		this.todoList.setIDs();

		// Get data for, and then render todo display
		var categoryName = this.selectedCategory;
		var selectedSection = this.selectedSectionID;
		var list;

		if (categoryName === "All Todos") {
			list = this.todoList.getAllTodos();
		} else if (categoryName === "Completed") {
			list = this.todoList.getCompleted();
		} else if (selectedSection === "all_todos") {
			list = this.todoList.getSublist(categoryName);
		} else if (selectedSection === "completed_todos") {
			list = this.todoList.getSublist(categoryName);
			list = list.filter(function(todo) {
				return todo.complete;
			});
		}

		this.pageRenderer.displayCategoryTodos(list, categoryName);

		// Get data for, and then render sidebar
		var allTodos = this.todoList.getAllTodos();
		var allTodosCount = this.todoList.getAllCount();
		var allCatCounts = this.todoList.getSubCategoryCounts(allTodos);

		var completedTodos = this.todoList.getCompleted();
		var completedTodosCount = this.todoList.getCompletedCount();
		var completeCatCounts = this.todoList.getSubCategoryCounts(completedTodos);
		this.pageRenderer.displaySidebar(allTodosCount, allCatCounts, completedTodosCount, completeCatCounts);

		// Add back selected status
		$("#" + this.selectedSectionID + " a.selectable:contains('" + this.selectedCategory + "')").closest("tr").addClass("selected");
		
		this.rebind();
	},
	rebind: function() {
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
			var index = self.findTodoID(event.target);
			self.todoList.todos[index].toggle();
			console.log("Checkbox: " + index + " Toggled...")
			self.updatePage();
		});
	},
	bindEditable: function() {
		var self = this;
		$("a.editable").on("click", function(event){
			event.preventDefault();
			console.log("Editing...");
			var index = self.findTodoID(event);
			var todo = self.todoList.todos[index];

			self.todoEdit(todo);
			self.deleteTodo(event);
			self.updatePage();
		});
	},
	bindSelectable: function() {
		var self = this;
		// Binds selectable to categories
		$("a.selectable").on("click", function(event){
			console.log("Selectinging...")
			event.preventDefault();

			$(".selected").removeClass("selected");
			$(event.target.closest("tr")).addClass("selected");

			// Save selection to protect against rerender
			self.selectedCategory = $(".selected a").text() || "All Todos";
			self.selectedSectionID = $(".selected").parents("section.status_panel").attr("id") || "all_todos";

			self.updatePage();
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
	findTodoID: function(event) {
		return Number($(event).closest("li").data('id'));
	},
	deleteTodo: function(event) {
		var id = this.findTodoID(event);
		console.log("Deleting Todo " + id);
		
		this.todoList.delete(id);
	},
	saveTodo: function(complete) {
		// References globals ObjectFactory and ModalHelpers
		console.log("Saving todo...");

		var complete = complete || false;
		var params = ModalHelpers.getModalInput();
		params.complete = complete;
		
		todo = ObjectFactory.newTodo(params);
		this.todoList.add(todo);
	},

	todoEdit: function(todo) {
		console.log("Enter todo details...");
		var self = this;

		// Bring up todo editor
		$("#modal").addClass("modal");
		this.pageRenderer.modal();

		// If current todo, import info into modal, writes directly to html
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
}
	
