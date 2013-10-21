$(function(){

    //Вид для всех маркеров секторов
    App.Views.Sectors = App.Views.Labels.extend({

        render:function(){

            this.collection.each($.proxy(function(model){

                if(model.get('signal_zone_type') == 2){

                    new App.Views.Sector({
                        model:model,
                        map:this.options.map
                    }).render();

                }
            },this));

            return this;
        }
    });

});