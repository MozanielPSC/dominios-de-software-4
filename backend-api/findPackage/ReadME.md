# API ROUTES

## USER ROUTES

Descrição: criação de usuário.

```
 POST /users/

 Request Body

{
    username:string,
    email:string,
    password:string
}
```
Descrição: tornar usuário Motorista.

PATCH /users/turnDriver/:user_id

Response

```
{
    username:string,
    email:string,
    isAdmin: boolean,
    isEnterprise:boolean,
    isDriver:boolean
}
```

## AUTH ROUTES
Descrição: Autenticar usuário.

POST /sessions/
Request Body
```
{
    email: string,
    password:  string
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
    token: string,
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
    driver_id: string,
    initialDate: Date,
    expectedEnd?:Date,
}
```
Response

```
{
    id:string
    driver_id: string,
    enterprise_id:string,
    initialDate: Date,
    expectedEnd?:Date,
    isFinished:boolean

}
```
Descrição: Atualiza uma rota pelo id, precisa estar autenticado em uma conta Enterprise.

POST /routes/:route_id

Request Body

```
{
    driver_id: string,
    initialDate: Date,
    expectedEnd?:Date,
    isFinished:boolean
}
```
Response

```
{
    id:string
    driver_id: string,
    enterprise_id:string,
    initialDate: Date,
    expectedEnd?:Date,
    isFinished:boolean

}
```
Descrição: Selecionar um rota por id, precisa estar autenticado.

GET /routes/:route_id

Response

```
{
    id:string
    driver_id: string,
    enterprise_id:string,
    initialDate: Date,
    expectedEnd?:Date,
    isFinished:boolean
}
```
Descrição: Seleciona as rotas pelo id da empresa.

GET /routes/byEnterprise/:enterprise_id

Response

```
{
    [
        {
            id:string
            driver_id: string,
            enterprise_id:string,
            initialDate: Date,
            expectedEnd?:Date,
            isFinished:boolean
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
            id:string
            driver_id: string,
            enterprise_id:string,
            initialDate: Date,
            expectedEnd?:Date,
            isFinished:boolean
        }
    ]
}
```
Descrição: Deleta uma rota pelo id.

DELETE /routes/:route_id

Response

```
Status: 200
```

# PATHS ROUTES

Descrição: Cria uma parada.

POST /paths

Request Body

```
{
    route_id :string,
    initLat:number,
    finalLat:number,
    initLong:number,
    finalLong:number,
    isInitial:number,
    isFinal:number,
    isComplete:boolean,
    city_name:string,
    state:string
}
```

Response

```
{
    {
        id:string,
        route_id :string,
        initLat:number,
        finalLat:number,
        initLong:number,
        finalLong:number,
        isInitial:number,
        isFinal:number,
        created_at:date,
        isComplete:boolean,
        city_name:string,
        state:string
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
            id:string,
            route_id :string,
            initLat:number,
            finalLat:number,
            initLong:number,
            finalLong:number,
            isInitial:number,
            isFinal:number,
            created_at:date,
            isComplete:boolean,
            city_name:string,
            state:string
        }
    ]
}
```
Descrição: Altera uma parada.

PATCH /paths/

Request Body

```
{
    [
        {
            id:string,
            route_id :string,
            initLat:number,
            finalLat:number,
            initLong:number,
            finalLong:number,
            isInitial:number,
            isFinal:number,
            isComplete:boolean,
            city_name:string,
            state:string
        }
    ]
}
```
Response

```
{
    [
        {
            id:string,
            route_id :string,
            initLat:number,
            finalLat:number,
            initLong:number,
            finalLong:number,
            isInitial:number,
            isFinal:number,
            created_at:date,
            isComplete:boolean,
            city_name:string,
            state:string
        }
    ]
}
```

Descrição: Deleta uma parada pelo id da rota.

DELETE /paths/:path_id

Response
```
Status: 200
```
