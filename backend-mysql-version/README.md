# Task Manager API

## Project Description
This is a simple **Task Manager API** backend using **Node.js, Express, and MySQL**.  
The database runs inside a **Docker container**, so you don’t need to install MySQL locally.  

It supports basic CRUD operations for users, and later you can extend it to include tasks.

---

## Technologies Used
- Node.js
- Express.js
- MySQL (running inside Docker)
- mysql2 npm package
- dotenv for environment variables
- CORS

---

### Install required dependenicies

```
npm install cors express dotenv nodemon mysql
```

## MySQL Setup with Docker

### 1. Run MySQL Container

Open terminal (Git Bash) and run:

### mysql

```bash
docker run --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=task_manager \
  -p 3306:3306 \
  -d mysql:8
```

##### This will:

###### - Create container named mysql-container

###### - Set root password = 1234

###### - Create database task_manager

###### - Expose port 3306

###### - Run MySQL 8 inside Docker

### mongodb
```
docker run --name mongodb-container -p 27017:27017 -d mongo
```
### 2. Check If Container is Running

```
docker ps
```

### 3. Enter MySQL Inside Container

```
docker exec -it mysql-container mysql -u root -p
```

#### Then inside MySQL:

```
USE task_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Using db.sql File (Optional)

```
docker exec -i mysql-container mysql -u root -p1234 task_manager < db.sql
```

### 4. Show Tables

```
USE task_manager;
SHOW TABLES;
```

### 5. Stop / Start / Delete Container

```
Stop container: docker stop mysql-container

Start container: docker start mysql-container

Delete container: docker rm -f mysql-container
```


