db = db.getSiblingDB("ACME_Explorer");
db.actors.drop();
db.applications.drop();

db.actors.save({
  role: ["ADMINISTRATOR"],
  name: "David",
  surname: "Romero",
  email: "drorganvidez@us.es",
  phone: "666123456",
  address: "Calle Uno",
  password: "password",
});

db.actors.save({
  role: ["MANAGER"],
  name: "Emilia",
  surname: "Coleto",
  email: "emicolalc@us.es",
  phone: "662123456",
  address: "Calle Dos",
  password: "password",
});

db.actors.save({
  role: ["EXPLORER"],
  name: "Germán",
  surname: "Trujillo",
  email: "antmartru@us.es",
  phone: "669785983",
  address: "Calle Tres",
  password: "password",
});

db.actors.save({
  role: ["EXPLORER"],
  name: "Germán",
  surname: "Trujillo",
  email: "antmartru@us.es",
  phone: "669785983",
  address: "Calle Tres",
  password: "password",
});

db.applications.save({
  moment: new Date(),
  status: "PENDING",
  trip: "",
});

db.applications.save({
  moment: new Date(),
  status: "REJECTED",
  trip: "",
});

db.applications.save({
  moment: new Date(),
  status: "DUE",
  trip: "",
});

db.applications.save({
  moment: new Date(),
  status: "ACCEPTED",
  trip: "",
});

db.applications.save({
  moment: new Date(),
  status: "CANCELLED",
  trip: "",
});

db.pictures.save({
  picture:  "",
});

db.trips.save({
  ticker:  "20220209-AAA",
  title: "Title",
  description: "Description",
  price: 22,
  startDate: new Date(),
  endDate: new Date()+1,
  picture: "picture",
  isCancelled: false,
});

db.trips.save({
  ticker:  "20220209-BBB",
  title: "Title 2",
  description: "Description dos",
  price: 10,
  startDate: new Date(),
  endDate: new Date()+1,
  picture: "picture 1",
  isCancelled: false,
});

db.trips.save({
  ticker:  "20220209-CCC",
  title: "Title 3",
  description: "Description tres",
  price: 2,
  startDate: new Date(),
  endDate: new Date()+1,
  picture: "picture 3",
  isCancelled: false,
});

db.trips.save({
  ticker:  "20220209-DDD",
  title: "Title 4",
  description: "Description cuatro",
  price: 20,
  startDate: new Date(),
  endDate: new Date()+1,
  picture: "picture 4",
  isCancelled: true,
});

db.trips.save({
  ticker:  "20220209-DDD",
  description: "Description cuatro",
  price: 20,
});

db.stages.save({
  title:  "Title",
  description: "Description",
  price: 20,
});

db.stages.save({
  title:  "Title 2",
  description: "Description 2",
  price: 2,
});

db.stages.save({
  title:  "Title 3",
  description: "Description 3",
  price: 26,
});

db.stages.save({
  title:  "Title 4",
  description: "Description 4",
  price: 10,
});