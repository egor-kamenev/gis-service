$(function(){
    App.Collections.baseCollection = Backbone.Collection.extend({ // базовая коллекция

        initialize:function(){
            _.bindAll(this,'deleteModelOnDestroy');

            // начинаем слушать destroy событие для своевремменого удаления модели из коллекции
            // при инициализации коллекции
            this.on('fetched',function(){this.each(this.deleteModelOnDestroy,this)},this);

            // при добавлении новой модели в коллекцию
            this.on('add',this.deleteModelOnDestroy);

        },

        deleteModelOnDestroy:function(model){ // удаляем модель из коллекции, если унечтажаем саму модель.
            model.on('destroy',function(){
                this.remove(model);
            },this);
        }
    });
});