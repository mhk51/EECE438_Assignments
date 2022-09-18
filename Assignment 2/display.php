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
		$sql = "SELECT * FROM `contacts`";
		
		if ( @mysql_query ( $sql) )
		{
            ?>
            <table border = '1px'>
                <thead>
					<th>ID </th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Mobile Number</th>
                    <th>Profession</th>
                    <th>Email</th>
					
        </thead>
            <?php
			$query = mysql_query ( $sql );

			while ( $row = mysql_fetch_assoc ( $query ) ) {
                ?>
                <tr>
                <?php
				echo '<td>'.$row['ID'].'</td>';
				echo '<td>'.$row['contact_name']. '</td>';
                echo '<td>'.$row['contact_Tel_number'] .'</td>';
                echo '<td>'.$row['contact_mobile_number'] .'</td>';
                echo '<td>'.$row['contact_profession'] .'</td>';
                echo '<td>'.$row['contact_email'] .'</td>';
				
                ?>
				<form method="POST" action="formUpdate.php?id=<?php echo $row['ID']; ?>">
				<td> <button type="submit">Update</button></td>
			</form>
			<form method="POST" action="delete.php?id=<?php echo $row['ID']; ?>">
				<td> <button type="submit">Delete</button></td>
			</form>
                </tr>
                <?php
			} 
            ?>
            </table>
            <?php
		}
		else {
				die ( mysql_error() );
		}	
	}
	else {
		trigger_error ( mysql_error(), E_USER_ERROR );
	}	
?>
	<form action="formInsert.html">
		<button type="submit">Insert Contacts</button>
</form>
</body>
</html>