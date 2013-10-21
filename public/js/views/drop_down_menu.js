$(function() {
    // вид выподающего меню
    App.Views.DropDownMenu = Backbone.View.extend({
        template: _.template($('#menu-template').html()), // шаблон
        el:'#myMenu', // элемент для отображения
        collection: App.Collections.menuElements,

        events:{
            "click ":"hide", // скрываем после выбора одного из эл-ов меню
            "click a":"showDialog" // при выборе элемента производим дальнейшие действия
        },

        initialize:function(){
            var mapDiv = this.options.map.getDiv(); // выбераем div в котором инициализирована карта.

            _.bindAll(this,'hide','showDialog','initPosition','render');


            google.maps.event.addListener(this.options.map, 'click', this.hide); // скрываем меюни при клике на карте

            $(mapDiv).mousedown($.proxy(function(event){ // открываем меню при клике правой кнопкой мыши
                if(event.which === 3){
                    this.render(event);
                }
            },this));

            // инициализируем объект типа LatLng при клике правой кн. мыши по карте
            google.maps.event.addListener(this.options.map, 'rightclick', this.initPosition);

            // вставляем пунткты меню из шаблона
            this.collection.each(function(model){

                // проверяем права доступа к пункту меню
                if(model.get('right_types').indexOf(parseInt($.cookie('right_type_id')))!=-1){

                    this.$el.append(this.template(model.toJSON()));
                }

            },this);


        },

        render:function(event){

            // +1px что бы не перекрывать событие карты rightclick иначе оно не вызовается
            this.$el.css('display','block').css('left',event.pageX+1+"px").css('top',event.pageY+1+"px");
            return this;
        },

        // скрываем меню
        hide:function(){
            this.$el.css('display','none');
        },

        // вызеваем диалог
        showDialog:function(event){
            var view,
                target = $(event.target).attr('id');

            // создаем диалог по id из коллекции диалогов
            view = new App.Views.collection[target]({
                template:_.template($('#'+target+"-template").html()),
                title: $(event.target).text(),
                position: this.position,
                map: this.options.map,
                action: 'add'
            });

            view.render();
        },

        // инициализируем координаты вызова меню что-бы в дальнейшем поставить там маркер
        initPosition: function(event){
            this.position = event.latLng;
        }

    });

});