$(function(){

    App.Collections.Sectors = App.Collections.baseCollection.extend({ // коллекция зон охвата и секторов
        model: App.Models.Sector,
        url: "/signals"
    });
});