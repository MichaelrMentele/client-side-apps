var Contact = Backbone.Model.extend({
	defaults: {
		name: 'Unknown',
		phone: 'Unknown',
		email: 'Unknown',
		img: 100,
	},
	initialize: function() {
		Contact.last_id += 1;
		this.attributes.id = Contact.last_id;
	}
});

Contact.last_id = 0;