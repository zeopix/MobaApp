var HeroDetailView = Jr.View.extend({
    initialize:function () {
        app.di.builds.fetch({data:{hero:this.options.hero}});
        app.di.builds.on('add reset', this.render, this);
    },
     render: function(){
      var template = tpl.get('HeroBuildList');
      this.$el.html(_.template(template));
      var self = this;
      app.di.builds.each(function(hero){
        $(self.el).find("ul.list").append(new HeroBuildListItemView({model:hero}).render().el);
      });
        
      return this;
    },
    events: {'click .build.item':'buildClick', 'click .back.button':'goBack'  },
  goBack: function(){
    window.history.back();
    
  },
    buildClick: function(elm){
      var uid=$(elm.currentTarget).attr("build-id");

        Jr.Navigator.navigate('hero/'+this.options.hero+'/build/'+uid,{
              trigger: true, animation: { type: Jr.Navigator.animations.SLIDE_STACK, direction: Jr.Navigator.directions.LEFT }
            });
    }
});

var HeroBuildListItemView = Jr.View.extend({
    tagName:"li",
    initialize:function () {
        //console.log(this.model)
        this.model.bind("change", this.render, this);
       // this.model.bind("destroy", this.close, this);
    },
    render:function () {
    	templ = _.template(tpl.get('HeroBuildListItem'));
      this.$el.html(templ(this.model.attributes));
      return this;
    }

});
