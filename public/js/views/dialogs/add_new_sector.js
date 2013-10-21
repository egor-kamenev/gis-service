$(function() {

    //окно создания/редактирование зоны охвата сектора
    App.Views.collection.addNewSector = App.Views.collection.addNewBaseStation.extend({
        initialize:function(){
            App.Views.BaseWindow.prototype.initialize.call(this);

            this.CollectionObj = App.Collections.sectors; // модель/коллекция для создаваемой метки
            this.ViewClass = App.Views.Sector; // вид для создаваемой метки
            this.dialog_prop.height = 515;


        },

        // переопределям saveLabel базового вида, т.к. у нас есть вычесляемые поля которые необходимо
        // сохранить в базе данных
        saveLabel:function(model){
            model.save({
                starting_angle: parseInt(model.get('angle')) * App.Config.pi_per_gradus,
                ending_angle:parseInt(model.get('direction_angle'))* App.Config.pi_per_gradus + parseInt(model.get('angle')) * App.Config.pi_per_gradus
            });
        }
    });

});