var app;
var router = Backbone.Router.extend({
	routes : {
		'' : 'home'
	},
	initialize : function(){
		// some code to execute
		// when the object is instantiated
	},
	home : function(){
		this.homeView = new homeView();
		this.homeView.render();
	}
});

var homeView = Backbone.View.extend({
	el : 'body',
	template : _.template('Hello World'),
	render : function(){
		this.$el.html(this.template({}));
	}
});

$(document).ready(function(){
	app = new router;
	Backbone.history.start();
})			