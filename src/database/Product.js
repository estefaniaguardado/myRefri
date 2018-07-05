// TODO: This file will be handled by database and saved

const Category = {
  food: 'Food',
  beverages: 'Beverages',
  household: 'Household',
  pharmacy: 'Pharmacy',
  health: 'Health',
  beauty: 'Beauty',
  outdoor: 'Outdoor',
  pets: 'Pets',
};

const Unity = {
  piece: 'pz',
  kilogram: 'kg',
  gram: 'gr',
  pound: 'lb',
  ounce: 'oz',
  liter: 'L',
  mililiter: 'mL',
  quart: 'qt',
  gallon: 'gal',
};


function dayNotificationOffset(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const Products = [
  {
    id: 1,
    name: ['Bread'],
    perishable: true,
    notificationOffset: dayNotificationOffset(3),
    category: Category.food,
    unity: [Unity.piece, Unity.kilogram, Unity.gram, Unity.pound, Unity.ounce],
  },
  {
    id: 2,
    name: ['Beer'],
    perishable: false,
    notificationOffset: '',
    category: Category.beverages,
    unity: [Unity.piece, Unity.liter, Unity.mililiter, Unity.quart, Unity.gallon],
  },
  {
    id: 3,
    name: ['Aspirin'],
    perishable: false,
    notificationOffset: '',
    category: Category.pharmacy,
    unity: [Unity.piece],
  },
];

module.exports = Products;
