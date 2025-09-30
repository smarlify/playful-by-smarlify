// Unified SEO Configuration Module
// This module centralizes all SEO-related content to ensure DRY principles
// and easy maintenance across all projects

export interface SEOConfig {
  // Basic Meta Information
  title: string;
  description: string;
  keywords: string[];
  author: string;
  creator: string;
  publisher: string;
  
  // URLs and Canonical
  url: string;
  canonical: string;
  siteName: string;
  
  // Social Media
  twitter: {
    site: string;
    creator: string;
  };
  
  // Images
  ogImage: string;
  twitterImage: string;
  
  // Verification
  googleVerification?: string;
  
  // Structured Data
  structuredData: {
    organization: any;
    website: any;
    breadcrumb?: any;
  };
}

// Base SEO configurations for each project
export const SEO_CONFIGS: Record<string, SEOConfig> = {
  playful: {
    title: "Playful by Smarlify - Ultimate Gaming Hub | Free Web Games",
    description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more. Play amazing games built with cutting-edge web technologies like Three.js, WebGL, and Unity 3D. Free browser games for all ages.",
    keywords: [
      "gaming hub", "web games", "browser games", "free games", "online games",
      "Traffic Run", "Crossy Road", "Space Shooter", "Three.js games", "WebGL games",
      "Unity 3D games", "Smarlify", "Playful", "interactive games", "arcade games",
      "mobile games", "desktop games", "game development", "web technologies",
      "JavaScript games", "HTML5 games", "canvas games", "game engine"
    ],
    author: "Smarlify",
    creator: "Smarlify",
    publisher: "Smarlify",
    url: "https://playful.smarlify.co",
    canonical: "https://playful.smarlify.co",
    siteName: "Playful by Smarlify",
    twitter: {
      site: "@smarlify",
      creator: "@smarlify"
    },
    ogImage: "/game-assets/crossy-road.png",
    twitterImage: "/game-assets/crossy-road.png",
    googleVerification: "your-google-verification-code",
    structuredData: {
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Smarlify",
        "url": "https://smarlify.co",
        "logo": "https://smarlify.co/smarlify-white.svg",
        "sameAs": [
          "https://github.com/smarlify",
          "https://twitter.com/smarlify"
        ]
      },
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Playful by Smarlify",
        "description": "Ultimate gaming hub with free web games",
        "url": "https://playful.smarlify.co",
        "publisher": {
          "@type": "Organization",
          "name": "Smarlify",
          "url": "https://smarlify.co"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://playful.smarlify.co?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    }
  },

  smarlify: {
    title: "Smarlify.co - Freedom Through Smart Living | Crypto & Lifestyle Investments",
    description: "Achieve freedom through smart living with strategic crypto & precious metals investments, healthy lifestyle choices, and cutting-edge technology solutions. Join 10K+ smart investors building wealth and wellness.",
    keywords: [
      "freedom through smart living", "crypto investment", "bitcoin investment", "ethereum investment",
      "gold investment", "silver investment", "precious metals", "financial freedom", "wealth building",
      "healthy lifestyle", "smart lifestyle", "technology solutions", "investment strategies",
      "portfolio management", "digital assets", "blockchain technology", "decentralized finance",
      "alternative investments", "wealth preservation", "financial independence", "smart money"
    ],
    author: "Smarlify.co",
    creator: "Smarlify",
    publisher: "Smarlify",
    url: "https://smarlify.co",
    canonical: "https://smarlify.co",
    siteName: "Smarlify.co",
    twitter: {
      site: "@smarlify",
      creator: "@smarlify"
    },
    ogImage: "/og-image.jpg",
    twitterImage: "/og-image.jpg",
    googleVerification: "your-google-verification-code",
    structuredData: {
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Smarlify",
        "url": "https://smarlify.co",
        "logo": "https://smarlify.co/smarlify-white.svg",
        "description": "Freedom through smart living - crypto investments, lifestyle, and technology",
        "sameAs": [
          "https://github.com/smarlify",
          "https://twitter.com/smarlify"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@smarlify.co"
        }
      },
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Smarlify.co",
        "description": "Freedom through smart living",
        "url": "https://smarlify.co",
        "publisher": {
          "@type": "Organization",
          "name": "Smarlify"
        }
      }
    }
  },

  davidnekovar: {
    title: "David Nekovar - Full-Stack Developer & Tech Entrepreneur | Portfolio",
    description: "Experienced full-stack developer specializing in React, Node.js, TypeScript, and modern web technologies. Building innovative solutions for startups and enterprises. View my portfolio and get in touch.",
    keywords: [
      "full-stack developer", "React developer", "Node.js developer", "TypeScript developer",
      "JavaScript developer", "web developer", "frontend developer", "backend developer",
      "software engineer", "tech entrepreneur", "portfolio", "freelance developer",
      "startup developer", "enterprise developer", "web technologies", "modern development",
      "responsive design", "API development", "database design", "cloud solutions"
    ],
    author: "David Nekovar",
    creator: "David Nekovar",
    publisher: "David Nekovar",
    url: "https://davidnekovar.cz",
    canonical: "https://davidnekovar.cz",
    siteName: "David Nekovar",
    twitter: {
      site: "@davidnekovar",
      creator: "@davidnekovar"
    },
    ogImage: "/og-image.jpg",
    twitterImage: "/og-image.jpg",
    googleVerification: "your-google-verification-code",
    structuredData: {
      organization: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "David Nekovar",
        "url": "https://davidnekovar.cz",
        "jobTitle": "Full-Stack Developer & Tech Entrepreneur",
        "description": "Experienced full-stack developer specializing in modern web technologies",
        "sameAs": [
          "https://github.com/davidnekovarcz",
          "https://linkedin.com/in/davidnekovar",
          "https://twitter.com/davidnekovar"
        ],
        "knowsAbout": [
          "React", "Node.js", "TypeScript", "JavaScript", "Web Development",
          "Full-Stack Development", "Software Engineering", "Tech Entrepreneurship"
        ]
      },
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "David Nekovar Portfolio",
        "description": "Full-stack developer portfolio and services",
        "url": "https://davidnekovar.cz",
        "author": {
          "@type": "Person",
          "name": "David Nekovar"
        }
      }
    }
  }
};

// AI-Friendly Content Generator
export class AIContentGenerator {
  static generateGameDescription(gameName: string, technologies: string[]): string {
    return `Play ${gameName} - an exciting ${technologies.join(', ')} game. Experience immersive gameplay with stunning graphics and smooth controls. Perfect for casual gaming and entertainment.`;
  }

  static generateServiceDescription(service: string, benefits: string[]): string {
    return `Professional ${service} services designed to ${benefits.join(', ')}. Expert solutions tailored to your needs with cutting-edge technology and proven methodologies.`;
  }

  static generateProjectDescription(project: string, techStack: string[], features: string[]): string {
    return `${project} - A ${techStack.join(', ')} project featuring ${features.join(', ')}. Built with modern web technologies and best practices for optimal performance and user experience.`;
  }
}

// SEO Helper Functions
export class SEOHelpers {
  static generateMetaTags(config: SEOConfig, additionalTags: Record<string, string> = {}) {
    return {
      title: config.title,
      description: config.description,
      keywords: config.keywords.join(', '),
      author: config.author,
      creator: config.creator,
      publisher: config.publisher,
      'og:title': config.title,
      'og:description': config.description,
      'og:type': 'website',
      'og:url': config.url,
      'og:image': config.ogImage,
      'og:site_name': config.siteName,
      'twitter:card': 'summary_large_image',
      'twitter:site': config.twitter.site,
      'twitter:creator': config.twitter.creator,
      'twitter:title': config.title,
      'twitter:description': config.description,
      'twitter:image': config.twitterImage,
      'canonical': config.canonical,
      'robots': 'index, follow',
      'googlebot': 'index, follow',
      ...additionalTags
    };
  }

  static generateStructuredData(config: SEOConfig, additionalData: any[] = []) {
    return [
      config.structuredData.organization,
      config.structuredData.website,
      ...additionalData
    ];
  }

  static generateSitemapUrls(config: SEOConfig, additionalUrls: string[] = []) {
    return [
      {
        url: config.url,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 1
      },
      ...additionalUrls.map(url => ({
        url: `${config.url}${url}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8
      }))
    ];
  }
}

// Export default configurations
export const PLAYFUL_SEO = SEO_CONFIGS.playful;
export const SMARLIFY_SEO = SEO_CONFIGS.smarlify;
export const DAVID_SEO = SEO_CONFIGS.davidnekovar;
