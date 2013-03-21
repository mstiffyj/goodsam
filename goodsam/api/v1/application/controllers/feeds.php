<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Feeds extends REST_Controller {

    /**
     * Create a new feed and associates it with the user who
      * Login.
      * The following parameters are sent via
      * HTTP POST operation:
      * @ Param {String} name The new name for the Feed.
      * @ Param {String} url New URL by which you can reach the feed.
     */
    public function new_post(){
    
        session_start();
        $this->load->model('Feed');
    
        $feed = $this->Feed->create(
            array(
                "user_id" => $_SESSION['user']->id,
                "name" => $this->post('name'),
                "url" => $this->post('url')
            )
        );

        if($feed){

            $this->response(
                array(
                    "success" => "true"
                ), 
                200
            );

        }
        else{
        
            $this->response(
                array(
                    "success" => "false"
                ), 
                403
            );

        }

    }

    /**
     * Update the feed given to the new
      * Specified information.
      * The following parameters are sent via
      * HTTP PUT operation:
      * @ Param {Number} id unique identifier assigned to the feed to change.
      * @ Param {String} name The new name for the Feed.
      * @ Param {String} url New URL by which you can reach the feed.
     */
    public function update_put(){

        $this->load->model('Feed');
        $success = $this->Feed->update($this->put('id'), $this->put('name'), $this->put('url'));
        $this->response(array("success" => $success), 200);

    }

    /**
     * Removes the feed to which you have set the specified id
      * Associated with the user that is logged.
      * @ Param {Number} id unique identifier assigned to the feed to delete.
     */
    public function remove_delete($id){
    
		session_start();
        $this->load->model('Feed');
        $success = $this->Feed->delete($_SESSION['user']->id, $id);
        $this->response(array("success" => $success), 200);

    }

    /**
     * Retrieves the list of all feeds associated
      * The user who made the connection.
     */
    public function all_get(){
    
        session_start();
        $this->load->model('Feed');
        $feeds = $this->Feed->all($_SESSION['user']->id);

        $this->response(
            array(
                "success" => "true",
                "total" => count($feeds),
                "data" => $feeds
            ), 
            200
        );
    
    }

}