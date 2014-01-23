define(['js/apple-item.tmp'], function(appleItemTpl){
	return Backbone.View.extend({
		tagName : 'li',
		template : _.template(appleItemTpl),
		events : { 'click .add-to-cart' : 'addToCart'},
		render : function(){
			this.$el.html(this.template(this.model.attributes));
		},
		addToCart : function(){
			this.model.collection.trigger('addToCart', this.model);
		}
	});
});