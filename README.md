# Database comparison Project

## initialize the backend projects

### 1. Add package.json 

```
npm init -y
```
### 2. Install required dependenicies in mysql, postgresql, mongodb

```
npm install cors express dotenv nodemon mysql
npm install cors express dotenv nodemon pg
npm install cors express dotenv nodemon mongoose
```
Uses Express → create API
Uses CORS → allow frontend requests
Uses dotenv → manage environment variables
Uses nodemon → auto restart during development


### 3. create server.js file and write the code with all imports

```
const express = require("express");
const cors = require("cors");
const mysql = require("mysql"); // pg or mongoose
const dotenv = require("dotenv");


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// write apis and
```

## initialize the backend projects

### 1. create vite project

```
npm create vite@latest
```
### 2. Install required dependenicies

```
npm install axios reat-router-dom
```

Uses React Router DOM → page navigation
Uses Axios → call backend

# more

#### cors -Cross-Origin Resource Sharing 
When our :

Frontend runs on → http://localhost:5173

Backend runs on → http://localhost:3000

These are different origins (different ports).

By default, the browser blocks requests between different origins for security reasons.

```
const cors = require("cors");
app.use(cors());
```

so we use cors to allow frontend to send requests to Express backend.

Without CORS → we get:

Access to fetch at 'http://localhost:3000' 
from origin 'http://localhost:5173' has been blocked by CORS policy.

#### express - Express.js is a framework for Node.js.

Create APIs

Handle routes (GET, POST, PUT, DELETE)

Handle middleware

Manage requests & responses

```
const express = require("express");
const app = express();
```
So Express = backend API builder

#### nodemon -
Normally when we change backend code, we must restart the server by node serever.js, But with nodemon, it automatically restarts when you save.

#### axios - Axios is used in the frontend to call backend APIs.

```
import axios from "axios";

axios.get("http://localhost:3000/users")
  .then(res => console.log(res.data));
```

Send HTTP requests
Handle responses
Handle errors easily
Send JSON automatically


#### React Router DOM -

```
import { BrowserRouter, Routes, Route } from "react-router-dom";
```

```
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
    </Routes>
</BrowserRouter>
```


