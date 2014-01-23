var appleData = [
	{
		name: 'fuji',
		url: 'img/fuji.jpg'
	},
	{
		name: 'gala',
		url: 'img/gala.jpg'
	}
];

var app;

var router = Backbone.Router.extend({
	routes : {
		'' : 'home',
		'apples/:appleName' : 'loadApple'
	},
	initialize : function(){
		var apples = new Apples();
		apples.reset(appleData);
		this.homeView = new homeView({ collection : apples });
		this.appleView = new appleView({ collection : apples });
	},
	home : function(){
		this.homeView.render();
	},
	loadApple : function(appleName){
		this.appleView.loadApple(appleName);
	}
});

var homeView = Backbone.View.extend({
	el : 'body',
	listEl : '.apples-list',
	cartEl : '.cart-box',
	template : _.template(
		'Apple data: '+
		'<ul class="apples-list"></ul>'+
		'<div class="cart-box"></div>'
		),
	initialize : function(){
		this.$el.html(this.template);
		this.collection.on('addToCart', this.showCart, this);
	},
	showCart : function(appleModel){
		$(this.cartEl).append(appleModel.attributes.name+'<br/>');
	},
	render : function(){
		view = this;
		this.collection.each(function(apple){
			var appleSubView = new appleItemView({ model : apple });
			appleSubView.render();
			$(view.listEl).append(appleSubView.$el);
		});
	}
});

var Apples = Backbone.Collection.extend({});

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

var appleItemView = Backbone.View.extend({
	tagName : 'li',
	template : _.template(
		'<a href="#apples/<%=name%>" target="_blank">' +
		'<%=name%>' + 
		'</a>&nbsp;<a class="add-to-cart" href="#">buy</a>'
		),
	events : { 'click .add-to-cart' : 'addToCart'},
	render : function(){
		this.$el.html(this.template(this.model.attributes));
	},
	addToCart : function(){
		this.model.collection.trigger('addToCart', this.model);
	}
});

$(document).ready(function(){
	app = new router;
	Backbone.history.start();
})			