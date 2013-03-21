<?php

class Feed extends CI_Model {

    var $id    = 0;
    var $name  = '';
    var $url   = '';

    /**
     * Create a new feed that will be associated with the user
      * Currently logged.
      * @ Param {Array} Array feed containing all the information
      * For the new feed to be created.
     */
    public function create($feed){

		$sql = "INSERT INTO feeds (user_id, name, url)".
	           " VALUES (?, ?, ?)";

	    $success = $this->db->query($sql, $feed);
	    return $success ? $feed : false;    
	
	}
	
	/**
	 * Delete the specified feed assegato to the specified user.
	 * @ Param {Number} user_id The unique identifier of the user currently logged on.
	 * @ Param {Number} feed_id unique identifier assigned to the feed to delete.
	 */
	public function delete($user_id, $feed_id){

		$sql = "DELETE FROM feeds WHERE user_id = ? AND id = ?";
	    $success = $this->db->query($sql, array($user_id, $feed_id));
	    return $success;    
	
	}
	
	/**
	 * Update the feed specified with the new information provided.
	 * @ Param {Number} id unique identifier assigned to the feed to delete.
	 * @ Param {String} name The new name for the Feed.
      * @ Param {String} url New URL by which you can reach the feed.	 
	*/
	public function update($id, $name, $url){

		$sql = "UPDATE feeds SET name = ?, url = ? WHERE id = ?";
	    $success = $this->db->query($sql, array($name, $url, $id));
	    return $success;    
	
	}

    /**
     * Retrieves the list of all feeds associated
      * The user who made the connection.
      * @ Param {Number} user_id unique identifier assigned to the user currently logged on.
     */
    public function all($user_id){
	
		$sql = "SELECT * FROM feeds WHERE user_id = ?";
		$feeds = $this->db->query($sql, array($user_id))->result();
		return $feeds;

    }

}

/* End of file pet.php */
/* Location: ./application/models/feed.php */