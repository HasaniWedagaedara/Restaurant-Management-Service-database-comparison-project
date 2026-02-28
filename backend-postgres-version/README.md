## Initial setup and Install required dependenicies

```
npm init -y
npm install cors express dotenv nodemon pg
```

##  Setup with Docker

### 1. Run Container

Open terminal (Git Bash) and run:

```bash
docker run --name postgres-container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=task_manager \
  -p 5432:5432 \
  -d postgres:16
```

### 2. Check If Container is Running

```
docker ps
```

### 3. Enter MySQL Inside Container

```
docker exec -it postgres-container psql -U postgres -d task_manager
```

#### Then inside MySQL:

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


### 4. Show Tables

```
USE task_manager;
SHOW TABLES;
```


### Can use supabase or Neon



