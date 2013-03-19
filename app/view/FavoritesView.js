var FavoritesView = Jr.View.extend({
    initialize:function () {
        app.di.favorites.fetch({local:true});
        app.di.favorites.on('add reset', this.render, this);
    },
    events: { 
      'click .back.button':'goBack'
    },
    goBack: function(){
      window.history.back();
    },
     render: function(){
      var template = tpl.get('Favorites');
      this.$el.html(_.template(template));
      var self = this;
      app.di.favorites.each(function(hero){
        $(self.el).find("ul.list").append(new FavoritesItemView({model:hero}).render().el);
      });
        
      return this;
    },
    events: {'click .favorite.item':'favoriteClick'}
    ,
favoriteClick: function(elm){
      var hid=$(elm.currentTarget).attr("hero-id");
      var bid=$(elm.currentTarget).attr("build-id");

        Jr.Navigator.navigate('hero/'+hid+"/build/"+bid,{
              trigger: true, animation: { type: Jr.Navigator.animations.SLIDE_STACK, direction: Jr.Navigator.directions.LEFT }
            });
    }
});

var FavoritesItemView = Jr.View.extend({
    tagName:"li",
    render:function () {
    	templ = _.template(tpl.get('FavoritesItem'));
      this.$el.html(templ(this.model.attributes));
      return this;
    }

});
