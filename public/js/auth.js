/**
 * @author Nafigator
 */
 
 $(document).ready(function(){
  //Показывай диалог авторизации
  $("#dialog").dialog({
	title:"Вход",
	modal: true,
	draggable: false,
	position:["center","center"],
	resizable:false,
	width:300,
	closeOnEscape: false,
	open: function(event, ui) {$(".ui-dialog-titlebar-close").hide();},
	buttons:{
		"Войти": function(){$('#auth').submit();}
	}
  });
  
  // при нажатии клав. Enter жмем кнопку Войти
  $("#dialog").keyup(function(e) {
    if (e.keyCode == 13) {
        $('.ui-dialog-buttonpane button').click();
    }
  });

});