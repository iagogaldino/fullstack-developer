const firebase = require('firebase/app');
const firebaseDatabse = require('firebase/database');
const firebaseConfig = {
    apiKey: "AIzaSyANX1WDwZpVpMKowa9DsphZ8OD4XopawEc",
    authDomain: "xdelssy-delivery.firebaseapp.com",
    databaseURL: "https://xdelssy-delivery.firebaseio.com",
    projectId: "xdelssy-delivery",
    storageBucket: "xdelssy-delivery.appspot.com",
    messagingSenderId: "134248920251",
    appId: "1:134248920251:web:549648c6509c451230259e",
    measurementId: "G-5Q3LGPP6T6"
};



module.exports = class FunctionApi {

    Prop = {
        id: '',
        image: '',
        publication_date: '',
        title: '',
        description: '',
        value: '',
        area : '',
        address : {
            public_place: '',
            district: '',
            postal_code: '',
            city: '',
            uf: ''
        }
      }

    constructor() {
        firebase.initializeApp(firebaseConfig);
         
    }

    
    resultApi(message, params, erro, statusCode) {
        let r = { message: message, params: params, erro: erro, statusCode: statusCode}
        return r;
    }


      getHouses() {
        return new Promise((resolver, reject)=> {
            let List = [];
            firebase.database().ref("properties").on("child_added", data => {
                List.push(data.val())
                resolver(List);

            }, errorObject => {
                console.log(errorObject.code);
                reject();
            });
        });
    }
 
    addItem(params = {}) {
        return new Promise((resolver, reject)=> {
            console.log(params);
            if (!params.title) { return resolver(this.resultApi('Informe o título', {code: 1}, true, 500)); }
            if (!params.description) { return resolver(this.resultApi('Informe a descrição', {code: 2}, true, 500)); }
            if (!params.value) { return resolver(this.resultApi('Informe o valor', {code: 3}, true, 500)); }
            if (!params.area) { return resolver(this.resultApi('Informe a àrea', {code: 4}, true, 500)); }
            if (!params.public_place) { return resolver(this.resultApi('Informe o código postal', {code: 5}, true, 500)); }
            if (!params.district) { return resolver(this.resultApi('Informe o bairro', {code: 6}, true, 500)); }
            if (!params.postal_code) { return resolver(this.resultApi('Informe o título', {code: 7}, true, 500)); }
            if (!params.city) { return resolver(this.resultApi('Informe a cidade', {code: 8 }, true, 500)); }
            if (!params.uf) { return resolver(this.resultApi('Informe o estado', {code: 9 }, true, 500)); }
           
            let a = this.Prop;
            a.title = params.title;
            a.description = params.description;
            a.value = params.value;
            a.area = params.area;
            a.address.public_place = params.public_place;
            a.address.district = params.district;
            a.address.district = params.district;
            a.address.postal_code = params.postal_code;
            a.address.city = params.city;
            a.address.uf = params.uf;

            firebase.database().ref('properties').push(a); // ADD ITEM FIREBASE

            resolver(this.resultApi('OK', {code: 200 }, false, 200));
        });
    }

};