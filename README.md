# Acme Explorer project

# Getting started

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
mongodb://acme:acme@localhost:27017/ACME_Explorer
```

## Re-populate Mongo Database
```
docker-compose down
docker-compose up -d
```


# Conceptual Model

![plot](./assets/acme-explorer.png)