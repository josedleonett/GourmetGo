//IN THIS FILE WE CAN PUT THE API DATA RESPONSE SAMPLES-

export const categories = [
  {
    id: 1,
    title: "International Buffet",
    description:
      "Our catering service offers an international buffet that will take you on a culinary journey around the world. Enjoy a wide variety of flavors and exquisite dishes from different cultures to delight your guests.",
    img: "../../public/images/image 7.png",
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
    name: "Paquete Internacional",
    numberDiners: 25,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 5.png",
      "../../public/images/image 7.png",
    ],
    categoryList: [1],
    starter: {
      id: 1,
      name: "Empanadas Argentinas",
      type: "starter",
      description:
        "Empanadas rellenas de carne, pollo o verduras, una delicia tradicional de Argentina.",
      image: "../../public/images/image 5.png",
    },
    mainCourse: {
      id: 1,
      name: "Paella Valenciana",
      type: "main",
      description:
        "Una mezcla de arroz, mariscos y carnes, con sabores que te transportarán a España.",
      image: "../../public/images/image 7.png",
    },
    dessert: {
      id: 1,
      name: "Tiramisú Italiano",
      type: "dessert",
      description:
        "Postre italiano con capas de bizcocho de café y crema de mascarpone.",
      image: "../../public/images/image 3.png",
    },
    drinks: [
      {
        id: 1,
        name: "Sangría",
        image: "../../public/images/image 4.png",
        price: 220.0,
        amount: 180,
      },
      {
        id: 2,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 300,
      },
      {
        id: 3,
        name: "Cerveza Artesanal",
        image: "../../public/images/image 6.png",
        price: 180.0,
        amount: 150,
      },
    ],
  },
  {
    id: 2,
    name: "Paquete Gourmet",
    numberDiners: 30,
    bundleImage: "../../public/images/image 4.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 5.png",
    ],
    categoryList: [2],
    starter: {
      id: 2,
      name: "Tartar de Salmón",
      type: "starter",
      description:
        "Finas láminas de salmón fresco aderezadas con limón y eneldo.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 2,
      name: "Filete Mignon",
      type: "main",
      description:
        "Exquisito filete de res asado, acompañado de una reducción de vino tinto.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 2,
      name: "Soufflé de Chocolate",
      type: "dessert",
      description:
        "Un delicado soufflé de chocolate con un toque de ralladura de naranja.",
      image: "../../public/images/image 5.png",
    },
    drinks: [
      {
        id: 4,
        name: "Vino Tinto Reserva",
        image: "../../public/images/image 6.png",
        price: 300.0,
        amount: 100,
      },
      {
        id: 5,
        name: "Agua con Gas",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 200,
      },
      {
        id: 6,
        name: "Café Espresso",
        image: "../../public/images/image 7png",
        price: 180.0,
        amount: 150,
      },
    ],
  },
  {
    id: 3,
    name: "Paquete de Parrilla",
    numberDiners: 20,
    bundleImage: "../../public/images/image 3.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 4.png",
      "../../public/images/image 9.png",
    ],
    categoryList: [3],
    starter: {
      id: 3,
      name: "Choripán",
      type: "starter",
      description:
        "Clásico chorizo argentino en pan, acompañado de chimichurri.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 3,
      name: "Asado Criollo",
      type: "main",
      description:
        "Selección de cortes de carne a la parrilla, acompañado de ensalada mixta.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 3,
      name: "Flan Casero",
      type: "dessert",
      description: "Postre tradicional argentino, cremoso flan con caramelo.",
      image: "../../public/images/image 9.png",
    },
    drinks: [
      {
        id: 7,
        name: "Cerveza Lager",
        image: "../../public/images/image 6.png",
        price: 180.0,
        amount: 150,
      },
      {
        id: 8,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
      {
        id: 9,
        name: "Gaseosa de Limón",
        image: "../../public/images/image 7.png",
        price: 150.0,
        amount: 200,
      },
    ],
  },
  {
    id: 4,
    name: "Paquete de Postres",
    numberDiners: 12,
    bundleImage: "../../public/images/image 4.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 8.png",
    ],
    categoryList: [4],
    starter: {
      id: 4,
      name: "Vasitos de Crema",
      type: "starter",
      description: "Vasitos de crema pastelera con frutas frescas y galletas.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 4,
      name: "Pastel de Queso",
      type: "main",
      description:
        "Delicioso pastel de queso horneado, con mermelada de frutos rojos.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 4,
      name: "Tarta de Frutas",
      type: "dessert",
      description:
        "Tarta con base de masa quebrada y frutas frescas de estación.",
      image: "../../public/images/image 8.png",
    },
    drinks: [
      {
        id: 10,
        name: "Café Americano",
        image: "../../public/images/image 7png",
        price: 120.0,
        amount: 180,
      },
      {
        id: 11,
        name: "Té de Hierbas",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 120,
      },
      {
        id: 12,
        name: "Zumo de Naranja",
        image: "../../public/images/image 8.png",
        price: 180.0,
        amount: 200,
      },
    ],
  },
  {
    id: 5,
    name: "Paquete Vegano",
    numberDiners: 18,
    bundleImage: "../../public/images/image 5.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 4.png",
      "../../public/images/image 7.png",
    ],
    categoryList: [5],
    starter: {
      id: 5,
      name: "Rollitos de Verano",
      type: "starter",
      description:
        "Rollitos vietnamitas rellenos de verduras y salsa de cacahuate.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 5,
      name: "Berenjenas Rellenas",
      type: "main",
      description: "Berenjenas rellenas de quinoa, espinacas y tomates secos.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 5,
      name: "Helado de Frutas",
      type: "dessert",
      description: "Helado vegano hecho con frutas frescas y leche de coco.",
      image: "../../public/images/image 7.png",
    },
    drinks: [
      {
        id: 13,
        name: "Agua con Gas",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
      {
        id: 14,
        name: "Limonada de Fresas",
        image: "../../public/images/image 9.png",
        price: 150.0,
        amount: 200,
      },
      {
        id: 15,
        name: "Té Verde Frío",
        image: "../../public/images/image 4.png",
        price: 180.0,
        amount: 180,
      },
    ],
  },
  {
    id: 6,
    name: "Paquete Mediterráneo",
    numberDiners: 22,
    bundleImage: "../../public/images/image 6.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 6.png",
    ],
    categoryList: [6],
    starter: {
      id: 6,
      name: "Hummus de Garbanzos",
      type: "starter",
      description: "Crema de garbanzos con tahini, acompañada de pan de pita.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 6,
      name: "Pollo al Limón",
      type: "main",
      description:
        "Muslos de pollo asados con limón y especias, servidos con arroz pilaf.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 6,
      name: "Baklava",
      type: "dessert",
      description:
        "Dulce postre de hojaldre relleno de nueces y bañado en almíbar.",
      image: "../../public/images/image 6.png",
    },
    drinks: [
      {
        id: 16,
        name: "Vino Blanco",
        image: "../../public/images/image 6.png",
        price: 250.0,
        amount: 150,
      },
      {
        id: 17,
        name: "Té de Menta",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 120,
      },
      {
        id: 18,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 7,
    name: "Paquete de Sushi",
    numberDiners: 16,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 5.png",
      "../../public/images/image 7.png",
    ],
    categoryList: [7],
    starter: {
      id: 7,
      name: "Sashimi Variado",
      type: "starter",
      description: "Selección de pescados frescos cortados en finas láminas.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 7,
      name: "Tempura Rolls",
      type: "main",
      description: "Rollitos de sushi tempurizados con langostinos y aguacate.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 7,
      name: "Dango",
      type: "dessert",
      description:
        "Bolitas de mochis (pastel de arroz) acompañadas de salsa de soja dulce.",
      image: "../../public/images/image 7.png",
    },
    drinks: [
      {
        id: 19,
        name: "Cerveza Japonesa",
        image: "../../public/images/image 6.png",
        price: 200.0,
        amount: 180,
      },
      {
        id: 20,
        name: "Té Verde",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 150,
      },
      {
        id: 21,
        name: "Agua con Gas",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 8,
    name: "Paquete de Tapas",
    numberDiners: 24,
    bundleImage: "../../public/images/image 8.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 7.png",
    ],
    categoryList: [8],
    starter: {
      id: 8,
      name: "Gazpacho Andaluz",
      type: "starter",
      description:
        "Sopa fría de tomate, pepino, pimiento y ajo, típica de España.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 8,
      name: "Tortilla Española",
      type: "main",
      description: "Tortilla de papas y cebolla, una deliciosa tapa española.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 8,
      name: "Churros con Chocolate",
      type: "dessert",
      description:
        "Clásicos churros acompañados de una taza de chocolate caliente.",
      image: "../../public/images/image 7.png",
    },
    drinks: [
      {
        id: 22,
        name: "Vino Tinto",
        image: "../../public/images/image 6.png",
        price: 250.0,
        amount: 150,
      },
      {
        id: 23,
        name: "Tinto de Verano",
        image: "../../public/images/image 4.png",
        price: 180.0,
        amount: 120,
      },
      {
        id: 24,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 9,
    name: "Paquete de Bodas",
    numberDiners: 20,
    bundleImage: "../../public/images/image 9.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 5.png",
    ],
    categoryList: [1, 4, 6],
    starter: {
      id: 9,
      name: "Rollitos de Primavera",
      type: "starter",
      description:
        "Comienza tu evento con unos deliciosos rollitos de primavera, una opción ligera y sabrosa que sorprenderá a tus invitados.",
      image: "../../public/images/image 5.png",
    },
    mainCourse: {
      id: 9,
      name: "Parrillada Mixta",
      type: "main",
      description:
        "Selección de carnes y vegetales asados a la parrilla, acompañados de salsas y guarniciones.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 9,
      name: "Tarta de Frutas",
      type: "dessert",
      description:
        "Tarta con base de masa quebrada y frutas frescas de estación.",
      image: "../../public/images/image 5.png",
    },
    drinks: [
      {
        id: 25,
        name: "Champán",
        image: "../../public/images/image 4.png",
        price: 300.0,
        amount: 120,
      },
      {
        id: 26,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
      {
        id: 27,
        name: "Café Espresso",
        image: "../../public/images/image 7png",
        price: 180.0,
        amount: 180,
      },
    ],
  },
  {
    id: 10,
    name: "Paquete de Ensaladas",
    numberDiners: 18,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 5.png",
      "../../public/images/image 4.png",
    ],
    categoryList: [1, 6],
    starter: {
      id: 10,
      name: "Ensalada Caprese",
      type: "starter",
      description:
        "Clásica ensalada italiana con tomate, mozzarella y albahaca.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 10,
      name: "Ensalada Griega",
      type: "main",
      description:
        "Ensalada con pepino, tomate, aceitunas y queso feta, aderezada con aceite de oliva y orégano.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 10,
      name: "Ensalada de Frutas",
      type: "dessert",
      description:
        "Una refrescante ensalada con frutas de estación y jugo de limón.",
      image: "../../public/images/image 4.png",
    },
    drinks: [
      {
        id: 28,
        name: "Agua con Gas",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
      {
        id: 29,
        name: "Jugo de Naranja",
        image: "../../public/images/image 9.png",
        price: 150.0,
        amount: 200,
      },
      {
        id: 30,
        name: "Té de Menta",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 150,
      },
    ],
  },
  {
    id: 11,
    name: "Paquete Asiático",
    numberDiners: 20,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 5.png",
      "../../public/images/image 3.png",
    ],
    categoryList: [1, 7],
    starter: {
      id: 11,
      name: "Rollos de Maki",
      type: "starter",
      description:
        "Rollitos de alga nori rellenos de arroz y pescado, típicos de la cocina japonesa.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 11,
      name: "Pollo al Curry",
      type: "main",
      description:
        "Trozos de pollo cocinados en salsa de curry con leche de coco y especias.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 11,
      name: "Helado de Té Verde",
      type: "dessert",
      description: "Helado con sabor a té verde, un postre popular en Asia.",
      image: "../../public/images/image 3.png",
    },
    drinks: [
      {
        id: 31,
        name: "Sake",
        image: "../../public/images/image 4.png",
        price: 280.0,
        amount: 120,
      },
      {
        id: 32,
        name: "Té Verde",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 150,
      },
      {
        id: 33,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 12,
    name: "Paquete de Tapas Españolas",
    numberDiners: 24,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 6.png",
    ],
    categoryList: [1, 8],
    starter: {
      id: 12,
      name: "Tortilla Española",
      type: "starter",
      description:
        "Clásica tortilla de papas y cebolla, una tapa española muy popular.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 12,
      name: "Gambas al Ajillo",
      type: "main",
      description:
        "Gambas salteadas en aceite de oliva, ajo y guindilla, una delicia ibérica.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 12,
      name: "Crema Catalana",
      type: "dessert",
      description: "Deliciosa crema con azúcar quemado en la parte superior.",
      image: "../../public/images/image 6.png",
    },
    drinks: [
      {
        id: 34,
        name: "Tinto de Verano",
        image: "../../public/images/image 4.png",
        price: 180.0,
        amount: 120,
      },
      {
        id: 35,
        name: "Cerveza Estrella",
        image: "../../public/images/image 6.png",
        price: 200.0,
        amount: 150,
      },
      {
        id: 36,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 13,
    name: "Paquete de Mariscos",
    numberDiners: 16,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 4.png",
      "../../public/images/image 9.png",
    ],
    categoryList: [1, 3],
    starter: {
      id: 13,
      name: "Ceviche Peruano",
      type: "starter",
      description: "Clásico ceviche peruano de pescado fresco, limón y ají.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 13,
      name: "Paella de Mariscos",
      type: "main",
      description:
        "Deliciosa paella con una selección de mariscos, arroz y azafrán.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 13,
      name: "Tarta de Santiago",
      type: "dessert",
      description: "Tarta de almendras y limón típica de la región de Galicia.",
      image: "../../public/images/image 9.png",
    },
    drinks: [
      {
        id: 37,
        name: "Vino Blanco Albariño",
        image: "../../public/images/image 6.png",
        price: 250.0,
        amount: 150,
      },
      {
        id: 38,
        name: "Sangría",
        image: "../../public/images/image 4.png",
        price: 220.0,
        amount: 180,
      },
      {
        id: 39,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 14,
    name: "Paquete de Comida Mediterránea",
    numberDiners: 20,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 6.png",
    ],
    categoryList: [1, 6],
    starter: {
      id: 14,
      name: "Tabulé Libanés",
      type: "starter",
      description:
        "Ensalada de cuscús, tomate, pepino, perejil y menta con aliño de limón y aceite de oliva.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 14,
      name: "Pollo Marroquí",
      type: "main",
      description:
        "Muslos de pollo asados con especias marroquíes y pasas, acompañados de cuscús.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 14,
      name: "Helado de Pistacho",
      type: "dessert",
      description:
        "Helado de pistacho con toques de almendra, una delicia mediterránea.",
      image: "../../public/images/image 6.png",
    },
    drinks: [
      {
        id: 40,
        name: "Té de Menta",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 150,
      },
      {
        id: 41,
        name: "Zumo de Naranja",
        image: "../../public/images/image 8.png",
        price: 180.0,
        amount: 200,
      },
      {
        id: 42,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 15,
    name: "Paquete de Barbecue",
    numberDiners: 22,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 4.png",
      "../../public/images/image 7.png",
    ],
    categoryList: [1, 3],
    starter: {
      id: 15,
      name: "Alitas de Pollo BBQ",
      type: "starter",
      description:
        "Alitas de pollo marinadas en salsa barbacoa, ideales para picar.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 15,
      name: "Costillas BBQ",
      type: "main",
      description:
        "Costillas de cerdo a la parrilla con salsa barbacoa y maíz asado.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 15,
      name: "Mazorcas de Maíz Dulce",
      type: "dessert",
      description:
        "Mazorcas de maíz dulce a la parrilla con mantequilla y azúcar.",
      image: "../../public/images/image 7.png",
    },
    drinks: [
      {
        id: 43,
        name: "Cerveza de Barril",
        image: "../../public/images/image 6.png",
        price: 200.0,
        amount: 180,
      },
      {
        id: 44,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
      {
        id: 45,
        name: "Limonada",
        image: "../../public/images/image 9.png",
        price: 150.0,
        amount: 200,
      },
    ],
  },
  {
    id: 16,
    name: "Paquete de Postres Artísticos",
    numberDiners: 12,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 3.png",
      "../../public/images/image 8.png",
    ],
    categoryList: [4],
    starter: {
      id: 16,
      name: "Cupcakes Decorados",
      type: "starter",
      description:
        "Cupcakes con diseños artísticos, ideales para endulzar cualquier celebración.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 16,
      name: "Tarta de Fondant",
      type: "main",
      description: "Tarta decorada con fondant y detalles personalizados.",
      image: "../../public/images/image 3.png",
    },
    dessert: {
      id: 16,
      name: "Cookies Artísticas",
      type: "dessert",
      description: "Galletas decoradas con glaseado y detalles artísticos.",
      image: "../../public/images/image 8.png",
    },
    drinks: [
      {
        id: 46,
        name: "Café Americano",
        image: "../../public/images/image 7png",
        price: 120.0,
        amount: 180,
      },
      {
        id: 47,
        name: "Té de Hierbas",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 120,
      },
      {
        id: 48,
        name: "Jugo de Naranja",
        image: "../../public/images/image 8.png",
        price: 180.0,
        amount: 200,
      },
    ],
  },
  {
    id: 17,
    name: "Paquete de Comida Internacional",
    numberDiners: 25,
    bundleImage: "../../public/images/image 7.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 5.png",
      "../../public/images/image 9.png",
    ],
    categoryList: [1],
    starter: {
      id: 17,
      name: "Rollitos Vietnamitas",
      type: "starter",
      description:
        "Rollitos frescos de Vietnam rellenos de verduras y carne, acompañados de salsa de cacahuate.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 17,
      name: "Sushi Variado",
      type: "main",
      description:
        "Selección de sushi variado, incluyendo maki, nigiri y sashimi.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 17,
      name: "Mochis",
      type: "dessert",
      description:
        "Deliciosos pastelitos de arroz rellenos de helado de diferentes sabores.",
      image: "../../public/images/image 9.png",
    },
    drinks: [
      {
        id: 49,
        name: "Sake",
        image: "../../public/images/image 4.png",
        price: 280.0,
        amount: 120,
      },
      {
        id: 50,
        name: "Té Verde",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 150,
      },
      {
        id: 51,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 18,
    name: "Paquete de Comida Mexicana",
    numberDiners: 20,
    bundleImage: "../../public/images/image 5.png",
    galleryImages: [
      "../../public/images/image 3.png",
      "../../public/images/image 4.png",
      "../../public/images/image 8.png",
    ],
    categoryList: [1],
    starter: {
      id: 18,
      name: "Guacamole y Totopos",
      type: "starter",
      description: "Guacamole casero acompañado de totopos de maíz.",
      image: "../../public/images/image 9.png",
    },
    mainCourse: {
      id: 18,
      name: "Tacos Mexicanos",
      type: "main",
      description:
        "Selección de tacos mexicanos con diferentes rellenos y salsas.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 18,
      name: "Churros con Chocolate",
      type: "dessert",
      description:
        "Clásicos churros acompañados de una taza de chocolate caliente.",
      image: "../../public/images/image 7.png",
    },
    drinks: [
      {
        id: 52,
        name: "Cerveza Modelo",
        image: "../../public/images/image 6.png",
        price: 200.0,
        amount: 180,
      },
      {
        id: 53,
        name: "Margarita",
        image: "../../public/images/image 4.png",
        price: 220.0,
        amount: 180,
      },
      {
        id: 54,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 19,
    name: "Paquete de Comida India",
    numberDiners: 18,
    bundleImage: "../../public/images/image 10.png",
    galleryImages: [
      "../../public/images/image 11.png",
      "../../public/images/image 5.png",
      "../../public/images/image 6.png",
    ],
    categoryList: [1],
    starter: {
      id: 19,
      name: "Samosas",
      type: "starter",
      description:
        "Empanadillas rellenas de patata, guisantes y especias, típicas de la India.",
      image: "../../public/images/image 3.png",
    },
    mainCourse: {
      id: 19,
      name: "Pollo al Curry",
      type: "main",
      description:
        "Trozos de pollo cocinados en salsa de curry con leche de coco y especias.",
      image: "../../public/images/image 5.png",
    },
    dessert: {
      id: 19,
      name: "Gulab Jamun",
      type: "dessert",
      description:
        "Bolitas de leche fritas en almíbar, un dulce clásico indio.",
      image: "../../public/images/image 6.png",
    },
    drinks: [
      {
        id: 55,
        name: "Lassi de Mango",
        image: "../../public/images/image 9.png",
        price: 180.0,
        amount: 200,
      },
      {
        id: 56,
        name: "Té Chai",
        image: "../../public/images/image 4.png",
        price: 160.0,
        amount: 150,
      },
      {
        id: 57,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
  {
    id: 20,
    name: "Paquete de Comida Americana",
    numberDiners: 25,
    bundleImage: "../../public/images/image 11.png",
    galleryImages: [
      "../../public/images/image 7.png",
      "../../public/images/image 4.png",
      "../../public/images/image 9.png",
    ],
    categoryList: [1],
    starter: {
      id: 20,
      name: "Chicken Wings",
      type: "starter",
      description: "Alitas de pollo marinadas y acompañadas de salsas.",
      image: "../../public/images/image 7.png",
    },
    mainCourse: {
      id: 20,
      name: "Hamburguesa Clásica",
      type: "main",
      description:
        "Hamburguesa de carne de res con lechuga, tomate, queso y cebolla.",
      image: "../../public/images/image 4.png",
    },
    dessert: {
      id: 20,
      name: "Cheesecake",
      type: "dessert",
      description: "Tarta de queso cremosa con base de galletas.",
      image: "../../public/images/image 9.png",
    },
    drinks: [
      {
        id: 58,
        name: "Refresco",
        image: "../../public/images/image 4.png",
        price: 150.0,
        amount: 200,
      },
      {
        id: 59,
        name: "Limonada",
        image: "../../public/images/image 9.png",
        price: 150.0,
        amount: 200,
      },
      {
        id: 60,
        name: "Agua Mineral",
        image: "../../public/images/image 8.png",
        price: 120.0,
        amount: 250,
      },
    ],
  },
];

// , pero esta vez de paquetes de catering (necesito al menos 20 paquetes distintos), debe tener el siguiente formato y campos:

// id: 9,
// name: "Paquete de bodas",
// numberDiners: 20,
// bundleImage: (usar aleatoriamente las mismas imagenes del array de categorias),
// galleryImages:[(aqui iria un array de imagenes del paquete. Usar aleatoriamente una combinacion de al menos 3 imagenes del mismo array de categorias)],
// starter:{
// id:5,
// name: (el nombre de un plato de entrada relacionado con el paquete y la categoria),
// type: (puede ser starter|main|dessert),
// description: (la descripcion del plato),
// image: (la imgen del plato -usar aleatoriamente algunas de las imagenes que ya estan en el array de categorias-)
// },
// mainCourse:{
// id:5,
// name: (el nombre de un plato de entrada relacionado con el paquete y la categoria),
// type: (puede ser starter|main|dessert),
// description: (la descripcion del plato),
// image: (la imgen del plato -usar aleatoriamente algunas de las imagenes que ya estan en el array de categorias-)
// },
// desserts:{
// id:5,
// name: (el nombre de un plato de entrada relacionado con el paquete y la categoria),
// type: (puede ser starter|main|dessert),
// description: (la descripcion del plato),
// image: (la imgen del plato -usar aleatoriamente algunas de las imagenes que ya estan en el array de categorias-)
// },
// drinks:[
// {id: 1,
// name: "cocacola",
// image: (usar aleatoriamente una imagen del array de categorias),
// price:250.5,
// amount:200
// }, (aqui dos bebidas mas)]
