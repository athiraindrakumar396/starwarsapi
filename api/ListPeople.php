<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Content-Type');

    /*
     *
     * Do not edit this file if you want to update this module for future new versions.
     *
     * @class  People
     * @package   Api_People
     *
     * @copyright Copyright (c) 2023 McFadyen Digital.
     *
     * @author    Athira Indrakumar<athiraindrakumar396@gmail.com>
     *
     */
    class People {

        /**
         * execute people listing api with page count. This API has pagination where the page number has to be given as a query parameter to list the people on that page
         **/
        public function callPeopleApi() {
            $request_body = file_get_contents('php://input');
            $data = json_decode($request_body, true);
            $page = $data['pageValue'];

            $output = $this->execCurl($page);

            $people = [];
            if ($output) {
                if (isset(json_decode($output, true)['count']) && json_decode($output, true)['count'] > 10) {
                    $count = json_decode($output, true)['count'];
                    $pages = intdiv($count, 10);
                    if ($count % 10 != 0) {
                        $pages = intdiv($count, 10) + 1;
                    }

                    foreach(json_decode($output, true)['results'] as $person) {
                        if ($page != $pages) {
                            $person['next'] = $page + 1;
                            $people[] = $person;
                        }
                    }
                    echo json_encode($people);
                }
            }
        }

        /**
         * execute people listing api using curl
         **/
        public function execCurl($page = 1) {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, "https://swapi.dev/api/people/?page=" . $page);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $output = curl_exec($curl);
            curl_close($curl);
            return $output;
        }
    }

    $people = new People();
    $people->callPeopleApi();
?>