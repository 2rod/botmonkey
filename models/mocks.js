#!/Users/roderickreyes/.nvm/versions/node/v6.7.0/bin/node

const db = require('../helpers/db');
const User = require('./user');

User.create({
  first_name: 'John',
  last_name: 'Doe',
  street_address: '100 Some Street',
  city: 'Barcelona',
  state: 'CA',
  zip_code: '08003',
  phone: '1-555-555-5555',
  email: 'johndoe@gmail.com',
  gender: 'M',
  birthdate: '1975-10-02',
  user_type: 'patient'
});

User.create({
  first_name: 'Jane',
  last_name: 'Doe',
  street_address: '200 Some Blvd',
  city: 'Paris',
  state: 'TX',
  zip_code: '11003',
  phone: '1-555-555-9999',
  email: 'janedoe@gmail.com',
  gender: 'F',
  birthdate: '1965-1-29',
  user_type: 'patient'
});

User.create({
  first_name: 'Joe',
  last_name: 'Kool',
  street_address: '300 Some Ave',
  city: 'Rome',
  state: 'FL',
  zip_code: '93933',
  phone: '1-555-555-7777',
  email: 'joekool@gmail.com',
  gender: 'M',
  birthdate: '9/8/1948',
  user_type: 'patient'
});
