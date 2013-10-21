/**
 * @author Nafigator
 */

function rightTypeFormStatus(){
	var forms = $("select[name='right_type_id'], input[name='show_signal_zones'], input[name='show_basestations']");
	forms.change(function() {			
		if($("select[name='right_type_id'] option:selected").text()== "Пользователь"){
			$("#bs_visability").css({"display":"block"});
			
			if($("input[name='show_basestations']").prop("checked")){		
				$("select[name='right_type_id'] option:selected").val('4');
			}else if($("input[name='show_signal_zones']").prop("checked")){
				$("select[name='right_type_id'] option:selected").val('3');
			}else{
				$("select[name='right_type_id'] option:selected").val('2');
			}			
		}else{
			$("#bs_visability").css({"display":"none"});
		}
	
	});
	
	forms.trigger("change");
}
 
 $(document).ready(function(){
  
  $("#dialog").dialog({
	title:"Добавить пользователя",
	modal: true,
	draggable: false,
	position:["center","center"],
	height: 500,
	width:400,
	resizable:false,
	closeOnEscape: false,
	open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
	buttons:{
			"Добавить пользователя": function(){$("#add_user_form").submit();},
			"Отмена": function(){self.location.href='/admin/main';},
			}	
    });
  
  /*блокировка/разблокировка полей с данными по зданию
	* при изминения чекбокса "Здание" в диалоге
	*/
  rightTypeFormStatus();
  	
	
});

