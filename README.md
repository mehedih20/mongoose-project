# How to run the app locally

1. Download the project from github

2. If nodeJs is not installed then install it

3. Open the project with any code editor

4. Open a terminal in the project folder and run "npm install". The following command will install all the listed dependecies in the package.json file which are needed for the application to run smoothly.

5. Now when the dependencies are installed, create a .env file and inside the file declare the following environment variables:

   - DATABASE_URL : Mongodb configuration string having the username,password,collection name
   - PORT : Host port. Eg. 5000
   - BCRYPT_SALT_ROUNDS : used for bcrypt. Eg. 12
   - NODE_ENV : The environment that you are building the app

6. Build the typescript code

   - npm run build : it will invoke tsc command needed for building ts files

7. Now that the typescript code is done building, we can run the application

   - npm run start:dev : this command will run tsc-node-dev which will keep running the app and automatically restart on any change in the code. This is helpful while development.
   - npm run start:prod : this will run the javascript server file with node.
   - node ./dist/server.js : if you want to directly use node to run the server file

8. Finally when the app is running on localhost, api calls can be made.
