/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if (typeof thali !== "object" || thali === null || thali === undefined || Object.prototype !== Object.getPrototypeOf(thali)) {
    return "";
  }

  const requiredProperties = new Array("name", "items", "price", "isVeg");
  for (const property of requiredProperties) {
    if (!(thali.hasOwnProperty(property))) {
      return "";
    }
  }


  return `${thali["name"].toUpperCase()} (${thali["isVeg"] ? "Veg" : "Non-Veg"}) - Items: ${thali["items"].join(", ")} - Rs.${thali["price"].toFixed(2)}`;
}

export function getThaliStats(thalis) {
  // Your code here
  if (!Array.isArray(thalis) || !thalis.length) {
    return null;
  }

  let vegCount = 0;
  let nonVegCount = 0;
  let totalPrice = 0;
  let averagePrice = 0;
  let cheapest = 0;
  let costliest = 0;
  const itemPriceList = new Array();

  const newVegItemsArray = thalis.filter((item) => item.isVeg);
  vegCount = newVegItemsArray.length;
  nonVegCount = thalis.length - vegCount;

  totalPrice = thalis.reduce((acc, curr) => acc + curr["price"], 0);
  averagePrice = (totalPrice / thalis.length).toFixed(2).toString();

  for (const item of thalis) {
    itemPriceList.push(item["price"]);
  }

  cheapest = Math.min(...itemPriceList);
  costliest = Math.max(...itemPriceList);

  const names = thalis.map((item) => item["name"]);

  const thaliStatusObject = {
    totalThalis: thalis.length,
    vegCount,
    nonVegCount,
    avgPrice: averagePrice,
    cheapest,
    costliest,
    names,
  }

  return thaliStatusObject;

}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (!Array.isArray(thalis) || !thalis.length || typeof query !== "string") {
    return [];
  }

  const queryResult = thalis.filter((thali) => {

    if (thali["name"].toUpperCase().includes(query.toUpperCase())) {
      return true;
    }

    return thali.items.some((item) => item.toLowerCase().includes(query.toLowerCase()));

  });

  return queryResult;
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if (!Array.isArray(thalis) || !thalis.length || typeof customerName !== "string") {
    return "";
  }

  let receiptString = "THALI RECEIPT\n---\nCustomer:";

  receiptString = receiptString.concat(" ", customerName.toUpperCase());

  const lineItems = thalis.map((thali) => {
    return `- ${thali["name"]} x Rs.${thali["price"]}`;
  });

  const lineItemsString = lineItems.join("\n");

  receiptString = receiptString.concat("\n", lineItemsString);

  receiptString = receiptString.concat("\n---\n", "Total: Rs.");

  const totalPrice = thalis.reduce((acc, curr) => acc + curr["price"], 0);

  receiptString = receiptString.concat("", totalPrice);

  receiptString = receiptString.concat("\nItems: ", thalis.length);

  return receiptString;

}
