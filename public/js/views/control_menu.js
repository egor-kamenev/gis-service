$(function() {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // вид для основного меню
    App.Views.ControlMenu = Backbone.View.extend({

        initialize:function(){
            _.bindAll(this, 'rulerMode','arrowMode', 'viewMode', 'disableActiveMode');

            this.mapDiv = this.options.map.getDiv();
            this.div = $('<div id="controlMenu">');
            this.div.css('margin-top','5px');

            this.collection.each(function(model){
                this.div.append(this.options.template(model.toJSON()));
            },this);

            this.options.map.controls[this.options.position].push(this.div[0]);

            this.collection.each(function(model){
                $('#' + model.get('id')).bind('click', this[model.get('id')]);
            },this);

        },

        rulerMode:function(event){// режим рулетки

            // отвязываем появление контекстного меню при использовании рулетки
            $(this.mapDiv).unbind('mousedown');

            //деактивируем текущий режим
            this.disableActiveMode();

            this.modeObj = new App.Views.Ruler({
                map: this.options.map
            });

            // запрещяем всплытие события, что не выставлять первую точку измерений при выборе рулетки в меню.
            event.stopPropagation();
        },

        // TODO унифицировать методы активации режимов
        arrowMode:function(){
            $(this.mapDiv).unbind('mousedown');
            this.disableActiveMode();

            this.modeObj = new App.Views.BsDirection({
                map: App.Views.map.getMap()
            });

            event.stopPropagation();

        },


        disableActiveMode:function(){
            if(typeof(this.modeObj) != "undefined"){ this.modeObj.disable(); }
        },


        viewMode:function(){ // основной режим просмотра

            //деактивируем текущий режим
            this.disableActiveMode();

            // привязываем появление контекстного меню
            $(this.mapDiv).mousedown($.proxy(function(event){
                if(event.which === 3){
                    App.Views.contextMenu.render(event);
                }
            },this));
        }
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});