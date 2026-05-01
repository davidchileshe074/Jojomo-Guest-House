const siteData = {
    hero: {
        typingWords: ["Affordable Prices", "Comfortable Stays", "Secure Environments"],
        subtitle: "Enjoy quality accommodation in Lusaka & Luanshya from as low as K100 per night.",
        slides: [
            { image: "Assets/WhatsApp Image 2026-04-30 at 6.35.45 AM.jpeg" },
            { image: "Assets/486689704_3766031526955062_3460116964594563288_n.jpg" },
            { image: "Assets/486712946_3766031803621701_7454112705606970243_n.jpg" }
        ]
    },
    about: {
        title: "About Jojomo Guest House",
        description: "Jojomo Guest House provides clean, secure, and affordable accommodation for travelers, couples, and short stays. With multiple locations in Lusaka and Luanshya, we offer convenient access, privacy, and comfort at budget-friendly rates.",
        features: [
            { icon: "fas fa-bed", text: "Clean Rooms" },
            { icon: "fas fa-shield-alt", text: "Secure Environment" },
            { icon: "fas fa-wallet", text: "Budget Friendly" }
        ],
        image: "Assets/637855726_1325939532885473_5807754582562937742_n.jpg"
    },
    locations: [
        {
            name: "Lusaka – Chalala",
            image: "Assets/484230374_1050453150434114_8536135058058539716_n.jpg",
            details: [
                "House No. 6, Jumbe Street, Chalala",
                "Near Arthur Wina Primary School & Titanic Car Wash"
            ],
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.8856984814144!2d28.330!3d-15.460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDI3JzM2LjAiUyAyOMKwMTknNDguMCJF!5e0!3m2!1sen!2szm!4v1714450000000!5m2!1sen!2szm"
        },
        {
            name: "Luanshya",
            image: "Assets/484512757_1050201010459328_6837487442794168598_n.jpg",
            details: [
                "Plot 3357, Gardenia Avenue",
                "Also in Mikomfwa Area"
            ],
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.6!2d28.4!3d-13.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA2JzAwLjAiUyAyOMKwMjQnMDAuMCJF!5e0!3m2!1sen!2szm!4v1714450000000!5m2!1sen!2szm"
        }
    ],
    rooms: [
        {
            name: "Basic Room",
            price: "K100",
            description: "A cozy, well-maintained room perfect for short stays. Includes a comfortable bed, clean linen, and access to shared bathroom facilities.",
            image: "Assets/487144295_3766031806955034_7449162317980840962_n.jpg",
            badge: "Promotion",
            popular: false
        },
        {
            name: "Standard Room",
            price: "K150",
            description: "Our standard room offers a private bathroom, queen bed, and a relaxing environment. Ideal for business travelers or couples.",
            image: "Assets/484551047_1049485833864179_693566512237221827_n.jpg",
            popular: false
        },
        {
            name: "Comfort Room",
            price: "K200",
            description: "Our most popular choice! Enjoy a spacious room with double bed, en-suite bathroom, and a peaceful ambiance. Great for extended stays.",
            image: "Assets/632847889_1321913946621365_5003853025565871320_n.jpg",
            badge: "Most Popular",
            popular: true
        },
        {
            name: "Executive Budget",
            price: "K250",
            description: "Step up in comfort with this executive room featuring a large workspace, double bed, and elegant decor at an unbeatable price.",
            image: "Assets/WhatsApp Image 2026-04-30 at 6.35.43 AM.jpeg",
            popular: false
        },
        {
            name: "Premium Room",
            price: "K350",
            description: "A premium experience with a luxury queen bed, private bathroom, air conditioning and superior room fittings for the discerning guest.",
            image: "Assets/WhatsApp Image 2026-04-30 at 6.35.44 AM.jpeg",
            popular: false
        },
        {
            name: "Deluxe Stay",
            price: "K450",
            description: "The pinnacle of Jojomo luxury. Spacious suite with king bed, sitting area, premium bathroom, and an unforgettable atmosphere.",
            image: "Assets/WhatsApp Image 2026-04-30 at 6.35.46 AM.jpeg",
            popular: false
        }
    ],
    gallery: [
        "Assets/495428023_1091523272993768_7221603711532678790_n.jpg",
        "Assets/room inside.jpeg",
        "Assets/one.jpeg",
        "Assets/four.jpeg",
        "Assets/490676823_1073140048165424_495401967181870059_n.jpg",
        "Assets/484758286_1051402213672541_2116387993672595153_n.jpg",
        "Assets/484349363_1050215787124517_5618860297068260933_n.jpg",
        "Assets/484512757_1050201010459328_6837487442794168598_n.jpg",
        "Assets/484551047_1049485833864179_693566512237221827_n.jpg",
        "Assets/632136322_1321907493288677_5182934168245206108_n.jpg",
        "Assets/WhatsApp Image 2026-04-30 at 6.35.43 AM.jpeg",
        "Assets/WhatsApp Image 2026-04-30 at 6.35.44 AM.jpeg"
    ],
    offers: [
        "Rooms on Promotion",
        "End of Year Sales",
        "Affordable Long Stay Options",
        "Outside Birthday Party Venue Available"
    ],
    services: [
        { icon: "fas fa-coffee", title: "English Breakfast", detail: "K100 per plate" },
        { icon: "fas fa-glass-cheers", title: "Outdoor Event Space", detail: "Birthdays & small gatherings" },
        { icon: "fas fa-lock", title: "Secure & Gated", detail: "Peace of mind during your stay" },
        { icon: "fas fa-clock", title: "24/7 Availability", detail: "We are always here for you" }
    ],
    faq: [
        {
            q: "What time is check-in and check-out?",
            a: "Our standard check-in time is 2:00 PM, and check-out is at 11:00 AM. If you require early check-in or late check-out, please let us know in advance and we will do our best to accommodate you."
        },
        {
            q: "Do you provide Wi-Fi and parking?",
            a: "Yes! We offer complimentary high-speed Wi-Fi in all rooms and secure, gated parking on the premises for all our guests."
        },
        {
            q: "Can I host a birthday party or small event?",
            a: "Absolutely. We have a dedicated outdoor event space perfect for birthdays and small gatherings. Please contact us directly for rates and availability."
        },
        {
            q: "Do you offer meals or breakfast?",
            a: "Yes, we offer a delicious English Breakfast for K100 per plate. You can request this when booking or upon arrival at the guest house."
        }
    ],
    testimonials: [
        {
            stars: 5,
            text: "Absolutely loved my stay at Jojomo! The rooms are spotless, the environment is quiet and secure. Great value for money in Lusaka. Will definitely come back!",
            author: "Thandiwe M.",
            location: "Lusaka, Zambia"
        },
        {
            stars: 5,
            text: "Best accommodation in Luanshya at this price! The staff are so friendly and the rooms are clean and comfortable. The English breakfast was delicious!",
            author: "Kelvin C.",
            location: "Luanshya, Zambia"
        },
        {
            stars: 4.5,
            text: "Very affordable and peaceful place to stay. I hosted my birthday party here and everything was perfect. The outdoor space is lovely. Highly recommend!",
            author: "Mutale B.",
            location: "Copperbelt, Zambia"
        }
    ],
    contact: {
        phone: "0966216259",
        whatsapp: "260966216259",
        facebook: "https://facebook.com"
    }
};

// Export for use in index.html and admin/index.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteData;
} else {
    window.siteData = siteData;
}
