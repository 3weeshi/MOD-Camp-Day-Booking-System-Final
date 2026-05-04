const smallTents = Array.from({ length: 27 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `S${number}`,
    code: `S${number}`,
    type: "small",
    name: `Small Tent S${number}`,
    nameAr: `خيمة صغيرة S${number}`,
    description: "A simple tent for small groups with a comfortable seating area. Public bathrooms are available inside the camp.",
    descriptionAr: "خيمة بسيطة للمجموعات الصغيرة مع جلسة مريحة، وتتوفر حمامات عامة داخل المخيم.",
    location: "Sabhan, Kuwait",
    capacity: 4,
    price: 10,
    bathroom: "No private bathroom",
    bathroomAr: "بدون حمام خاص",
    mapArea: "Small tents area",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80"
  };
});

const largeTents = Array.from({ length: 18 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `L${number}`,
    code: `L${number}`,
    type: "large",
    name: `Large Tent L${number}`,
    nameAr: `خيمة كبيرة L${number}`,
    description: "A large tent for families and groups with a wider seating area and extra comfort.",
    descriptionAr: "خيمة كبيرة للعائلات والمجموعات مع مساحة جلوس أوسع وراحة إضافية.",
    location: "Sabhan, Kuwait",
    capacity: 8,
    price: 30,
    bathroom: "Private bathroom included",
    bathroomAr: "تحتوي على حمام خاص",
    mapArea: "Large tents area",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80"
  };
});

const vipTents = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  return {
    id: `VIP${number}`,
    code: `VIP${number}`,
    type: "vip",
    name: `VIP Tent ${number}`,
    nameAr: `خيمة VIP ${number}`,
    description: "A premium tent with a larger seating area and a location near the theater and restaurants.",
    descriptionAr: "خيمة مميزة بجلسة أكبر وموقع قريب من المسرح والمطاعم.",
    location: "Sabhan, Kuwait",
    capacity: 12,
    price: 60,
    deposit: 40,
    bathroom: "Private bathroom included",
    bathroomAr: "تحتوي على حمام خاص",
    mapArea: "VIP tents area",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80"
  };
});

export const tents = [...smallTents, ...largeTents, ...vipTents];
