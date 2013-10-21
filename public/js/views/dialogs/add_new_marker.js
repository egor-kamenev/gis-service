$(function() {

    App.Views.collection.addNewMarker = App.Views.BaseWindow.extend({ // окно создания/редактирование маркера

        events:{
            "change input[name='is_building']": 'buildingFormStatus',
            "change input[name='is_signal']": 'signalFormStatus',
            "change select[name='antenna_type_id']":'antennaOtherDataFormStatus'
        },

        initialize:function(){

            App.Views.BaseWindow.prototype.initialize.call(this);

            this.ViewClass =  App.Views.Marker; // вид для отображения создаваемой метки
            this.CollectionObj = App.Collections.markers; // модель/коллекция для создаваемой метки

            _.bindAll(
                this,
                'buildingFormStatus',
                'signalFormStatus',
                'antennaOtherDataFormStatus'
            );

            // активируем поля формы в соответствии с данными модели
            this.on('rendered',this.buildingFormStatus);
            this.on('rendered',this.signalFormStatus);
            this.on('rendered',this.antennaOtherDataFormStatus);
        },

        buildingFormStatus : function() {

            var is_building_form_object = $("input[name='is_building']"),
                building_data_fieldset_object = $("fieldset[name='building_data']");

            if(is_building_form_object.prop("checked")){
                // если "is_building" выбран, то делаем группу полей  видимыми
                building_data_fieldset_object.removeClass("disabled");
            } else {

                /*
                 * если is_building" не выбран, то очищаем поля
                 * и выставляем select по умаолчанию
                 */
                $("input[name='floor']").val("");
                $("input[name='windows_direction']").val("");
                $("select[name='building_location'] option[value='0']").attr("selected", "selected");
                $("select[name='building_type_id'] option[value='0']").attr("selected", "selected");

                //если "is_building" не выбран, делаем группу не видимемой
                building_data_fieldset_object.addClass("disabled");
            }

            /* генерируем событие для инициализции функции
             * при инициализации всего скрипта после загрузки страницы
             */

        },

        signalFormStatus : function(){

            var is_signal_form_obj = $("input[name='is_signal']"),
                signal_data_fieldset_obj = $("fieldset[name='signal_data']");

            if($("input[name='is_signal']").prop("checked")) {
                // если "is_signal" выбран, то делаем группу полей видимыми
                signal_data_fieldset_obj.removeClass("disabled");

            } else {
                /* если is_signal" не выбран, то очищаем поля
                 * и выставляем select по умаолчанию
                 */
                $("select[name='signal_quality'] option[value='0']").attr("selected", "selected");
                $("input[name='signal_level'], " +
                    "[name='upload'], " +
                    "[name='cell_id'], " +
                    "[name='download']," +
                    "[name='ping']" +
                    "[name='antenna_other']"
                ).val("");
//                $("input[name='signal_level']").val("");
//                $("input[name='upload']").val("");
//                $("input[name='cell_id']").val("");
//                $("input[name='download']").val("");
//                $("input[name='ping']").val("");
//                $("input[name='antenna_other']").val("");
                $("select[name='antenna_type'] option[value='0']").attr("selected", "selected");

                // если "is_signal" не выбран, делаем группу полей не видимыми
                signal_data_fieldset_obj.addClass("disabled");
            }
        },

        antennaOtherDataFormStatus: function() {
            var antenna_type_form_str = "select[name='antenna_type_id']",
                antenna_type_form_obj = $(antenna_type_form_str),
                antenna_other_form_obj = $("input[name='antenna_other_value']"),
                antenna_other_label_obj = $("label[for='antenna_other_value']");

            if($(antenna_type_form_str + " option[value='3']").prop("selected")){
                antenna_other_label_obj.removeClass("disabled");
                antenna_other_form_obj.removeClass("disabled");
            } else {
                antenna_other_form_obj.val("");
                antenna_other_label_obj.addClass("disabled");
                antenna_other_form_obj.addClass("disabled");
            }
        }

    });

});