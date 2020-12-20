### React Auth System With JWT

[For more information about JWT](jwt.io)

## Techs  :rocket:
  - NodeJs
  - Express
  - JsonWebToken
  - MySQL
  - React
  - React Hooks
  
## Start  ▶️

Firstly install dependencies:

```bash
yarn install
```
and
```bash
cd client && yarn install
```

Add enviroment variables in .env file:
```plaintext
MYSQL_HNAME=
MYSQL_UNAME=
MYSQL_PWD=
MYSQL_DBNAME=
SECRET_KEY= (for create token)
HASH_KEY= (for crypto)
```

Start project (root folder):
```bash
yarn start
```

## Docker :whale:

Build docker image and start (in project folder):

```bash
docker build -t react-jwt .
```
and
```bash
docker run -p 49160:8080 -d react-jwt
```

[for more information about dockerizing](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
