// SUMMARY
// The Sidebar has Panels, which have Categories, which have todos. 
// Categories (and their todos) are displayed to the Display when selected.

/////////////
// Objects //
/////////////

// Sidebar should be used as a singleton that contains all other persistent data objects.
var Sidebar = {
	init: function(params) {
		this.panels = params.panels;
	},
	getPanel: function(index) {
		return this.panels[index];
	},
}

// Note: A Panel is also a super category. 
// To Refactor: There is common behavior among objects.
var Panel = {
	init: function(params) {
		this.icon_path = params.icon_path || undefined;
		this.title = params.title || "No Due Date";
		this.categories = [];
		this.todos_in_category = this.calculateTodos();
		this.todos = []
		console.log("Category: " + this.title + " initialized.")
	},
	createCategory: function(params) {
		var newCat = Object.create(Category);
		newCat.init(params);

		return newCat;
	},
	addCategory: function(category){
		this.categories.push(category);
	},	
	hasNoSubCategories: function() {
		return this.categories.length === 0;
	},
	sortCategories: function() {
		var sortedCategories = this.categories.sort(function(curCat, nextCat) {
			return curCat.getSortValue() - nextCat.getSortValue(); // Refactor: same sort function for this and todos
		});

		return sortedCategories;
	},
	calculateTodos: function() {
		if (this.hasNoSubCategories) {
			return 0;
		} else {
			this.categories.reduce(function(sum, category) {
				return sum + category.calculateTodos();
			}, 0);
		}		
	},
	loadTodos: function() {
		var todos = [];
		this.categories.forEach( function(category) {
			todos.push(category.todos);
		});

		return $.map(todos, function(ele) {return ele}); // flatten array
	},
}

// Template for dynamically generated object based on user created todos.
var Category = {
	init: function(params) {
		this.title = params.title; // Refactor: title is poor name choice
		this.todos = [];
		this.todos_in_category = this.calculateTodos();
		this.completeTodos = [];
	},
	calculateTodos: function() {
		return this.todos.length
	},
	sortTodos: function() {
		var sortedTodos = this.todos.sort(function(curTodo, nextTodo) {
			return curTodo.sortValue - nextTodo.sortValue;
		});

		return sortedTodos;
	},
	addTodo: function(todo) {
		this.todos.push(todo);
	},
	getSortValue: function() {
		var monthyear = this.title.split("/");
		var yearmonth = [];

		yearmonth.push(monthyear[1]);
		yearmonth.push(monthyear[0]);
		return Number(yearmonth.join(""));
	},
}

// Template for dynamic user created object with form submission.
var Todo = {
	init: function(params){
		this.title = params.title || "Task";
		this.dueDate = params.dueDate || "No Due Date"; //form of "001122"
		this.sortValue = this.getSortValue();
		this.description = params.description || "";
		this.complete = params.complete || false;
	},
	isComplete: function() {
		return this.complete;
	},
	noDueDate: function() {
		return this.dueDate === "No Due Date";
	},
	getYear: function() {
		return this.dueDate.substring(4, 6);
	},
	getMonth: function() {
		return this.dueDate.substring(2, 4);
	},
	getDay: function() {
		return this.dueDate.substring(0, 2);
	},
	getSortValue: function() {
		if (this.noDueDate()) {
				return 0;
		} 

		var yearValue = this.getYear() * 10000;
		var monthValue = this.getMonth() * 100;
		var dayValue = this.getDay() * 1;

		return yearValue + monthValue + dayValue;
	},
}


