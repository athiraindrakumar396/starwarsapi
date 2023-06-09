<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Content-Type');

    /*
     *
     * Do not edit this file if you want to update this module for future new versions.
     *
     * @class  ViewPeople
     * @package   Api_ViewPeople
     *
     * @copyright Copyright (c) 2023 McFadyen Digital.
     *
     * @author    Athira Indrakumar<athiraindrakumar396@gmail.com>
     *
     */
    class ViewPeople {

        /**
         * execute people viewing api
         **/
        public function callPeopleApi() {
            $request_body = file_get_contents('php://input');
            $data = json_decode($request_body, true);
            $id = ltrim(rtrim($data['peopleId'], '/'), 'https://swapi.dev/api/people/');

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, "https://swapi.dev/api/people/" . $id);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $output = curl_exec($curl);
            curl_close($curl);

            $result = array(json_decode($output, true));
            echo json_encode($result);
        }
    }

    $people = new ViewPeople();
    $people->callPeopleApi();
?>