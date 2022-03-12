# Acme Explorer project

# Getting started

## MIS-GEMAD API in SwaggerHub
https://app.swaggerhub.com/apis/MIS-GEMAD/MIS-GEMAD_API/1.0.0#/

## Build the image
```
docker-compose build 
```

## Option 1: Run the containers
```
docker-compose up
```

## Option 2: Run the containers (in the background)
```
docker-compose up -d
```

## Down the containers
```
docker-compose down
```

## Manage database from MongoDB Compass
```
mongodb://localhost:27017/ACME_Explorer
```

## Re-populate Mongo Database
```
docker-compose down
docker-compose up -d
```

## Run test
docker exec -it test npm run test

# Conceptual Model

![plot](./assets/acme-explorer.png)
