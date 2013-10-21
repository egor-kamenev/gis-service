#! /usr/bin/perl
use Mojolicious::Lite;
use Mojolicious::Plugin::Charset;
use DBI;
use utf8;
use Mojo::Base 'Mojo::Cookie';

app->secret('fsjdl09-03mut40n205u92jd'); 
app->mode('production');

$ENV{'NLS_LANG'} = 'AMERICAN_AMERICA.AL32UTF8';


my $dbh = DBI->connect('dbi:Oracle:host=localhost;sid=billing;port=1521', 'test', 'qdwfdf');

## lib/MyApp.pm
    sub startup {
         my $self = shift;
         # ... your start up and routes.
         $self->hook( before_dispatch => sub {
              my $self = shift;
              # notice: url must be fully-qualified or absolute, ending in '/' matters.
              $self->req->url->base(Mojo::URL->new(q{http://localhost}));
         });
    }




any "/" => sub{
  my $self = shift; 
  my $user = $self->param('user');
  my $pass = $self->param('pass');
  $self->stash(right_type_id => 0);
  $self->cookie(right_type_id => 0);
  
	
  my $sql = "SELECT us.id, pr.right_type_id, us.login FROM USERS us
        INNER JOIN PUBLIC_RIGHTS pr ON pr.user_id = us.id
        WHERE UPPER(login)=UPPER('$user') and password='$pass'";
  my $sth = $dbh->selectall_arrayref($sql);
	
    
  if (defined($sth->[0]->[0])){
    $self->session->{auth} = 1;
    $self->session->{right_type_id} = $sth->[0]->[1];
    $self->stash(right_type_id => $sth->[0]->[1]); 
    $self->session->{user_id} = $sth->[0]->[0]; 
    $self->cookie(login => $sth->[0]->[2]);
    $self->cookie(right_type_id => $sth->[0]->[1]);
    
    
    #if ($sth->[0]->[1] eq 1){
    #  $self->session->{admin} = 1;
    #  $self->cookie(admin => 1);
    #  $self->stash(admin => 1);
    #}
    
    $sql = "SELECT cell_id, name FROM base_stations";
    $sth = $dbh->selectall_arrayref($sql);
    $self->stash(cell_id => $sth);
    
    $sql = "SELECT id, fio, login FROM users ORDER BY fio";
    $sth = $dbh->selectall_arrayref($sql);
    $self->stash(users => $sth);
		
		$sql = "SELECT id, cell_id FROM base_stations ORDER BY cell_id";
    $sth = $dbh->selectall_arrayref($sql);
    $self->stash(bs => $sth);
    
        
    
    $self->render('protected');
  }else{
    $self->render;
  }  
  
}=> 'index';


under "/bs_direction"; 
group{
						
		get "/" => sub{ # get nearest basestations
			my $self = shift;
						
			$self->res->headers->header('Access-Control-Allow-Origin' => '*');
			$self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
		
			my $lat       = $self->param('lat');
			my $lng       = $self->param('lng');
			my $sql				= "SELECT 
													SDO_CS.TRANSFORM(location,'USE_SPHERICAL',8307).sdo_point.x,
													SDO_CS.TRANSFORM(location,'USE_SPHERICAL',8307).sdo_point.y, -- координаты базовой станции
													SDO_GEOM.SDO_DISTANCE( -- расстояние до базовой станции
															SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lng,$lat,NULL),NULL,NULL),
															SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(
																	SDO_CS.TRANSFORM(location,'USE_SPHERICAL',8307).sdo_point.y,
																	SDO_CS.TRANSFORM(location,'USE_SPHERICAL',8307).sdo_point.x,NULL)
															,NULL,NULL), 0.005, 'unit=km') AS distance FROM base_stations ORDER BY distance";
			my $sth = $dbh->selectall_arrayref($sql);
			my $json_text = "{ \"locations\":[";
			for (my $count=0; $count<=2; $count++){
				$json_text.="{\"lat\":$sth->[$count][0], \"lng\":$sth->[$count][1]},";
			}
			$/=',';
			chomp($json_text);				
			$json_text.="]}";
			
					
			$self->render(text => $json_text, format =>'json');
    };
		
	get "/bs_dir" => sub{
		my $self = shift; 
		$self->render('bs_direction');
	};
    
			
};




under sub{
    my $self = shift;
    return 1 if $self->session->{auth} && $self->session->{auth} eq 1;
        $self->redirect_to('/'); #on fail
    return;
  };


group{

	get "/logout" => sub {
    my $self = shift;
    $self->session(expires => 1);
    $self->redirect_to('index');

  };

  under "/markers" ;
  group{
		get "/" => sub{ #read all markers
			my $self = shift;
			
			$self->res->headers->header('Access-Control-Allow-Origin' => '*');
			$self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
			
			my $sql = "SELECT spo.id,           
						spo.is_building,
						spo.floor, 
						spo.building_type_id,
						spo.signal_level,
						spo.cell_id,          
						spo.comments,
						spo.building_location,
						spo.windows_direction,          
						SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.x as x,
						SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.y as y,
						spo.address,
						spo.signal_quality,
						spo.upload,
						spo.download,
						spo.ping,
						spo.antenna_type_id,
						spo.antenna_other_value,
						spo.is_signal,
						us.login,
						to_char(spo.add_datetime, 'yyyy.mm.dd'),
						to_char(spo.last_update_datetime, 'yyyy.mm.dd'),
						case when bs.location is not null then rtrim(rtrim(to_char(ROUND(SDO_GEOM.SDO_DISTANCE(SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.y, SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.x, NULL),NULL,NULL), SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.y, SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.x, NULL),NULL,NULL), 0.005, 'unit=km'),3),'9999990.99'),'0'),'.') end";
						
						if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$sql.= " ,admin_comments";
						
						}
												
						$sql.=" FROM spatial_objects spo
						LEFT JOIN base_stations bs ON bs.cell_id = SUBSTR(spo.cell_id,0,LENGTH(spo.cell_id)-2)
						INNER JOIN users us ON us.id = spo.user_id";
						
			my $sth = $dbh->selectall_arrayref($sql);
			my $json_text = "[";
			foreach my $row (@$sth){    
					$row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
					$row->[2]=~s/,/./g;
					$row->[3]=~s/,/./g;
					#формируем ответ в json формате
					$json_text.="{
								 \"id\":$row->[0],
								 \"is_building\":\"$row->[1]\",
								 \"floor\":\"$row->[2]\",
								 \"building_type_id\":\"$row->[3]\",
								 \"signal_level\":\"$row->[4]\",
								 \"cell_id\":\"$row->[5]\",
								 \"comments\":\"$row->[6]\",
								 \"building_location\":\"$row->[7]\",
								 \"windows_direction\":\"$row->[8]\",
								 \"lat\":$row->[9],
								 \"lng\":$row->[10],               
								 \"address\":\"$row->[11]\",
								 \"signal_quality\":\"$row->[12]\",
								 \"upload\":\"$row->[13]\",
								 \"download\":\"$row->[14]\",
								 \"ping\":\"$row->[15]\",
								 \"antenna_type_id\":\"$row->[16]\",
								 \"antenna_other_value\":\"$row->[17]\",
								 \"is_signal\":\"$row->[18]\",
								 \"login\":\"$row->[19]\",
								 \"add_datetime\":\"$row->[20]\",
								 \"last_update_datetime\":\"$row->[21]\",
								 \"distance_to_bs\":\"$row->[22]\"";
								
					if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$json_text.= " ,\"admin_comments\":\"$row->[23]\"";				
					}
					
					$json_text.="},";
						
				}
				# отрезаем последнюю запитую т.к. она не соответствует json формату.
			$/=',';
			chomp($json_text);
			$json_text.= "]";     						
			
			$self->render(text => $json_text, format =>'json');

		};

		post "/" => sub{ #save marker
			
			my $self        = shift;        
			my $user_id     = $self->session->{user_id};
			
			my $address     = $self->param('address');
			my $lat         = $self->param('lat');
			my $lng         = $self->param('lng');
			
			my $is_building      = $self->param('is_building');
			my $floor            = $self->param('floor');
			my $windows_direction = $self->param('windows_direction');
			my $building_type_id  = $self->param('building_type_id');
			my $building_location = $self->param('building_location');
			
			my $is_signal         = $self->param('is_signal');
			my $signal_level  = $self->param('signal_level');
			my $cell_id       = $self->param('cell_id');    
			my $signal_quality= $self->param('signal_quality');
			my $upload        = $self->param('upload');
			my $download      = $self->param('download');
			my $ping          = $self->param('ping');
			my $antenna_type_id   = $self->param('antenna_type_id');
			my $antenna_other_value   = $self->param('antenna_other_value');
			my $admin_comments = "";
			
			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$admin_comments = $self->param('admin_comments');
			}
			
			my $comments  = $self->param('comments');
			
							
			
			$self->res->headers->header('Access-Control-Allow-Origin' => '*');
			$self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
					
			
			my $sql = "INSERT INTO spatial_objects (
					 map_id,
					 user_id,
					 location,
					 is_building,
					 floor, 
					 building_type_id,
					 signal_level,
					 cell_id,
					 comments, 
					 building_location,
					 windows_direction,
					 address,
					 signal_quality, 
					 upload,
					 download,
					 ping,
					 antenna_type_id,
					 antenna_other_value,
					 is_signal,
					 add_datetime,
					 last_update_datetime";
			
			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$sql.= " ,admin_comments";
			}
								
				$sql.=") 				
				 VALUES (1,$user_id,SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng, NULL),NULL,NULL),
				 $is_building,'$floor',$building_type_id,'$signal_level','$cell_id', 
				 '$comments','$building_location', '$windows_direction', '$address','$signal_quality', 
				 '$upload', '$download', '$ping', $antenna_type_id, '$antenna_other_value', $is_signal, SYSDATE, SYSDATE";
				
			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$sql.= " ,'$admin_comments'";
			}
			
			$sql.= " )returning id into :p_new_id";
					
			my $sth = $dbh->prepare($sql);
			my $p_new_id='-1';      
			$sth->bind_param_inout(":p_new_id",\$p_new_id,"SQL_NUMERIC");        
			$sth->execute();    
			
			$sql = "SELECT spo.id,                     
						spo.is_building,
						spo.floor, 
						spo.building_type_id,
						spo.signal_level,
						spo.cell_id,          
						spo.comments,
						spo.building_location,
						spo.windows_direction,          
						SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.x as x,
						SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.y as y,
						spo.address,
						spo.signal_quality,
						spo.upload,
						spo.download,
						spo.ping,
						spo.antenna_type_id,
						spo.antenna_other_value,
						spo.is_signal,
						spo.address,          
						to_char(spo.add_datetime, 'yyyy.mm.dd'),
						to_char(spo.last_update_datetime, 'yyyy.mm.dd'),
						us.login,
						case when bs.location is not null then rtrim(rtrim(to_char(ROUND(SDO_GEOM.SDO_DISTANCE(SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.y, SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.x, NULL),NULL,NULL), SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.y, SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.x, NULL),NULL,NULL), 0.005, 'unit=km'),3),'9999990.99'),'0'),'.') end";

			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$sql.= " ,admin_comments";
			}
			
			$sql.= " FROM spatial_objects spo
						INNER JOIN users us ON us.id = spo.user_id
						LEFT JOIN base_stations bs ON bs.cell_id = SUBSTR(spo.cell_id,0,LENGTH(spo.cell_id)-2)
						WHERE spo.id= $p_new_id";
						
			
			$sth = $dbh->selectall_arrayref($sql);
			my $json_text = "";
			foreach my $row (@$sth){    
					$row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки      
					$row->[2]=~s/,/./g;
					$row->[3]=~s/,/./g;
					#формируем ответ в json формате
					$json_text.="{
								 \"id\":$row->[0],
								 \"is_building\":\"$row->[1]\",
								 \"floor\":\"$row->[2]\",
								 \"building_type\":\"$row->[3]\",
								 \"signal_level\":\"$row->[4]\",
								 \"cell_id\":\"$row->[5]\",
								 \"comments\":\"$row->[6]\",
								 \"building_location\":\"$row->[7]\",
								 \"windows_direction\":\"$row->[8]\",
								 \"lat\":$row->[9],
								 \"lng\":$row->[10],               
								 \"address\":\"$row->[11]\",
								 \"signal_quality\":\"$row->[12]\",
								 \"upload\":\"$row->[13]\",
								 \"download\":\"$row->[14]\",
								 \"ping\":\"$row->[15]\",
								 \"antenna_type_id\":\"$row->[16]\",
								 \"antenna_other_value\":\"$row->[17]\",
								 \"is_signal\":\"$row->[18]\",
								 \"add_datetime\":\"$row->[20]\",
								 \"last_update_datetime\":\"$row->[21]\",
								 \"login\":\"$row->[22]\",
								 \"distance_to_bs\":\"$row->[23]\"";
								 
					if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$json_text.= " ,\"admin_comments\":\"$row->[24]\"";				
					}
					
					$json_text.="}";
				}
				# отрезаем последнюю запитую т.к. она не соответствует json формату.
			#$/=',';
			#chomp($json_text);
			
			
			$self->render(text => $json_text, format =>'json');

		};

		any ['delete'] => "/:id" => sub{ # delete marker
			my $self = shift;
			my $sql;
			
			$self->res->headers->header('Access-Control-Allow-Origin' => '*');
			$self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
			my $id = $self->param('id');
			my $user_id = $self->session->{user_id};
			
			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
				$sql = "DELETE FROM spatial_objects WHERE id =$id";   
			}else{
				$sql = "DELETE FROM spatial_objects WHERE id =$id and user_id=$user_id";    
			}
			
			my $sth = $dbh->prepare($sql);
				
			$sth->execute();              
				
			$self->render(text => "{\"status\":\"ok\"}", format =>'json');

		};
				

		put "/:id" => sub{ #update marker
			my $self = shift;
				
			$self->res->headers->header('Access-Control-Allow-Origin' => '*');
			$self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
					
			my $user_id = $self->session->{user_id};
								
			my $id          = $self->param('id');
			my $address       = $self->param('address');
			my $lat         = $self->param('lat');
			my $lng         = $self->param('lng');
			my $is_building     = $self->param('is_building');
			my $floor         = $self->param('floor');
			my $windows_direction = $self->param('windows_direction');
			my $building_type_id  = $self->param('building_type_id');
			my $building_location = $self->param('building_location');                  
			my $is_signal     = $self->param('is_signal');
			my $signal_quality      = $self->param('signal_quality');
			my $signal_level    = $self->param('signal_level');
			my $cell_id       = $self->param('cell_id');        
			my $upload        = $self->param('upload');
			my $download      = $self->param('download');
			my $ping        = $self->param('ping');
			my $antenna_type_id   = $self->param('antenna_type_id');
			my $antenna_other_value   = $self->param('antenna_other_value');
			
			my $admin_comments = "";
			
			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$admin_comments = $self->param('admin_comments');
			}
			
			my $comments  = $self->param('comments');
			
			
			my $sql;
			
			if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
			
				$sql = "UPDATE spatial_objects SET 
						address = '$address',
						is_building = $is_building,
						floor = '$floor',
						windows_direction = '$windows_direction',
						building_type_id = $building_type_id,
						building_location = '$building_location',         
						comments = '$comments',         
						location = SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL),
						is_signal = $is_signal,
						signal_quality = '$signal_quality',
						signal_level = '$signal_level',
						cell_id = '$cell_id',
						upload = '$upload',
						download = '$download',
						ping = '$ping',
						antenna_type_id = $antenna_type_id,
						antenna_other_value = '$antenna_other_value',
						last_update_datetime = SYSDATE,
						admin_comments = '$admin_comments'
						WHERE id=$id returning id into :p_new_id";                                   
			}else{
			
				$sql = "UPDATE spatial_objects SET 
						address = '$address',
						is_building = $is_building,
						floor = '$floor',
						windows_direction = '$windows_direction',
						building_type_id = $building_type_id,
						building_location = '$building_location',         
						comments = '$comments',         
						location = SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL),
						is_signal = $is_signal,
						signal_quality = '$signal_quality',
						signal_level = '$signal_level',
						cell_id = '$cell_id',
						upload = '$upload',
						download = '$download',
						ping = '$ping',
						antenna_type_id = $antenna_type_id,
						antenna_other_value = '$antenna_other_value',
						last_update_datetime = SYSDATE
						WHERE id=$id and user_id=$user_id returning id into :p_new_id";   
			}
			
			my $sth = $dbh->prepare($sql);
			my $p_new_id='-1';      
			$sth->bind_param_inout(":p_new_id",\$p_new_id,"SQL_NUMERIC");
			$sth->execute();  
			$sql = "SELECT spo.id,                     
							spo.is_building,
							spo.floor, 
							spo.building_type_id,
							spo.signal_level,
							spo.cell_id,          
							spo.comments,
							spo.building_location,
							spo.windows_direction,          
							SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.x as x,
							SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.y as y,
							spo.address,
							spo.signal_quality,
							spo.upload,
							spo.download,
							spo.ping,
							spo.antenna_type_id,
							spo.antenna_other_value,
							spo.is_signal,
							spo.address,          
							to_char(spo.add_datetime, 'yyyy.mm.dd'),
							to_char(spo.last_update_datetime, 'yyyy.mm.dd'),
							us.login,
							case when bs.location is not null then rtrim(rtrim(to_char(ROUND(SDO_GEOM.SDO_DISTANCE(SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.y, SDO_CS.TRANSFORM(spo.location,'USE_SPHERICAL',8307).sdo_point.x, NULL),NULL,NULL), SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE(SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.y, SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.x, NULL),NULL,NULL), 0.005, 'unit=km'),3),'9999990.99'),'0'),'.') end";

				if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
								$sql.= " ,admin_comments";
				}
				
				$sql.= " FROM spatial_objects spo
							INNER JOIN users us ON us.id = spo.user_id
							LEFT JOIN base_stations bs ON bs.cell_id = SUBSTR(spo.cell_id,0,LENGTH(spo.cell_id)-2)
							WHERE spo.id= $p_new_id";
			
			$sth = $dbh->selectall_arrayref($sql);
			my $json_text = "";
			foreach my $row (@$sth){
					$row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки      
					$row->[2]=~s/,/./g;
					$row->[3]=~s/,/./g;
					
					#формируем ответ в json формате
					$json_text.="{
								 \"id\":$row->[0],
								 \"is_building\":\"$row->[1]\",
								 \"floor\":\"$row->[2]\",
								 \"building_type\":\"$row->[3]\",
								 \"signal_level\":\"$row->[4]\",
								 \"cell_id\":\"$row->[5]\",
								 \"comments\":\"$row->[6]\",
								 \"building_location\":\"$row->[7]\",
								 \"windows_direction\":\"$row->[8]\",
								 \"lat\":$row->[9],
								 \"lng\":$row->[10],               
								 \"address\":\"$row->[11]\",
								 \"signal_quality\":\"$row->[12]\",
								 \"upload\":\"$row->[13]\",
								 \"download\":\"$row->[14]\",
								 \"ping\":\"$row->[15]\",
								 \"antenna_type_id\":\"$row->[16]\",
								 \"antenna_other_value\":\"$row->[17]\",
								 \"is_signal\":\"$row->[18]\",
								 \"add_datetime\":\"$row->[20]\",
								 \"last_update_datetime\":\"$row->[21]\",
								 \"login\":\"$row->[22]\",
								 \"distance_to_bs\":\"$row->[23]\"";
								 
					if($self->session->{right_type_id} && $self->session->{right_type_id} eq 1){
							$json_text.= " ,\"admin_comments\":\"$row->[24]\"";				
					}
					
					$json_text.="}";
				}
				# отрезаем последнюю запитую т.к. она не соответствует json формату.
			#$/=',';
			#chomp($json_text);
						
			$self->render(text => $json_text, format =>'json');

		};
					
   };

  
under  sub{
    my $self = shift;
    return 1 if $self->session->{auth} && $self->session->{auth} eq 1 && 
            (
              $self->session->{right_type_id} && $self->session->{right_type_id} eq 1 ||
							$self->session->{right_type_id} && $self->session->{right_type_id} eq 3 ||
              $self->session->{right_type_id} && $self->session->{right_type_id} eq 4            
            );          
            $self->render(text => '[{"status":"access_denied"}]', format => 'json'); #on fail
    return;
  };  
  
group{
  
	under "/bs";
	group{
  get "/" => sub{ #load all bs
    my $self = shift;
    
    $self->res->headers->header('Access-Control-Allow-Origin' => '*');
    $self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
    
    my $sql = "SELECT bs.id,
							bs.cell_id,
							bs.name,
							bs.address,
							bs.base_station_type_id,
							SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.x,
							SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.y,
							bst.high_level_signal_radius,
							bst.medium_level_signal_radius,
							bst.low_level_signal_radius
							FROM base_stations bs              
							LEFT JOIN bs_signal_zones bst ON bst.bs_id = bs.id
              WHERE signal_zone_type = 1";
						
    my $sth = $dbh->selectall_arrayref($sql);
    my $json_text = "[";
    foreach my $row (@$sth){    
        $row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
        $row->[2]=~s/,/./g;
        $row->[3]=~s/,/./g;
        #формируем ответ в json формате
        $json_text.="{
               \"id\":$row->[0],
               \"cell_id\":\"$row->[1]\",
               \"name\":\"$row->[2]\",
               \"address\":\"$row->[3]\",
               \"base_station_type_id\":\"$row->[4]\",
               \"lat\":$row->[5],
               \"lng\":$row->[6],
							 \"high_level_signal_radius\":$row->[7],
               \"medium_level_signal_radius\":$row->[8],
               \"low_level_signal_radius\":$row->[9],
							 \"starting_angle\":0,
							 \"ending_angle\":6.2832
              },";
							
							
      }
      # отрезаем последнюю запитую т.к. она не соответствует json формату.
    $/=',';
    chomp($json_text);
    $json_text.= "]";                         
    
    $self->render(text => $json_text, format =>'json');

  };
   
under  sub{
    my $self = shift;
    return 1 if $self->session->{auth} && $self->session->{auth} eq 1 && 
            $self->session->{right_type_id} && $self->session->{right_type_id} eq 1;          
            $self->render(text => '[{"status":"access_denied"}]', format => 'json'); #on fail
    return;
  };

group{    
    
    post "/" => sub{ #save new bs
    my $self            = shift;
    
    my $bs_cell_id          = $self->param("cell_id");
    my $bs_address          = $self->param("address");
    my $bs_name           = $self->param("name");
    my $bs_type           = $self->param("base_station_type_id");    
    my $lat             = $self->param("lat");
    my $lng             = $self->param("lng");
		my $high_level_signal_radius  = $self->param("high_level_signal_radius");
    my $medium_level_signal_radius  = $self->param("medium_level_signal_radius");
    my $low_level_signal_radius   = $self->param("low_level_signal_radius");	
    
    $self->res->headers->header('Access-Control-Allow-Origin' => '*');
    $self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
    
    my $sql = "INSERT INTO base_stations 
          ( 
            cell_id,
            name,
            address,
            base_station_type_id,
            location
          )
          VALUES(
            '$bs_cell_id',
            '$bs_name',
            '$bs_address',
            $bs_type,
            SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL)            
          ) returning id into :p_new_id";        
        
    my $sth = $dbh->prepare($sql);
    my $p_new_id='-1';      
    $sth->bind_param_inout(":p_new_id",\$p_new_id,"SQL_NUMERIC");        
    $sth->execute();    
		
		$sql = "INSERT INTO bs_signal_zones 
          ( 
            bs_id,
            location,
            high_level_signal_radius,
						medium_level_signal_radius,
            low_level_signal_radius,						
            starting_angle,
            ending_angle,
            signal_zone_type,
						sector_id            
          )
          VALUES(
            '$p_new_id',            
            SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL),
            $high_level_signal_radius,
            $medium_level_signal_radius,
            $low_level_signal_radius,						
						0,
						6.2832,
						1,
						''		
          )";
					
					$sth = $dbh->prepare($sql);					
					$sth->execute();    
		
		
    $sql = "SELECT bs.id,
							bs.cell_id,
							bs.name,
							bs.address,
							bs.base_station_type_id,
							SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.x,
							SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.y,
							bst.high_level_signal_radius,
							bst.medium_level_signal_radius,
							bst.low_level_signal_radius
							FROM base_stations bs         
							LEFT JOIN bs_signal_zones bst ON bst.bs_id = bs.id
							WHERE bs.id=$p_new_id AND signal_zone_type = 1";
                    
    $sth = $dbh->selectall_arrayref($sql);
    my $json_text = "";
    foreach my $row (@$sth){    
        $row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
        $row->[2]=~s/,/./g;
        $row->[3]=~s/,/./g;
        #формируем ответ в json формате
        $json_text.="{
               \"id\":$row->[0],
               \"cell_id\":\"$row->[1]\",
               \"name\":\"$row->[2]\",
               \"address\":\"$row->[3]\",
               \"base_station_type_id\":\"$row->[4]\",
               \"lat\":$row->[5],
               \"lng\":$row->[6],
							 \"high_level_signal_radius\":$row->[7],
               \"medium_level_signal_radius\":$row->[8],
               \"low_level_signal_radius\":$row->[9],
							 \"starting_angle\":0,
							 \"ending_angle\":6.2832
              }";
      }
      # отрезаем последнюю запитую т.к. она не соответствует json формату.
    #$/=',';
    #chomp($json_text);
    #$json_text.= "]";                             
    $self->render(text => $json_text, format =>'json');
 
    };
    
  put "/:id" => sub{ # update bs
    my $self            = shift;
    my $id              = $self->param("id");
    my $bs_cell_id          = $self->param("cell_id");
    my $bs_address          = $self->param("address");
    my $bs_name           = $self->param("name");
    my $bs_type           = $self->param("base_station_type_id");    
    my $lat             = $self->param("lat");
    my $lng             = $self->param("lng");
		my $high_level_signal_radius  = $self->param("high_level_signal_radius");
    my $medium_level_signal_radius  = $self->param("medium_level_signal_radius");
    my $low_level_signal_radius   = $self->param("low_level_signal_radius");	
    
    my $sql;
    
      $sql = "UPDATE base_stations bs					
					SET 
          bs.cell_id = '$bs_cell_id',
          bs.address = '$bs_address',
          bs.name = '$bs_name',
          bs.base_station_type_id = $bs_type,                 
          bs.location = SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL)
          WHERE id=$id";                                   
    
    my $sth = $dbh->prepare($sql);    
    $sth->execute();    
		
		$sql = "UPDATE bs_signal_zones
					SET 
					high_level_signal_radius = $high_level_signal_radius,
					medium_level_signal_radius = $medium_level_signal_radius,
					low_level_signal_radius = $low_level_signal_radius
					WHERE bs_id = '$id'";
		
		$sth = $dbh->prepare($sql);    
    $sth->execute();    
		
    $sql = "SELECT bs.id,
							bs.cell_id,
							bs.name,
							bs.address,
							bs.base_station_type_id,
							SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.x,
							SDO_CS.TRANSFORM(bs.location,'USE_SPHERICAL',8307).sdo_point.y,
							bst.high_level_signal_radius,
							bst.medium_level_signal_radius,
							bst.low_level_signal_radius
							FROM base_stations bs         
							LEFT JOIN bs_signal_zones bst ON bst.bs_id = bs.id
							WHERE bs.id=$id AND signal_zone_type = 1";
                    
    $sth = $dbh->selectall_arrayref($sql);
    my $json_text = "";
    foreach my $row (@$sth){    
        $row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
        $row->[2]=~s/,/./g;
        $row->[3]=~s/,/./g;
        #формируем ответ в json формате
        $json_text.="{
               \"id\":$row->[0],
               \"cell_id\":\"$row->[1]\",
               \"name\":\"$row->[2]\",
               \"address\":\"$row->[3]\",
               \"base_station_type_id\":\"$row->[4]\",
               \"lat\":$row->[5],
               \"lng\":$row->[6],
							 \"high_level_signal_radius\":$row->[7],
               \"medium_level_signal_radius\":$row->[8],
               \"low_level_signal_radius\":$row->[9],
							 \"starting_angle\":0,
							 \"ending_angle\":6.2832               
              }";
      }
      # отрезаем последнюю запитую т.к. она не соответствует json формату.
    #$/=',';
    #chomp($json_text);
    #$json_text.= "]";                             
    $self->render(text => $json_text, format =>'json');

    };
    
   any ['delete'] => "/:id" => sub{ #delete bs
    my $self = shift;
        
    $self->res->headers->header('Access-Control-Allow-Origin' => '*');
    $self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
    
    my $id = $self->param('id');        
    my $sql = "DELETE FROM base_stations WHERE id =$id";            
    my $sth = $dbh->prepare($sql);      
    $sth->execute();              
		
		$sql = "DELETE FROM bs_signal_zones WHERE bs_id ='$id'";            
    $sth = $dbh->prepare($sql);      
    $sth->execute();              
		  
    $self->render(text => '[{"status":"ok"}]', format =>'json');
  };
	};
  };
	

under  sub{
    my $self = shift;
    return 1 if $self->session->{auth} && $self->session->{auth} eq 1 && 
            (
              $self->session->{right_type_id} && $self->session->{right_type_id} eq 1 ||              
							$self->session->{right_type_id} && $self->session->{right_type_id} eq 3 ||
              $self->session->{right_type_id} && $self->session->{right_type_id} eq 4            
            );          
            $self->render(text => '[{"status":"access_denied"}]', format => 'json'); #on fail
    return;
  };  
	
group{
	
	under "/signals";
	group{
		get "/" => sub{ #get all signal data
    my $self = shift;
        
    
    $self->res->headers->header('Access-Control-Allow-Origin' => '*');
    $self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
    
    my $sql = "SELECT bst.id,
							bst.bs_id,
							SDO_CS.TRANSFORM(bst.location,'USE_SPHERICAL',8307).sdo_point.x,
							SDO_CS.TRANSFORM(bst.location,'USE_SPHERICAL',8307).sdo_point.y,     
							bst.high_level_signal_radius,
							bst.medium_level_signal_radius,
							bst.low_level_signal_radius,
							to_char(bst.starting_angle, '0.0000000000000'),
              to_char(bst.ending_angle, '0.0000000000000'),
							bst.signal_zone_type,
							bst.sector_id,
							bs.cell_id
							FROM bs_signal_zones bst
							LEFT JOIN base_stations bs ON bs.id = bst.bs_id
							WHERE signal_zone_type = 2";
          
          
    my $sth = $dbh->selectall_arrayref($sql);
    my $json_text = "[";
    foreach my $row (@$sth){
        $row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
        $row->[2]=~s/,/./g;
        $row->[3]=~s/,/./g;
        #формируем ответ в json формате
        $json_text.="{
               \"id\":$row->[0],
               \"bs_id\":\"$row->[1]\",
               \"lat\":$row->[2],
               \"lng\":$row->[3],
               \"high_level_signal_radius\":$row->[4],
               \"medium_level_signal_radius\":$row->[5],
               \"low_level_signal_radius\":$row->[6],
               \"starting_angle\":$row->[7],
               \"ending_angle\":$row->[8],
               \"signal_zone_type\":$row->[9],
               \"sector_id\":\"$row->[10]\",
							 \"cell_id\":\"$row->[11]\"
              },";
      }
      # отрезаем последнюю запитую т.к. она не соответствует json формату.
    $/=',';
    chomp($json_text);
    $json_text.= "]";                             
    $self->render(text => $json_text, format =>'json');

 };			
 
	post "/" => sub{ #save new signal
    my $self            = shift;
    
    my $bs_id          = $self->param("bs_id");
		my $lat             = $self->param("lat");
    my $lng             = $self->param("lng");
		my $high_level_signal_radius  = $self->param("high_level_signal_radius");
    my $medium_level_signal_radius  = $self->param("medium_level_signal_radius");
    my $low_level_signal_radius   = $self->param("low_level_signal_radius");		
		my $starting_angle  = $self->param("starting_angle");
    my $ending_angle   = $self->param("ending_angle");
    
    my $signal_zone_type           = $self->param("signal_zone_type");
    my $sector_id = $self->param("sector_id");
    
    
    
    $self->res->headers->header('Access-Control-Allow-Origin' => '*');
    $self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
    
    my $sql = "INSERT INTO bs_signal_zones 
          ( 
            bs_id,
            location,
            high_level_signal_radius,
						medium_level_signal_radius,
            low_level_signal_radius,						
            starting_angle,
            ending_angle,
            signal_zone_type,
						sector_id            
          )
          VALUES(
            '$bs_id',            
            SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL),
            $high_level_signal_radius,
            $medium_level_signal_radius,
            $low_level_signal_radius,						
						$starting_angle,
						$ending_angle,
						$signal_zone_type,
						'$sector_id'
						
          ) returning id into :p_new_id";        
        
    my $sth = $dbh->prepare($sql);
    my $p_new_id='-1';      
    $sth->bind_param_inout(":p_new_id",\$p_new_id,"SQL_NUMERIC");        
    $sth->execute();    
    $sql = "SELECT id,
						bs_id,
            SDO_CS.TRANSFORM(location,'USE_SPHERICAL',8307).sdo_point.x,
            SDO_CS.TRANSFORM(location,'USE_SPHERICAL',8307).sdo_point.y,            
            high_level_signal_radius,
            medium_level_signal_radius,
            low_level_signal_radius,						
            to_char(starting_angle, '0.0000000000000'),
            to_char(ending_angle, '0.0000000000000'),
            signal_zone_type,
						sector_id,
						bs.cell_id
						FROM bs_signal_zones bst
						LEFT JOIN base_stations bs ON bs.id = bst.bs_id
            WHERE id=$p_new_id AND signal_zone_type = 2";
                    
    $sth = $dbh->selectall_arrayref($sql);
    my $json_text = "";
    foreach my $row (@$sth){    
        $row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
        $row->[2]=~s/,/./g;
        $row->[3]=~s/,/./g;
        #формируем ответ в json формате
        $json_text.="{
               \"id\":$row->[0],
               \"bs_id\":\"$row->[1]\",
               \"lat\":\"$row->[2]\",
               \"lng\":\"$row->[3]\",
							 \"high_level_signal_radius\":$row->[4],
               \"medium_level_signal_radius\":$row->[5],
               \"low_level_signal_radius\":$row->[6],               
               \"starting_angle\":$row->[7],
               \"ending_angle\":$row->[8],
							 \"signal_zone_type\":$row->[9],
							 \"sector_id\":\"$row->[10]\",
							 \"cell_id\":\"$row->[11]\"
              }";
      }
      # отрезаем последнюю запитую т.к. она не соответствует json формату.
    #$/=',';
    #chomp($json_text);
    #$json_text.= "]";                             
    $self->render(text => $json_text, format =>'json');
 
    };
		
	put "/:id" => sub{ # update signal
    my $self   = shift;
    my $id     = $self->param("id");
    my $bs_id  = $self->param("bs_id");
		my $lat 	 = $self->param("lat");
    my $lng    = $self->param("lng");
		my $high_level_signal_radius    = $self->param("high_level_signal_radius");
    my $medium_level_signal_radius  = $self->param("medium_level_signal_radius");
    my $low_level_signal_radius     = $self->param("low_level_signal_radius");
		my $starting_angle   = $self->param("starting_angle");
    my $ending_angle     = $self->param("ending_angle");
    my $signal_zone_type = $self->param("signal_zone_type");
    my $sector_id        = $self->param("sector_id");
    
    my $sql;
    
		$sql = "UPDATE bs_signal_zones SET
				bs_id = '$bs_id',
				location = SDO_GEOMETRY(2001,8307,SDO_POINT_TYPE($lat, $lng,NULL),NULL,NULL),
				high_level_signal_radius = $high_level_signal_radius,
				medium_level_signal_radius = $medium_level_signal_radius,
				low_level_signal_radius = $low_level_signal_radius,
				starting_angle = $starting_angle,
				ending_angle = $ending_angle,
				signal_zone_type = $signal_zone_type,
				sector_id = '$sector_id'
				WHERE id=$id";                       
    
    my $sth = $dbh->prepare($sql);
    $sth->execute();
    $sql = "SELECT bst.id,
						bst.bs_id,
            SDO_CS.TRANSFORM(bst.location,'USE_SPHERICAL',8307).sdo_point.x,
            SDO_CS.TRANSFORM(bst.location,'USE_SPHERICAL',8307).sdo_point.y,
            bst.high_level_signal_radius,
            bst.medium_level_signal_radius,
            bst.low_level_signal_radius,						
            to_char(bst.starting_angle, '0.0000000000000'),
            to_char(bst.ending_angle, '0.0000000000000'),
            bst.signal_zone_type,
						bst.sector_id,
						bs.cell_id
            FROM bs_signal_zones bst
						LEFT JOIN base_stations bs ON bs.id = bst.bs_id
            WHERE bst.id=$id AND signal_zone_type = 2";
                    
    $sth = $dbh->selectall_arrayref($sql);
    my $json_text = "";
    foreach my $row (@$sth){    
			$row->[1]=~s/\r*\n*//g; # удаляем все символы новой строки
			$row->[2]=~s/,/./g;
			$row->[3]=~s/,/./g;
			#формируем ответ в json формате
			$json_text.="{
						 \"id\":$row->[0],
						 \"bs_id\":\"$row->[1]\",
						 \"lat\":\"$row->[2]\",
						 \"lng\":\"$row->[3]\",
						 \"high_level_signal_radius\":$row->[4],
						 \"medium_level_signal_radius\":$row->[5],
						 \"low_level_signal_radius\":$row->[6],
						 \"starting_angle\":$row->[7],
						 \"ending_angle\":$row->[8],
						 \"signal_zone_type\":$row->[9],
						 \"sector_id\":\"$row->[10]\",
						 \"cell_id\":\"$row->[11]\"
						}";
    }
    # отрезаем последнюю запитую т.к. она не соответствует json формату.
    #$/=',';
    #chomp($json_text);
    #$json_text.= "]";
    $self->render(text => $json_text, format =>'json');

    };
		
	any ['delete'] => "/:id" => sub{ #delete signal
    my $self = shift;
        
    $self->res->headers->header('Access-Control-Allow-Origin' => '*');
    $self->res->headers->header('Content-Type' => 'text/javascript; charset=UTF-8');
    
    my $id = $self->param('id');
    my $sql = "DELETE FROM bs_signal_zones WHERE id =$id";
    my $sth = $dbh->prepare($sql);
      
    $sth->execute();
    $self->render(text => '[{"status":"ok"}]', format =>'json');
  };

	};
	};

};
};


under '/admin';
group{

  any '/login' => sub{    
      my $self = shift; 
      
      
      my $user = $self->param('user');
      my $pass = $self->param('pass');
      
      my $sql = "SELECT us.id, pr.right_type_id FROM USERS us
            INNER JOIN PUBLIC_RIGHTS pr ON pr.user_id = us.id
            WHERE UPPER(login)=UPPER('$user') and password='$pass' and pr.right_type_id = 1";
      my $sth = $dbh->selectall_arrayref($sql);
        
      if (defined($sth->[0]->[0])){
        $self->session->{auth} = 2; 
        $self->session->{user_id} = $sth->[0]->[0]; 
        $self->session->{right_type_id} = 1;    
        $self->redirect_to('/admin/main');  
        
      }else{
        $self->flash(message => 'Не верный логин или пароль!');     
      }  
      
     }=>'admin_login';


     
   under  sub{
    my $self = shift;
    return 1 if $self->session->{auth} && $self->session->{auth} eq 2 && 
            $self->session->{right_type_id} && $self->session->{right_type_id} eq 1;          
            $self->redirect_to('/admin/login'); #on fail
    return;
  };
  
  group{
    
    get "/logout" => sub {
      my $self = shift;
      $self->session(expires => 1);
      $self->redirect_to('/admin/login');

    };    
    
    get '/main' => sub{
      my $self = shift;
      my $sql = "SELECT us.id, us.fio, us.login FROM users us
          INNER JOIN public_rights pr ON us.id = pr.user_id ORDER BY id DESC";
      my $sth = $dbh->selectall_arrayref($sql);     
      $self->render('admin_main', sth => $sth);
                  
    };
    
    get '/add_user_page';
    post '/save_user' => sub{
      
      my $self = shift;
      
      my $fio = $self->param('fio');
      my $login = $self->param('login');
      my $pass = $self->param('pass');
      my $right_type_id = $self->param('right_type_id');
            
      my $sql = "INSERT INTO users (fio, login, password) VALUES ('$fio', '$login', '$pass') returning id into :p_new_id";
      my $sth = $dbh->prepare($sql);
      my $p_new_id='0';
      $sth->bind_param_inout(":p_new_id",\$p_new_id,"SQL_NUMERIC");        
      $sth->execute();
                  
      $sql = "INSERT INTO public_rights (right_type_id, user_id) VALUES ($right_type_id, $p_new_id)";
      $sth = $dbh->prepare($sql);
      $sth->execute();
      
      my $right_id;
      
      if($right_type_id eq 1){
        $right_id = 4;
      }elsif($right_type_id eq 2){
        $right_id = 3;
      }
      
      system("php /var/www/phpbb/includes/add_user.php '$login' '$pass' '$right_id'");
      $self->redirect_to('/admin/main');    
    };
    
    get '/remove_user' => sub{
      my $self = shift;
      my $user_id = $self->param('id');
      
      my $sql = "DELETE FROM users WHERE id=$user_id";
      my $sth = $dbh->prepare($sql);
      $sth->execute();
      
      
      $self->redirect_to('/admin/main');
      
    };
    
    get '/change_user_data_page' => sub{      
      my $self = shift;
      my $id = $self->param('id');
      
      my $sql = "SELECT us.id, us.fio, us.login, us.password, pr.right_type_id  
            FROM users us
            INNER JOIN public_rights pr ON us.id = pr.user_id           
            WHERE us.id = $id";
      
      my $sth = $dbh->selectall_arrayref($sql);
      $self->render('change_user_data_page', sth => $sth);
      
    };    
    
    get '/change_user_data' => sub{
      my $self = shift;
      
      my $user_id = $self->param('id');
      my $fio = $self->param('fio');
      my $login = $self->param('login');
      my $pass = $self->param('pass');
      my $right_type_id = $self->param('right_type_id');
      
      my $sql = "UPDATE users us SET 
            us.fio='$fio', 
            us.login='$login', 
            us.password='$pass'
            WHERE us.id=$user_id";      
            
      my $sth = $dbh->prepare($sql);
      $sth->execute();      
      
      $sql = "UPDATE public_rights
            SET right_type_id = $right_type_id
            WHERE user_id=$user_id";      
            
      $sth = $dbh->prepare($sql);
      $sth->execute();      
      
      $self->redirect_to('/admin/main');
      
    
    };
    
  };
   

};


app->start;