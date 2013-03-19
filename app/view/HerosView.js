var HerosView = Jr.View.extend({
    initialize:function () {
        app.di.heros.fetch();
        app.di.heros.on('add reset', this.render, this);
        this.query = false;
    },
    filterHero: function(){
      var query = this.$el.find("input.filter").val();
      if(query.length > 0){
        this.$el.find('ul.list li').css('display','none');
        this.$el.find('ul.list li a[dataname~="'+query+'"]').each(function(){
          console.log(this)
          this.parent().css("display","block");
        })
      }else{
        this.$el.find('ul.list li').css('display','block');
      }
    },
     render: function(){
      var template = tpl.get('HeroList');
      this.$el.html(_.template(template));
      var self = this;
      
      app.di.heros.each(function(hero){
        $(self.el).find("ul.list").append(new HeroListItemView({model:hero}).render().el);
      });
        
      return this;
    },
    events: {'click .hero.item':'heroClick','keyup input.filter' : 'filterHero'}
    ,
heroClick: function(elm){
      var uid=$(elm.currentTarget).attr("hero-id");
        Jr.Navigator.navigate('hero/'+uid,{
              trigger: true, animation: { type: Jr.Navigator.animations.SLIDE_STACK, direction: Jr.Navigator.directions.LEFT }
            });
    }
});

var HeroListItemView = Jr.View.extend({
    tagName:"li",
    initialize:function () {
        //console.log(this.model)
        this.model.bind("change", this.render, this);
       // this.model.bind("destroy", this.close, this);
    },
    render:function () {
    	templ = _.template(tpl.get('HeroListItem'));
      this.$el.html(templ(this.model.attributes));
      return this;
    }

});
