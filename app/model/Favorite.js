var Favorite = Backbone.Model.extend({
    idAttribute: "id"
});

var Favorites = Backbone.Collection.extend({
    model: Favorite,
    initialize: function(){
       this.storage = new Offline.Storage('favorites',this)
    } 
});
