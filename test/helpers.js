
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

const actores_Iniciales = [
    {
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
        "preferred_language": "Spanish"
        
    },
    {   
        "password": "kdfnaosnfdspa",
        "role": [
            "EXPLORER"
        ],
        "name": "ANthony",
        "surname": "Martial",
        "email": "antonioMartial12311@gmail.com",
        "phone": "623154881",
        "address": "Calle Torreblanca",
        "trips": ["6219fe03d6e229826747ebc7","6219fe03d6e229826747ebc9"],
        "applications": [],
        "search_criteria": [],
        "sponshorships": [],
        "validated": false,
        "preferred_language": "English"
    }
];
//Estos actores iniciales siempre estaran en la base de datos a la hora de realizar un test, con el fin de que se pueda ejecutar independientemente de los
//datos que haya en la base de datos en el momento.


module.exports = {api,actores_Iniciales}