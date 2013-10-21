/**
 * @author Nafigator
 */

 
 $(document).ready(function(){
  
  $("#dialog").dialog({	
	title:"Панель администрирования",
	modal: true,
	draggable: false,
	position:["center","center"],
	height: 500,
	width:700,
	resizable:false,
	closeOnEscape: false,
	open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
	buttons:{
				"Добавить пользователя": function(){
											self.location.href='/admin/add_user_page';
										},
				"Выход": function(){
											self.location.href='/admin/logout';
									}
			}
	
  });
});