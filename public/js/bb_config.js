App.Config = {
    imageSrc: "/img/",
    pi_per_gradus: 0.01745329251994329
};

Backbone.emulateJSON = true;

App.Models = {};//инициализируем пространство имен моделий
App.Collections = {};//инициализируем пространство имен коллекций
App.Views = {
    //псевдо-коллекция диологовых окон
    // все окна расширение базового вида App.Views.DialogWindow
    collection:{}
};//инициализируем пространство имен видов




