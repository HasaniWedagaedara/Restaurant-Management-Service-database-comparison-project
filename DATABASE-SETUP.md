## Initial setup and Install required dependenicies

```
npm init -y
```


#### Install required dependenicies

```
npm install cors express dotenv nodemon mysql
npm install cors express dotenv nodemon pg
npm install cors express dotenv nodemon mongoose
```

## Setup with Docker

### 1. Run MySQL Container

Open terminal (Git Bash) and run:

### mysql

databse name -> task_manager

```bash
docker run --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=task_manager \
  -p 3306:3306 \
  -d mysql:8
```

### postgresql

```bash
docker run --name postgres-container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=task_manager \
  -p 5432:5432 \
  -d postgres:16
```

can use Neon, Supabase databases

### mongo

```
docker run --name mongodb-container -p 27017:27017 -d mongo
```

use mongodb atlas is easier


### 2. Check If Container is Running

```
docker ps
```

### 3. Enter queries Inside Container

```
docker exec -it mysql-container mysql -u root -p
docker exec -it postgres-container psql -U postgres -d task_manager
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

#### Then inside postgreSQL:

```
USE task_manager;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Using db.sql File (Optional)

```
docker exec -i mysql-container mysql -u root -p1234 task_manager < db.sql
docker exec -it postgres-container psql -U postgres -d task_manager < db.sql
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


