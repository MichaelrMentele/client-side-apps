# Simple Contacts

## What
Client-side Backbone application.

## Overview
There are two states: the contacts 'page', and the contact editor 'page.' You can:
* create a contact
* edit a contact
* delete a contact
* filter the contacts list from a search bar

The main `app.js` file contains a global events controller object for controlling view swaps between the contacts 'page' and the editor 'page'. It also contains some intial contacts to populate the directory.

## Backbone Objects
* Contact - a basic Backbone Model contained by a Contacts collection
* Contacts - is a basic Backbone Collection

### Views
* ContactView - a subview contained by a parent ContactListView.
* ContactListView - renders each Contact in the Contacts collection as a ContactView. Also contains a header view.
* ContactsHeaderView - has an add button and a search bar to filter the contacts using RegExp matching.

The EditorView is a separate page view that is rendered when edit/add events are triggered on the global controller object.
