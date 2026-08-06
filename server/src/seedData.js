// Menu data transcribed from restuarent menu.pdf (all 11 categories).
const menuItems = [
  // Vegetarian — $14.99 unless noted
  { name: "Chilli Paneer", description: "Cottage cheese cooked with capsicum and onion, with a touch of vinegar and soy sauce.", price: 14.99, category: "Vegetarian" },
  { name: "Butter Paneer", description: "Cottage cheese cooked in a buttery, creamy tomato sauce.", price: 14.99, category: "Vegetarian" },
  { name: "Paneer Tikka Masala", description: "Cottage cheese cooked with capsicum, onion, and a creamy butter sauce.", price: 14.99, category: "Vegetarian" },
  { name: "Paneer Masala", description: "Cottage cheese simmered in a classic masala sauce.", price: 14.99, category: "Vegetarian" },
  { name: "Aloo Gobi Curry", description: "Potatoes and cauliflower simmered in traditional spices.", price: 14.99, category: "Vegetarian" },
  { name: "Kadhai Paneer", description: "Stir-fried cottage cheese with onion, capsicum, and ground spices.", price: 14.99, category: "Vegetarian" },
  { name: "Daal Tadka", description: "Yellow lentils tempered with cumin, garlic, and spices.", price: 12.49, category: "Vegetarian" },

  // Naans — Baked in Tandoor
  { name: "Plain Naan", description: "Classic tandoor-baked naan bread.", price: 2.49, category: "Naans" },
  { name: "Butter Naan", description: "Tandoor-baked naan brushed with butter.", price: 2.99, category: "Naans" },
  { name: "Garlic Naan", description: "Tandoor-baked naan topped with fresh garlic.", price: 3.29, category: "Naans" },
  { name: "Chilli Naan", description: "Tandoor-baked naan with a spicy chilli kick.", price: 2.99, category: "Naans" },
  { name: "Cheese Naan", description: "Tandoor-baked naan stuffed with cheese.", price: 3.99, category: "Naans" },
  { name: "Cheese & Garlic Naan", description: "Tandoor-baked naan stuffed with cheese and garlic.", price: 3.99, category: "Naans" },
  { name: "Chilli Cheese Naan", description: "Tandoor-baked naan stuffed with cheese and chilli.", price: 3.50, category: "Naans" },

  // Dessert
  { name: "Kheer / Kaddu ki Kheer", description: "Traditional rice or pumpkin milk pudding.", price: 4.49, category: "Dessert" },
  { name: "Double ka Meetha", description: "Hyderabadi bread pudding soaked in sweet milk.", price: 4.49, category: "Dessert" },
  { name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose-scented sugar syrup.", price: 4.49, category: "Dessert" },
  { name: "Malai Gulab Jamun", description: "Gulab jamun finished with a rich malai (cream) topping.", price: 6.99, category: "Dessert" },
  { name: "Fresh Fruit Delight", description: "Seasonal fresh fruit — available only on weekends or by special order.", price: 4.49, category: "Dessert" },

  // Appetizers - Veg / Non-Veg
  { name: "Pappadums (5 pcs)", description: "Crisp lentil wafers, served plain.", price: 2.49, category: "Appetizers" },
  { name: "Veg Samosa (2 pcs)", description: "Crisp pastry filled with spiced potatoes and peas.", price: 4.49, category: "Appetizers" },
  { name: "Gobi 65", description: "Cauliflower coated with corn flour and spices, tempered and deep fried.", price: 11.99, category: "Appetizers" },
  { name: "Onion Pakora", description: "Sliced onions coated in chickpea flour and spices, deep fried.", price: 6.99, category: "Appetizers" },
  { name: "Chicken 65", description: "Tender boneless chicken cubes marinated in a spiced batter and fried.", price: 9.99, category: "Appetizers" },
  { name: "Chicken Pakora", description: "Chicken coated with corn flour and deep fried.", price: 8.99, category: "Appetizers" },
  { name: "Apollo Fish", description: "A popular Hyderabadi favorite — fish coated in authentic spices and deep fried.", price: 13.99, category: "Appetizers" },
  { name: "Fish Pakora", description: "Fish coated with authentic spices and deep fried.", price: 12.99, category: "Appetizers" },

  // Chef's Special
  { name: "Arabic Chicken", description: "Boneless chicken marinated in the chef's special spices.", price: 15.99, category: "Chef's Special" },
  { name: "Chicken Malai Kebab", description: "Boneless chicken marinated in a creamy, mildly spiced marinade.", price: 15.99, category: "Chef's Special" },
  { name: "Majestic Chicken", description: "A dry chicken dish marinated with Indian spices.", price: 14.99, category: "Chef's Special" },
  { name: "Seekh Kebab", description: "Minced lamb blended with special spices and slow-cooked in the tandoor.", price: 13.99, category: "Chef's Special" },
  { name: "Tandoori Chicken", description: "Chicken marinated in a spiced yogurt mix and roasted in the tandoor.", price: 12.99, category: "Chef's Special" },
  { name: "Ginger Chicken", description: "Chicken coated and deep fried with a tempered ginger finish.", price: 14.99, category: "Chef's Special" },
  { name: "Chicken Tangdi Kebab", description: "Chicken marinated with green chilli, cilantro, and the chef's special spices.", price: 13.99, category: "Chef's Special" },
  { name: "Chilli Chicken", description: "Chicken sautéed with onion, garlic, and ginger, finished with a touch of soy sauce.", price: 13.99, category: "Chef's Special" },

  // Chicken Curries — $14.99
  { name: "Butter Chicken", description: "Chicken tikka simmered in a tomato and cream sauce.", price: 14.99, category: "Chicken Curries" },
  { name: "Mughlai Chicken", description: "Signature dish — fresh chicken marinated in traditional Hyderabadi spices.", price: 14.99, category: "Chicken Curries" },
  { name: "Mango Chicken", description: "Boneless chicken cooked in a delicious mango flavor and creamy sauce.", price: 14.99, category: "Chicken Curries" },
  { name: "Chicken Tikka Masala", description: "Tender boneless chicken cubes marinated and cooked in a spiced tomato sauce.", price: 14.99, category: "Chicken Curries" },
  { name: "Kadai Chicken", description: "Bone-in chicken tempered with onion, tomato, and special spices.", price: 14.99, category: "Chicken Curries" },
  { name: "Chicken Korma", description: "Chicken in an onion gravy with a creamy, chef's special sauce.", price: 14.99, category: "Chicken Curries" },
  { name: "Achari Chicken", description: "Signature dish — boneless chicken cooked in the chef's special pickled-spice sauce.", price: 14.99, category: "Chicken Curries" },
  { name: "Chicken Vindaloo", description: "A very hot curry prepared with vinegar and spices.", price: 14.99, category: "Chicken Curries" },
  { name: "Chicken Masala", description: "Chicken simmered in a classic masala sauce.", price: 14.99, category: "Chicken Curries" },

  // Lamb/Goat Curries — $16.49
  { name: "Lamb/Goat Masala", description: "Boneless lamb cooked in traditional style.", price: 16.49, category: "Lamb/Goat Curries" },
  { name: "Lamb/Goat Kadai", description: "A flavorful Mughlai-style kadhai gosht.", price: 16.49, category: "Lamb/Goat Curries" },
  { name: "Lamb/Goat Vindaloo", description: "A very, very hot curry prepared with vinegar and spices.", price: 16.49, category: "Lamb/Goat Curries" },
  { name: "Lamb/Goat Korma", description: "Tender boneless lamb cooked in a creamy sauce.", price: 16.49, category: "Lamb/Goat Curries" },
  { name: "Lamb/Goat Achari", description: "Tender lamb cooked in the chef's special pickled-spice sauce.", price: 16.49, category: "Lamb/Goat Curries" },

  // Fish
  { name: "Chilli Fish", description: "Fish tossed in a spicy chilli sauce.", price: 14.99, category: "Fish" },
  { name: "Tava Fish", description: "Fish cooked on a griddle with traditional spices.", price: 13.99, category: "Fish" },
  { name: "Fish Masala", description: "Fish simmered in a classic masala sauce.", price: 14.99, category: "Fish" },

  // Hyderabadi Dum Biryani
  { name: "Chicken Dum Biryani", description: "Chicken cooked with spices, herbs, and yoghurt in basmati rice, flavoured with saffron.", price: 13.99, category: "Hyderabadi Dum Biryani" },
  { name: "Chicken 65 Dum Biryani", description: "Boneless Chicken 65 cooked with spices, herbs, and yoghurt in basmati rice, flavoured with saffron.", price: 14.99, category: "Hyderabadi Dum Biryani" },
  { name: "Lamb/Goat Dum Biryani", description: "Lamb cooked with basmati rice, spices, and herbs, flavoured with saffron.", price: 15.99, category: "Hyderabadi Dum Biryani" },
  { name: "Shahi Special Goat/Lamb Biryani", description: "Our royal, chef's special goat or lamb biryani.", price: 18.99, category: "Hyderabadi Dum Biryani" },

  // Rice
  { name: "Basmati Rice", description: "Steamed premium basmati rice.", price: 3.99, category: "Rice" },
  { name: "Zeera Rice", description: "Basmati rice tempered with cumin.", price: 4.49, category: "Rice" },
  { name: "Saffron Rice", description: "Basmati rice flavoured with saffron.", price: 3.99, category: "Rice" },
  { name: "Lemon Rice", description: "Basmati rice tempered with lemon and spices.", price: 4.49, category: "Rice" },

  // Vegan
  { name: "Hummus", description: "Creamy chickpea and tahini dip.", price: 4.99, category: "Vegan" },
  { name: "Falafel", description: "Crispy fried chickpea fritters.", price: 4.99, category: "Vegan" },
  { name: "Pita", description: "Warm pita bread.", price: 1.99, category: "Vegan" },

  // Beverages
  { name: "Mango Lassi", description: "Sweet yogurt drink blended with mango.", price: 3.00, category: "Beverages" },
  { name: "Strawberry Lassi", description: "Sweet yogurt drink blended with strawberry.", price: 3.00, category: "Beverages" },
  { name: "Salt Lassi", description: "Savory salted yogurt drink.", price: 3.00, category: "Beverages" },
  { name: "Hyderabadi Chai", description: "Traditional spiced Hyderabadi tea.", price: 2.49, category: "Beverages" },
  { name: "Soft Drink", description: "Assorted soft drinks.", price: 1.99, category: "Beverages" },
  { name: "Bottle of Water", description: "Bottled water.", price: 1.00, category: "Beverages" },
];

// No videos seeded by default — add them via the admin dashboard's Videos tab.
const videos = [];

// Placeholder testimonials — replace with real Google reviews via the admin dashboard.
const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "First authentic Hyderabadi biryani I've had since moving to El Paso! The Dum Biryani is incredible and everything is 100% halal. Highly recommend.",
    source: "google",
  },
  {
    name: "Ahmed K.",
    rating: 5,
    comment: "Finally a real Hyderabadi restaurant in the Sun City. The Tandoori Chicken and Chicken 65 were outstanding. Great service too.",
    source: "google",
  },
  {
    name: "Priya R.",
    rating: 5,
    comment: "Tastes just like home! The Mughlai Chicken and Butter Naan are must-try. So happy El Paso finally has real South Indian food.",
    source: "google",
  },
  {
    name: "Carlos D.",
    rating: 4,
    comment: "Great flavors and generous portions. The Achari Chicken is now my favorite. Will be back for the Shahi Special Biryani next time.",
    source: "google",
  },
  {
    name: "Fatima S.",
    rating: 5,
    comment: "Beautiful restaurant, delicious food, and everything is halal. The chai and gulab jamun were the perfect way to end the meal.",
    source: "google",
  },
];

const defaultSettings = {
  phones: ["915-259-8520", "469-999-6449"],
  address: "5360 N. Mesa St, Suite 11K, El Paso, TX 79912",
  hoursText: "Wednesday – Monday: 5:00 PM – 11:00 PM (Closed Tuesdays)",
  instagramUrl: "https://www.instagram.com/dekkanparadise_elpaso",
  doordashUrl:
    "https://www.doordash.com/store/dekkan-paradise-hyderabadi-indian-restaurant-(-halal-)-el-paso-42123042/103438946/?pickup=true",
  uberEatsUrl: "https://www.ubereats.com/store/dekkan-paradise/5KJFrSrxRqidmMdjr15kNw?diningMode=PICKUP",
  postmatesUrl: "https://postmates.com/store/dekkan-paradise/5KJFrSrxRqidmMdjr15kNw?diningMode=PICKUP",
};

module.exports = { menuItems, videos, reviews, defaultSettings };
