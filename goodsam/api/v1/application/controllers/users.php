<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Users extends REST_Controller {
    
    /**
      * Allows the user who is using the application
      * To login.
     */
    public function login_post(){
        
        session_start();
        $this->load->model('User');
        $user = $this->User->login($this->post('username'), md5($this->post('password')));
        
        // Check if the user has been found
        if($user){
            
            /* Storing user within
              * A session variable. */
            $_SESSION['user'] = $user;
            
            //Authentication successful
            $this->response(
                array(
                    "success" => "true",
                    "user" => $user
                ), 
                200
            );
    
        }
        else {
            
            // authentication failed
            $this->response(
                array(
                    "success" => "false"
                ), 
                401
            );
            
        }

    }
    
    public function relogin_post(){
        
        session_start();
        $this->load->model('User');
        $user = $this->User->login($this->post('username'), $this->post('password'));
        
        // Check if the user has been found
        if($user){
            
            /* Storing user within
              * A session variable. */
            $_SESSION['user'] = $user;
            
            //Authentication successful
            $this->response(
                array(
                    "success" => "true",
                    "user" => $user
                ), 
                200
            );
    
        }
        else {
            
            // authentication failed
            $this->response(
                array(
                    "success" => "false"
                ), 
                401
            );
            
        }

    }

        
    public function all_get(){
    
        session_start();
        $this->load->model('User');
        $feeds = $this->User->all($_SESSION['user']->id);

        $this->response(
            array(
                "success" => "true",
                "total" => count($feeds),
                "data" => $feeds
            ), 
            200
        );
    
    }
    
     public function friends_get(){
    
        session_start();
        $this->load->model('User');
        $feeds = $this->User->friends($_SESSION['user']->id);

        $this->response(
            array(
                "success" => "true",
                "total" => count($feeds),
                "data" => $feeds
            ), 
            200
        );
    
    }

    
    public function new_post(){
    
		session_start();
        $this->load->model('User');  
          
        $user = $this->User->create(
            array(
                "id" => null,
                "name" => $this->post('name'),
                "surname" => $this->post('surname'),
                "username" => $this->post('username'),
                "password" => $this->post('password'),
                "email" => $this->post('email'),
                "date"=> $this->post('date'),
                "newsletter"=> $this->post('newsletter')

            )
        );

        if($user){

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
    
    public function comment_post(){
    
		session_start();
        $this->load->model('User');  
          
        $user = $this->User->comment(
            array(
                "id" => null,
                "email" => $this->post('email'),
                "comment" => $this->post('comment')
            )
        );

        if($user){

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
    
    public function update_put(){

        $this->load->model('User');
        $success = $this->User->update($this->put('id'), $this->put('name'), $this->put('surname'), $this->put('username'), $this->put('email'), $this->put('newsletter'));
        $this->response(array("success" => $success), 200);

    }

    public function remove_delete($id){
    
		session_start();
        $this->load->model('User');
        $success = $this->User->delete($_SESSION['user']->id, $id);
        $this->response(array("success" => $success), 200);

    }

    
}