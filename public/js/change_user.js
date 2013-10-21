/**
 * @author Nafigator
 */

function onLoadFormStatus(){
	
	var current_user_right_type_id = parseInt($("input[name='user_right_type_id']").val());
		
		switch (current_user_right_type_id){
			
			case 1:
				$("select[name='right_type_id'] option[value='1']").attr("selected", "selected");
				break;
			
			case 2:
				$("select[name='right_type_id'] option[value='2']").attr("selected", "selected");
				break;
			
			case 3:
				$("select[name='right_type_id'] option[value='2']").attr("selected", "selected");
				$("input[name='show_signal_zones']").attr("checked", "checked");
				break;
			
			case 4:
				$("select[name='right_type_id'] option[value='2']").attr("selected", "selected");
				$("input[name='show_basestations']").attr("checked", "checked");
		}
}


function baseStationsVisabilityFormStatus(){		
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
	open: function(event, ui) { 
		$(".ui-dialog-titlebar-close").hide();
		 				
	},
	buttons:{
			"Изменить": function(){$("#change_user_form").submit();},
			"Отмена": function(){self.location.href='/admin/main';},
			}	
  });
  
  onLoadFormStatus();
  baseStationsVisabilityFormStatus();
  
	$("select[name='right_type_id'], input[name='show_signal_zones'], input[name='show_basestations']").bind("change", function() {
		baseStationsVisabilityFormStatus();
	});
});