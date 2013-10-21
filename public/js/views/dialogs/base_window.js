$(function(){

    // Базовый вид для диалоговых окон
    App.Views.BaseWindow = Backbone.View.extend({
        el:'#dialog',
        dialog_prop:{
            height : 600,
            width : 700,
            draggable : false,
            modal : true,
            position : ["center", "center"],
            buttons : {},
            resizable : false
        },

        initialize:function(){

            _.bindAll(this,
                'addLabel',
                'updateLabel',
                'deleteLabel',
                'initValidEngine',
                'addButtons',
                'getPosition',
                'saveLabel',
                'getFormJson'
            );

            // Стандартные кнопки меню, add, edit в зависемости от вида действий над меркером
            switch(this.options.action){
                case 'add':
                    this.customButtons = [
                        {
                            name:"Добавить",
                            function_do:this.addLabel,
                            validate: true,
                            closeOnSuccess:true

                        }
                    ]
                    break;

                case 'edit':
                    this.customButtons = [
                        {
                            name:"Редактирвать",
                            function_do:this.updateLabel,
                            validate: true,
                            closeOnSuccess:true

                        },
                        {
                            name:"Удалить",
                            function_do:this.deleteLabel,
                            validate:false,
                            closeOnSuccess:true
                        }
                    ]
                    break;
                default: alert('dialog unknown action!');

            }
        },

        render: function(){

            this.dialog_prop.title = this.options.title;

            switch(this.options.action){
                case 'add' :  this.$el.html(this.options.template({})); break;
                case 'edit' : this.$el.html(this.options.template(this.model.toJSON())); break;

            }

            this.initValidEngine(); // Активируем валидацию форм
            this.addButtons(this.customButtons);// Добавляем кнопки

            this.dialog_prop.open = $.proxy(function(){
                this.$el.parent().find('.ui-dialog-titlebar-close').hide();
            },this); // При открытии окна, скрываем значок закрытия окна.

            this.$el.dialog(this.dialog_prop);

            this.trigger('rendered');// Событие rendered для выставления правельных статусов форм

            return this;
        },

        initValidEngine: function(){ // Инициализируем валидацию форм
            // Инициализируем валидатор формы с начальными параметрами
            this.$el.find('form').validationEngine('attach', {
                isOverflown : true, // Для работы в дивах со скролами
                overflownDIV : ".inputContainer",
                promptPosition : "topRight"
            });
        },

        addButtons:function(buttons){ // Добавляем кнопки в диалог
            this.dialog_prop.buttons = {};
            var itter,
                button;


            for(itter=0; itter < buttons.length; itter++ ){

                if(typeof(buttons[itter].function_do) == "function"){
                    // Исполняемая функция для добавления кнопок
                    ($.proxy(function(button){
                        // Функция обертка с доп. действиями валидация, закрытие и пр.
                        this.dialog_prop.buttons[button.name] = $.proxy(function(){

                            // Проверяем валидность данных если выставлен параметр validate = true
                            if(this.$el.find('form').validationEngine('validate') == true || typeof(button.validate) == "undefined" ||
                                (typeof(button.validate) != "undefined" && button.validate == false )){

                                button.function_do();
                                this.$el.find('form').validationEngine('hide');

                                // Закрываем диалог если выставлен параметр closeOnSuccess = true
                                if(typeof(button.closeOnSuccess) != "undefined" && button.closeOnSuccess == true){
                                    this.$el.dialog("close");
                                    this.$el.dialog("destroy");
                                }
                            }
                        },this);
                    },this))(buttons[itter]);
                }else{
                    console.log('function_do properties is not a function type')
                }
            }

            // По умолчанию добавляем кнопку отмена
            this.dialog_prop.buttons["Отмена"]= function(){
                $(this).dialog("close");
                $(this).dialog("destroy");
            };
        },

        // Добавить новый маркер
        addLabel: function(){

            var json = this.getFormJson(),
                position = this.getPosition(); // Берем координаты маркера

            json.lat = position.lat();
            json.lng = position.lng();
            bs_model = new this.CollectionObj.model(json);

            this.saveLabel(bs_model); // Cохраняем маркер в базе и модели
            this.CollectionObj.add(bs_model);

            if(typeof(this.ViewClass) !="undefined"){
                new this.ViewClass({
                    model:bs_model,
                    map: this.options.map
                }).render();

            }

        },

        // Обновить маркер
        updateLabel: function(){

            this.model.set(this.getFormJson());
            this.saveLabel(this.model);

            // Сообщаем что модель была отредактированна (событие необходимо для обнавления infobox
            // после радктирования маркера)
            this.model.trigger('edited');

        },

        // Удалить маркер
        deleteLabel: function(){
            this.model.destroy({
                silent:true
            });

            // Закрываем InfowWindow, что бы не оставить его без маркера
            App.Views.infoWindow.close();
        },

        // Сохраняем маркер в базе и модели
        saveLabel:function(model){
            model.save();
        },


        // Берем позицию маркера
        getPosition:function(){
            json = this.getFormJson();
            return {
                lat:$.proxy(function(){ return this.options.position.lat() },this),
                lng:$.proxy(function(){ return this.options.position.lng() },this)
            };
        },

        // Берем данные формы в виде json объекта
        getFormJson:function(){
            return this.$el.find('form').serializeObject();
        }


    });

});