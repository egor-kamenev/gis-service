$(function(){

    App.Collections.baseStations = new (App.Collections.baseCollection.extend({ // коллекция базовых станций
        model: App.Models.BaseStation,
        url: "/bs"
    }));
});