# API ROUTES

## USER ROUTES

Descrição: criação de usuário.

```
 POST /users/

 Request Body

{
    username:string,
    email":string,
    password:string
}
```

## AUTH ROUTES
Descrição: Autenticar usuário.

POST /sessions/
Request Body
```
{
    "email": "string",
    "password":  "string"
}
```
Response
```
{
      token:string,
      user: {
        name: string,
        email: string,
        avatar: string,
        isAdmin: boolean,
        isEnterprise:boolean,
        isDriver:boolean
        id: string,
      },
      refresh_token
}
```

Descrição: Refresh Token.

POST /refresh-token/
Pode ser passado pelos headers ou pelo body

Request Body
```
{
    "token": "string",
}
```
Response
```
{
      token:string,
      user: {
        name: string,
        email: string,
        avatar: string,
        isAdmin: boolean,
        isEnterprise:boolean,
        isDriver:boolean
        id: string,
      },
      refresh_token
}
```
Descrição: Informações do usuário, necessita estar autenticado (Token no header).

POST /me

Response
```
{
      user: {
        name: string,
        email: string,
        avatar: string,
        isAdmin: boolean,
        isEnterprise:boolean,
        isDriver:boolean
        id: string,
      }
}
```

## ROUTES ROUTES

Descrição: Cadastra uma nova rota, precisa estar autenticado em uma conta Enterprise.

POST /routes

Request Body

```
{
    "driver_id": "string",
}
```
Response

```
{
    "id":"string"
    "driver_id": "string",
    "enterprise_id":"string"
}
```
Descrição: Selecionar um rota por id, precisa estar autenticado.

GET /routes/:route_id

Response

```
{
    "id":"string"
    "driver_id": "string",
    "enterprise_id":"string"
}
```
Descrição: Seleciona as rotas pelo id da empresa.

GET /routes/byEnterprise/:enterprise_id

Response

```
{
    [
        {
        "id":"string"
        "driver_id": "string",
        "enterprise_id":"string"
        }
    ]
}
```
Descrição: Seleciona as rotas pelo id do motorista.

GET /routes/byDriver/:driver_id

Response

```
{
    [
        {
        "id":"string"
        "driver_id": "string",
        "enterprise_id":"string"
        }
    ]
}
```

# PATHS ROUTES

Descrição: Cria uma parada.

POST /paths

Request Body

```
{
    "route_id" :"string",
    "initLat":number,
    "finalLat":number,
    "initLong":number,
    "finalLong":number,
    "isInitial":number,
    "isFinal":number
}
```

Response

```
{
    {
        "id":string,
        "route_id" :"string",
        "initLat":number,
        "finalLat":number,
        "initLong":number,
        "finalLong":number,
        "isInitial":number,
        "isFinal":number,
        "created_at":date
    }
}
```

Descrição: Seleciona as paradas pelo id da rota.

GET /paths/byRoute/:route_id

Response

```
{
    [
        {
            "id":string,
            "route_id" :"string",
            "initLat":number,
            "finalLat":number,
            "initLong":number,
            "finalLong":number,
            "isInitial":number,
            "isFinal":number,
            "created_at":date
        }
    ]
}
```



