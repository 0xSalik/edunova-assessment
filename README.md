# EduNova Internship Assessment App

Welcome to my EduNova Internship Assessment App! This project showcases a powerful and efficient Next.js application built for managing team members.

## 🚀 Features

- Dashboard with welcome message
- Fully featured People Directory page
- Advanced table functionality using Tanstack Table
- Responsive design with Tailwind CSS
- Form handling with react-hook-form and Zod validation
- Lightning-fast performance with Bun
- State reflection in URL for enhanced user experience

## 🛠️ Technologies Used

- Next.js 14.2.5 (App Router)
- Tanstack Table
- React Hook Form
- Zod
- Tailwind CSS
- Bun

## 🏗️ Architecture

This app is built with a focus on speed and simplicity. Here are some key architectural decisions:

### API and Data Storage

I opted for a lightweight approach, using simple JSON files for data population. While I initially considered MongoDB, I realized that for an assessment app, introducing models and setting up remote connections over the Vercel edge network would unnecessarily slow down the app.

### Bun for Enhanced Performance

I chose Bun as the JavaScript runtime and package manager for this project. Bun's superior speed compared to npm significantly improves build times and overall development experience.

## 🌟 Unique Aspects

1. **URL State Reflection**: The app reflects search, filter, sorting, and pagination states in the URL, enhancing user experience and enabling shareable table states.

2. **Advanced Sorting with Tanstack**: Implemented a sophisticated sorting system using Tanstack Table, with the sorting state reflected in URL parameters for persistence across page reloads.

3. **Global Search**: The search bar performs a substring match across all fields, instantly filtering the table and updating the URL.

4. **Optimized Performance**: By using JSON files and Bun, the app achieves impressive speed without sacrificing functionality.

5. **Responsive Design**: Tailwind CSS ensures a seamless experience across various device sizes.

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies with `bun install`
3. Run the development server with `bun run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Design Philosophy

This app embraces a minimalist yet powerful approach. The clean UI, coupled with advanced features, creates an experience that's both visually appealing and highly functional. The thoughtful use of Tailwind CSS ensures responsiveness across devices.

## 🔗 State Management and URL Synchronization

A standout feature of this app is its sophisticated state management system that synchronizes with the URL. This implementation:

- Enables shareable and bookmarkable table configurations
- Enhances navigation and user experience
- Maintains table state across page reloads
- Demonstrates a deep understanding of React hooks and Next.js routing

This feature showcases advanced front-end development skills and a user-centric approach to web application design.

---

This project goes beyond merely completing an assessment. It's a demonstration of best practices in Next.js development, state management, and user interface design. The implementation of Tanstack Table with URL-based state management particularly highlights the ability to create efficient, user-friendly, and scalable web applications.
