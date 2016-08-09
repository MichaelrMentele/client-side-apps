var Todo = {
	init: function(params){
		this.title = params.title || "";
		this.dueDate = params.dueDate || "No Due Date";
		this.description = params.description || "";
		this.complete = params.complete || false;
	},
	isComplete: function() {
		return this.complete;
	},
}