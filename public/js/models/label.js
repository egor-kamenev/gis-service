$(function(){

    //базовая модель для маркеров
    App.Models.Label = Backbone.Model.extend({

        //TODO выделить метод в отдельный класс
        sync:function(method, model, options){ //синхронизация с сервером для всех моделей
            switch(method){
                case "create": case "update": return Backbone.sync(method, model, {
                dataType :"json",
                // отправляем данные прдворительно закодировав опасные символы
                data:this.strEscape(model.toJSON()),

                /*
                 после удачного сохранения или апдейта изменяем данные в модели на данные
                 от сервера т.к. некоторые поля вычисляются на сервере
                 */
                success:$.proxy(function(data){
                    model.set(data);
                    this.trigger('sync',model,data);
                },this)
            });
                break;

                // TODO заменить на default
                case "read" : case "delete" : return Backbone.sync(method, model, options); break;
            }

        },
        silent:true,
        defaults:{
            visible:true
        },

        initialize:function(){
            // декодируем данные при создании модели или изминений вернувшихся из базы данных
            this.set(this.strUnescape(this.toJSON()));
            this.on('sync', function(){ this.set(this.strUnescape(this.toJSON()));  } ,this);
        },

        // Кодирирование опасных символов
        strEscape: function(json) {

            // Символы подлежащие экранированию
            var escape_chars = [{
                ANSI_char : " ",
                reg : /[\r\n|\n|\r]/g
            }, {
                ANSI_char : "\"",
                reg : /"/gi
            }, {
                ANSI_char : "'",
                reg : /'/gi
            }, {
                ANSI_char : "\\",
                reg : /\\/gi
            }];

            _(json).each(function(value, j){
                $(escape_chars).each(function(i, esc_char){
                    if(typeof(json[j]) == 'string'){
                        json[j] = json[j].replace(esc_char.reg, escape(esc_char.ANSI_char));
                    }
                });
            });

            return json;
        },

        // Декодирование опасных символов
        strUnescape: function(json){

            _(json).each(function(value, j){
                if(typeof(json[j]) == 'string'){
                    json[j] = unescape(json[j]);
                }
            });

            return json;
        }

    });

});
