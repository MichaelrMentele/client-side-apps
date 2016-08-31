var terrence = {
				        name : 'Terrence S. Hatfield',
				        phone: '651-603-1723',
				        email: 'TerrenceSHatfield@rhyta.com',
				        img: 0,
				      };
var chris = {
			        name : 'Chris M. Manning',
			        phone: '513-307-5859',
			        email: 'ChrisMManning@dayrep.com',
			        img: 1,
			      };
var ricky = {
			        name : 'Ricky M. Digiacomo',
			        phone: '918-774-0199',
			        email: 'RickyMDigiacomo@teleworm.us',
			        img: 2,
			      };
var michael = {
				        name : 'Michael K. Bayne',
				        phone: '702-989-5145',
				        email: 'MichaelKBayne@rhyta.com',
				        img: 3,
				      };
var john =  {
			        name : 'John I. Wilson',
			        phone: '318-292-6700',
			        email: 'JohnIWilson@dayrep.com',
			        img: 4,
			      };
var rodolfo = {
				        name : 'Rodolfo P. Robinett',
				        phone: '803-557-9815',
				        email: 'RodolfoPRobinett@jourrapide.com',
				        img: 100,
				      };
var initialContacts = [
									      terrence,
									      chris,
									      ricky,
									      michael,
									      john,
									      rodolfo
     									];

var contactsView = new ContactListView(initialContacts);
var editorView = new EditorView();

var controller = _.extend({}, Backbone.Events);
controller.on('viewSwap', function(newView, contact) {
	if (newView === 'editor') {
		// clear contacts view
		contactsView.header.$el.empty();
		$("#contacts-container").empty();

		// Edit or Create
		var editMode = contact !== undefined;
		var contact = contact || {};

		// Render
		editorView.render(false, contact);
	} else if (newView === 'contactList') {
		editorView.$el.empty();
		contactsView.render();
	}	else {
		console.log("Error: Invalid View");
	}
});

controller.on('save', function() {
	console.log('Save Triggered')

	// Get Entered Data
	var id = $("[data-id]").data("id"); // If we are editing, then there will be an id
	var name = $("[type='text']").val();
	var email = $("[type='email']").val();
	var phone = $("[type='tel']").val();
	
	// Create/Edit contact
	if (id === "") {
		contactsView.collection.add({name: name, phone: phone, email: email, img: 100});
	} else {
		id = Number(id);
		var contact = contactsView.collection.findWhere({id: id});
		contact.set("id", id);
		contact.set("name", name);
		contact.set("email", email);
		contact.set("phone", phone);
	}
	controller.trigger('viewSwap', 'contactList');
});
