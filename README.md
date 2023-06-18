Instructions to run the blog:

Database setup:
run a postgres database server on port 5433(i have used docker to run the database server, you can change the port to 5432(blog-be/config/database.js) if you want to run it locally)
the project uses the default postgres user and password("postgres" and "postgres")
and the default database named "postgres"

Node Api setup:
cd into the blog-be folder and run "npm install" to install all the dependencies
run "npm start" or "npm run dev"(nodemon mode) to start the node server

the nodejs server will automatically create the required tables in the database if they don't exist
and populate the tables with some data from the dummy api jsonplaceholder.typicode.com

React App setup:
cd into the blog-fe folder and run "npm install" to install all the dependencies
run "npm start" to start the react app

the react app will automatically open in your default browser on port 3000

#IMPORTANT
Because i haven't implemented a register page you only have to create a user in the database manually
with the api endpoint. You ll need to call the api endpoint with a tool like postman or in command line with curl

http://localhost:3001/api/user/
body: {
    "email": "kkampourelis@email.com",
    "password": "kkampourelis",
    "firstname: "Kostantinos",
    "lastname": "Kampourelis"
}

once you have created a user you can login with his credentials and start using the app

Feel free to contact me if you have any questions or problems running the app