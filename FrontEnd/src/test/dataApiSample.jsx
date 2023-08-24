//IN THIS FILE WE CAN PUT THE API DATA RESPONSE SAMPLES-

export const categories = [
  {
    id: 1,
    title: "International Buffet",
    description:
      "Our catering service offers an international buffet that will take you on a culinary journey around the world. Enjoy a wide variety of flavors and exquisite dishes from different cultures to delight your guests.",
    img: "../../public/images/image 7.png",
    bundleList: []
  },
  {
    id: 2,
    title: "Gourmet Cocktails",
    description:
      "Surprise your guests with our gourmet cocktails, crafted by expert mixologists. Each drink is a masterpiece of flavors and presentation, guaranteeing a unique experience for everyone.",
    img: "../../public/images/image 7.png",
  },
  {
    id: 3,
    title: "Grilled Barbecue",
    description:
      "Our grilled barbecue catering offers a selection of perfectly cooked meats and vegetables. The smoky aromas and flavors will make your event unforgettable.",
    img: "../../public/images/image 3.png",
  },
  {
    id: 4,
    title: "Artisanal Pastry",
    description:
      "Artisanal desserts are our specialty. Indulge in our variety of cakes, cookies, tarts, and sweets made with love and the finest ingredients.",
    img: "../../public/images/image 4.png",
  },
  {
    id: 5,
    title: "Vegan Catering",
    description:
      "Our vegan catering offers delicious and healthy options for those who prefer a plant-based diet. Fresh and natural flavors that will satisfy all your guests.",
    img: "../../public/images/image 5.png",
  },
  {
    id: 6,
    title: "Mediterranean Menu",
    description:
      "Enjoy the Mediterranean diet at your event with our specialized catering. Dishes with fresh and healthy ingredients inspired by Mediterranean cuisine.",
    img: "../../public/images/image 6.png",
  },
  {
    id: 7,
    title: "Sushi and Sashimi",
    description:
      "Our sushi and sashimi catering offers a selection of authentic Japanese cuisine. Delight in the flavors of the sea and the creativity of our chefs.",
    img: "../../public/images/image 7.png",
  },
  {
    id: 8,
    title: "Spanish Tapas",
    description:
      "Transport your guests to Spain with our selection of Spanish tapas. Intense and authentic flavors that will make you feel like you're in the heart of the Iberian Peninsula.",
    img: "../../public/images/image 8.png",
  },
  {
    id: 9,
    title: "Fusion Food",
    description:
      "A unique culinary experience that combines different traditions and culinary techniques. Discover surprising and creative flavors that will leave your guests amazed.",
    img: "../../public/images/image 9.png",
  },
  {
    id: 10,
    title: "Gourmet Breakfast",
    description:
      "Start your event with a gourmet breakfast that will awaken the senses. From healthy options to indulgent dishes, we have the perfect breakfast for your special occasion.",
    img: "../../public/images/image 7.png",
  },
  {
    id: 11,
    title: "Exquisite Seafood",
    description:
      "Indulge in our exquisite seafood catering that brings the flavors of the ocean to your event. Freshly caught seafood dishes that will leave your guests wanting more.",
    img: "../../public/images/image 7.png",
  },
  {
    id: 12,
    title: "Mexican Fiesta",
    description:
      "Celebrate with a vibrant Mexican fiesta at your event. Our catering showcases authentic Mexican cuisine with spicy flavors and traditional dishes.",
    img: "../../public/images/image 7.png",
  },
  {
    id: 13,
    title: "Mouthwatering BBQ",
    description:
      "Satisfy your guests' taste buds with our mouthwatering BBQ catering. Juicy meats, savory sauces, and sides that will make your event a memorable one.",
    img: "../../public/images/image 3.png",
  },
  {
    id: 14,
    title: "Decadent Desserts",
    description:
      "Treat yourself and your guests to our decadent desserts. From rich chocolate delights to fruity pastries, our dessert catering is a sweet dream come true.",
    img: "../../public/images/image 4.png",
  },
  {
    id: 15,
    title: "Plant-Based Delights",
    description:
      "Explore the world of plant-based delights with our vegan-friendly catering. Creative dishes that prove vegan food can be both delicious and nutritious.",
    img: "../../public/images/image 5.png",
  },
  {
    id: 16,
    title: "Asian Fusion",
    description:
      "Embark on a culinary journey through Asia with our Asian fusion catering. A fusion of flavors from different Asian cuisines that will delight your guests.",
    img: "../../public/images/image 6.png",
  },
  {
    id: 17,
    title: "Taste of Italy",
    description:
      "Experience the taste of Italy with our Italian-inspired catering. Pasta, pizza, and classic Italian dishes that capture the essence of Italian cuisine.",
    img: "../../public/images/image 7.png",
  },
  {
    id: 18,
    title: "French Delicacies",
    description:
      "Indulge in the elegance of French delicacies with our catering. From escargot to croissants, our French-inspired dishes will transport you to Paris.",
    img: "../../public/images/image 8.png",
  },
  {
    id: 19,
    title: "Exotic Flavors",
    description:
      "Discover the exotic flavors of our catering inspired by distant lands. Unique spices and ingredients that will add an adventurous touch to your event.",
    img: "../../public/images/image 9.png",
  },
  {
    id: 20,
    title: "Brunch Bonanza",
    description:
      "Make your event special with a brunch bonanza featuring a delightful array of breakfast and lunch favorites.",
    img: "../../public/images/image 7.png",
  },
];


export const cateringPackages = [
  {
    id: 1,
    name: "Classic Wedding",
    numberDiners: 100,
    bundleImage: "../../public/images/image 1.png",
    galleryImages: [
      "../../public/images/image 1.png",
      "../../public/images/image 2.png",
      "../../public/images/image 3.png",
      "../../public/images/image 10.png",
      "../../public/images/image 12.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 1,
      name: "Caprese Salad",
      type: "starter",
      description:
        "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.",
      image: "../../public/images/image 1.png",
    },
    mainCourse: {
      id: 1,
      name: "Filet Mignon",
      type: "main",
      description:
        "Tender and juicy filet mignon served with a side of vegetables.",
      image: "../../public/images/image 2.png",
    },
    dessert: {
      id: 1,
      name: "Wedding Cake",
      type: "dessert",
      description:
        "Elegant multi-tiered wedding cake with a variety of flavors.",
      image: "../../public/images/image 3.png",
    },
    drinks: [
      {
        id: 1,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 2,
        name: "Champagne",
        image: "../../public/images/image 14.png",
        price: 250,
        amount: 60,
      },
      {
        id: 3,
        name: "Red Wine",
        image: "../../public/images/image 15.png",
        price: 180,
        amount: 80,
      },
    ],
    rating: 4.7,
    description:
      "Our Classic Wedding Package offers a sophisticated dining experience for your special day.",
  },

  // Segundo paquete con rating entre 2 y 4
  {
    id: 2,
    name: "Mexican Fiesta",
    numberDiners: 80,
    bundleImage: "../../public/images/image 4.png",
    galleryImages: [
      "../../public/images/image 4.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 2,
      name: "Guacamole and Chips",
      type: "starter",
      description: "Freshly made guacamole served with crispy tortilla chips.",
      image: "../../public/images/image 4.png",
    },
    mainCourse: {
      id: 2,
      name: "Enchiladas",
      type: "main",
      description: "Delicious enchiladas stuffed with your choice of filling.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 2,
      name: "Churros",
      type: "dessert",
      description: "Traditional Mexican churros served with chocolate sauce.",
      image: "../../public/images/image 6.png",
    },
    drinks: [
      {
        id: 4,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 5,
        name: "Margarita",
        image: "../../public/images/image 10.png",
        price: 200,
        amount: 70,
      },
      {
        id: 6,
        name: "Coca cola",
        image: "../../public/images/image 20.png",
        price: 100,
        amount: 120,
      },
    ],
    rating: 3.2,
    description:
      "Experience the vibrant flavors of Mexico with our Mexican Fiesta Package.",
  },

  // Tercer paquete con rating entre 4.1 y 5
  {
    id: 3,
    name: "Asian Fusion",
    numberDiners: 120,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 8.png",
      "../../public/images/image 9.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 3,
      name: "Spring Rolls",
      type: "starter",
      description:
        "Crispy spring rolls filled with vegetables and served with dipping sauce.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 3,
      name: "Pad Thai",
      type: "main",
      description:
        "Classic Thai noodle dish with your choice of protein and peanuts.",
      image: "../../public/images/image 8.png",
    },
    dessert: {
      id: 3,
      name: "Mochi Ice Cream",
      type: "dessert",
      description:
        "Japanese rice cake filled with ice cream in various flavors.",
      image: "../../public/images/image 9.png",
    },
    drinks: [
      {
        id: 7,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 8,
        name: "Green Tea",
        image: "../../public/images/image 11.png",
        price: 80,
        amount: 150,
      },
      {
        id: 9,
        name: "Sake",
        image: "../../public/images/image 13.png",
        price: 300,
        amount: 40,
      },
    ],
    rating: 4.6,
    description:
      "Embark on a culinary journey through Asia with our Asian Fusion Package.",
  },

  // Cuarto paquete con rating entre 0 y 1.9
  {
    id: 4,
    name: "Vegetarian Delight",
    numberDiners: 60,
    bundleImage: "../../public/images/image 10.png",
    galleryImages: [
      "../../public/images/image 10.png",
      "../../public/images/image 11.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 4,
      name: "Spinach Artichoke Dip",
      type: "starter",
      description:
        "Creamy dip made with spinach, artichoke hearts, and cheese.",
      image: "../../public/images/image 10.png",
    },
    mainCourse: {
      id: 4,
      name: "Vegetable Stir-Fry",
      type: "main",
      description:
        "Assorted vegetables stir-fried in a savory sauce served over rice.",
      image: "../../public/images/image 11.png",
    },
    dessert: {
      id: 4,
      name: "Fruit Salad",
      type: "dessert",
      description: "Refreshing assortment of fresh fruits.",
      image: "../../public/images/image 12.png",
    },
    drinks: [
      {
        id: 10,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 11,
        name: "Lemonade",
        image: "../../public/images/image 16.png",
        price: 120,
        amount: 80,
      },
      {
        id: 12,
        name: "Iced Tea",
        image: "../../public/images/image 17.png",
        price: 90,
        amount: 90,
      },
    ],
    rating: 1.5,
    description:
      "Celebrate the flavors of nature with our Vegetarian Delight Package.",
  },

  // Quinto paquete con rating entre 2 y 4
  {
    id: 5,
    name: "Mediterranean Feast",
    numberDiners: 90,
    bundleImage: "../../public/images/image 13.png",
    galleryImages: [
      "../../public/images/image 13.png",
      "../../public/images/image 14.png",
      "../../public/images/image 15.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 5,
      name: "Hummus",
      type: "starter",
      description:
        "Traditional chickpea-based dip with tahini, olive oil, and herbs.",
      image: "../../public/images/image 13.png",
    },
    mainCourse: {
      id: 5,
      name: "Mediterranean Platter",
      type: "main",
      description:
        "Assortment of Mediterranean favorites like falafel, kebabs, and pita.",
      image: "../../public/images/image 14.png",
    },
    dessert: {
      id: 5,
      name: "Baklava",
      type: "dessert",
      description:
        "Sweet pastry made of layers of filo filled with nuts and honey.",
      image: "../../public/images/image 15.png",
    },
    drinks: [
      {
        id: 13,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 14,
        name: "Lemon Mint Cooler",
        image: "../../public/images/image 18.png",
        price: 150,
        amount: 60,
      },
      {
        id: 15,
        name: "Red Wine",
        image: "../../public/images/image 15.png",
        price: 180,
        amount: 50,
      },
    ],
    rating: 3.8,
    description:
      "Savor the rich and diverse flavors of the Mediterranean with our Feast Package.",
  },

  // Sexto paquete con rating entre 4.1 y 5
  {
    id: 6,
    name: "Seafood Lovers",
    numberDiners: 75,
    bundleImage: "../../public/images/image 16.png",
    galleryImages: [
      "../../public/images/image 16.png",
      "../../public/images/image 17.png",
      "../../public/images/image 18.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 6,
      name: "Shrimp Cocktail",
      type: "starter",
      description: "Chilled shrimp served with tangy cocktail sauce.",
      image: "../../public/images/image 16.png",
    },
    mainCourse: {
      id: 6,
      name: "Lobster Thermidor",
      type: "main",
      description:
        "Creamy and flavorful lobster baked with cheese and breadcrumbs.",
      image: "../../public/images/image 17.png",
    },
    dessert: {
      id: 6,
      name: "Key Lime Pie",
      type: "dessert",
      description:
        "Refreshing pie made with tangy key lime juice and a graham cracker crust.",
      image: "../../public/images/image 18.png",
    },
    drinks: [
      {
        id: 16,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 17,
        name: "White Wine",
        image: "../../public/images/image 19.png",
        price: 170,
        amount: 70,
      },
      {
        id: 18,
        name: "Sparkling Water",
        image: "../../public/images/image 2.png",
        price: 120,
        amount: 80,
      },
    ],
    rating: 4.7,
    description:
      "Delight in a bounty from the sea with our Seafood Lovers Package.",
  },

  // Séptimo paquete con rating entre 0 y 1.9
  {
    id: 7,
    name: "Quick and Easy",
    numberDiners: 40,
    bundleImage: "../../public/images/image 19.png",
    galleryImages: [
      "../../public/images/image 19.png",
      "../../public/images/image 20.png",
      "../../public/images/image 2.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 7,
      name: "Caesar Salad",
      type: "starter",
      description:
        "Classic salad with romaine lettuce, croutons, and Caesar dressing.",
      image: "../../public/images/image 19.png",
    },
    mainCourse: {
      id: 7,
      name: "Chicken Alfredo",
      type: "main",
      description:
        "Creamy Alfredo pasta with grilled chicken and parmesan cheese.",
      image: "../../public/images/image 20.png",
    },
    dessert: {
      id: 7,
      name: "Chocolate Brownie",
      type: "dessert",
      description:
        "Decadent chocolate brownie served with a scoop of vanilla ice cream.",
      image: "../../public/images/image 2.png",
    },
    drinks: [
      {
        id: 19,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 20,
        name: "Lemonade",
        image: "../../public/images/image 16.png",
        price: 120,
        amount: 80,
      },
      {
        id: 21,
        name: "Iced Tea",
        image: "../../public/images/image 17.png",
        price: 90,
        amount: 90,
      },
    ],
    rating: 1.2,
    description:
      "Enjoy a quick and easy yet delicious meal with our Quick and Easy Package.",
  },

  // Octavo paquete con rating entre 2 y 4
  {
    id: 8,
    name: "Gourmet Italian",
    numberDiners: 110,
    bundleImage: "../../public/images/image 12.png",
    galleryImages: [
      "../../public/images/image 12.png",
      "../../public/images/image 5.png",
      "../../public/images/image 4.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 8,
      name: "Bruschetta",
      type: "starter",
      description:
        "Toasted bread topped with fresh tomatoes, garlic, and basil.",
      image: "../../public/images/image 12.png",
    },
    mainCourse: {
      id: 8,
      name: "Chicken Parmesan",
      type: "main",
      description:
        "Breaded chicken cutlet smothered in marinara sauce and melted cheese.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 8,
      name: "Tiramisu",
      type: "dessert",
      description:
        "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
      image: "../../public/images/image 4.png",
    },
    drinks: [
      {
        id: 22,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 23,
        name: "Coca cola",
        image: "../../public/images/image 5.png",
        price: 140,
        amount: 60,
      },
      {
        id: 24,
        name: "Espresso",
        image: "../../public/images/image 16.png",
        price: 160,
        amount: 40,
      },
    ],
    rating: 3.6,
    description:
      "Indulge in the flavors of Italy with our Gourmet Italian Package.",
  },

  // Noveno paquete con rating entre 4.1 y 5
  {
    id: 9,
    name: "Exotic Thai",
    numberDiners: 100,
    bundleImage: "../../public/images/image 5.png",
    galleryImages: [
      "../../public/images/image 5.png",
      "../../public/images/image 16.png",
      "../../public/images/image 17.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 9,
      name: "Tom Yum Soup",
      type: "starter",
      description:
        "Spicy and sour Thai soup with shrimp, mushrooms, and lemongrass.",
      image: "../../public/images/image 5.png",
    },
    mainCourse: {
      id: 9,
      name: "Green Curry",
      type: "main",
      description:
        "Thai curry with green chili paste, coconut milk, and your choice of meat.",
      image: "../../public/images/image 16.png",
    },
    dessert: {
      id: 9,
      name: "Mango Sticky Rice",
      type: "dessert",
      description:
        "Sweet and creamy dessert made with ripe mangoes and sticky rice.",
      image: "../../public/images/image 17.png",
    },
    drinks: [
      {
        id: 25,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 26,
        name: "Thai Iced Tea",
        image: "../../public/images/image 2.png",
        price: 130,
        amount: 70,
      },
      {
        id: 27,
        name: "Singha Beer",
        image: "../../public/images/image 9.png",
        price: 190,
        amount: 50,
      },
    ],
    rating: 4.8,
    description:
      "Experience the exotic flavors of Thailand with our Exotic Thai Package.",
  },

  // Décimo paquete con rating entre 0 y 1.9
  {
    id: 10,
    name: "Light and Healthy",
    numberDiners: 50,
    bundleImage: "../../public/images/image 2.png",
    galleryImages: [
      "../../public/images/image 2.png",
      "../../public/images/image 9.png",
      "../../public/images/image 3.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 10,
      name: "Greek Salad",
      type: "starter",
      description:
        "Healthy salad with fresh vegetables, olives, and feta cheese.",
      image: "../../public/images/image 2.png",
    },
    mainCourse: {
      id: 10,
      name: "Grilled Salmon",
      type: "main",
      description:
        "Lightly seasoned grilled salmon served with steamed vegetables.",
      image: "../../public/images/image 9.png",
    },
    dessert: {
      id: 10,
      name: "Fruit Sorbet",
      type: "dessert",
      description: "Refreshing and fruity sorbet in a variety of flavors.",
      image: "../../public/images/image 3.png",
    },
    drinks: [
      {
        id: 28,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 29,
        name: "Iced Tea",
        image: "../../public/images/image 17.png",
        price: 90,
        amount: 90,
      },
      {
        id: 30,
        name: "Sparkling Water",
        image: "../../public/images/image 2.png",
        price: 120,
        amount: 80,
      },
    ],
    rating: 1.7,
    description: "Enjoy a guilt-free feast with our Light and Healthy Package.",
  },

  // Undécimo paquete con rating entre 2 y 4
  {
    id: 11,
    name: "All-American BBQ",
    numberDiners: 120,
    bundleImage: "../../public/images/image 1.png",
    galleryImages: [
      "../../public/images/image 1.png",
      "../../public/images/image 20.png",
      "../../public/images/image 3.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 11,
      name: "Cornbread",
      type: "starter",
      description: "Sweet and savory cornbread with a hint of honey.",
      image: "../../public/images/image 1.png",
    },
    mainCourse: {
      id: 11,
      name: "Barbecue Ribs",
      type: "main",
      description: "Tender and juicy ribs glazed in barbecue sauce.",
      image: "../../public/images/image 20.png",
    },
    dessert: {
      id: 11,
      name: "Apple Pie",
      type: "dessert",
      description: "Homemade apple pie with a buttery crust and warm spices.",
      image: "../../public/images/image 3.png",
    },
    drinks: [
      {
        id: 31,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 32,
        name: "Lemonade",
        image: "../../public/images/image 16.png",
        price: 120,
        amount: 80,
      },
      {
        id: 33,
        name: "Root Beer",
        image: "../../public/images/image 4.png",
        price: 110,
        amount: 90,
      },
    ],
    rating: 3.5,
    description:
      "Celebrate the flavors of America with our All-American BBQ Package.",
  },

  // Duodécimo paquete con rating entre 4.1 y 5
  {
    id: 12,
    name: "Elegant French",
    numberDiners: 90,
    bundleImage: "../../public/images/image 4.png",
    galleryImages: [
      "../../public/images/image 4.png",
      "../../public/images/image 15.png",
      "../../public/images/image 6.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 12,
      name: "Escargot",
      type: "starter",
      description:
        "Classic French appetizer of snails cooked in garlic butter.",
      image: "../../public/images/image 4.png",
    },
    mainCourse: {
      id: 12,
      name: "Coq au Vin",
      type: "main",
      description:
        "Rich and hearty French stew made with chicken, red wine, and vegetables.",
      image: "../../public/images/image 15.png",
    },
    dessert: {
      id: 12,
      name: "Crème Brûlée",
      type: "dessert",
      description: "Silky custard topped with caramelized sugar.",
      image: "../../public/images/image 6.png",
    },
    drinks: [
      {
        id: 34,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 35,
        name: "Red Wine",
        image: "../../public/images/image 15.png",
        price: 180,
        amount: 50,
      },
      {
        id: 36,
        name: "Sparkling Water",
        image: "../../public/images/image 2.png",
        price: 120,
        amount: 80,
      },
    ],
    rating: 4.9,
    description:
      "Indulge in the sophistication of France with our Elegant French Package.",
  },

  // Decimotercer paquete con rating entre 0 y 1.9
  {
    id: 13,
    name: "Finger Foods Fiesta",
    numberDiners: 70,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 18.png",
      "../../public/images/image 19.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 13,
      name: "Chicken Wings",
      type: "starter",
      description: "Spicy and tangy chicken wings served with dipping sauce.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 13,
      name: "Sliders",
      type: "main",
      description: "Miniature burgers with a variety of toppings.",
      image: "../../public/images/image 18.png",
    },
    dessert: {
      id: 13,
      name: "Assorted Dessert Bites",
      type: "dessert",
      description:
        "An assortment of bite-sized desserts, perfect for sampling.",
      image: "../../public/images/image 19.png",
    },
    drinks: [
      {
        id: 37,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 38,
        name: "Lemonade",
        image: "../../public/images/image 16.png",
        price: 120,
        amount: 80,
      },
      {
        id: 39,
        name: "Iced Tea",
        image: "../../public/images/image 17.png",
        price: 90,
        amount: 90,
      },
    ],
    rating: 1.8,
    description:
      "Celebrate with a fun and delicious array of finger foods from our Fiesta Package.",
  },

  // Decimocuarto paquete con rating entre 2 y 4
  {
    id: 14,
    name: "Sushi Sensation",
    numberDiners: 100,
    bundleImage: "../../public/images/image 10.png",
    galleryImages: [
      "../../public/images/image 10.png",
      "../../public/images/image 9.png",
      "../../public/images/image 12.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 14,
      name: "Edamame",
      type: "starter",
      description: "Steamed soybeans sprinkled with sea salt.",
      image: "../../public/images/image 10.png",
    },
    mainCourse: {
      id: 14,
      name: "Sushi Rolls",
      type: "main",
      description: "Assortment of sushi rolls with various fillings.",
      image: "../../public/images/image 9.png",
    },
    dessert: {
      id: 14,
      name: "Mochi Ice Cream",
      type: "dessert",
      description:
        "Japanese rice cake filled with ice cream in various flavors.",
      image: "../../public/images/image 12.png",
    },
    drinks: [
      {
        id: 40,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 41,
        name: "Green Tea",
        image: "../../public/images/image 11.png",
        price: 80,
        amount: 150,
      },
      {
        id: 42,
        name: "Sake",
        image: "../../public/images/image 13.png",
        price: 300,
        amount: 40,
      },
    ],
    rating: 3.7,
    description:
      "Delight in the artistry and flavors of Japan with our Sushi Sensation Package.",
  },

  // Decimoquinto paquete con rating entre 4.1 y 5
  {
    id: 15,
    name: "Taste of India",
    numberDiners: 110,
    bundleImage: "../../public/images/image 11.png",
    galleryImages: [
      "../../public/images/image 11.png",
      "../../public/images/image 4.png",
      "../../public/images/image 12.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 15,
      name: "Samosas",
      type: "starter",
      description: "Crispy pastry filled with spiced potatoes and peas.",
      image: "../../public/images/image 11.png",
    },
    mainCourse: {
      id: 15,
      name: "Chicken Tikka Masala",
      type: "main",
      description: "Grilled chicken in a creamy tomato-based sauce.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 15,
      name: "Gulab Jamun",
      type: "dessert",
      description: "Soft and syrupy milk dumplings flavored with cardamom.",
      image: "../../public/images/image 12.png",
    },
    drinks: [
      {
        id: 43,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 44,
        name: "Mango Lassi",
        image: "../../public/images/image 5.png",
        price: 140,
        amount: 70,
      },
      {
        id: 45,
        name: "Indian Chai",
        image: "../../public/images/image 7.png",
        price: 90,
        amount: 90,
      },
    ],
    rating: 4.5,
    description:
      "Embark on a flavorful journey to India with our Taste of India Package.",
  },

  // Decimosexto paquete con rating entre 0 y 1.9
  {
    id: 16,
    name: "Kids' Party",
    numberDiners: 30,
    bundleImage: "../../public/images/image 5.png",
    galleryImages: [
      "../../public/images/image 5.png",
      "../../public/images/image 7.png",
      "../../public/images/image 18.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 16,
      name: "Cheese Pizza",
      type: "starter",
      description: "Classic pizza topped with tomato sauce and melted cheese.",
      image: "../../public/images/image 5.png",
    },
    mainCourse: {
      id: 16,
      name: "Chicken Nuggets",
      type: "main",
      description: "Crispy and tender chicken nuggets.",
      image: "../../public/images/image 7.png",
    },
    dessert: {
      id: 16,
      name: "Rainbow Cupcakes",
      type: "dessert",
      description: "Colorful cupcakes with rainbow frosting.",
      image: "../../public/images/image 18.png",
    },
    drinks: [
      {
        id: 46,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 47,
        name: "Orange Juice",
        image: "../../public/images/image 4.png",
        price: 80,
        amount: 120,
      },
      {
        id: 48,
        name: "Soft Drinks",
        image: "../../public/images/image 15.png",
        price: 90,
        amount: 110,
      },
    ],
    rating: 1.3,
    description:
      "Make your kids' party a hit with our Kids' Party Package featuring kid-friendly favorites.",
  },

  // Decimoséptimo paquete con rating entre 2 y 4
  {
    id: 17,
    name: "Taste of Greece",
    numberDiners: 90,
    bundleImage: "../../public/images/image 6.png",
    galleryImages: [
      "../../public/images/image 20.png",
      "../../public/images/image 2.png",
      "../../public/images/image 4.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 17,
      name: "Spanakopita",
      type: "starter",
      description: "Spinach and feta-filled pastry triangles.",
      image: "../../public/images/image 4.png",
    },
    mainCourse: {
      id: 17,
      name: "Moussaka",
      type: "main",
      description:
        "Layered casserole with eggplant, potatoes, and seasoned ground meat.",
      image: "../../public/images/image 10.png",
    },
    dessert: {
      id: 17,
      name: "Baklava",
      type: "dessert",
      description:
        "Sweet pastry made of layers of filo filled with nuts and honey.",
      image: "../../public/images/image 17.png",
    },
    drinks: [
      {
        id: 49,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 50,
        name: "Greek Frappe",
        image: "../../public/images/image 7.png",
        price: 150,
        amount: 70,
      },
      {
        id: 51,
        name: "Ouzo",
        image: "../../public/images/image 9.png",
        price: 200,
        amount: 60,
      },
    ],
    rating: 3.4,
    description:
      "Experience the taste of Greece with our delightful Taste of Greece Package.",
  },

  // Decimoctavo paquete con rating entre 4.1 y 5
  {
    id: 18,
    name: "Extravagant Seafood",
    numberDiners: 80,
    bundleImage: "../../public/images/image 12.png",
    galleryImages: [
      "../../public/images/image 16.png",
      "../../public/images/image 3.png",
      "../../public/images/image 7.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 18,
      name: "Lobster Bisque",
      type: "starter",
      description: "Rich and creamy soup made with lobster and spices.",
      image: "../../public/images/image 15.png",
    },
    mainCourse: {
      id: 18,
      name: "Seafood Tower",
      type: "main",
      description: "A grand tower of assorted seafood delicacies.",
      image: "../../public/images/image 11.png",
    },
    dessert: {
      id: 18,
      name: "Chocolate Fondue",
      type: "dessert",
      description:
        "Melted chocolate served with an assortment of fruits and treats for dipping.",
      image: "../../public/images/image 7.png",
    },
    drinks: [
      {
        id: 52,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 53,
        name: "Chardonnay",
        image: "../../public/images/image 5.png",
        price: 220,
        amount: 40,
      },
      {
        id: 7,
        name: "Champagne",
        image: "../../public/images/image 14.png",
        price: 250,
        amount: 60,
      },
    ],
    rating: 4.7,
    description:
      "Indulge in an opulent seafood feast with our Extravagant Seafood Package.",
  },

  // Decimonoveno paquete con rating entre 0 y 1.9
  {
    id: 19,
    name: "Casual Picnic",
    numberDiners: 40,
    bundleImage: "../../public/images/image 20.png",
    galleryImages: [
      "../../public/images/image 13.png",
      "../../public/images/image 7.png",
      "../../public/images/image 5.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 19,
      name: "Caprese Salad Skewers",
      type: "starter",
      description:
        "Cherry tomatoes, fresh mozzarella, and basil drizzled with balsamic glaze.",
      image: "../../public/images/image 53.png",
    },
    mainCourse: {
      id: 19,
      name: "Sandwich Platter",
      type: "main",
      description: "An assortment of delicious sandwiches.",
      image: "../../public/images/image 7.png",
    },
    dessert: {
      id: 19,
      name: "Fruit Salad",
      type: "dessert",
      description: "A refreshing mix of seasonal fruits.",
      image: "../../public/images/image 5.png",
    },
    drinks: [
      {
        id: 55,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 56,
        name: "Orange Juice",
        image: "../../public/images/image 4.png",
        price: 80,
        amount: 120,
      },
      {
        id: 57,
        name: "Lemonade",
        image: "../../public/images/image 16.png",
        price: 120,
        amount: 80,
      },
    ],
    rating: 1.5,
    description:
      "Enjoy a casual and delightful picnic with our Casual Picnic Package.",
  },

  // Vigésimo paquete con rating entre 2 y 4
  {
    id: 20,
    name: "Vegetarian Delight",
    numberDiners: 60,
    bundleImage: "../../public/images/image 12.png",
    galleryImages: [
      "../../public/images/image 8.png",
      "../../public/images/image 5.png",
      "../../public/images/image 1.png",
    ],
    categoryList: [1, 2],
    starter: {
      id: 20,
      name: "Stuffed Mushrooms",
      type: "starter",
      description:
        "Mushroom caps filled with a mix of breadcrumbs, garlic, and herbs.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 20,
      name: "Vegetable Stir-Fry",
      type: "main",
      description: "Assorted vegetables stir-fried to perfection.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 20,
      name: "Fruit Tart",
      type: "dessert",
      description:
        "Butter pastry filled with pastry cream and topped with fresh fruit.",
      image: "../../public/images/image 8.png",
    },
    drinks: [
      {
        id: 58,
        name: "Mineral Water",
        image: "../../public/images/image 5.png",
        price: 100,
        amount: 100,
      },
      {
        id: 59,
        name: "Lemonade",
        image: "../../public/images/image 16.png",
        price: 120,
        amount: 80,
      },
      {
        id: 60,
        name: "Iced Tea",
        image: "../../public/images/image 17.png",
        price: 90,
        amount: 90,
      },
    ],
    rating: 3.2,
    description:
      "Celebrate the flavors of nature with our Vegetarian Delight Package.",
  },
];
