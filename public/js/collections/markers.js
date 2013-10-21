$(function(){
    App.Collections.markers = new (App.Collections.baseCollection.extend({ // коллекция маркеров
        silent:true,
        model: App.Models.Marker,
        url: "/markers"
    }));


});