var AppRouter = Jr.Router.extend({
    routes: {
      '': 'heros',
      'hero/:id': 'hero',
      'hero/:hero/build/:id': 'build',
    },
    heros: function(){
      var herosView = new HerosView();
      this.renderView(herosView);
    },
    hero: function(id){
      var heroView = new HeroDetailView({hero:id});
      this.renderView(heroView);
    },
    build: function(hero,id){
      var buildView = new BuildView({build:id,hero:hero});
      this.renderView(buildView);
    },
    di: {
      builds : new Builds(),
      heros : new Heros(),
      runes: new Runes(),
      masteries: new Masteries(),
      spells: new Spells(),
      items: new Items(),
      abilities: new Abilities()
    }

});
   

$(document).ready(function () {
   
    //Asi cargamos las vistas directamente en cache
    tpl.loadTemplates(
      [ "HeroList","HeroListItem","HeroBuildList","HeroBuildListItem","Menu",
      "Build","Build/Menu","Build/Stats","Build/Runes","Build/Abilities","Build/Items","Build/Masteries"
        ],
        function () {
            app = new AppRouter();
            Backbone.history.start();

            app.di.builds.fetch({local:true});
            app.di.heros.fetch({local:true});

            //preload from storage
            app.di.runes.fetch({local:true});
            if(app.di.runes.length==0){
              app.di.runes.fetch();
            }
            app.di.masteries.fetch({local:true});
            if(app.di.masteries.length==0){
              app.di.masteries.fetch();
            }
            app.di.spells.fetch({local:true});
            if(app.di.spells.length==0){
              app.di.spells.fetch();
            }
            app.di.items.fetch({local:true});
            if(app.di.items.length==0){
              app.di.items.fetch();
            }
            app.di.abilities.fetch({local:true});
            if(app.di.abilities.length==0){
              app.di.abilities.fetch();
            }
        });


});