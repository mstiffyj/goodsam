<?php

class User extends CI_Model {

    var $id                   = 0;
    var $name                 = '';
    var $surname              = '';
    var $username             = '';
    var $password             = '';
    var $email                = '';
    
    /**
     * Allows the user to login and then to
      * Start to consume REST API.
      * @ Param {String} username Username for authentication.
      * @ Param {String} password authentication.
      * @ Return {User / Boolean} The complete information associated with the user
      * That is logged when login successful
      * Successful, otherwise false.
     */
    public function login($username, $password)
    {
	
	    // Define the query to find user info
		$sql = "SELECT *".
	           " FROM users".
	           " WHERE username = ?".
	           " AND password = ?";

        // Trying to find the information associated with the user that is accessing
		$user = $this->db->query($sql, array($username, $password))->result();
		
		return $user ? $user[0] : false;

    }
    
     public function all($id){
	
		$sql = "SELECT * FROM users WHERE id = ?";
		$users = $this->db->query($sql, array($id))->result();
		return $users;

    }
    
    public function friends($id){
	
		$sql = "SELECT * FROM users WHERE id != ?";
		$users = $this->db->query($sql, array($id))->result();
		return $users;

    }
    
    public function create($user){

		$sql = "INSERT INTO users (id, name, surname, username, password, email, date, newsletter)".
	           " VALUES (?, ?, ?, ?, MD5(?), ?, ?, ?)";

	    $success = $this->db->query($sql, $user);
	    return $success ? $user : false;    
	
	}
	
	public function comment($user){

		$sql = "INSERT INTO contact (id, email, comment)".
	           " VALUES (?, ?, ?)";

	    $success = $this->db->query($sql, $user);
	    return $success ? $user: false;    
	
	}
	
	public function update($id, $name, $email, $newsletter, $surname, $username){

		$sql = "UPDATE users SET name = ?, surname = ?, username = ?, email = ?, newsletter = ? WHERE id = ?";
	    $success = $this->db->query($sql, array($name, $email, $newsletter, $surname, $username, $id));
	    return $success;    
	
	}
	
	public function delete($id){

		$sql = "DELETE FROM users WHERE id = ?";
	    $success = $this->db->query($sql, array($id));
	    return $success;    
	
	}

}

/* End of file pet.php */
/* Location: ./application/models/user.php */