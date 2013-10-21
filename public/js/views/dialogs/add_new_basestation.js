$(function() {

    App.Views.collection.addNewBaseStation = App.Views.BaseWindow.extend({  //окно создания/редактирование баз.станции

        initialize:function(){

            App.Views.BaseWindow.prototype.initialize.call(this);

            this.ViewClass =  App.Views.BaseStation; // модель/коллекция для создаваемой метки
            this.CollectionObj = App.Collections.baseStations; // вид для создаваемой метки

        },

        getPosition: function(){
            json = this.getFormJson();
            // если координаты не выставлены в форме то устанавливаем их автоматически по координатам клика мыши
            if(json.lat == '' || json.lng == ''){
                return {
                    lat:$.proxy(function(){ return this.options.position.lat() },this),
                    lng:$.proxy(function(){ return this.options.position.lng() },this)
                };
            }else if(json.lat != "" && json.lng != ""){
                return {
                    lat:$.proxy(function(){ return parseFloat(json.lat) },this),
                    lng:$.proxy(function(){ return parseFloat(json.lng) },this)
                };
            }
        }

    });

});
