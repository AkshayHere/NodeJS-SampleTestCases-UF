# Test Assignment

Sample Solution For the Usecases provided in attached document (NodeJS_Assessment_v2.docx)

## Packages Used
-	Framework: 	<strong></strong> ExpressJS
- ORM:  <strong>Sequelize</strong>
-	Database:  <strong>MySql 8.0</strong>
-	HTTP Client: <strong>Axios</strong>
-	Multipart Parser: <strong>Multer</strong>
-	CSV Parser: <strong>csv-parser</strong>
-	Logger:	 <strong>WinstonJS</strong>
-	Test Runner: <strong>Jest</strong>


<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | external | dir | This holds the code for building external system which is required for question 2.<br><b>There is no need to modify anything inside or start it manually</b>
| 2 | javascript | dir | This holds the base code which you should extend in order to fulfil the requirements |
| 3 | NodeJS_Assessment_v2.docx | file | Sample Usecases |
| 4 | data.sample.csv | file | Sample csv for Usecase 1 |

<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 3306 |
| 2 | external | 5000 |
| 3 | application | 3000 |

<br>

## Commands
All the commands listed should be ran in ./javascript directory.
Make sure that [Docker](https://www.docker.com/products/docker-desktop) is installed in your PC.

Use [Postman](https://www.postman.com/downloads/) for testing API Calls

<br>

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database and external (folder).
```bash
npm start
```

<br>

### Running in watch mode
This will start the application in watch mode.
```bash
npm run start:dev
```

<br>

### Check local application is started
You should be able to call (GET) the following endpoint and get a 200 response

```
http://localhost:3000/api/healthcheck
```

<br>

### Check external system is started
You should be able to call (POST) the following endpoint and get a 200 response
```
  http://localhost:5000/students?class=2&offset=1&limit=2
```

<br>

## Extras

### Database
You can place your database migration scripts in javascript/database folder. <br>
It will be ran the first time MySQL docker container is first initialised. <br><br>

Alternatively, Run the SQL Script in MySQL Workbench for Database Creation.

<br>

## FAQ

### Error when starting up
If you encounter the following error when running ```npm start```, it is due to the slow startup of your database container.<br>
Please run ```npm start``` again.

```
[server.js]	ERROR	SequelizeConnectionError: Connection lost: The server closed the connection.
[server.js]	ERROR	Unable to start application
```
