## Prisma is an ORM (Object Relational Mapper).

#### It helps you talk to your database using JavaScript/TypeScript instead of writing raw SQL queries.

#### It works on top of databases.

#### Prisma is like a translator between your code and your database.


## Simple Example

#### Without Prisma (using SQL):

```
SELECT * FROM users WHERE email = "test@gmail.com";
```

#### With Prisma (JavaScript):

```
const user = await prisma.user.findUnique({
  where: { email: "test@gmail.com" }
});
```

## We create the database structure in schema file.

###### Example

```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

# Steps

### 1. Install Prisma

```
npm install prisma --save-dev
npm install @prisma/client
```

#### Initialize Prisma

```
npx prisma init // this creates schema.prisma file
```

### 2. Configure Database Connection

##### in .env file we need to add DATABASE_URL

##### Example

```
// In mysql normal version

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=task_manager

// prisma version

DATABASE_URL="mysql://root:1234@localhost:3306/task_manager"


// prisma mogodb version

DATABASE_URL="mongodb://localhost:27017/task_manager"
```

### 3.Define Prisma Schema in schema.prisma file

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id         Int      @id @default(autoincrement())
  name       String
  address    String
  telephone  String
  createdAt  DateTime @default(now())
}
```

### 4. Run Migration

```
npx prisma migrate dev --name init
```

##### It create user table automatically, and sync db with schema

### 5. Generate Prisma Client

```
npx prisma generate
```
