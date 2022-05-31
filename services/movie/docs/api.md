# API User Documentation

## Base Url
```
    http://localhost:3000
```

## Methods
```
    GET | POST | PATCH | DELETE
```

### Get /

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

### Get /:id

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

### POST 

- Request Header 
```
    None
```

- Request Body 
```
    image: <file>
    title: <string>,
    description: <text>,
    genre : <string>
    year: <date>,
    by: <string>
```

- Request Params
```
    None
```

### PATCH /{id}

- Request Header 
```
    None
```

- Request Body 
```
    image: <file>
    title: <string>,
    description: <text>,
    genre : <string>
    year: <date>,
    by: <string>
```

- Request Params
```
    id : <interger>
```

### PATCH /like/{id}

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
    id : <interger>
```

### DELETE /{id}

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

