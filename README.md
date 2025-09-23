Building a Modern Prayer Website: Plan and Implementation
Project Overview

We will create a modern, stylized, and intuitive prayer website that compiles various orações, salmos, and mantras (prayers, psalms, and mantras) into one platform. The site will have a visually appealing design with an animated background on the homepage to captivate users, where brief inspirational texts loop automatically. The layout will be fully responsive for mobile and desktop, ensuring a great user experience on any device. A navigation menu will provide easy access to categories (Orações, Salmos, Mantras), and clicking a category will show a list of prayers (with at least one example prayer like "Pai Nosso" as a template). We will implement an optional user sign-up (e.g. for a newsletter or updates) – not required for browsing, but available for users who want to receive updates. The site will also be monetized with ads, such as Google AdSense, to generate revenue based on traffic. In summary, we’ll build the site from start to finish – choosing the tech stack, setting up hosting, designing the frontend, connecting a database for content, adding the optional signup feature, and preparing it for deployment on Vercel with advertisements.

Tech Stack and Hosting

1. Framework and Language: We will use Next.js, which is a React-based web framework. Next.js allows building a full-stack application (both front-end UI and backend API routes) in one project. This choice is ideal because Next.js is the "native platform" for Vercel deployments
vercel.com
vercel.com
. With Next.js, we can server-side render pages for better SEO (important for a content site) and easily create a responsive React UI. React will let us create interactive components (like the menu and collapsibles) and handle dynamic behavior (such as looping text animation) in a maintainable way.

2. Styling: For a modern and beautiful design, we will use Tailwind CSS – a utility-first CSS framework. Tailwind will let us rapidly style the site with predefined classes (for spacing, colors, typography, etc.) while keeping the HTML clean. This results in a sleek design without writing a lot of custom CSS. In fact, Vercel’s own Next.js+MongoDB starter template uses Tailwind for styling
vercel.com
, showing it’s a popular choice for modern designs. Tailwind also makes it straightforward to ensure responsive design, since its utility classes can adapt layouts for different screen sizes (mobile, tablet, desktop) easily. As one guide notes, “creating a responsive and visually appealing navbar is an essential part of building a modern website”, and combining Next.js with Tailwind CSS simplifies that process
dev.to
. We’ll follow best practices for responsive design so that the site looks good on all devices (using flexible layouts and the meta viewport for mobile). The menu will collapse into a hamburger menu on small screens, etc., consistent with modern web standards
dev.to
.

3. Database: We choose MongoDB as our database, per your request. We can use a cloud MongoDB service like MongoDB Atlas (which has a free tier) to easily provision a database online. Each prayer (oração, salmo, or mantra) will be stored in the database, so we can easily add or modify prayers without changing the site’s code. We will likely use a single “prayers” collection in MongoDB, with a field indicating the type/category (oração, salmo, or mantra) for each entry. This way, we can query the prayers by category and display them. Additionally, for user sign-ups (newsletter registrations), we’ll use another collection (e.g. “subscribers”) to store user emails (and names, if collected). To interact with MongoDB in our Next.js app, we will use Mongoose, a popular ODM (Object Data Modeling) library for MongoDB. Mongoose simplifies defining schemas and working with MongoDB from Node.js. As one tutorial notes, “Mongoose provides an elegant solution for managing MongoDB connections and defining schemas for data models.”
dev.to
 Using Mongoose, we can define a Prayer schema (with fields like title, content, category) and a Subscriber schema (with fields like name, email), which helps keep our code clean and structured.

4. Hosting on Vercel: We will deploy the site to Vercel (vercel.com), which offers a generous free plan for hobby projects. Vercel is an ideal choice because it was created by the makers of Next.js and provides seamless integration. The Hobby plan on Vercel is “free forever” and perfect for personal projects
vercel.com
. This means we can host the site at no cost, with good performance (global CDN, serverless functions, etc. included). We just need to connect our project repository to Vercel, set environment variables (like the MongoDB connection string and any API keys), and Vercel will handle building and deploying the application automatically on each push. Vercel also supports custom domains and HTTPS out of the box on the free tier
vercel.com
, so we can later use a custom domain for the site if desired.

5. Monetization (Ads): For ads, we’ll integrate Google AdSense (or a similar ad network). This will involve inserting Google’s script and ad code into our pages. Next.js supports this – we can add the AdSense script to the <Head> of our pages (or a custom _document.js for a global inclusion) and then place AdSense ad units (via <ins> elements) in the layout where we want ads to appear. For example, we might put a banner ad in the homepage or between prayer content. We will also include an ads.txt file in the public/ folder of our project (required by AdSense to verify publisher ID). Setting up AdSense requires an account and creating ad units; once Google provides us with a publisher ID and ad slot IDs, we plug those into our site’s code. A developer who did this notes that after creating an Ad Unit in AdSense, “This will give you a code snippet to add into the Next JS app”
medium.com
, which includes your data-ad-client (publisher ID) and data-ad-slot. We will follow AdSense guidelines, adding the script with async attribute so it doesn’t block page loading
medium.com
. Monetization will thus be set up but keep in mind Google will need to approve the site and it may take some time before ads start showing and earning revenue
medium.com
.

6. Optional User Accounts: User login for content access is not required (all prayers are publicly accessible). However, we’ll implement an optional sign-up form for users who want to register their email for newsletters or updates. This will be a simple form (asking for name and email) that saves data to our MongoDB (in the subscribers collection). We are not implementing full authentication (no passwords or login required to use the site), since you specified sign-up is mainly for marketing. In the future, if you want to add authenticated features (like users saving favorite prayers or commenting), we could integrate an auth system (for example, NextAuth.js which supports OAuth logins
vercel.com
). But for now, a basic email capture form meets the requirement of optional registration without gating content.

Project Setup and Structure

We will organize the project for clean code and scalability. Below is the proposed project structure (following Next.js conventions and a clean separation of concerns):

prayer-website/
├── pages/               # Next.js Pages (each page is a route)
│   ├── index.js         # Homepage
│   ├── oracoes.js       # Page for "Orações" category listing prayers
│   ├── salmos.js        # Page for "Salmos" category
│   ├── mantras.js       # Page for "Mantras" category
│   ├── api/             # Next.js API routes for backend functionality
│   │   └── subscribe.js # API endpoint for newsletter sign-up form
│   └── _document.js     # Custom document to include global scripts (e.g. AdSense)
├── components/          # Reusable UI components
│   ├── Navbar.js        # Navigation bar component (header menu)
│   └── Footer.js        # (Optional) Footer component
├── lib/                 # Library utilities (e.g., database connection)
│   └── dbConnect.js     # Utility to connect to MongoDB (using Mongoose)
├── models/              # Mongoose models definitions
│   ├── Prayer.js        # Mongoose schema/model for prayers
│   └── Subscriber.js    # Mongoose model for subscribed users
├── public/              # Public assets (served directly)
│   ├── ads.txt          # Ads.txt file for AdSense
│   └── bg-animation.mp4 # (Optional) background video or image if used
├── styles/             
│   ├── globals.css      # Global CSS (Tailwind base import or any global styles)
│   └── ...              # Tailwind configuration files (if any)
├── .env.local           # Environment variables (MongoDB URI, etc.)
└── package.json         # Project dependencies and scripts


Explanation of Structure: This structure follows a clean code approach. The pages/ directory holds Next.js pages which automatically become routes. We have separate pages for each main section (home, orações, salmos, mantras) for clarity – later, we could refactor to a dynamic route if we want to reduce duplication, but distinct pages make it straightforward to manage different content. The components/ directory holds reusable pieces like the Navbar (to avoid repeating code in every page) and possibly a Footer. The lib/ directory contains utility code – here we have dbConnect.js to manage the database connection (making sure we don’t open new connections on every request, which is important in serverless environments
dev.to
). The models/ directory will have Mongoose schemas for our data models (Prayer and Subscriber), separating the data structure definitions from the route logic. Static files like images or the required ads.txt go into public/ so Next.js will serve them directly at your-site.com/ads.txt etc. We also include the environment config file for sensitive info that shouldn’t be committed to Git (like database credentials). This layout ensures maintainability – each concern (UI, data, utils) is in its own place, making future updates or scaling up (e.g., adding more models or pages) easier.

Initializing the Project: `npm run dev`
