var Hero = Backbone.Model.extend({
    idAttribute: "id"
});

var Heros = Backbone.Collection.extend({
    model: Hero,
    url: server('heros/'),
    initialize: function(){
       this.storage = new Offline.Storage('heros',this)
    },

    sync: function(method, model, options){  
      options.timeout = 10000;  
      options.dataType = "jsonp";  
    //options.data = { 'token': window.auth_token, _method:method};
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
