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
		console.log("matching formattedDate: " + formattedDate + " against patter: " + regx);
		return this.formattedDate().match(regx);
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
	select: function(category) {
		// REFACTOR: Duplication...
		var dateRegEx = /\d\d\/\d\d/;
		var title = category.title;
		var superTitle = category.parent_title;

		// If there is no super title AKA we have selected a super title...
		if (title === "All Todos") {
			console.log("Selecting all todos...")
			return this.todos;
		} else if (title === "Completed") {
			console.log("Selecting all completed todos...")
			return this.completed;
		} 

		if (superTitle === "All Todos") {
			console.log("Selecting sub category of All Todos...")
			if (title === "No Due Date") {
				return this.todos.filter( function(todo) {
					return todo.noDueDate();
				});
			} else if (title.match(dateRegEx).length > 0) {
				return this.todos.filter( function(todo) {
					return todo.matchFormattedDueDate(title);
				});
			} 
		}

		if (superTitle === "Completed") {
			console.log("Selecting sub category of Completed...")
			if (title === "No Due Date") {
				return this.completed.filter( function(todo) {
					return todo.noDueDate();
				});
			} else if (title.match(dateRegEx).length > 0) {
				return this.completed.filter( function(todo) {
					return todo.matchFormattedDueDate(title);
				});
			} 
		}

		console.log("TodoList.select: Invalid category passed in");
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
	createCategories: function(todos) {

	},
	countCategories: function(todos) {
		var categories = this.getCategoryDueDates(todos);
		var uniques = this.collectUniqueCategoryTitles(categories);

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
	getCategoryDueDates: function(todos) {
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
	collectUniqueCategoryTitles: function(categories) {
		return new Set(categories);
	},
	countComplete: function() {
		return this.completed.length;
	},
	countIncomplete: function() {
		return this.incomplete.length;
	},
}

var Category = {
	init: function(params) {
		this.icon_path = params.icon_path;
		this.title = params.title;
		this.todo_count = params.todo_count || 0;
		this.selected = false;
	},
}

var SuperCategory = Object.create(Category);
SuperCategory.subCategories = [];

var SubCategory = Object.create(Category);
SubCategory.todos = [];