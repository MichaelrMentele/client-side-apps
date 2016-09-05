// SUMMARY
// A TodoList has todos. 

// ////////////////
// Data Objects //
// ////////////////

// Template for dynamic user created object with form submission.
var Todo = {
	init: function(params){
		this.title = params.title || "Task";
		this.dueDate = params.dueDate || "No Due Date"; // Expects Date() object
		this.description = params.description || "";
		this.complete = params.complete || false;
		this.id = 9999;
	},
	toggle: function() {
		this.complete = !this.complete;
	},
	isComplete: function() {
		return this.complete;
	},
	hasDueDate: function() {
		return this.dueDate instanceof Date;
	},
	getYear: function() {
		if (this.hasDueDate) {
			var fullYear = this.dueDate.getFullYear();
			return String(fullYear).slice(-2);
		}
	},
	getMonth: function() {
		if (this.hasDueDate) {
			return this.dueDate.getMonth() + 1;
		}
	},
	getDay: function() {
		if (this.hasDueDate) {
			return this.dueDate.getDate();
		}
	},
	getCategory: function() {
		if (this.hasDueDate()) {
			return this.getMonth() + "/" + this.getYear();
		} else {
			return "No Due Date";
		}
	},
	getID: function() {
		return this.id
	},
	setID: function(newID) {
		this.id = newID;
	},
}

var TodoList = {
	init: function() {
		this.todos = [];
	},
	add: function(todo) {
		this.todos.push(todo);
	},
	sort: function() {
		// mutates todos array
		var completed = this.getCompleted();
		completed = this.sortByDate(completed);

		var incomplete = this.getIncomplete();
		incomplete = this.sortByDate(incomplete);

		this.todos = incomplete.concat(completed);
	},
	sortByDate: function(sublist) {
		var noDueDate = [];
		var dueDates = [];
		sublist.forEach(function(todo, id) {
			if (todo.hasDueDate()) {
				dueDates.push(todo);
			} else {
				noDueDate.push(todo);
			}
		});

		dueDates = dueDates.sort(function(a, b) {
			a.dueDate.getTime() - b.dueDate.getTime();
		});

		return noDueDate.concat(dueDates);
	},
	setIDs: function() {
		this.todos.forEach(function(todo, idx) {
			todo.setID(idx);
		});
	},
	delete: function(id) {
		this.todos.splice(id, 1); // id is equal to an index in this list
	},
	getAllTodos: function() {
		return this.todos;
	},
	getAllCount: function() {
		return this.getAllTodos().length;
	},
	getCompleted: function() {
		var completed = this.todos.filter(function(todo) {
			return todo.complete;
		});

		return completed;
	},
	getCompletedCount: function() {
		return this.getCompleted().length;
	},
	getIncomplete: function() {
		var incomplete = this.todos.filter(function(todo) {
			return !todo.complete;
		});

		return incomplete;
	},
	getSublist: function(targetCategory) {
		var sublist = [];
		this.todos.filter(function(todo) {
			if (targetCategory === todo.getCategory()) {
				sublist.push(todo);
			}
		});
		return sublist // [todo, todo ... ]
	},
	getSubCategoryNames: function(sublist) {
		var todos = sublist || this.todos; 
		var names = [];

		todos.forEach( function(todo) {
			names.push(todo.getCategory());
		});

		return names; 
	},
	getUniqueCategoryNames: function(sublist) {
		return new Set(this.getSubCategoryNames(sublist));
	},
	getSubCategoryCounts: function(sublist) {
		var allNames = this.getSubCategoryNames(sublist);
		var uniqueNames = this.getUniqueCategoryNames(sublist);
		var catCounts = []; 

		uniqueNames.forEach(function(unique_name) {
			var matchedNames = allNames.filter(function(name) {
				return name === unique_name;
			});

			catCounts.push({title: unique_name, todo_count: matchedNames.length});
		});

		return catCounts; // [{title: name, todo_count: count}, {}, ... ]
	},
}
