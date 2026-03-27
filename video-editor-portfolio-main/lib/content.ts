import {
  Clapperboard,
  Film,
  type LucideIcon,
  MessageSquareText,
  PlayCircle,
  Scissors,
  Sparkles
} from "lucide-react";

export const siteMeta = {
  brand: "Marta Vaitkevich",
  shortBrand: "MRTVLD",
  title: "Marta Vaitkevich | UGC Creator & Video Editor",
  description:
    "Marta Vaitkevich's portfolio for beauty, lifestyle, and ad-ready UGC video creation.",
  instagram: "https://www.instagram.com/mrtvld/",
  instagramHandle: "mrtvld",
  email: "martavaitkevich@gmail.com"
} as const;

export const navItems = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Contact", href: "#contact", id: "contact" }
] as const;

export const heroContent = {
  eyebrow: "UGC portfolio",
  title: "UGC portfolio for beauty, lifestyle, and fashion.",
  description:
    "Marta makes creator-led videos for TikTok, Instagram, and ads, handling the hook, filming, editing, and subtitles in one workflow.",
  primaryCta: { label: "Watch works", href: "#showcase" },
  secondaryCta: { label: "Start a project", href: "#contact" },
  quickFacts: [
    { label: "Focus", value: "Beauty, lifestyle, fashion" },
    { label: "Formats", value: "UGC ads, organic, short-form" },
    { label: "Languages", value: "EN / RU / PL" }
  ],
  pricingPreview: ["UGC videos from $40", "Hooks & scripts $25", "Editing from $60"],
  heroImage: "/marta/images/editorial-portrait.jpg",
  heroImageAlt: "Editorial portrait of Marta Vaitkevich for the hero section",
  heroVideo: {
    src: "/marta/videos/dr-althea.mp4",
    poster: "/marta/images/campaign-still.jpg",
    title: "Beauty UGC sample",
    description: "Skincare-focused edit with product texture, captions, and ad pacing."
  }
} as const;

export const aboutContent = {
  eyebrow: "About Marta",
  title: "Natural on camera, precise in the edit, and built for short-form attention spans.",
  description:
    "Marta works across creator content and post-production. She develops hooks, films natural-looking UGC, and edits for retention so the final piece feels authentic while still working for ads and social.",
  supportingText:
    "The approach is simple: strong opening seconds, clean frames, subtitles where they help, and a tone that fits beauty, fashion, skincare, and lifestyle brands without feeling over-produced.",
  cards: [
    {
      title: "Languages",
      value: "EN / RU / PL",
      description: "Flexible delivery for international briefs and creator-style communication."
    },
    {
      title: "Best for",
      value: "Beauty + lifestyle",
      description: "Skincare, body care, fashion looks, organic-feeling product videos, and ads."
    },
    {
      title: "Style",
      value: "Natural + polished",
      description: "Strong hooks, dynamic pacing, clean cuts, and captions that stay readable."
    }
  ],
  image: "/marta/images/secondhero.png",
  imageAlt: "Second portrait of Marta Vaitkevich for the about section"
} as const;

type ServiceItem = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

export const services: ServiceItem[] = [
  {
    title: "UGC video creation",
    description:
      "End-to-end UGC from concept to final export for TikTok, Instagram, and paid social.",
    detail: "Filming, editing, subtitles, and delivery shaped around native platform behavior.",
    icon: PlayCircle
  },
  {
    title: "Hook and script ideas",
    description:
      "Opening lines and lightweight scripting designed to catch attention fast and keep the story moving.",
    detail: "Best when the product is clear but the opening needs more structure.",
    icon: MessageSquareText
  },
  {
    title: "Short-form editing",
    description:
      "Clean, dynamic edits for Reels, TikTok, Shorts, and creator-led paid ads.",
    detail: "Focused on rhythm, retention, subtitle clarity, and a finish that still feels human.",
    icon: Scissors
  },
  {
    title: "YouTube and longer cuts",
    description:
      "Editing support for creator content that needs more breathing room than a 15-second ad.",
    detail: "Useful for vlogs, talking-head content, tutorials, and recap formats.",
    icon: Film
  },
  {
    title: "Beauty and product storytelling",
    description:
      "Soft, aesthetic framing for skincare, body care, fashion details, and lifestyle routines.",
    detail: "Built to make products feel desirable without losing the relatable creator tone.",
    icon: Sparkles
  },
  {
    title: "Ad-ready polish",
    description:
      "Versions optimized for performance: cleaner intros, stronger CTAs, and clear information hierarchy.",
    detail: "A good fit when organic-looking footage still needs paid-social discipline.",
    icon: Clapperboard
  }
];

export const pricingItems = [
  {
    title: "UGC Video Creation",
    price: "from $40",
    description: "Marta's core offer: full UGC creation from idea to final edit.",
    includes: [
      "Filming and delivery for TikTok, Instagram, or ads",
      "Editing and subtitle styling",
      "Natural creator tone with a clear, scroll-stopping structure"
    ]
  },
  {
    title: "Script & Hook Development",
    price: "$25",
    description: "Simple scripts and stronger opening beats for better engagement.",
    includes: [
      "Hook options tailored to the product or angle",
      "Light scripting that stays natural on camera",
      "Best before filming or when an existing idea needs sharper framing"
    ]
  },
  {
    title: "Video Editing",
    price: "from $60",
    description: "Editing for short-form videos and YouTube content.",
    includes: [
      "Dynamic pacing and clean cuts",
      "Caption support and structure for retention",
      "A polished final cut without losing creator authenticity"
    ]
  }
] as const;

export const portfolioItems = [
  {
    title: "Beauty-first UGC",
    category: "Skincare / ads / social",
    description:
      "Product-focused creator videos with clean captions, tactile details, and a natural beauty tone.",
    image: "/marta/posters/dr-althea-first-frame.png",
    tags: ["UGC", "Beauty", "Subtitles"]
  },
  {
    title: "Lifestyle positioning",
    category: "clothing brand / Creator Identity",
    description:
      "Casual but polished frames that help a founder, creator, or product feel closer to the audience.",
    image: "/marta/posters/skims-body-first-frame.png",
    tags: ["Lifestyle", "Creator", "Organic feel"]
  },
  {
    title: "Engaging Edits",
    category: "transitions / sound effects / storytelling",
    description:
      "Marta shapes the opening, pacing, and edit structure so the content keeps attention.",
    image: "/marta/posters/mrtvld-montage-first-frame.png",
    tags: ["Hooks", "Editing", "Retention"]
  }
] as const;

export const showcaseItems = [
  {
    title: "Skincare Ritual Cut",
    description: "A beauty-led clip with a natural tone, clear product focus, and ad-ready pacing.",
    src: "/marta/videos/dr-althea.mp4",
    poster: "/marta/posters/dr-althea-first-frame.png",
    label: "Beauty UGC"
  },
  {
    title: "Bodywear Mood Edit",
    description: "A fashion-led edit focused on movement, silhouette, and a polished finish.",
    src: "/marta/videos/skims-body.mp4",
    poster: "/marta/posters/skims-body-first-frame.png",
    label: "Fashion / lifestyle"
  },
  {
    title: "Editorial Motion Story",
    description: "An editorial cut that shows Marta's timing, cut choices, and overall rhythm.",
    src: "/marta/videos/mrtvld-montage.mp4",
    poster: "/marta/posters/mrtvld-montage-first-frame.png",
    label: "Editing sample"
  }
] as const;

export const processItems = [
  {
    step: "01",
    title: "Start with the hook",
    description:
      "The opening seconds are treated like strategy, not decoration. The message has to land fast."
  },
  {
    step: "02",
    title: "Keep it human on camera",
    description:
      "The delivery stays natural, relatable, and creator-native so the content does not feel over-scripted."
  },
  {
    step: "03",
    title: "Edit for retention",
    description:
      "Cuts, captions, and pacing are shaped to carry attention through the middle and into the CTA."
  }
] as const;
