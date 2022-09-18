<html>
<body>

<?php

	// set your infomation.
	$host		=	'localhost';
	$user		=	'root';
	$pass		=	'';	
	$database	=	'roscripts';
	
	
	// connect to the mysql database server.
	$connect = @mysql_connect ( $host, $user, $pass ) ;

	if ( $connect )
	{
        mysql_select_db ( $database, $connect );
		$query="UPDATE contacts 
        SET contact_name='$_POST[contact_name]', 
            contact_profession = '$_POST[contact_profession]',
            contact_Tel_number = '$_POST[contact_Tel_number]',
            contact_mobile_number = '$_POST[contact_mobile_number]',
            contact_email = '$_POST[contact_email]'
        WHERE ID='$_GET[id]'";

		
		if ( @mysql_query ( $query ) )
			{
				echo 'Record Updated Successfully';
				header("Location: /display.php");
			}
			else {
				die ( mysql_error() );
			}	
	        
	}
	else {
		trigger_error ( mysql_error(), E_USER_ERROR );
	}
?>
</body>
</html>