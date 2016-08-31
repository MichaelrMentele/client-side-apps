var EditorView = Backbone.View.extend({
	events: {
		"click #cancel-edit": "triggerContactList",
		"click #submit-edit": "triggerSave",
	},
	el: "#editor-container",
	template: Handlebars.compile($("#edit_contact").html()),
	render: function(editMode, contact) {
		var mode = {editMode: editMode || false};
		var editorInfo = $.extend(mode, contact);

		this.$el.html(this.template(editorInfo));
		return this;
	},
	triggerContactList: function() {
		controller.trigger('viewSwap', 'contactList');
	},
	triggerSave: function() {
		controller.trigger('save');
	},
});

