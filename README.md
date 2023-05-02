
# "Stardew Valley" gaming forum

A site where you can register or login to create posts or comments about the game "Stardew Valley". This is a join project for both WEB programming and data base programming.
## Run Locally

1. Clone the project

```bash
  git clone https://github.com/CodingXP/GamingForum.git
```

2. Open command prompt in the project location

```bash
  cd project-download-location
```

3. Check package.json

```bash
  //Check package.json file and ensure scripts are notated as below:

{
  "name": "stardew-valley-forum",
  "version": "1.0.0",
  "keywords": [],
  "main": "src/index.js",
  "dependencies": {
    "jquery": "^3.6.4",
    "loader-utils": "3.2.1",
    "react": "^18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "^6.9.0",
    "react-scripts": "^5.0.1",
    "reactjs-popup": "^2.0.5"
  },
  "devDependencies": {
    "@babel/runtime": "7.13.8",
    "typescript": "4.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ],
  "author": "",
  "license": "ISC",
  "description": ""
}

```

4. Install dependencies
```bash
    npm install
```

5. Create the database

```bash
CREATE DATABASE GamingForum;
USE GamingForum;
 
CREATE TABLE users
(
name CHAR(15),
surname CHAR(20),
email CHAR(40),
username CHAR(20),
PASSWORD CHAR(20),
isAdmin tinyint(1),
PRIMARY KEY (username)
);
 
 
CREATE TABLE Posts
(
postID AUTO_INC INT,
postName CHAR(100),
postDesc TEXT,
postDate DATE,
postUsername char(20),
PRIMARY KEY (postID),
FOREIGN KEY (postUsername) REFERENCES users(username)
);
 
 
CREATE TABLE Comments
(
commentID AUTO_INC INT,
commentText CHAR(150),
commentDate DATE,
commentUsername char(20),
postID int,
PRIMARY KEY (commentID),
FOREIGN KEY (commentUsername) REFERENCES users(username),
FOREIGN KEY (postID) REFERENCES posts(postID)
);
 
CREATE TABLE Announcement
(
announcementID AUTO_INC INT,
announcementText CHAR(150),
announcementUsername CHAR(20),
announcementDate DATE,
PRIMARY KEY (announcementID),
FOREIGN KEY (announcementUsername) REFERENCES users(username)
);

```

6. Run the program

```bash
  npm start (in project folder)
  php -S localhost:8000 (in PHP folder)

  Start local database server with the query above.
```

# Made by DP3-2 (Gustavs Vistins)