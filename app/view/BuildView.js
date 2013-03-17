var BuildView = Jr.View.extend({
    initialize:function () {
      if(!app.di.builds){
        app.di.builds = new Builds();
      }
     // app.di.builds.localSync();
      app.di.builds.on('add reset', this.render, this);
      
    },
     render: function(){
      var build_id = this.options.build;
      var builds = app.di.builds.where({sid:parseInt(build_id)});

      this.build = false;
      if(builds.length > 0){
        this.build = builds[0];
      }
      console.log(this.build);
      var template = tpl.get('Build');
      if(this.build){
        console.log("buu")
      }
      this.$el.html(_.template(template));
      return this;
    }
});
