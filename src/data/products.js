// /products listing + product detail pages.
// Extracted from the WordPress database: products 5354, tumble dryer 5289,
// YZD ironer 5263, W060F/W2110F 5338.
//
// Each product page is described as an ordered `sections` array. The template at
// src/app/products/[slug]/page.js renders each section by its `type`, so adding
// or reordering a section is a data change, not a layout change.

export const productsMeta = {
  // Yoast on the live site stores this as "%%title%% Laundry Products & Equipment | Launch Laundry",
  // where %%title%% resolves to the page title ("Products").
  title: "Products Laundry Products & Equipment | Launch Laundry",
  description:
    "Explore our laundry products and equipment, including washers, dryers, and spare parts, designed to optimize your laundry operations.",
};

export const pageHero = {
  title: "Products",
  breadcrumb: [{ label: "Launch Laundry", href: "/" }, { label: "Products" }],
};

export const listing = {
  badge: "What we offers",
  title: "Explore Our Products",
  description:
    "By doing a financial analysis of these statements, you can see whether you have enough working capital.",
};

// Order matches the live site.
export const products = [
  {
    slug: "laundrymate-yzd-series-flatwork-ironer",
    name: "LaundryMate YZD Series Flatwork Ironer",
    tagline: "Commercial Flatwork Ironer for Laundries & Hotels",
    image: "/images/products/yzd-flatwork-ironer.png",
    imageAlt: "Laundry machine product",
  },
  {
    slug: "laundrymate-commercial-tumble-dryer",
    name: "LaundryMate Commercial Tumble Dryer",
    tagline: "High-Performance Tumble Dryer for Professional Laundry Businesses",
    image: "/images/products/commercial-tumble-dryer.png",
    imageAlt: "Commercial washer model",
  },
  {
    slug: "wales-series-professional-laundry-equipment",
    name: "WALES Series Professional Laundry Equipment",
    tagline: "Transform Your Laundry Business with WALES…",
    image: "/images/products/wales-series.png",
    imageAlt: "Professional laundry equipment",
  },
  {
    slug: "w060f-w2110f-industrial-laundry-machines",
    name: "W060F & W2110F Industrial Laundry Machines",
    tagline: "Next-Level Laundry Performance for Growing Businesses",
    image: "/images/products/w060f-w2110f.png",
    imageAlt: "W060F and W2110F industrial laundry machines",
  },
];

// Service cross-links reused across product pages (live URLs kept intact).
const SERVICES = {
  consultancy: {
    title: "Business Consultancy for Laundromat Investors",
    icon: "/images/icons/service-consultancy.svg",
    href: "/services/business-consultancy-for-laundromat-investors",
  },
  research: {
    title: "Research and Planning for Laundry Businesses",
    icon: "/images/icons/service-research.svg",
    href: "/services/research-planning-for-laundry-businesses",
  },
  revenue: {
    title: "Revenue Growth Strategies",
    icon: "/images/icons/service-revenue.svg",
    href: "/services/revenue-generation-and-scale-up-for-laundromats",
  },
  branding: {
    title: "Branding and Marketing Support",
    icon: "/images/icons/service-branding.svg",
    href: "/services/business-promotion-and-branding-for-laundromat",
  },
  selfService: {
    title: "Self-Service Laundromat Setup",
    icon: "/images/icons/service-selfservice.svg",
    href: "/services/self-service-laundromat-setup",
  },
  finance: {
    title: "Finance Advisory",
    icon: "/images/icons/service-revenue.svg",
    href: "/services/finance-advisory-for-laundry-startups",
  },
  planning: {
    title: "Research & Planning",
    icon: "/images/icons/service-planning.png",
    href: "/services/research-planning-for-laundry-businesses",
  },
};

export const productPages = {
  // ─────────────────────────────────────────────────────────────────────────
  "laundrymate-commercial-tumble-dryer": {
    name: "LaundryMate Commercial Tumble Dryer",
    meta: {
      title: "LaundryMate Commercial Tumble Dryer",
      description:
        "Discover the LaundryMate Commercial Tumble Dryer, built for efficiency, durability, and high-performance drying in commercial laundries.",
    },
    image: "/images/products/commercial-tumble-dryer.png",
    sections: [
      {
        type: "intro",
        badge: "Introduction",
        title: "High-Performance Tumble Dryer for Professional Laundry Businesses",
        image: "/images/products/commercial-tumble-dryer.png",
        imageAlt: "Commercial washer model",
        paragraphs: [
          "The LaundryMate Commercial Tumble Dryer is engineered to deliver fast, efficient, and reliable drying for laundromats, hotels, hospitals, and other commercial laundry operations. With a range of models and heat sources, it helps businesses achieve superior drying performance while saving energy and maintaining operational safety.",
          "Our team also provides complete laundry business solutions, from self-service laundromat setup and financial advisory to business promotion and scale-up strategies. This ensures you get not just the best equipment, but also the right guidance to grow your laundry business.",
        ],
      },
      {
        type: "table",
        heading: "Available Models and Capacity",
        caption: "Choose from a variety of dryer capacities to match the size and demand of your business:",
        rows: [
          ["LM-15", "15kg"],
          ["LM-18", "18kg"],
          ["LM-25", "25kg"],
          ["LM-35", "35kg"],
          ["LM-50", "50kg"],
          ["LM-70", "70kg"],
          ["LM-100", "100kg"],
        ],
        footnote: "Heat Source Options: Steam, Electric, Gas",
      },
      {
        type: "cards",
        badge: "Benefits",
        title: "Key Benefits",
        cards: [
          {
            icon: "/images/icons/benefit-1.svg",
            title: "Energy Efficiency",
            description: "Designed to reduce power consumption with advanced airflow systems.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "Fast Drying",
            description: "Optimized heating and air circulation for quick turnaround.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Reliable Performance",
            description: "Built with heavy-duty materials for long-lasting use.",
          },
          {
            icon: "/images/icons/benefit-4.svg",
            title: "Safety Assured",
            description: "Multiple safety controls to prevent accidents and damage.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Convenient Operation",
            description: "Easy cleaning, maintenance, and monitoring features.",
          },
        ],
      },
      {
        type: "featureCards",
        badge: "Drive Success",
        title: "Features That Set It Apart",
        cards: [
          {
            icon: "/images/icons/feature-efficiency.svg",
            title: "Energy Saving and Efficiency",
            points: [
              "Advanced heating system with separate cool air and hot air pathways for optimal performance.",
              "Optional cooling down system to shorten drying time.",
              "Thick stainless steel drum and insulation to retain heat and reduce energy waste.",
              "Turbo air design for faster airflow and better drying results.",
            ],
          },
          {
            icon: "/images/icons/feature-reliable.svg",
            title: "Reliable Design",
            points: [
              "Heavy-duty frame minimizes vibration and increases durability.",
              "High-strength drum structure for extended lifespan.",
              "CE-approved motor and premium quality bearings.",
              "Minimal gap between drum and door for smooth loading and unloading.",
            ],
          },
          {
            icon: "/images/icons/feature-safety.svg",
            title: "Safety Features",
            points: [
              "Sensitive door switch that stops the machine when opened.",
              "Multiple temperature control points to protect fabrics.",
              "Emergency stop switch for quick response.",
              "Clear instructions and pre-set programs for safe operation.",
            ],
          },
          {
            icon: "/images/icons/feature-user-friendly.svg",
            title: "User-Friendly Convenience",
            points: [
              "LCD screen controller with pre-set drying programs.",
              "Easy-to-clean lint collector drawer.",
              "Large glass door for quick drying condition checks.",
              "Adjustable belt structure to prolong service life.",
            ],
          },
        ],
      },
      {
        type: "table",
        heading: "Specifications",
        columns: [
          "Model",
          "Capacity (kg)",
          "Heat Source",
          "Motor Power (kw)",
          "Electric Heater (kw)",
          "Steam Pressure (bar)",
        ],
        rows: [
          ["LM-15", "15", "Steam/Electric/Gas", "0.37", "15", "4-6"],
          ["LM-25", "25", "Steam/Electric/Gas", "0.55", "23", "4-6"],
          ["LM-35", "35", "Steam/Electric/Gas", "0.55", "27", "4-6"],
          ["LM-50", "50", "Steam/Electric/Gas", "1.1", "36", "4-6"],
          ["LM-70", "70", "Steam/Electric/Gas", "1.5", "60", "4-6"],
          ["LM-100", "100", "Steam/Electric/Gas", "2.2", "80", "4-6"],
        ],
      },
      {
        type: "serviceLinks",
        badge: "Profitable Laundry",
        title: "Complete Laundry Business Support",
        cards: [SERVICES.consultancy, SERVICES.research, SERVICES.revenue, SERVICES.branding],
      },
      {
        type: "highlight",
        badge: "Launch Laundry",
        title: "Build a Successful Laundry Business",
        paragraphs: [
          "The LaundryMate Commercial Tumble Dryer is more than just a machine — it’s a key part of a profitable laundry operation. By combining high-quality equipment with our expert services, you can grow your laundromat, hotel, or commercial laundry facility with confidence.",
          "Start today: Contact our experts to discuss your laundry business goals and equipment needs.",
        ],
        image: "/images/products/laundry-business-owner.webp",
        imageAlt: "Business Setup & Consultation",
        framed: true,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "laundrymate-yzd-series-flatwork-ironer": {
    name: "LaundryMate YZD Series Flatwork Ironer",
    meta: {
      title: "LaundryMate YZD Series Flatwork Ironer",
      description:
        "Explore the Laundry YZD Series Flatwork Ironer, designed for efficiency, durability, and high-performance results in commercial laundries.",
    },
    image: "/images/products/yzd-flatwork-ironer.png",
    sections: [
      {
        type: "intro",
        badge: "Introduction",
        title: "Professional Flatwork Ironer for Laundromats, Hotels, and Commercial Laundry Businesses",
        image: "/images/products/yzd-flatwork-ironer.png",
        imageAlt: "Laundry machine product",
        paragraphs: [
          "The LaundryMate YZD Series Flatwork Ironer is a high-performance, durable, and energy-efficient ironing solution designed to meet the demands of professional laundromats, hotels, hospitals, and large-scale laundry facilities. Built with precision and advanced technology, it ensures consistent ironing quality and operational reliability, helping your laundry business deliver premium results while saving time and energy.",
          "We also provide laundry business consultancy services, helping entrepreneurs set up and grow their laundromat businesses with the right equipment, including Huebsch dryer parts for reliable and efficient operations. Whether you are starting a self-service laundromat or expanding your commercial laundry operations, we offer complete solutions from business planning, branding, financial advisory, and equipment sourcing to revenue generation strategies. In addition, we offer comprehensive laundry business consultancy services to support entrepreneurs at every stage of their journey.",
        ],
      },
      {
        type: "highlight",
        badge: "Choose The YZD Series",
        title: "Why Choose the YZD Series for Your Laundry Business",
        paragraphs: [
          "The YZD Series offers unmatched performance, reliability, and user-friendly features, making it an ideal choice for businesses looking to maximize efficiency and profitability.",
        ],
        image: "/images/products/finance-advisory.jpg",
        imageAlt: "Finance Advisory for Laundry Startups",
        framed: true,
      },
      {
        type: "cards",
        badge: "Benefits",
        title: "Key Benefits",
        cards: [
          {
            icon: "/images/icons/benefit-1.svg",
            title: "Flexible Heating Options",
            description: "Choose between steam, electric, or gas to suit your operational needs.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "Multiple Roller Configurations",
            description: "1 to 5 roller options available to handle different volumes of laundry.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Energy-Saving Design",
            description: "Wider ironing area and independent steam control for reduced energy costs.",
          },
          {
            icon: "/images/icons/benefit-4.svg",
            title: "Safety First",
            description:
              "Equipped with automatic emergency stop, pressure control, and multiple safety features.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Durable and Reliable Build",
            description:
              "Stainless steel rollers, galvanized anti-corrosion components, and CE-approved parts.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "Easy Maintenance",
            description: "Simplified oiling system and adjustable belt mechanisms for long-term use.",
          },
        ],
      },
      {
        type: "featureCards",
        badge: "Drive Success",
        title: "Features That Drive Success",
        cards: [
          {
            icon: "/images/icons/feature-efficiency.svg",
            title: "Efficiency and Performance",
            points: [
              "Optimized roller design for fast and smooth ironing.",
              "Adjustable speed for handling a variety of fabrics.",
              "Reliable chain drive mechanism for continuous operation.",
            ],
          },
          {
            icon: "/images/icons/feature-reliable.svg",
            title: "Energy Savings",
            points: [
              "300-degree rotating joint for maximum ironing coverage.",
              "Independent steam outlet valves for each roller.",
              "Optional steam adjustment to reduce energy consumption.",
            ],
          },
          {
            icon: "/images/icons/feature-safety.svg",
            title: "Safety and Reliability",
            points: [
              "Transparent baffle plate for easy monitoring.",
              "Auto-stop feature for jam detection.",
              "Emergency stop switches placed around the machine.",
              "Pneumatic steam inlet valve with pressure control.",
            ],
          },
          {
            icon: "/images/icons/feature-user-friendly.svg",
            title: "User-Friendly and Convenient",
            points: [
              "Simple roller addition or reduction as your business grows.",
              "Easy-to-use oil feeding and belt adjustment system.",
              "Clear operator instructions for seamless training.",
            ],
          },
        ],
      },
      {
        type: "serviceLinks",
        badge: "Profitable Laundry",
        title: "Helping You Build a Profitable Laundry Business",
        cards: [
          {
            title: "Business Promotion & Branding",
            icon: "/images/icons/service-consultancy.svg",
            href: "/services/business-promotion-and-branding-for-laundromat",
          },
          {
            title: "Consultancy for Investors",
            icon: "/images/icons/service-research.svg",
            href: "/services/business-consultancy-for-laundromat-investors",
          },
          SERVICES.finance,
          {
            title: "Self-Service Laundromat Setup",
            icon: "/images/icons/service-branding.svg",
            href: "/services/self-service-laundromat-setup",
          },
          {
            title: "Revenue Generation Strategies",
            icon: "/images/icons/service-selfservice.svg",
            href: "/services/revenue-generation-and-scale-up-for-laundromats",
          },
          SERVICES.planning,
        ],
      },
      {
        type: "table",
        heading: "Specifications",
        columns: ["Feature", "Details"],
        rows: [
          ["Model", "YZD Series"],
          ["Heating Types", "Steam, Electric, Gas"],
          ["Roller Options", "1 to 5 Rollers"],
          ["Safety Features", "Emergency stop, auto-jam detection, pressure control"],
          ["Build Material", "Stainless steel and galvanized steel"],
          ["Manufacturer", "Shanghai LaundryMate Machinery Co., Ltd."],
        ],
      },
      {
        type: "highlight",
        badge: "Launch Laundry",
        title: "Take Your Laundry Business to the Next Level",
        paragraphs: [
          "Investing in the LaundryMate YZD Series Flatwork Ironer is a step toward delivering high-quality services and growing your laundry business. Whether you are running a hotel laundry room, a busy laundromat, or a commercial facility, this machine provides the performance and reliability you need.",
        ],
        image: "/images/products/promotion-branding.jpg",
        imageAlt: "Laundry business owner at a self-service laundromat",
        framed: true,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "wales-series-professional-laundry-equipment": {
    name: "WALES Series Professional Laundry Equipment",
    meta: {
      title: "Wales Series Professional Laundry Equipment",
      description:
        "Explore the Wales Series professional laundry equipment, offering efficiency, durability, and advanced features for commercial laundromats.",
    },
    image: "/images/products/wales-series.png",
    sections: [
      {
        type: "intro",
        badge: "Introduction",
        title: "Transform Your Laundry Business with WALES",
        image: "/images/products/wales-series.png",
        imageAlt: "WALES Series professional laundry equipment",
        paragraphs: [
          "The WALES Series Laundry Equipment is built for laundromats, hotels, hospitals, and large-scale commercial laundry operations that demand exceptional performance, reliability, and efficiency — available through an authorized Alliance Laundry Equipment dealer. Designed with state-of-the-art technology and premium materials, these machines deliver outstanding washing and drying results while reducing operational costs.",
          "Whether you are launching a self-service laundromat, expanding a hotel laundry facility, or modernizing a commercial laundry plant, WALES equipment helps you provide superior services that keep customers coming back.",
        ],
      },
      {
        type: "highlight",
        badge: "Complete Solutions",
        title: "Complete Laundry Solutions",
        paragraphs: [
          "The WALES Series includes two key machine categories to create a fully integrated laundry workflow:",
        ],
        features: [
          {
            icon: "/images/icons/series-machine.svg",
            title: "W Series Industrial Washing Machines:",
            description: "High-capacity washers designed for deep cleaning and efficient fabric care.",
          },
          {
            icon: "/images/icons/series-machine.svg",
            title: "GZ Series Industrial Dryers:",
            description: "Advanced dryers that deliver quick, even drying while saving energy.",
          },
        ],
        image: "/images/products/alliance-laundry-systems.jpg",
        imageAlt: "Alliance laundry systems",
        framed: true,
      },
      {
        type: "cards",
        badge: "WALES Laundry Equipment",
        title: "Key Features of WALES Laundry Equipment",
        description: "For Washing Machines (W Series)",
        cards: [
          {
            icon: "/images/icons/benefit-1.svg",
            title: "Heavy-Duty Stainless Steel Construction:",
            description: "Long-lasting durability and resistance to corrosion.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "High-Efficiency Cleaning Cycles:",
            description: "Reduce water and detergent usage while delivering spotless results.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Multiple Program Settings:",
            description: "Flexible options for different fabrics and cleaning requirements.",
          },
          {
            icon: "/images/icons/benefit-4.svg",
            title: "Energy-Saving Design:",
            description: "Minimized power consumption for sustainable operation.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Advanced Safety Features:",
            description:
              "Protect both fabrics and operators with emergency stop and safety lock systems.",
          },
        ],
      },
      {
        type: "photoCards",
        badge: "GZ Series",
        title: "For Dryers (GZ Series)",
        cards: [
          {
            image: "/images/products/gz-fast-drying.jpg",
            imageAlt: "Fast, even drying",
            title: "Heavy-Duty Stainless Steel Construction:",
            description: "Faster drying with uniform heat distribution.",
          },
          {
            image: "/images/products/gz-energy-tech.jpg",
            imageAlt: "Energy-saving dryer technology",
            title: "Energy-Saving Technology:",
            description: "Reduce heat loss and cut operational costs.",
          },
          {
            image: "/images/products/gz-quick-cooling.jpg",
            imageAlt: "Quick cooling options",
            title: "Quick Cooling Options:",
            description: "Enhance fabric quality and prevent overheating.",
          },
          {
            image: "/images/products/gz-durable-drum.jpg",
            imageAlt: "Durable drum design",
            title: "Durable Drum Design:",
            description: "Built to handle continuous heavy loads.",
          },
          {
            image: "/images/products/gz-easy-maintenance.jpg",
            imageAlt: "User-friendly maintenance",
            title: "User-Friendly Maintenance:",
            description: "Easy lint removal and straightforward cleaning access.",
          },
        ],
      },
      {
        type: "cards",
        badge: "Laundry Business",
        title: "Benefits for Your Laundry Business",
        cards: [
          {
            icon: "/images/icons/benefit-1.svg",
            title: "Boost Productivity:",
            description: "Faster wash and dry cycles for higher throughput.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "Enhance Quality:",
            description: "Deliver premium results that build customer trust.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Reduce Costs:",
            description: "Lower utility bills with water and energy-saving features.",
          },
          {
            icon: "/images/icons/benefit-4.svg",
            title: "Simplify Operations:",
            description: "User-friendly controls for quick staff training.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Scalable Solutions:",
            description: "Machines available in multiple capacities to fit your business size.",
          },
        ],
      },
      {
        type: "serviceLinks",
        badge: "Partnering for Business Growth",
        title:
          "At Launch Laundry, we offer more than just machines. We provide a complete ecosystem of services to ensure your success:",
        cards: [
          SERVICES.consultancy,
          {
            title: "Self-Service Laundromat Setup",
            icon: "/images/icons/service-research.svg",
            href: "/services/self-service-laundromat-setup",
          },
          {
            title: "Financial Advisory for Laundry Startups",
            icon: "/images/icons/service-revenue.svg",
            href: "/services/finance-advisory-for-laundry-startups",
          },
          {
            title: "Revenue Generation and Scale-Up Strategies",
            icon: "/images/icons/service-branding.svg",
            href: "/services/revenue-generation-and-scale-up-for-laundromats",
          },
          {
            title: "Branding and Marketing Support",
            icon: "/images/icons/service-selfservice.svg",
            href: "/services/business-promotion-and-branding-for-laundromat",
          },
          {
            title: "Research and Planning Services",
            icon: "/images/icons/service-planning.png",
            href: "/services/research-planning-for-laundry-businesses",
          },
        ],
      },
      {
        type: "highlight",
        badge: "Choose WALES",
        title: "Why Choose WALES?",
        paragraphs: [
          "The WALES Series Laundry Equipment is trusted by businesses worldwide for its unmatched performance and reliability. By combining innovative engineering with practical design, WALES machines help you:",
        ],
        checkList: [
          "Deliver superior laundry services at scale.",
          "Build a reputation for quality and efficiency.",
          "Grow your business with sustainable, future-ready solutions.",
        ],
        image: "/images/products/wales-why-choose.jpg",
        imageAlt: "Laundry business owner in a self-service laundromat",
        framed: true,
      },
      {
        type: "highlight",
        badge: "Laundry Business Journey",
        title: "Start Your Laundry Business Journey Today",
        paragraphs: [
          "Investing in WALES machines means investing in long-term success. Whether you are opening a new laundromat, upgrading an existing facility, or planning a large-scale operation, our expert team will guide you every step of the way.",
        ],
        image: "/images/products/laundry-business-owner.webp",
        imageAlt: "Business consultancy for laundromat investors",
        framed: true,
        button: { label: "Contact us today", href: "/contact-us" },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "w060f-w2110f-industrial-laundry-machines": {
    name: "W060F & W2110F Industrial Laundry Machines",
    meta: {
      title: "W060F & W2110F Industrial Laundry Machines",
      description:
        "Discover W060F and W2110F industrial laundry machines with high efficiency, durability, and advanced features for commercial laundromats.",
    },
    image: "/images/products/w060f-w2110f.png",
    sections: [
      {
        type: "intro",
        badge: "Introduction",
        title: "Next-Level Laundry Performance for Growing Businesses",
        image: "/images/products/w060f-w2110f.png",
        imageAlt: "W060F and W2110F industrial laundry machines",
        paragraphs: [
          "The W060F and W2110F Industrial Laundry Machines are designed for businesses that demand efficiency, durability, and advanced technology. Perfect for laundromats, hotels, hospitals, and industrial facilities, these machines combine powerful cleaning performance with energy-saving features to deliver outstanding results.",
          "Whether you are launching a new laundry business or upgrading your current equipment, these models ensure reliability, speed, and cost-effectiveness.",
        ],
      },
      {
        type: "cards",
        badge: "Features",
        title: "Key Features",
        cards: [
          {
            icon: "/images/icons/benefit-1.svg",
            title: "Heavy-Duty Construction:",
            description:
              "Built with premium stainless steel for long-lasting durability and corrosion resistance.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "High-Efficiency Operation:",
            description: "Reduced water, detergent, and energy consumption to lower operational costs.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "User-Friendly Controls:",
            description: "Simple, intuitive interface for easy staff training and smooth daily operation.",
          },
          {
            icon: "/images/icons/benefit-4.svg",
            title: "Advanced Safety Systems:",
            description: "Multiple safety mechanisms to protect fabrics and operators.",
          },
          {
            icon: "/images/icons/benefit-3.svg",
            title: "Customizable Programs:",
            description:
              "Pre-set and adjustable washing programs for different fabrics and cleaning needs.",
          },
          {
            icon: "/images/icons/benefit-1.svg",
            title: "High-Speed Performance:",
            description: "Faster wash cycles for increased productivity and turnaround time.",
          },
          {
            icon: "/images/icons/benefit-2.svg",
            title: "Quiet and Stable Operation:",
            description: "Minimal vibration and noise for a comfortable working environment.",
          },
        ],
      },
      {
        type: "highlight",
        badge: "Machines Stand Out",
        title: "Why These Machines Stand Out",
        paragraphs: [
          "The W060F and W2110F models are specifically engineered to handle heavy workloads while maintaining consistent performance. With modern design and innovative technology, they are ideal for:",
        ],
        checkList: [
          "Laundromats looking to improve customer satisfaction with faster, higher-quality services.",
          "Hotels and resorts that require premium linen care.",
          "Hospitals and medical facilities where hygiene and reliability are top priorities.",
          "Commercial laundry plants managing large-scale operations.",
        ],
        image: "/images/products/laundry-machine-feature.png",
        imageAlt: "Laundry machine feature",
        framed: true,
      },
      {
        type: "serviceLinks",
        badge: "Complete Business Solutions",
        title: "At Launch Laundry, we don’t just provide machines.",
        cards: [
          {
            title: "Laundromat Business Consultancy",
            icon: "/images/icons/service-consultancy.svg",
            href: "/services/business-consultancy-for-laundromat-investors",
          },
          {
            title: "Self-Service Laundromat Setup",
            icon: "/images/icons/service-research.svg",
            href: "/services/self-service-laundromat-setup",
          },
          {
            title: "Financial Planning and Advisory",
            icon: "/images/icons/service-revenue.svg",
            href: "/services/finance-advisory-for-laundry-startups",
          },
          {
            title: "Revenue Generation Strategies",
            icon: "/images/icons/service-branding.svg",
            href: "/services/revenue-generation-and-scale-up-for-laundromats",
          },
          {
            title: "Research and Planning",
            icon: "/images/icons/service-selfservice.svg",
            href: "/services/research-planning-for-laundry-businesses",
          },
          {
            title: "Branding and Marketing Support",
            icon: "/images/icons/service-planning.png",
            href: "/services/business-promotion-and-branding-for-laundromat",
          },
        ],
      },
      {
        type: "table",
        heading: "Specifications Overview",
        columns: ["Feature", "W060F", "W2110F"],
        rows: [
          ["Build Material", "Stainless Steel", "Stainless Steel"],
          ["Control System", "Digital Interface", "Digital Interface"],
          ["Safety Features", "Emergency stop, Auto-locking door", "Emergency stop, Auto-locking door"],
          ["Application", "Hotels, Hospitals, Laundromats", "Hotels, Hospitals, Laundromats"],
          ["Efficiency", "High water and energy savings", "High water and energy savings"],
        ],
      },
      {
        type: "highlight",
        badge: "Laundry Business Journey",
        title: "Take Your Laundry Business to the Next Level",
        paragraphs: [
          "Investing in the W060F and W2110F Industrial Laundry Machines means investing in your business's growth and reputation. These machines are built to provide top-quality performance, reduce costs, and keep your operations running smoothly.",
        ],
        features: [
          {
            icon: "/images/icons/series-machine.svg",
            title: "W Series Industrial Washing Machines:",
            description: "High-capacity washers designed for deep cleaning and efficient fabric care.",
          },
          {
            icon: "/images/icons/series-machine.svg",
            title: "GZ Series Industrial Dryers:",
            description:
              "Advanced dryers that deliver quick, even drying while saving energy — supported by a trusted Alliance Laundry Parts supplier to ensure lasting performance and easy maintenance.",
          },
        ],
        counter: { value: "500+", label: "Successful Store Launches" },
        button: {
          label: "Contact our experts",
          href: "/services/business-consultancy-for-laundromat-investors",
        },
      },
    ],
  },
};
