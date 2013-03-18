var BuildView = Jr.View.extend({
    initialize:function () {
      app.di.builds.on('add reset', this.render, this);
      app.di.heros.on('add reset', this.render, this);
      
    },
    renderStats: function(){
      var template = _.template(tpl.get('Build/Stats'));
      this.$el.find(".content-padded").html(template({build:this.build.attributes,hero:this.hero.attributes,spells:app.di.spells}));
    },
    renderMastery: function(){
      var template = _.template(tpl.get('Build/Masteries'));
      this.$el.find(".content-padded").html(template({build:this.build.attributes,hero:this.hero.attributes,masteries:app.di.masteries}));
    },
    renderRunes: function(){
      var template = _.template(tpl.get('Build/Runes'));
      this.$el.find(".content-padded").html(template({build:this.build.attributes,runes:app.di.runes}));
    },
    renderAbilities: function(){
      var template = _.template(tpl.get('Build/Abilities'));
      this.$el.find(".content-padded").html(template({build:this.build.attributes,abilities:app.di.abilities}));
    },
    renderItems: function(){
      var template = _.template(tpl.get('Build/Items'));
      this.$el.find(".content-padded").html(template({build:this.build.attributes,items:app.di.items}));
    },
    selectTab: function(tab){
      this.$el.find(".menu.build li.active").removeClass('active');
      this.$el.find(".menu.build li."+tab).addClass('active');
    },
    events: { 
      'click .back.button':'goBack',
      'click .build.menu .stats a':'goStats',
      'click .build.menu .runes a':'goRunes',
      'click .build.menu .abilities a':'goAbilities',
      'click .build.menu .items a':'goItems',
      'click .build.menu .masteries a':'goMastery',
    },
    goBack: function(){
      window.history.back();
    },
    goRunes: function(){
      this.selectTab('runes');
      this.renderRunes();
    },
    goMastery: function(){
      this.selectTab('masteries');
      this.renderMastery();
    },
    goAbilities: function(){
      this.selectTab('abilities');
      this.renderAbilities();
    },
    goItems: function(){
      this.selectTab('items');
      this.renderItems();
    },
    goStats: function(){
      this.selectTab('stats');
      this.renderStats();
    }
    ,
     render: function(){
      var builds = app.di.builds.where({sid:parseInt(this.options.build)});
      var heros = app.di.heros.where({sid:parseInt(this.options.hero)});

      this.build = false;
      this.hero = false;
      if(builds.length > 0){
        this.build = builds[0];
      }
      if(heros.length > 0){
        this.hero = heros[0];
      }
      console.log(this.build)
      
      var template = _.template(tpl.get('Build'));
      this.$el.html(template({build:this.build,hero:this.hero.attributes}));    

      if(this.build){ 
        this.renderStats();
      }
      
      return this;
    }
});
