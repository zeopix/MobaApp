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
      builds : false,
      heros : false
    }

});
   

$(document).ready(function () {
   
    //Asi cargamos las vistas directamente en cache
    tpl.loadTemplates(
      [ "HeroList","HeroListItem","HeroBuildList","HeroBuildListItem","Menu","Build"
        ],
        function () {
            app = new AppRouter();
            Backbone.history.start();

            
        });


});