var Item = Backbone.Model.extend({
    idAttribute: "id"
});

var Items = Backbone.Collection.extend({
    model: Build,
    url: server('items/'),
    initialize: function(){
       this.storage = new Offline.Storage('items',this)
    },

    sync: function(method, model, options){  
      options.timeout = 10000;  
      options.dataType = "jsonp";  
      if(typeof(options.data) == "undefined"){
        options.data = {};
      }
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
