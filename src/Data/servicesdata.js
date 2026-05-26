import HomeImg from "../assets/HomeCleaning.jpeg";
import KitchenImg from "../assets/KitchenCleaning.jpeg";
import OfficeImg from "../assets/OfficeCleaning.jpeg";
import WindowImg from "../assets/WindowCleaning.jpeg";
import UtensilImg from "../assets/UtensilCleaning.jpeg";
import AfterFestivalImg from "../assets/AfterFestival.jpeg";

export const servicesData = {
    // ── 1. FULL HOME CLEANING SUB-CATEGORIES ──
    "kitchen-cleaning": {
        title: "Kitchen Deep Cleaning",
        tagline: "Get rid of tough grease, oil stains, and bacteria.",
        description: "Specialized team deep cleans chimneys, countertops, cabinets inside-out, and degreases exhaust fans to maintain top-notch kitchen hygiene.",
        features: ["Oil & grease removal from tiles", "Cabinet inside & outside cleaning", "Appliance exterior wiping", "Sink & tap polishing"],
        basePrice: 999,
        hoursOptions: [2, 3, 4],
        images: [KitchenImg, HomeImg, UtensilImg]
    },
    "window-wiping": {
        title: "Window & Glass Wiping",
        tagline: "Crystal clear windows for a brighter view.",
        description: "We provide professional window cleaning for bungalows and apartments using specialized safety equipment and glass cleaning agents.",
        features: ["Blinds & net dusting", "Frame & sill wiping", "Streak-free glass cleaning", "High-rise exterior window cleaning"],
        basePrice: 499,
        hoursOptions: [1, 2, 3],
        images: [WindowImg, OfficeImg, HomeImg]
    },
    "sofa-cleaning": {
        title: "Bedroom & Sofa Clean",
        tagline: "Premium upholstery shampooing and fabric sanitization.",
        description: "Deep vacuuming and organic sanitization of sofas, mattresses, and cushions to eliminate dust mites, allergens, and tough deep-seated stains.",
        features: ["Industrial vacuum dry suction", "Eco fabric shampoo scrubbing", "Moisture extraction drying", "Odour removal treatment"],
        basePrice: 1299,
        hoursOptions: [2, 3, 4],
        images: [HomeImg, OfficeImg, WindowImg]
    },
    "washroom-sanitization": {
        title: "Washroom Sanitization",
        tagline: "Ultra germ protection and limescale removal for bathrooms.",
        description: "Professional bathroom deep cleaning targeting hard water stains, tiles scaling, and deep chemical sanitization of commodes, washbasins, and bathtubs.",
        features: ["Anti-bacterial floor scrubbing", "Tap & shower chrome polishing", "Tiles yellow stain treatment", "Deep mirror streak-free wipe"],
        basePrice: 699,
        hoursOptions: [1, 1.5, 2],
        images: [KitchenImg, UtensilImg, HomeImg]
    },

    // ── 2. LUXURY FARMHOUSE CLEANING SUB-CATEGORIES ──
    "pool-deck": {
        title: "Swimming Pool Deck",
        tagline: "Keep your farmhouse pool perimeter safe, clean, and moss-free.",
        description: "Specialized high-pressure jet washing and anti-slip cleaning for swimming pool decks, side paths, and poolside tile grids to remove slimy algae.",
        features: ["High-pressure pressure washing", "Anti-fungal chemical treatment", "Debris & dry leaf clearance", "Lounge chair wiping & polish"],
        basePrice: 2999,
        hoursOptions: [3, 4, 6],
        images: [AfterFestivalImg, HomeImg, OfficeImg]
    },
    "terrace-wash": {
        title: "Open Terrace Wash",
        tagline: "Dust and pollution removal from large open rooftop terraces.",
        description: "Rooftop terrace scrubbing to remove dirt layers caused by rain and wind. Perfect cleaning care for tiles, stone layouts, and terrace glass railings.",
        features: ["Floor industrial machine scrubbing", "Drainage channel block clearing", "Railing glass wiping", "Dusting of outdoor furniture"],
        basePrice: 1999,
        hoursOptions: [2, 3, 5],
        images: [WindowImg, HomeImg, KitchenImg]
    },
    "lawn-cleaning": {
        title: "Lawn Path Cleaning",
        tagline: "Pristine walking tracks and garden stone structures.",
        description: "Jet washing of walkways, interlocked bricks, and garden pavements inside your luxury properties to restore the bright brick shine.",
        features: ["Algae & moss scraping removal", "Heavy soil pressure jet wash", "Garden sitout wiping", "Fountain exterior dusting"],
        basePrice: 1499,
        hoursOptions: [2, 4, 6],
        images: [HomeImg, WindowImg, OfficeImg]
    },
    "party-clean": {
        title: "Post-Party Deep Clean",
        tagline: "Relax post-celebration while we restore your farmhouse.",
        description: "Festivals and parties bring joy, but they leave behind huge clean-up tasks. Our quick response team will restore your home to its pristine condition within hours.",
        features: ["Complete trash bag removal", "Deep liquor stain floor scrubbing", "Bathroom refresh & sanitization", "Upholstery realignment"],
        basePrice: 3499,
        hoursOptions: [4, 6, 8],
        images: [AfterFestivalImg, HomeImg, KitchenImg]
    },

    // ── 3. OFFICE WORKSPACE CLEANING SUB-CATEGORIES ──
    "workstation-dusting": {
        title: "Workstation Dusting",
        tagline: "Clean desks ensure high focus and employee health.",
        description: "Microfiber wiping and spray disinfection of individual corporate office employee desks, monitors, keyboards, chairs, and cubicle partitions.",
        features: ["Keyboard air blower dusting", "Monitor screen streakless wipe", "Desk surface spray disinfection", "Chair upholstery dusting"],
        basePrice: 1599,
        hoursOptions: [2, 4, 6],
        images: [OfficeImg, WindowImg, HomeImg]
    },
    "server-room": {
        title: "Server Room Safety",
        tagline: "Zero-moisture dry cleaning safe for critical server racks.",
        description: "Highly trained teams utilizing anti-static vacuum systems to clean server grids, panels, and raised flooring without risking any live hardware grids.",
        features: ["ESD anti-static vacuum clean", "Zero-moisture microfiber wiping", "Raised floor cavity dusting", "Cable tray surface cleaning"],
        basePrice: 4999,
        hoursOptions: [2, 3, 5],
        images: [OfficeImg, HomeImg, WindowImg]
    },
    "conference-room": {
        title: "Conference Room Care",
        tagline: "Make your business presentation halls look top-tier elite.",
        description: "Deep vacuuming and furniture polishing for main discussion board rooms, meeting decks, projector screens frames, and large glass boards.",
        features: ["Large wooden table wood polishing", "Premium chairs vacuum extraction", "Projector & audio tech dusting", "Glass whiteboard streakless cleaning"],
        basePrice: 1899,
        hoursOptions: [1, 2, 3],
        images: [OfficeImg, WindowImg, KitchenImg]
    },
    "carpet-shampooing": {
        title: "Carpet Shampooing",
        tagline: "Industrial foaming extraction to revive corporate carpets.",
        description: "Heavy-duty vacuuming combined with rotary brush shampoo injection to dissolve ink stains, coffee marks, and accumulated step dust layers.",
        features: ["Rotary carpet cleaning scrub", "High suction moisture extraction", "Coffee & ink spots stain treatment", "Deodorizing fabric refreshing"],
        basePrice: 2499,
        hoursOptions: [3, 5, 8],
        images: [OfficeImg, HomeImg, AfterFestivalImg]
    },

    // ── 4. COMMERCIAL & SHOP CLEANING SUB-CATEGORIES ──
    "retail-shop": {
        title: "Retail Shop Front",
        tagline: "Attractive, crystal clear glass displays to pull footfalls.",
        description: "Main road retail storefront glass cleaning to remove smudge marks, smoke grease, rain streaks, and brand name logo board frames washing.",
        features: ["Streakless glass chemical wipe", "Signboard structural frame wipe", "Entry path floor washing", "Display lighting exterior dust"],
        basePrice: 999,
        hoursOptions: [1, 2, 3],
        images: [WindowImg, OfficeImg, HomeImg]
    },
    "restaurant-degreasing": {
        title: "Restaurant Kitchen Degreasing",
        tagline: "FSSAI compliance ready deep commercial kitchen degreasing.",
        description: "Heavy oil stain scrapping and chemical degreasing for bulk cookery areas, massive storage chimneys, large burners, counters, and walk-in cold rooms.",
        features: ["Heavy industrial grease scrapping", "Stainless steel counter sanitizing", "Commercial burner deep washing", "Deep drainage wash & disinfect"],
        basePrice: 4500,
        hoursOptions: [4, 6, 8],
        images: [KitchenImg, UtensilImg, HomeImg]
    },
    "floor-scrubbing": {
        title: "Floor Deep Scrubbing",
        tagline: "Industrial single-disc scrubbing for massive retail tiles floors.",
        description: "Heavy machinery floor care designed for large retail malls, supermarket aisles, clinics, and car showrooms to bring back the brilliant stone mirror finish.",
        features: ["Single-disc heavy floor scrub", "Industrial floor squeegee extraction", "Tough scuff mark spot scrubbing", "Gloss finish wax layer buffing"],
        basePrice: 2999,
        hoursOptions: [3, 5, 8],
        images: [OfficeImg, HomeImg, KitchenImg]
    },
    "showroom-cleaning": {
        title: "Showroom Deep Clean",
        tagline: "Complete overnight deep clean setup for luxury showrooms.",
        description: "Comprehensive end-to-end cleaning including spot lighting structures, heavy clothing trial rooms, accessory displays cabinets, and premium premium couches.",
        features: ["Premium displays glass polishing", "Trial rooms deep dust vacuum", "Spotlights exterior clean tracks", "Main entrance gate gloss refresh"],
        basePrice: 5999,
        hoursOptions: [4, 8, 12],
        images: [OfficeImg, WindowImg, HomeImg]
    }
};