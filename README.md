# Star Wars

View details about the configuration, setup and execution of the below 4 scenarios:

1. A user can view a list of people.
2. A user can view a list of planets.
3. A user can view a list of starships.
4. A user can search for a person.

# Setup

1. Install PHP version 8.1.14
2. Install NodeJS and create a reactive app using npx create-react-app "folderName"
3. cd folderName
4. Create a folder named api for php files

Work on the code where the ReactJS code has to be updated in App.js and if required create components and initialise. All the PHP files will be stored in the api folder.

# Execution

1. On one terminal of the folder, run php -S localhost:8000 to run the PHP application on port 8000.
2. Open another terminal and run sudo npm start to start the react app.

# Website

1. Check the website on http://localhost:3000/.
<img width="1389" alt="image" src="https://user-images.githubusercontent.com/93752771/226368422-3a2d64f8-d1eb-4ad8-8212-39aa860ca9df.png">
2. This is a single page application with a navigation bar of 3 elements.
3. The first element points to the list of all star ships. 
<img width="1312" alt="image" src="https://user-images.githubusercontent.com/93752771/226368590-bcc7798b-d91f-4091-8263-d06d01e5d192.png">
4. On clicking any of the star ship, the user will be taken to its details where some basic details of the ship are provided.
<img width="578" alt="image" src="https://user-images.githubusercontent.com/93752771/226368664-5da809dc-dc13-4c43-b225-541b7eab4fc1.png">
5. On clicking the The Star Wars API link on the left side of the nav bar, user will be taken to the home page at any time.
6. Similarly, the second element, planets points to the list of all planets.
<img width="1211" alt="image" src="https://user-images.githubusercontent.com/93752771/226369085-8ff60ff4-dc1b-467d-b21f-5d064875c4fb.png">
7. On clicking any of the planet, user will be navigated to the details of that planet.
<img width="689" alt="image" src="https://user-images.githubusercontent.com/93752771/226369280-396f04e1-feb1-4d46-93aa-6d0bdb63ca5d.png">
8. Same is the case with people, except the additonal functionality that any person in the list can be searched using their name. On entering an alphabet, the list of people will be narrowed down based on the alphabet filtering.
<img width="1129" alt="image" src="https://user-images.githubusercontent.com/93752771/226369675-f5bee48e-387f-48f6-8f94-c2a2d8d30c8a.png">

<img width="1327" alt="image" src="https://user-images.githubusercontent.com/93752771/226369876-de4ef6cd-77ed-45e3-8f3c-781979979920.png">

 Please note that this is a basic application with PHP and React with minimal styling.
