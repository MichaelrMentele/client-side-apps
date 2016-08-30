var ContactManager = {
	run: function(params) {
		this.templates = {};
		this.contacts = params.contacts;
		this.getTemplates();
		this.registerPartials();
		this.updatePage();
	},
	getTemplates: function() {
		var self = this;
		$("script[type='text/x-handlebars']").each(function() {
			var $template = $(this); // context of jquery object
			self.templates[$template.attr("id")] = Handlebars.compile($template.html());
		});
	},
	registerPartials: function() {
		var self = this;
		$("[data-type=partial]").each(function () {
			var $partial = $(this); // context of jquery object
			Handlebars.registerPartial($partial.attr("id"), $partial.html());
		});
	},
	updateContacts: function(filteredContacts) {
		this.renderContacts(filteredContacts);
		this.bindEditable();
		this.bindDeletable();
	},
	updatePage: function() {
		this.renderContactsHeader();
		this.renderContacts();
		this.bindAddContact();
		this.bindSearchBar();
		this.bindDeletable();
		this.bindEditable();
	},
	renderContactsHeader: function() {
		// Render Main Header
		var headingTemplate = this.templates.list_heading;
		var headingContainer = $("#main-page-header")
		headingContainer.empty();
		headingContainer.append(headingTemplate());
	},
	renderContacts: function(filteredContacts) {
		var contacts = filteredContacts || this.contacts

		// Render Contacts
		var contactsTemplate = this.templates.contacts;
		var contactsContainer = $("#contacts-container");
		contactsContainer.empty();
		contactsContainer.append(contactsTemplate({contacts: contacts}));
	},
	renderContactEditor: function(editMode, contact) {
		var mode = {editMode: editMode || false};
		var editorInfo = $.extend(mode, contact);

		// Clear Main Page
		this.clearContactsDisplay();

		// Render Editor
		var editTemplate = this.templates.edit_contact;
		var container = $("#editor-container");
		container.empty();
		container.append(editTemplate(editorInfo));

		// Bind Button Events
		this.bindSaveContact();
		this.bindCancelContact();
	},
	clearContactsDisplay: function() {
		$("#main-page-header").empty();
		$("#contacts-container").empty();
	},
	bindSaveContact: function() {
		var self = this;
		$("#submit-edit").on("click", function(event){
			event.preventDefault();
			console.log("Submitting...");
	
			// Get Entered Data
			var name = $("[type='text']").val();
			var email = $("[type='email']").val();
			var phone = $("[type='tel']").val();
			var id = $("[data-id]").data("id"); // If we are editing, then there will be an id
			var contact;

			if (id === "") {
				// Calculate New ID -> !!! REFACTOR: Move to helper function
				var lastSetID = 0;
				self.contacts.forEach(function(contact) {
					if (contact.id > lastSetID) {
						lastSetID = contact.id;
					}
				});
				id = lastSetID + 1; // Make sure it's one more than the last ID
				// Build New Contact
				contact = {id: id, name: name, phone: phone, email: email, img: 100};
				self.contacts.push(contact);
			} else {
				id = Number(id);
				contact = self.getContact(id);
				contact.id = id;
				contact.name = name;
				contact.email = email;
				contact.phone = phone;
			}

			// Render then Clear
			self.updatePage();
			$("#editor-container").empty();
		});
	},
	bindCancelContact: function() {
		var self = this;
		$("#cancel-edit").on("click", function(event){
			event.preventDefault();
			console.log("Canceling");

			// Render then Clear
			self.updatePage();
			$("#editor-container").empty();
		});
	},
	bindAddContact: function() {
		var self = this;
		$("#add_contact").on("click", function(event) {
			event.preventDefault();
			console.log("Adding Contact...")
			self.renderContactEditor(false, {});
		});
	},
	bindSearchBar: function() {
		var self = this;
		$("[name='search-bar']").on("keyup", function(event) {
			console.log("Searching...");
			var searchString = this.value;

	    $('#contacts-container > li').each(function () {
	    	if ($(this).text().search(new RegExp(searchString, "i")) < 0) {
	    		$(this).fadeOut();
	    	} else {
	    		$(this).fadeIn();
	    	}
	    });

		});
	},
	bindDeletable: function() {
		var self = this;
		$(".deletable").on("click", function(event){
			event.preventDefault();
			console.log("Deleting...")
			var id = self.getContactID(event);
			id = Number(id);
			self.delete(id);
			self.updatePage();
		});
	},
	bindEditable: function() {
		var self = this;
		$(".editable").on("click", function(event){
			event.preventDefault();
			console.log("Editing...")
			
			// Get Contact to Edit
			var id = self.getContactID(event);
			var contact = self.getContact(id);
			self.clearContactsDisplay();

			// Render Editor
			self.renderContactEditor(true, contact);
		});
	},
	delete: function(id) {
		var self = this;
		this.contacts.forEach(function(contact, index) {
			if (contact.id === id) {
				self.contacts.splice(index, 1)
			}
		});
	},
	getContact: function(id) {
		var self = this;
		var match;
		this.contacts.forEach(function(contact, index) {
			if (contact.id === id) {
				match = contact;
			}
		});

		return match;
	},
	getContactID: function(event) {
		return $(event.target).closest("[data-id]").data("id")
	},
}

