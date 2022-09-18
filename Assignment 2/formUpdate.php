<html>
<head>
    <title>Update Contacts</title>
   <link rel="stylesheet" href="styles.css">
</head
<body>

<h1>Update Contacts</h1>


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
		$sql="SELECT * FROM contacts WHERE ID='$_GET[id]'";
        $query = mysql_query ( $sql );
        $row = mysql_fetch_assoc ( $query ) ;
	        
	}
	else {
		trigger_error ( mysql_error(), E_USER_ERROR );
	}
?>

<form action="update.php?id=<?php echo $row['ID']; ?>" method="post">
<table >
    <tr>
        <td> Contact Name:</td>
    <td><input type="text" name="contact_name" value="<?php echo $row['contact_name'] ?>"/> </td>
    </tr>
    <tr>
        <td>Phone Number: </td> 
        <td> <input type="tel" name="contact_Tel_number" value="<?php echo $row['contact_Tel_number']?>" /> </td>
    </tr>
    <tr>
        <td>Mobile Number:</td>
        <td> <input type="tel" name="contact_mobile_number" value="<?php echo $row['contact_mobile_number']?>" /></td>
    </tr>
    <tr>
        <td>Contact Email:</td>
        <td> <input type="email" name="contact_email" value=<?php echo $row['contact_email']?> /></td>
    </tr>
    <tr>
        <td>Contact Profession:</td>
        <td> <input type="text" name="contact_profession" value="<?php echo $row['contact_profession']?>" /></td>
    </tr>
    <tr>
        <td ><input type="submit" /></td>
        <td><input type="reset"></td>

    </tr>

</table>
</form>


</body>
</html> 