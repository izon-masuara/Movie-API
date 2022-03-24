# API User Documentation

## Base Url
```
    http://localhost:3001
```

## Methods
```
    GET | POST | PATCH | DELETE
```

### Get /users

- Request Header 
```
    None
```

- Request Body 
```
    None
```

- Request Params
```
    None
```

### POST /users

- Request Header 
```
    None
```

- Request Body 
```
    email: <string>,
    password: <string>,
    status : <string>
    expired: <date>,
    role: <status>
```

- Request Params
```
    None
```

### PATCH /users/{id}

- Request Header 
```
    None
```

- Request Body 
```
    money : <number>
```

- Request Params
```
    id : <interger>
```

### DELETE /users/{id}

- Request Header 
```
    None
```

- Request Body 
```
    None
```

- Request Params
```
    id : <integer>
```