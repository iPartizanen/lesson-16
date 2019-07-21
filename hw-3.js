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

  // Preparing random orders for customer which has been inserted
  const orders = [];
  for (let j = 0; j < getRandomInteger(1, 11); j++) {
    const productName = getRandomArrayItem(productNames);
    orders.push({ 
      insertOne: {
        "document": {
          customerId: insertedId,
          count: getRandomInteger(1, 100),
          price: getRandomInteger(20, 100),
          discount: getRandomInteger(5, 30),
          title: 'Eat ' + productName +'s!',
          product: productName
        }
      }
    });
  };

  // bulkWrite orders array
  try {
    db.orders.bulkWrite(orders);
  } catch (e) {
    print(e);
  }
}

print(`Number of inserted orders: ${db.orders.stats().count}`);

const printCollectionSize = (c) => {
  const size = c.dataSize();
  print(`${c.name} collection datasize (in bytes): ${size}`);
  return size;
}

print(`Total collections datasize (in bytes): ${printCollectionSize(db.customers) + printCollectionSize(db.orders)}`);
