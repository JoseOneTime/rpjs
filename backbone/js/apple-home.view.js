define(['js/apple-home.tmp', 'js/apple-item.view'], function(
	appleHomeTpl,
	appleItemView
	){
	return Backbone.View.extend({
		el : 'body',
		listEl : '.apples-list',
		cartEl : '.cart-box',
		template : _.template(appleHomeTpl),
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
});