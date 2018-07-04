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
  },
  {
    id: 2,
    name: ['Beer'],
    perishable: false,
    notificationOffset: '',
    category: Category.beverages,
  },
  {
    id: 3,
    name: ['Aspirin'],
    perishable: false,
    notificationOffset: '',
    category: Category.pharmacy,
  },
];

module.exports = Products;
