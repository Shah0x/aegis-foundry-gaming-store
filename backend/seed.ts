import mongoose from 'mongoose';
import Product from './models/Product.ts';
import 'dotenv/config';

const categoryImages: Record<string, string> = {
  'Graphics Cards': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000',
  'Keyboards': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1000',
  'Monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
  'Mice': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000',
  'Processors': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000',
  'Cases': 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000',
  'Audio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
  'Memory': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000',
  'Peripherals': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000',
  'Cooling': 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000',
  'Power Supplies': 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000',
  'Storage': 'https://images.unsplash.com/photo-1597872200370-499df51441a4?auto=format&fit=crop&q=80&w=1000',
};

const products = [
  {
    assetId: "ETG-4090FE",
    title: "NVIDIA GeForce RTX 4090 Founders Edition",
    description: "The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.",
    price: 1599.99,
    stockCount: 3,
    category: "Graphics Cards",
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["24GB G6X VRAM", "AD102 Core", "450W TDP", "3rd Gen RT Cores"]
  },
  {
    assetId: "ETG-Q1MK2",
    title: "Keychron Q1 QMK Custom Mechanical Keyboard",
    description: "A fully customizable 75% layout mechanical keyboard packed with all premium features.",
    price: 169.00,
    stockCount: 15,
    category: "Keyboards",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["CNC Aluminum Body", "Gasket Mount", "Hot-swappable", "QMK/VIA Support"]
  },
  {
    assetId: "ETG-NEOG9",
    title: "Samsung Odyssey Neo G9 49\" Mini LED",
    description: "Quantum Mini-LED with Quantum HDR2000 for industry-leading depth and 240Hz refresh rate.",
    price: 2299.99,
    stockCount: 2,
    category: "Monitors",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["5120x1440 Res", "240Hz Refresh", "2000 Nits Peak", "1000R Curve"]
  },
  {
    assetId: "ETG-GPROX2",
    title: "Logitech G Pro X Superlight 2",
    description: "The next generation of our championship-winning gaming mouse. Now faster, lighter, and more precise.",
    price: 159.00,
    stockCount: 25,
    category: "Mice",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["LIGHTSPEED Wireless", "60g Mass", "HERO 2 Sensor", "95H Battery"]
  },
  {
    assetId: "ETG-OLED27",
    title: "ASUS ROG Swift OLED PG27AQDM",
    description: "27-inch 1440p OLED gaming monitor with 240Hz refresh rate and peak brightness.",
    price: 899.00,
    stockCount: 8,
    category: "Monitors",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["240Hz OLED", "0.03ms Response", "G-Sync Compatible", "Custom Heatsink"]
  },
  {
    assetId: "ETG-7950X3D",
    title: "AMD Ryzen 9 7950X3D",
    description: "The ultimate gaming processor with 16 cores and AMD 3D V-Cache technology.",
    price: 699.00,
    stockCount: 12,
    category: "Processors",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["16 Cores/32 Threads", "128MB L3 Cache", "5.7GHz Boost", "120W TDP"]
  },
  {
    assetId: "ETG-O11DEVO",
    title: "Lian Li PC-O11 Dynamic EVO",
    description: "A mid-tower chassis with modularity and flexibility for the ultimate enthusiast build.",
    price: 169.99,
    stockCount: 20,
    category: "Cases",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["Reversible Chassis", "Dual Chamber", "Fits 3x 360mm Rad", "E-ATX Support"]
  },
  {
    assetId: "ETG-ARCTISPRO",
    title: "SteelSeries Arctis Nova Pro Wireless",
    description: "Premium high-fidelity audio with Active Noise Cancellation and simultaneous wireless.",
    price: 349.99,
    stockCount: 4,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["Infinity Power System", "ClearCast Gen 2", "Dual USB Connection", "ANC Core"]
  },
  {
    assetId: "ETG-T5RGB64",
    title: "G.Skill Trident Z5 RGB 64GB DDR5-6000",
    description: "High-performance DDR5 memory designed for ultra-high frequency on next-gen platforms.",
    price: 219.00,
    stockCount: 18,
    category: "Memory",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["6000MT/s Speed", "CL30 Intel XMP", "RGB Streamline", "Hand-screened ICs"]
  },
  {
    assetId: "ETG-SDMK2",
    title: "Elgato Stream Deck MK.2",
    description: "15 customizable LCD keys to control apps and tools for professional streamers.",
    price: 149.99,
    stockCount: 30,
    category: "Peripherals",
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["15 LCD Keys", "USB-C Interface", "Removable Faceplate", "Desktop Stand"]
  },
  {
    assetId: "ETG-14900KS",
    title: "Intel Core i9-14900KS",
    description: "The world's fastest desktop processor reaching up to 6.2 GHz out of the box.",
    price: 729.00,
    stockCount: 5,
    category: "Processors",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["24 Cores (8P+16E)", "6.2GHz Max Turbo", "Intel Smart Cache", "LGA1700"]
  },
  {
    assetId: "ETG-STRIX4080",
    title: "ROG Strix GeForce RTX 4080 Super",
    description: "The ultimate power performer with massive heatsinks and Axial-tech fans.",
    price: 1249.00,
    stockCount: 10,
    category: "Graphics Cards",
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["16GB GDDR6X", "Aura Sync RGB", "3.5 Slot Design", "Dual BIOS"]
  },
  {
    assetId: "ETG-KRAKENELITE",
    title: "NZXT Kraken Elite 360 RGB",
    description: "AIO liquid cooler with a massive 2.36\" wide-angle LCD display for custom GIFs.",
    price: 299.99,
    stockCount: 12,
    category: "Cooling",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["2.36\" LCD Screen", "640x640 Res", "Static Pressure Fans", "7th Gen Asetek"]
  },
  {
    assetId: "ETG-HYTEY70",
    title: "HYTE Y70 Touch Midnight Cherry",
    description: "Panoramic case with secondary 4K touchscreen for deep system integration.",
    price: 359.99,
    stockCount: 3,
    category: "Cases",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["4K Touchscreen", "Dual Chamber", "Vertical GPU Support", "Cold Floor Design"]
  },
  {
    assetId: "ETG-H150iELITE",
    title: "Corsair iCUE H150i Elite LCD XT",
    description: "Premium liquid CPU cooler with IPS LCD screen and iCUE ecosystem support.",
    price: 289.00,
    stockCount: 8,
    category: "Cooling",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["IPS LCD Monitor", "AF RGB Elite Fans", "XTM70 Paste", "Zero RPM Mode"]
  },
  {
    assetId: "ETG-THOR1600",
    title: "ROG Thor 1600W Titanium II",
    description: "The quietest 1600W power supply with OLED display for real-time wattage tracking.",
    price: 499.00,
    stockCount: 4,
    category: "Power Supplies",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["80+ Titanium", "OLED Power Display", "Axial-tech Fan", "Lambda A++ Cert"]
  },
  {
    assetId: "ETG-990PRO4TB",
    title: "Samsung 990 PRO 4TB NVMe SSD",
    description: "The ultimate SSD reaching near-limit sequential speeds of up to 7,450 MB/s.",
    price: 349.99,
    stockCount: 22,
    category: "Storage",
    imageUrl: "https://images.unsplash.com/photo-1597872200370-499df51441a4?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    specifications: ["7,450 MB/s Read", "6,900 MB/s Write", "V-NAND TLC", "4TB Capacity"]
  },
  {
    assetId: "ETG-DOMTIT64",
    title: "Corsair Dominator Titanium 64GB DDR5",
    description: "Customizable top bars and world-class DDR5 performance for overclocking.",
    price: 329.00,
    stockCount: 15,
    category: "Memory",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["7200MT/s Support", "Patented DHX Cooling", "11 RGB LEDs", "Correlator Config"]
  },
  {
    assetId: "ETG-STREAMPAD",
    title: "Razer Stream Controller",
    description: "A centralized interface for your workflow with 12 haptic switchblade keys.",
    price: 269.99,
    stockCount: 7,
    category: "Peripherals",
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["12 Haptic Keys", "6 Analog Dials", "Loupedeck Engine", "Customizable Icons"]
  },
  {
    assetId: "ETG-HEROCASE",
    title: "Fractal Design North Charcoal Black",
    description: "A natural interior design piece featuring an oak front and sleek hardware integration.",
    price: 139.99,
    stockCount: 20,
    category: "Cases",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    specifications: ["Oak Front Panel", "Open Mesh Design", "140mm Aspect Fans", "Nature Aesthetic"]
  }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Refreshing database with verified hardware product images...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  }
}

