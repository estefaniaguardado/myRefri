/**
 * Defines the units, which can measure a product or item.
 * @readonly
 * @enum {string}
 * @see {@link https://www.iso.org/standard/30669.html ISO/IEC 80000}
 */
enum Unit {
  piece = 'piece',
  kilogram = 'kilogram',
  gram = 'gram',
  pound = 'pound',
  ounce = 'ounce',
  liter = 'liter',
  mililiter = 'mililiter',
  quart = 'quart',
  gallon = 'gallon',
}

export = Unit;
