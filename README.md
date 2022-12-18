# Steam-Recommender-Web-App
A web based recommender system that suggests videogames. Users can select any game before 2019 from the steam library, after which they are provided with a
list of similar games. The application was created to satisfy my honors project requirments and was inspired by my love for videogames.

You can play with the application over here : https://brucefernandes.github.io/frontend-recommender-final/

# The Process
- I decided to use python's pandas and numpy libraries to clean and organize the data. Having the attributes for each game organized into rows and columns
allowed me to grab necessary data
- This was followed by sklearn's TF-IDF function to compute scores for popular words within descriptions
- Using the description, genre and game tags, I used sklearn's cosine similarity function to compute a similarity matrix with scores given to different games

- The matrix along with videogame meta data was stored in MongoDB. This was done to take advantge of Mongo's Document Oreinted Storage, since I wanted to store my data
in a format similar to JSON objects
- Nodejs and Express were used to create the API, as it is responsive and easy to implement
- The front end was created with Javascript and React to provide a responsive single page application with an easy-to-use state management.


