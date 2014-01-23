var appleView = Backbone.View.extend({
	initialize : function(){
		// are the outer parentheses below really necessary?
		this.model = new (Backbone.Model.extend({}));
		this.model.bind('change', this.render, this);
		this.bind('spinner', this.showSpinner, this);
	},
	template : _.template(
		'<figure>' +
		'<img src="<%= attributes.url %>"/>' +
		'<figcaption><%= attributes.name %></figcaption>' +
		'</figure>'
		),
	templateSpinner : '<img src="img/spinner.gif" width="30"/>',
	loadApple : function(appleName){
		this.trigger('spinner');
		// show spinner GIF image
		var view = this;
		// we'll need to access that inside of a closure
		// "this is just for scoping issues so we can access view within the code below"
		setTimeout(function(){
			// simulate real time lage when
			// fetching data from the remote server
			view.model.set(view.collection.where({
				name : appleName
			})[0].attributes);
		}, 1000);
	},
	render : function(appleName) {
		var appleHtml = this.template(this.model);
		$('body').html(appleHtml);
	},
	showSpinner : function(){
		$('body').html(this.templateSpinner);
	}
});