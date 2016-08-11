// SUMMARY
// A TodoList has todos. 

//////////////////
// Data Objects //
//////////////////

// Template for dynamic user created object with form submission.
var Todo = {
	init: function(params){
		this.title = params.title || "Task";
		this.dueDate = params.dueDate || "No Due Date"; //form of "001122"
		this.description = params.description || "";
		this.complete = params.complete || false;
		this.sortValue = this.getSortValue();
	},
	toggle: function() {
		this.complete = !this.complete;
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
	matchDueDate: function(regx) {
		return !!this.dueDate.match(regx);
	},
	matchFormattedDueDate: function(regx) {
		var formattedDate = this.formattedDate();
		return !!formattedDate.match(regx);
	},
	formattedDate: function() {
		return this.getMonth() + "/" + this.getYear();
	},
}

var TodoList = {
	init: function() {
		this.todos = []
	},
	add: function(todo) {
		this.todos.push(todo);
	},
	delete: function(index) {
		this.todos.splice(index, 1);
	},
	select: function(tag) {
		// REFACTOR: Duplication...
		if (tag === "All Todos") {
			tag = /.*/;
			return this.todos.filter( function(todo) {
				return todo.matchDueDate(tag)
			});
		} else if (tag === "Completed Todos") {
			tag = /.*/;
			return this.todos.filter( function(todo) {
				return todo.matchDueDate(tag) && todo.complete;
			});
		} else if (tag === "No Due Date") {
			return this.todos.filter( function(todo) {
				return todo.noDueDate();
			});
		} else if (tag.match(/..\/../)) {
			return this.todos.filter( function(todo) {
				return todo.matchFormattedDueDate(tag)
			});
		} else {
			console.log("Invalid Tag");
		}
	},
	generateBasicCategories: function() {
		var completed = this.todos.filter( function(todo) {
			return todo.complete;
		});

		var incomplete = this.todos.filter(function(todo) {
			return !todo.complete;
		});

		this.completed = completed;
		this.incomplete = incomplete;
	},
	countCategories: function(todos) {
		var categories = this.getCategories(todos);
		var uniques = this.collectUniqueCategories(categories);

		var catCounts = [];
		uniques.forEach(function(cat){
			var array = categories.filter(function(ele){
				return ele === cat;
			});

			var catCount = {title: cat, todo_count: array.length}
			catCounts.push(catCount);
		});

		return catCounts;
	},
	getCategories: function(todos) {
		var categories = [];
		todos.forEach(function(todo){
			if (todo.noDueDate()) {
				categories.push(todo.dueDate);
			} else {
				categories.push(todo.formattedDate())
			}
		});
		return categories;
	},
	collectUniqueCategories: function(categories) {
		return new Set(categories);
	},
	countComplete: function() {
		return this.completed.length;
	},
	countIncomplete: function() {
		return this.incomplete.length;
	},
}
