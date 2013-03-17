var Build = Backbone.Model.extend({
    idAttribute: "id"
});

var Builds = Backbone.Collection.extend({
    model: Build,
    url: server('builds/'),
    initialize: function(){
       this.storage = new Offline.Storage('builds',this)
    },

    sync: function(method, model, options){  
      options.timeout = 10000;  
      options.dataType = "jsonp";  
      options.data._method = method;
    if(method=="full"){
        options.data._method = "read";
        return this.storage.sync.full(options);
    }
    if(method=="pull"){
        options.data._method = "read";
        return this.storage.sync.pull(options);
    }
      return Offline.sync(method, model, options);  
    }  
});
