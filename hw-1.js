use dfilippenko

// Cleanup previous changes
db.orders.drop();
db.customers.drop();

// Useful functions
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;
const getRandomArrayItem = (a) => a[getRandomInteger(0, a.length-1)];

// Data arrays for filling
const customerFirstNames = ['Peter', 'Danil', 'Vasyl', 'Alex', 'Dennis', 'John', 'Max'];
const customerLastNames = ['Popandopulo', 'Ivanov', 'Johnson', 'Vasechkin', 'Brown', 'Petrov', 'Sidorov'];
const productNames = ['Banana', 'Orange', 'Potato', 'Watermelon', 'Lemon'];

// Customers filling loop
for (let i = 0; i < 3000; i++) {

  // Inserting one random customer
  const { insertedId } = db.customers.insertOne({
    name: {
      first: getRandomArrayItem(customerFirstNames),
      last: getRandomArrayItem(customerLastNames)
    },
    balance: getRandomInteger(5000, 15000),
    created: new Date
  });

  // Inserting random orders for customer which has been inserted
  for (let j = 0; j < getRandomInteger(1, 11); j++) {
    const productName = getRandomArrayItem(productNames);
    db.orders.insertOne({
      customerId: insertedId,
      count: getRandomInteger(1, 100),
      price: getRandomInteger(20, 100),
      discount: getRandomInteger(5, 30),
      title: 'Eat ' + productName +'s!',
      product: productName
    });
  }
}
