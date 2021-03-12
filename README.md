Movie-API
Description
This is a simple RESTful API for indexing movies and their respective crowd-gathered ratings (0-10). We can run this using postman. It supports 2 types of users - normal and admin. Normal users won’t have the access to add or delete movie data, but can see movie details and rate them. Admin users have access to privileged routes like CRUD operations.
Features
•	Admin can add or delete data and users can read data and update the ratings.
•	Admin users have access to privileged routes for CRUD operations.
•	Users can search for movies using the movie name.
•	API will also display movie recommendation based on the selected genre
•	Users can also rate any movie.
Technologies used
•	Nodejs
•	Express
•	MongoDB atlas (noSQL database deployment)
•	Postman(headless browser)
•	Heroku (deployment)
•	JWT (authentication and multi login)
•	VScode(code editor)
•	Cookies
•	Bcrypt(hashing password)
Implementation (Postman)
Base link: https://movie-api-backend-project.herokuapp.com
Routes:
•	/register
User can register using the following schema
{
    "name":
    "email": 
    "password":
}

•	/login
User can login using the following schema
{
    "email": 
    "password":
}

•	/movie 
User can search for any movie using the following schema
{
    "movie_name":
}

•	/rating 
User can rate any movie on scale 0-10 using the following schema
{
    "movie_name":
    "rating":
}

•	/admin
Accessible to admin only. Admin can add or delete any movie from database using the following schema.
{
    "operation":"add_movie",
    "name":
    "rating":
    "year":
    "genre":
    "numVotes":
}

{
    "operation":"delete_movie",
    "name":
}

•	/logout
Users can logout using this, after which they have to login again before accessing any routes
Future scope
•	API can provide the ratings for any movie given on other websites also.
•	Users get notification email whenever they login.
•	We can expand this API to include Tele Series i.e. single title having multiple seasons and sub - titles.



