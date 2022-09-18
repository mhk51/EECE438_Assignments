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

		$query="INSERT INTO contacts (contact_name, contact_profession, contact_Tel_number, contact_mobile_number, contact_email)
			VALUES
			('$_POST[contact_name]','$_POST[contact_profession]','$_POST[contact_Tel_number]','$_POST[contact_mobile_number]','$_POST[contact_email]')";

		
		if ( @mysql_query ( $query ) )
			{
				echo 'Record Added Successfully';
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