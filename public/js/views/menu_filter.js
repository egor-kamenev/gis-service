$(function(){
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    App.Views.FilterMenu = Backbone.View.extend({
        el: '#filter', // див для вствки шаблона формы с фильтром
        events:{
            'click #reset_button':'formReset',
            'click input[name="setSignalVisible"]':'signalVisible' // скрываем/показываем зоны охвата
        },
        template: _.template($('#Filter-template').html()), // шаблон формы с фильтрами

        initialize:function(){

            _.bindAll(this,
                'formReset',
                'filter',
                'signalVisible',
                'formRemember',
                'openMenu'
            );

            // вставляем шаблон и инициализируем сохраненные поля формы из cookies
            this.$el.html(this.template($.jCookies({get:'filter_form'})));
            this.$form = this.$el.find("form[name='filter_form']"); // jquery объект с формой(уже вставленой в el)

            // прикреплям формы для выбора даты
            $("input[name='date_from_filter']").datepicker( {dateFormat: 'yy.mm.dd'} );
            $("input[name='date_to_filter']").datepicker( {dateFormat: 'yy.mm.dd'} );

            // инициализируем маркеры в соответствии с меню
            this.signalVisible();
            this.filter();


            // Создаем диалог
            this.$el.dialog({
                draggable : true,
                title: "Фильтры",
                height : screen.height*0.7,
                width: 330,
                position: ["right", "center"],
                modal: false,
                resizable : true,
                maxWidth: 330,
                autoOpen: false
            });

            this.$form.change(this.formRemember);
            this.$form.change(this.filter); // применям фильтры при изменении данных формы

            //скрываем infoWindow если в модели коллекции меняеться св-во visible
            App.Collections.markers.on('change:visible',function(){  App.Views.infoWindow.close(); }, this);

        },

        // фильтруем маркеры
        filter:function(){

                //Выбераем в массив значения всех выбранных элементов подгруппы "Тип локации"
                var space_values = [];
                $("fieldset#space_filter input:checkbox:checked").each(function(){
                    space_values.push(this.value);
                });

                //Выбераем в массив значения всех выбранных элементов подгруппы "Тип антенны"
                var antenna_values = [];
                $("fieldset#antenna_filter input:checkbox:checked").each(function(){
                    antenna_values.push(this.value);
                });

                //Выбераем в массив значения всех выбранных элементов подгруппы "Качество связи"
                var quality_values = $("select[name='signal_quality_filter']").val();

                //выбераем в массив значения всех выбранных элементов подгруппы "Номер станции"
                var cell_id_values = $("select[name='cell_id_filter']").val();

                //Выбераем в массив значения всех выбранных элементов подгруппы "Владельцы"
                var users_values = $("select[name='users_filter']").val();


                /*
                 * выбераем в массив зачения value ВСЕХ option подгруппы "Номер станции",
                 * для проверки маркеров с не правельным или не определенным cell_id
                 */
                var cell_id_all_values = [];
                $("select[name='cell_id_filter'] option").each(function(){
                    cell_id_all_values.push($(this).attr("value"));
                });

                //что бы не проверять первое ли это условие в if или нет делам небольшой хак
                var condition = "1==1"; //храним здесь наше уловие в переменной condition

                /*
                 * формируем условие выборки маркеров на основе данных из формы фильтра
                 * для конструкции if в виде строки, что бы потом исполнить их через eval
                 * таким образом мы добиваемся возможности создавать сложные
                 * фильтры с множественными критериями выборки маркеров
                 */

                // проверяем маркер на тип локации
                if(
                    $("input[name='is_building_filter']").prop("checked") == true ||
                        $("input[name='is_street_filter']").prop("checked") == true
                    ){
                    condition +=" && space_values.indexOf(model.get('is_building')) !=-1";
                }

                // проверяем маркер на тип антенны
                if(
                    $("input[name='is_outer_filter']").prop("checked") == true ||
                        $("input[name='is_buildin_filter']").prop("checked") == true ||
                        $("input[name='is_other_filter']").prop("checked") == true
                    ){
                    condition +=" && antenna_values.indexOf(model.get('antenna_type_id')) !=-1";
                }

                // проверяем качество связи
                if(quality_values!= null && quality_values.indexOf("ALL") == -1){ // если не выбранно "Все"
                    condition+= " && quality_values.indexOf(model.get('signal_quality')) !=-1";
                }

                // проверяем маркер на владельца
                if(users_values != null && users_values.indexOf("ALL") == -1 ){ // если не выбранно "Все"
                    condition += " && users_values.indexOf(model.get('login')) !=-1";
                }

                // проверяем маркер на дату создания
                //С:
                if(isNaN(Date.parse($("input[name='date_from_filter']").val()))==false){

                    condition+=" && Date.parse(model.get('add_datetime')) >= Date.parse($(\"input[name='date_from_filter']\").val())";
                }
                //По:
                if(isNaN(Date.parse($("input[name='date_to_filter']").val()))==false){

                    condition+=" && Date.parse(model.get('last_update_datetime')) <= Date.parse($(\"input[name='date_to_filter']\").val())";
                }

                //Создаем условия для выборки по номеру базовой станции(без сектора)
                //Если что-то выбранно в select и не выбран пункт "Все"
                if(cell_id_values !=null && cell_id_values.indexOf("ALL") == -1 ){

                    //выделяем номер базовой станции из cell_id маркера
                    var bs_without_sector = "model.get('cell_id').toUpperCase().substr(0,model.get('cell_id').length - 2 )";

                    //если выбран пункт "Не определено"
                    if(cell_id_values.indexOf("UNDEFINED") !=-1){
                        condition+=" && (cell_id_values.indexOf("+ bs_without_sector +") != -1 || cell_id_all_values.indexOf("+ bs_without_sector +")==-1)";
                    }else{
                        condition+=" && cell_id_values.indexOf("+ bs_without_sector +") != -1";
                    }
                }

                this.collection.each(function(model){

                    //проверяем каждый маркер полученным условием condition
                    if(eval(condition)){
                        //если соответствует то показываем
                        model.set('visible',true);
                    }else{
                        //если нет, то скрываем
                        model.set('visible',false);

                    }
                });
            },

        formReset:function(){

            this.$form.find("input:text").val(''); //Очищаем textbox
            this.$form.find("input:checkbox:checked").removeAttr("checked"); // Очищаем чекбоксы
            this.$form.find(":selected").removeAttr('selected').find(); // Очищаем селекты
            // выставляем пункт "Все" в селектах по умолчанию
            this.$form.find("option:[value='ALL']").attr("selected","selected")

            //генеруируем событие change для формы что бы вызвать фильтр для меток
            this.$form.change();
        },

        signalVisible:function(){

            if($('input[name="setSignalVisible"]').prop("checked")==true){
                App.Views.signalCanvas.setVisible(true);
            }else{
                App.Views.signalCanvas.setVisible(false);
            }
        },

         //Запоминаем состояние форм фильтра
        formRemember: function(){

             $.jCookies({
                 name:  this.$form.attr('name'),
                 value: this.$form.serializeObject()
             });
         },

        openMenu:function(){
            this.$el.dialog('open');
        }

    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
