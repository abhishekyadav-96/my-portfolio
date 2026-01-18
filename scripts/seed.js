require('ts-node/register');
const mongoose = require('mongoose');
const Project = require('../src/models/Project.ts').default;
const Service = require('../src/models/Service.ts').default;
const Tech = require('../src/models/Tech.ts').default;
require('dotenv').config({ path: './.env.local' });

const projects = [
  {
    title: "AI Companion",
    description: "Now fully MERN-based with persistent conversation memory. Built with OpenAI and advanced state management.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    tags: ["MongoDB", "Express", "React", "Node.js", "OpenAI"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AI SaaS Platform",
    description: "Integrated with Stripe and MongoDB for a complete full-stack solution. Featuring multi-tenant architecture and AI-driven insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Corporate Website Ecosystem",
    description: "High-performance, SEO-optimized corporate website built with the MERN stack. Features dynamic content management, lead generation, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "E-commerce Search",
    description: "Uses vector databases and MERN to deliver lightning-fast semantic search results, enhancing user discovery and sales conversion.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    tags: ["MongoDB", "Express", "React", "Node.js", "Vector DB"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

const services = [
  {
    title: "Full-Stack Web Development",
    description: "End-to-end web applications built with the MERN stack, focusing on scalability and performance.",
    icon: "Globe",
  },
  {
    title: "Custom API Development",
    description: "Robust and secure RESTful & GraphQL APIs built with Node.js and Express to power your applications.",
    icon: "Code2",
  },
  {
    title: "Performance Optimization",
    description: "Optimizing your web applications for lightning-fast load times and smooth user experiences.",
    icon: "Zap",
  },
  {
    title: "Database Architecture",
    description: "Designing efficient data models and managing high-availability databases with MongoDB and PostgreSQL.",
    icon: "Cpu",
  },
  {
    title: "Security & Authentication",
    description: "Implementing advanced security protocols and multi-factor authentication systems for data protection.",
    icon: "ShieldCheck",
  },
  {
    title: "Mobile-First Design",
    description: "Creating responsive and intuitive user interfaces that work perfectly across all devices and screen sizes.",
    icon: "Smartphone",
  }
];

const techStack = [
  {
    title: "Frontend",
    description: "Building responsive, interactive, and high-performance user interfaces.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
    icon: "Layout",
    color: "blue"
  },
  {
    title: "Backend",
    description: "Developing robust, scalable server-side logic and efficient RESTful APIs.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Socket.io", "JWT Auth", "REST APIs"],
    icon: "Server",
    color: "indigo"
  },
  {
    title: "Database",
    description: "Designing and managing high-availability data storage and retrieval systems.",
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Redis", "Firebase"],
    icon: "Database",
    color: "emerald"
  },
  {
    title: "Tools & DevOps",
    description: "Streamlining development workflows and ensuring reliable deployment.",
    skills: ["Git", "Docker", "AWS", "Vercel", "Jest", "CI/CD"],
    icon: "Wrench",
    color: "amber"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Tech.deleteMany({});
    
    // Insert new data
    await Project.insertMany(projects);
    await Service.insertMany(services);
    await Tech.insertMany(techStack);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
