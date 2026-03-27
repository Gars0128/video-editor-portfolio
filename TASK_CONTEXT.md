# Video Editor Portfolio - Full Task Context

Build a modern, premium-looking, one-page portfolio website for a video editor using Next.js (latest stable version with App Router), TypeScript, and Tailwind CSS. The site must be designed to deploy easily on Vercel.

The goal is to create a visually impressive, smooth, stylish, cinematic landing page that feels expensive and modern, but the codebase should stay clean, maintainable, and simple enough for further customization.

## General requirements

- Use Next.js App Router
- Use TypeScript
- Use Tailwind CSS
- Use Framer Motion for animations
- Use Lucide React for icons where needed
- Structure the code cleanly with reusable components
- Make the site fully responsive
- Use a dark premium visual style by default
- Optimize layout and assets for performance
- Keep everything in a single-page layout
- Make the project ready for Vercel deployment
- Add clear placeholder content and comments showing where to replace text, images, and videos

## Design direction

Create a cinematic, modern, visually rich portfolio for a freelance or professional video editor. The aesthetic should feel like a mix of a creative agency site, luxury personal brand, and modern motion design showcase.

The visual style should include:

- dark background with subtle gradients
- large bold typography
- elegant spacing
- premium glassmorphism or soft translucent panels where appropriate
- cinematic image overlays
- smooth hover effects
- parallax scrolling for selected images/sections
- reveal-on-scroll animations
- subtle motion backgrounds or animated gradient accents
- polished transitions between sections
- tasteful glow, blur, and depth effects
- modern button interactions
- stylish cards for projects/services
- section dividers that feel intentional and premium

Do not make it look generic, corporate, or like a template. It should feel creative and portfolio-driven.

## Main sections to include

1. Hero section
2. About section
3. Services section
4. Featured work / portfolio section
5. Video showcase section
6. Testimonials section
7. Call to action / contact section
8. Footer

## Detailed section requirements

### 1. Hero section

- Full-screen first section
- Strong headline for a video editor, e.g. "Cinematic edits that make brands impossible to ignore"
- Supporting subtitle text
- Two CTA buttons:
  - View Work
  - Contact Me
- Background should feel dynamic and immersive
- Include layered visual elements with subtle motion/parallax
- Add reveal animation when the page loads
- Include a designated area for a hero reel preview, mock video frame, or featured visual
- Make the hero instantly impressive

### 2. About section

- Short introduction about the editor
- Emphasize storytelling, pacing, rhythm, social content, commercials, brand films, music videos, etc.
- Add animated stat counters or metric blocks such as:
  - Years of experience
  - Projects delivered
  - Client satisfaction
- Include an image block with parallax effect
- Use a clean two-column layout on desktop

### 3. Services section

- Show 3 to 6 service cards
- Example services:
  - Short-form content editing
  - Commercial video editing
  - YouTube editing
  - Music videos
  - Color grading
  - Motion graphics
- Each card should have a refined hover effect
- Include subtle tilt, scale, border glow, or background movement on hover
- Make cards feel interactive and premium

### 4. Featured work / portfolio section

- Create a visually strong grid of project cards
- Each project card should include:
  - thumbnail image
  - project title
  - category
  - short description
- Hover interactions should feel polished and modern
- Overlay on hover with smooth motion
- Add tags such as:
  - Commercial
  - Reels
  - YouTube
  - Brand Film
  - Music Video
- This section should be easy to update later with real projects

### 5. Video showcase section

- Add a dedicated section for embedded videos or video placeholders
- Include at least 2 or 3 video blocks
- Since real videos may not be available yet, use elegant placeholders with clear comments indicating where to embed YouTube, Vimeo, or local video
- Each video card should have:
  - poster image / placeholder
  - play icon
  - title
  - short supporting text
- If possible, make the placeholder interaction animated on hover
- Keep the implementation simple and clean

### 6. Testimonials section

- Add 3 testimonial cards
- Include client name, role/company, and feedback text
- Use modern card styling
- Add subtle staggered reveal animation on scroll

### 7. Call to action / contact section

- Strong CTA encouraging people to book a project
- Include short text and one main button
- Add optional secondary links for email and Instagram
- Include clear placeholders for contact details

### 8. Footer

- Minimal but polished
- Include name/brand, navigation anchors, social placeholders, copyright

## Animation and interaction requirements

- Use Framer Motion for:
  - hero intro animation
  - section reveal on scroll
  - staggered children animations
  - hover transitions where useful
- Add parallax motion to selected images or visual blocks based on scroll position
- Add smooth hover states for buttons, cards, thumbnails, and links
- Make interactions feel premium, not excessive
- Keep animations smooth and tasteful
- Avoid clutter or over-animating every element

## Technical implementation requirements

- Build with App Router
- Use a clean component structure, for example:
  - app/page.tsx
  - components/Hero.tsx
  - components/About.tsx
  - components/Services.tsx
  - components/Portfolio.tsx
  - components/VideoShowcase.tsx
  - components/Testimonials.tsx
  - components/CTA.tsx
  - components/Footer.tsx
  - components/ui/SectionHeading.tsx
  - components/ui/AnimatedReveal.tsx
  - components/ui/ParallaxImage.tsx
- Add anchor navigation between sections
- Use semantic HTML
- Use optimized Next.js Image component where appropriate
- Include placeholder assets or remote placeholder image usage
- Add comments for places that should be customized later
- Keep dependencies minimal and sensible
- Make sure the project runs without broken imports

## Extra polish

- Add a sticky top navigation with blur background
- Add an active section feel when scrolling if easy to implement
- Add subtle background gradient or ambient blobs
- Add refined button styles
- Add a custom section heading style with eyebrow text + large heading + short paragraph
- Include a visually pleasing spacing rhythm throughout the page
- Make mobile version still feel premium, not like a collapsed desktop design

## Content style

Use realistic placeholder content for a professional video editor portfolio. Keep the tone confident, creative, and premium. Avoid cheesy or generic filler copy.

## Important constraints

- Keep this as a one-page site
- Do not add backend functionality
- Do not overcomplicate with CMS or database
- Do not add authentication
- Do not add unnecessary libraries
- Prioritize visual quality, clean architecture, and easy customization
- The final output should be production-style starter code, not a toy example

## Requested deliverables

1. Generate the full project code
2. Show the folder structure first
3. Then provide all files with their contents
4. Include installation commands
5. Include the exact commands to run locally
6. Include notes on how to deploy to Vercel
7. Include comments in the code showing where to replace images, videos, text, social links, and contact info
8. Make sure the final code is cohesive and runnable

Additional quality requirements:

- If any UI pattern is repeated, abstract it into reusable components
- Make the code readable and well organized
- Prefer maintainability over cleverness
- Use good naming throughout
- Avoid placeholders that look ugly; even temporary UI should look polished

Final emphasis: the hero section must be especially strong because first impression matters most for this kind of portfolio.
