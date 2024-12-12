export const users = [
    { id: 1, fullName: 'Mekdelawit Getu', email: 'delawit@gmail.com', phoneNumber: '093 555 67 77', role: 'poultrySpecialist', status: 'Active' },
    { id: 2, fullName: 'Efa Shasho', email: 'efa@gmail.com', phoneNumber: '0967 55 00 77', role: 'farmWorker', status: 'Active' },
    { id: 3, fullName: 'Wdase Yohannes', email: 'wdase@gmail.com', phoneNumber: '094 033 66 88', role: 'farmWorker', status: 'Active' },
];


export const health = [
    { id: 1, vaccineType: 'Avian Influenza', date: '2023-01-15' },
    { id: 2, vaccineType: 'Newcastle Disease', date: '2023-05-22' },
    { id: 3, vaccineType: 'Marek’s Disease', date: '2023-09-10' },
];


// demo/demo.js

export const reportData = [
    {
        date: '2023-01-01',
        birds: 150,
        feed: 300,
        mortalityRate: 2.5,
        medicationCost: 50,
        supplementCost: 20,
        eggsProduced: 120, // Only for broilers
        eggsBad: 5,       // Only for broilers
        layersProduced: 0, // Only for layers
        layersBad: 0,     // Only for layers
        hatchlingsProduced: 0, // Only for hatchlings
        hatchlingsBad: 0,      // Only for hatchlings
    },
    {
        date: '2023-01-02',
        birds: 160,
        feed: 320,
        mortalityRate: 1.8,
        medicationCost: 45,
        supplementCost: 25,
        eggsProduced: 130,
        eggsBad: 4,
        layersProduced: 0,
        layersBad: 0,
        hatchlingsProduced: 0,
        hatchlingsBad: 0,
    },
    {
        date: '2023-01-01',
        birds: 0,
        feed: 0,
        mortalityRate: 0,
        medicationCost: 0,
        supplementCost: 0,
        eggsProduced: 0,
        eggsBad: 0,
        layersProduced: 200,
        layersBad: 3,
        hatchlingsProduced: 0,
        hatchlingsBad: 0,
    },
    {
        date: '2023-01-02',
        birds: 0,
        feed: 0,
        mortalityRate: 0,
        medicationCost: 0,
        supplementCost: 0,
        eggsProduced: 0,
        eggsBad: 0,
        layersProduced: 220,
        layersBad: 2,
        hatchlingsProduced: 0,
        hatchlingsBad: 0,
    },
    {
        date: '2023-01-01',
        birds: 0,
        feed: 0,
        mortalityRate: 0,
        medicationCost: 0,
        supplementCost: 0,
        eggsProduced: 0,
        eggsBad: 0,
        layersProduced: 0,
        layersBad: 0,
        hatchlingsProduced: 100,
        hatchlingsBad: 1,
    },
    {
        date: '2023-01-02',
        birds: 0,
        feed: 0,
        mortalityRate: 0,
        medicationCost: 0,
        supplementCost: 0,
        eggsProduced: 0,
        eggsBad: 0,
        layersProduced: 0,
        layersBad: 0,
        hatchlingsProduced: 110,
        hatchlingsBad: 2,
    },
];


// src/vaccineData.js

export const vaccines = [
    { id: 1, name: "Marek's Disease Vaccine", type: "Live Attenuated", usage: "At hatch or 1 day old" },
    { id: 2, name: "Newcastle Disease Vaccine", type: "Live Attenuated", usage: "1-3 weeks of age" },
    { id: 3, name: "Infectious Bursal Disease (IBD) Vaccine", type: "Live Attenuated", usage: "3-6 weeks of age" },
    { id: 4, name: "Avian Influenza Vaccine", type: "Inactivated/Live", usage: "6-8 weeks of age" },
    { id: 5, name: "Coryza Vaccine", type: "Inactivated", usage: "6-8 weeks of age" },
 
];



// src/productData.js

export const products = [
    { id: 1, name: "Egg", amount: "2000 piece", price: "30000" },
    { id: 2, name: "Meat", amount: "20 Kg", price: "30000" },
    { id: 3, name: "Chicks", amount: "2000 piece", price: "30000" },
    { id: 4, name: "Egg", amount: "2000 piece", price: "30000" },
];




