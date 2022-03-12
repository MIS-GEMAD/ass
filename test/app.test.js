/*Fallaba con Mocha Chai
--------------------------------------------------------
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
*/

//Tests de Integración con Jest y supertest
const supertest=require('supertest');
const app = require('../app');
const api = supertest(app);

const Actor= require('../api/models/actorModel');
const Application= require('../api/models/applicationModel');
const Sponsorship = require('../api/models/sponsorshipModel');
const Stage = require('../api/models/stageModel');
const Trip = require('../api/models/tripModel');
const Finder = require('../api/models/finderModel');


jest.setTimeout(10000);


describe('ACTORS', () => {
    
    test('Get Actors', () => {
       api
        .get('/actors')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      })
  
    test('Post Actor', () => {
       api
        .post('/actors')
        .send({    
        "password": "123456ABCDEFGH",
        "role": [
            "EXPLORER"
        ],
        "name": "Antonio",
        "surname": "García",
        "email": "antoniogarcia1231@gmail.com",
        "phone": "623154879",
        "address": "Calle Resolana",
        "trips": ["6219fe03d6e229826747ebc7","6219fe03d6e229826747ebc8"],
        "applications": [],
        "search_criteria": [],
        "sponshorships": [],
        "validated": false,
        "preferred_language": "Spanish"})
        .expect(201)
        .expect('Content-Type', /application\/json/)
    });

    test('Put Actor', () => {
      api
       .put(`/actors/${Actor._id}`)
       .send({    
        
          "password": "123456ABCDEFGH",
          "role": [
              "EXPLORER"
          ],
          "name": "Manuel",
          "surname": "García",
          "email": "antoniogarcia123@gmail.com",
          "phone": "623154879",
          "address": "Calle Resolana",
          "trips": ["621cbe9ecf1e47108c29a316"],
          "applications": [],
          "search_criteria": [],
          "sponshorships": [],
          "validated": false,
          "preferred_language": "Spanish"
      })
       .expect(201)
       .expect('Content-Type', /application\/json/)
   });

    test('Get Actor by ID', () => {
      api
        .get(`/actors/${Actor._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
   })
    
});




describe('TRIPS', ()=>{
      test('Get trips', () => {
          api
          .get('/trips')
          .expect(200)
          .expect('Content-Type', /application\/json/)
   })

        test('Post Trip', () => {
            api
            .post('/trips')
            .send({    
            "ticker": "20220228-D",
            "title": "viaje a chipiona",
            "description": "Esto es una descripcion hecha por manu.",
            "price": 107.38,
            "requirements": ["Ropa","Dinero"],
            "startDate": "2023-01-03T22:47:50.569Z",
            "endDate": "2023-11-02T19:16:03.854Z",
            "isCancelled": false,
            "manager": "621cb9dc08e258a4d12b830e"})
            .expect(201)
            .expect('Content-Type', /application\/json/)
        });

        test('Put Trip', () => {
          api
            .put(`/trips/${Trip._id}`)
            .send({    
            
              "password": "123456ABCDEFGH",
              "role": [
                  "EXPLORER"
              ],
              "name": "Manuel",
              "surname": "García",
              "email": "antoniogarcia123@gmail.com",
              "phone": "623154879",
              "address": "Calle Resolana",
              "trips": ["621cbe9ecf1e47108c29a316"],
              "applications": [],
              "search_criteria": [],
              "sponshorships": [],
              "validated": false,
              "preferred_language": "Spanish"
          })
            .expect(201)
            .expect('Content-Type', /application\/json/)
        });

          test('Get Trip by ID', () => {
          api
            .get(`/trips/${Trip._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        });

        test('Delete Trip by ID', () => {
          api
            .delete(`/trips/${Trip._id}`)
            .expect(204)
            .expect('Content-Type', /application\/json/)
        });
   
        test('Get Stage ', () => {
          api
            .get(`/trips/${Trip._id}/stages`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        });        

        test('Post Stage', () => {
          api
            .post(`/trips/${Trip._id}/stages`)
            .send({                
              "title": "CHIPIONA 2014",
              "description": "CHIPIONA Con los chavales 2014",
              "price": 28.55
          })
            .expect(201)
            .expect('Content-Type', /application\/json/)
        });

        test('Get Stage by ID ', () => {
          api
            .get(`/trips/${Trip._id}/stages/${Trip._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        });
        
        test('Put Stage by ID', () => {
          api
            .put(`/trips/${Trip._id}/stages/${Stage._id}`)
            .send({                
              "title": "CHIPIONA 2015",
              "description": "CHIPIONA Con los chavales 2014",
              "price": 38.55
          })
            .expect(201)
            .expect('Content-Type', /application\/json/)
        });
        
        test('Delete Trip by ID', () => {
          api
            .delete(`/trips/${Trip._id}/stages/${Stage._id}`)
            .expect(204)
            .expect('Content-Type', /application\/json/)
        });
        
        test('Get Actor Trips ', () => {
          api
            .get(`/trips/${Actor._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        });        

});


describe('APPLICATIONS', ()=>{
  test('Get applications', () => {
      api
      .get('/applications')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

    test('Post Application', () => {
        api
        .post('/applications')
        .send({    
          "moment": "2022-01-03T22:47:50.569Z",
          "status":"PENDING",
          "trip": "621cbe9ecf1e47108c29a316"
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    });

    test('Put application', () => {
      api
        .put(`/applications/${Application._id}`)
        .send({    
          "moment": "2022-01-03T22:47:50.569Z",
          "status":"ACCEPTED",
          "trip": "621cbe9ecf1e47108c29a316"
      })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    });

      test('Get Application by ID', () => {
      api
        .get(`/applications/${Application._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    });

    test('Delete Application by ID', () => {
      api
        .delete(`/applications/${Application._id}`)
        .expect(204)
        .expect('Content-Type', /application\/json/)
    });

});


describe('SPONSORSHIPS', ()=>{
  test('Get sponsorshiphs', () => {
      api
      .get('/sponsorships')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

    test('Post Sponsorship', () => {
        api
        .post('/sponsorships')
        .send({    
          "banner": "http://google.es",
          "link": "http://aliqua.com/81e03759-bb85-409e-bdf9-1ed3f5f63b17",
          "trip": ["621cd18c7984f97f14e9b101"]
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    });

    test('Put application', () => {
      api
        .put(`/applications/${Sponsorship._id}`)
        .send({    
          "banner": "http://google.uk",
          "link": "http://aliqua.com/81e03759-bb85-409e-bdf9-1ed3f5f63b17",
          "trip": ["621cd18c7984f97f14e9b101"]
      })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    });

      test('Get Sponsorship by ID', () => {
      api
        .get(`/sponsorships/${Sponsorship._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    });

    test('Delete Sponsorship by ID', () => {
      api
        .delete(`/sponsorships/${Sponsorship._id}`)
        .expect(204)
        .expect('Content-Type', /application\/json/)
    });

    test('Get Actor Sponsorships', () => {
      api
        .get(`/sponsorships/${Actor._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    });

});


describe('FINDER', ()=>{
  test('Get Finder Criteria', () => {
      api
      .get('/finder')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

    test('Post Finder Criteria', () => {
        api
        .post('/finder')
        .send({    
          "explorer":"621cd18b7984f97f14e9b0dc",
          "keyword":"acvbfsdfd",
          "price_from": 10,
          "price_to": 100,
          "date_from":"2023-01-03T22:47:50.569Z",
          "date_to": "2023-11-02T19:16:03.854Z",
          "trips":["621cd18c7984f97f14e9b0f9"]
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    });

});






  