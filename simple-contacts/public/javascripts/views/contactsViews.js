var ContactView = Backbone.View.extend({
	events: {
		'click .deletable': 'deleteContact',
		'click .editable': 'editContact'
	},
	tagName: 'div',
	template: Handlebars.compile($("#contact").html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	deleteContact: function(event) {
		debugger;
		event.preventDefault();
		this.model.destroy();
		this.remove();
	},
	editContact: function() {
		controller.trigger('viewSwap', 'editor', this.model.toJSON());
	},
});

// Add Contact and Filter Contacts
var ContactsHeaderView = Backbone.View.extend({
	events: {
		'click #add_contact': 'triggerEditor',
		"keyup [name='search-bar']": 'triggerFilter',
	},
	el: '#main-page-header',
	template: Handlebars.compile($("#list_heading").html()),
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	triggerEditor: function() {
		controller.trigger('viewSwap', 'editor')
	},
	triggerFilter: function(event) {
		console.log("Filtering");
		var searchString = $(event.target).val();
		console.log(searchString);
	  $('#contacts-container li').each(function () {
	  	if ($(this).text().search(new RegExp(searchString, "i")) < 0) {
	  		$(this).fadeOut();
	  	} else {
	  		$(this).fadeIn();
	  	}
	  });
	},
});

// Contact Page View
var ContactListView = Backbone.View.extend({
	el: "#contacts-container",
	events: {
	},
	initialize: function(initialContacts) {
		this.header = new ContactsHeaderView();
		this.collection = new Contacts(initialContacts);
		this.render();
	},
	render: function(){
		this.header.render();
		this.collection.each(function(contact){
			var contactView = new ContactView({model: contact});
			this.$el.append(contactView.render().el);
		}, this);
	},
});
