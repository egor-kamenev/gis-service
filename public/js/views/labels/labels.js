//Базовый вид для всех маркеров
App.Views.Labels = Backbone.View.extend({

    render:function(){

        this.collection.each($.proxy(function(model){

            new this.options.View({
                model:model,
                map: this.options.map
            }).render();

        this.trigger('rendered'); //сообщаем что вывод маркеров на экран закончен, для того чтобы скрыть preloader

        },this));

        return this;
    }
});