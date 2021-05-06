# Job saudagar

## About
This is a Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js. This is a webapp where you can either recruit acoording to your need or apply according to your skills.
-   The app has an option for Recruiters to Add jobs along with the salary deadline positions etc. which can edited and deleted
-   Applicants can search for jobs and apply along with an SOP
-   Webapp supports, sorting results by name ,date ,salary and rating.
- Applicants can see thier applications and the status.
- Applicants can rate the job accourding to their experience, also recruiters can rate applicants based on their work.

## Requirements:

-   NodeJS
-   ReactJS
-   ExpressJS
-   MongoDB

## Running the program

### Node

-   sudo apt-get update
-   sudo apt-get install nodejs
-   sudo apt-get install npm

### MongoDB

-   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
-   echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
-   sudo apt-get update
-   sudo apt-get install -y mongodb-org
-   sudo systemctl start mongod
-   sudo systemctl status mongod
-   sudo systemctl enable mongod

### React

-   npm install -g create-react-app

### Express

-   npm i express

## Running the code

Run Express:

```
cd backend/
npm install
npm start
```

Run React:

```
cd fronted/
npm install/
npm start
```

---