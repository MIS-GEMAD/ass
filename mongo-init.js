db = db.getSiblingDB("ACME_Explorer");
db.actors.drop();

db.actors.save( {
    name : "David",
    surname : "Romero",
    email: "drorganvidez@us.es",
    phone : "666123456",
    password : "password",
    role: ['ADMINISTRATOR']
});