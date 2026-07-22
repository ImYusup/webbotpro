// src/data/products.ts
export type ProductVariant = {
  id: string;
  color: string;
  colorCode?: string;
  images: string[];
  videoUrl?: string;
  price?: number;
};

export type Product = {
  id: string;
  name: string;
  category?: string;
  price: number;
  discountPrice?: number;
  currency: string;
  description: string;
  images: string[];
  videoUrl?: string;
  weight?: number; 
  variants?: ProductVariant[];
  features?: string[];
  benefits?: string[];
  targetUsers?: string[];
  notes?: string;
};

export const products: Product[] = [
    {
        id: "cashflow-bot",
        name: "WhatsApp Bot Cashflow Automation",
        category: "Automation",
        price: 700000,
        discountPrice: 500000,
        currency: "IDR",
        description: "Automatic cashflow reporting via WhatsApp. Receive daily summaries and real-time alerts for better financial control.",
        features: [
            "Automatic daily, weekly, and monthly summaries",
            "Real-time cashflow notifications: surplus and deficit",
            "Easy to use — just send a message to the WhatsApp Bot",
        ],
        benefits: [
            "Save time with automatic financial reports",
            "Immediately detect cash leaks",
            "Make faster, data-driven business decisions",
        ],
        targetUsers: [
            "SMEs that need better cashflow control",
            "Business owners who want instant reports on WhatsApp",
            "Entrepreneurs scaling up and needing smart financial monitoring",
        ],
        notes: "Pre-order service. Requires 70% DP. Delivery takes approximately 3-5 business days after payment.",
        images: [
            "/images/whatsapp/cashflow-jualan.png",
            "/images/whatsapp/cashflow-jualan1.jpeg",
            "/images/whatsapp/cashflow-jualan2.jpeg",
            "/images/whatsapp/cashflow-jualan3.jpeg",
            "/images/whatsapp/cashflow-jualan4.jpeg",
            "/images/whatsapp/cashflow-jualan5.jpeg",
        ],
        videoUrl: "https://drive.google.com/file/d/1VVdGTkRf_YgwpnPCTG5eAlvKJz8aP8V9/preview",
    },
    {
        id: "sales-bot",
        name: "WhatsApp Bot Sales Automation",
        category: "Automation",
        price: 1000000,
        discountPrice: 800000,
        currency: "IDR",
        description: "WhatsApp bot for sales automation, catalog, and order notifications. Makes selling easier and faster.",
        features: [
            "Automatic product catalog via WhatsApp",
            "Instant order notifications to admin",
            "Auto-reply for product inquiries",
            "Integration with your payment system",
        ],
        benefits: [
            "Save time replying to customer chats",
            "Increase sales conversion rate",
            "Provide instant responses for better customer experience",
            "No technical skills needed",
        ],
        targetUsers: [
            "Online shops that want fast customer response",
            "SMEs selling via WhatsApp",
            "Businesses needing automatic order systems",
            "Dropshippers and resellers looking for efficiency",
        ],
        notes: "This is a pre-order service. Minimum 70% DP is required. After payment, work will begin and usually takes 3-5 business days to complete.",
        images: [
            "/images/whatsapp/wa-jualan.png",
            "/images/whatsapp/wa-jualan1.jpeg",
            "/images/whatsapp/wa-jualan2.jpeg",
            "/images/whatsapp/wa-jualan3.jpeg",
            "/images/whatsapp/wa-jualan4.jpeg",
        ],
        videoUrl: "https://drive.google.com/file/d/1Qf2VzUr_BUsGWgLlu5f3F3wscX0ZoaSC/preview",
    },
    {
        id: "company-profile-website",
        name: "Company Profile Website",
        category: "Websites",
        price: 4000000,
        discountPrice: 3000000,
        currency: "IDR",
        description: "Professional and simple website for SMEs and company profiles. Perfect for building credibility and showcasing your business online.",
        features: [
            "Modern & responsive design",
            "Easy to manage without coding",
            "Basic SEO to appear on Google",
            "About, Services, Contact, and other pages",
        ],
        benefits: [
            "Builds business credibility",
            "Professional appearance to customers",
            "Accessible 24/7 from anywhere",
            "Perfect for SMEs going digital",
        ],
        targetUsers: [
            "SMEs needing a quick company profile website",
            "Startups wanting a professional landing page",
            "Local businesses that want to appear online",
        ],
        notes: "This is a pre-order service. Minimum 70% DP is required. After payment, work will begin and usually takes 3-5 business days to complete.",
        images: [
            "/images/website/wb-webbotpro.png",
            "/images/website/wb-webbotpro1.jpg",
            "/images/website/wb-webbotpro2.jpg",
            "/images/website/wb-webbotpro3.jpg",
            "/images/website/wb-webbotpro4.jpg",
        ],
        videoUrl: "https://drive.google.com/file/d/10qTOrzS0lAFNmHcc85bGcsSXGMqptIii/preview",
    },
    {
        id: "ecommerce-website",
        name: "E-Commerce Website",
        category: "Websites",
        price: 7000000,
        discountPrice: 5000000,
        currency: "IDR",
        description: "Complete online store website with payment gateway and Instagram Shop integration. Perfect for selling products online with ease.",
        features: [
            "Modern & mobile-friendly design",
            "Payment gateway integration",
            "Product & stock management",
            "Instagram Shop integration",
            "Discount & voucher features",
            "Automatic sales reports",
        ],
        benefits: [
            "Makes shopping easy for customers 24/7",
            "Builds trust and professionalism",
            "Automates sales & payments",
            "Easy product management without coding",
        ],
        targetUsers: [
            "SMEs wanting their own online store",
            "Businesses selling on Instagram/TikTok who want an official website",
            "Startups and local brands needing integrated e-commerce",
        ],
        notes: "This is a pre-order service. Minimum 70% down payment (DP) is required. After payment is received, our team will contact you to collect product data, logo, and integration requirements. The project usually takes 3-5 business days to complete.",
        images: [
            "/images/website/bg-webbotpro.png",
            "/images/website/bg-webbotpro1.jpg",
            "/images/website/bg-webbotpro2.jpg",
            "/images/website/bg-webbotpro3.jpg",
            "/images/website/bg-webbotpro4.jpg",
            "/images/website/bg-webbotpro5.jpg",
        ],
        videoUrl: "https://drive.google.com/file/d/1rThsHOEJlCe4SAQbW2U242Urq8lT9pSA/preview",
    },
    {
        id: "business-website",
        name: "Business Website (SMB)",
        category: "Websites",
        price: 10000000,
        discountPrice: 8000000,
        currency: "IDR",
        description: "Premium modern business website with full online payment system. Professional design perfect for company profiles, brands, and growing SMEs.",
        features: [
            "Modern responsive website (desktop & mobile)",
            "Payment gateway integration",
            "Domain + hosting included and activated immediately",
            "Suitable for company profiles, small shops, and UMKM brands",
            "Professional SEO setup for better Google visibility",
        ],
        benefits: [
            "Makes your business look more professional and trustworthy",
            "Builds stronger customer confidence",
            "Easier to be found on Google",
            "Perfect for SMEs, personal branding, and startups ready to scale",
        ],
        targetUsers: [
            "SMEs needing a strong digital identity",
            "Small and medium enterprises looking to grow",
            "Personal branding & freelancers",
            "Startups wanting a professional online presence",
        ],
        notes: "This is a pre-order service. Minimum 70% DP is required. After payment, work will begin and usually takes 3-5 business days to complete.",
        images: [
            "/images/website/smb-webbotpro.png",
            "/images/website/smb-webbotpro1.jpeg",
            "/images/website/smb-webbotpro2.jpeg",
            "/images/website/smb-webbotpro3.jpeg",
            "/images/website/smb-webbotpro4.jpeg",
            "/images/website/smb-webbotpro5.jpeg",
            "/images/website/smb-webbotpro6.jpeg",
        ],
        videoUrl: "https://drive.google.com/file/d/1R5hFxl36tW65e2FDfIPi3Et3INkrtGpq/preview",
    },
    {
        id: "powerbi-dashboard",
        name: "Power BI Dashboard & BI Solutions",
        category: "Business Intelligence",
        price: 4000000,
        discountPrice: 3000000,
        currency: "IDR",
        description: "Interactive dashboard for data analysis, business reporting, and decision support. Turn your data into actionable insights.",
        features: [
            "Interactive dashboard with filters & drill-down",
            "Integration with Google Sheets, Excel, or database",
            "Real-time automatic reports",
            "Easy-to-understand data visualization",
            "Accessible via web & mobile",
        ],
        benefits: [
            "Faster business decision making",
            "Easier KPI monitoring",
            "Reduces human error in manual reports",
            "Makes data more transparent and structured",
        ],
        targetUsers: [
            "Business owners who need interactive reports",
            "Management teams that want up-to-date KPIs",
            "Companies using Google Sheets/Excel but want better data visualization",
            "Startups adopting data-driven decision making",
        ],
        notes: "This is a pre-order service. Minimum 70% DP is required. After payment, work will begin and usually takes 3-5 business days to complete.",
        images: [
            "/images/powerbi/powerbi1.png",
            "/images/powerbi/powerbi2.png",
            "/images/powerbi/powerbi3.png",
        ],
        videoUrl: "https://drive.google.com/file/d/1Jrsprlu-2eFY-4o0x57vqdK_QplVbioU/preview",
    },
];