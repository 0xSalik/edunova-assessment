# EduNova Internship Assessment App

Welcome to the EduNova Internship Assessment App! This project demonstrates a robust and efficient Next.js application designed for seamless team management.

## 🚀 Key Features

- **Dynamic Dashboard**: Welcomes users with a personalized experience.
- **Comprehensive People Directory**: Full-featured directory with advanced table functionalities.
- **Enhanced Table Interactions**: Implemented using Tanstack Table for sorting, filtering, and pagination.
- **Responsive Design**: Tailored for all devices using Tailwind CSS.
- **Form Validation**: Managed with React Hook Form and Zod for a reliable user input experience.
- **High Performance**: Built on Bun for faster runtime and package management.
- **Stateful URLs**: Reflects table states in URLs for a shareable and consistent user experience.

## 🛠️ Technologies Used

- **Next.js 14.2.5** (App Router)
- **Tanstack Table** for advanced table management
- **React Hook Form** for form handling
- **Zod** for schema validation
- **Tailwind CSS** for responsive design
- **PocketBase** for data storage and backend services
- **Bun** for enhanced performance

## 🏗️ Architecture Overview

### API and Data Storage

In this project, I opted for PocketBase, a lightweight, self-hosted backend, as the primary data store. PocketBase offers a flexible, scalable, and efficient solution for managing data, aligning with the project's need for real-time updates and relational data handling without the overhead of a more complex database system.

### Performance Optimization with Bun

Bun was selected as the JavaScript runtime and package manager due to its superior speed and efficiency. This choice significantly improves build times and overall performance, enhancing the development experience and application responsiveness.

## 🌟 Unique Aspects

1. **URL State Reflection**: Search, filter, sorting, and pagination states are reflected in the URL, ensuring a consistent and shareable experience.
2. **Advanced Sorting and Filtering**: Tanstack Table provides sophisticated sorting and filtering, with state persistence across page reloads via URL parameters.
3. **Global Search Functionality**: Instantly filters the directory with substring matching across all fields, with results reflected in the URL.
4. **Optimized Performance**: Leveraging PocketBase and Bun, the app delivers high-speed performance without compromising functionality.
5. **Responsive UI**: Tailwind CSS ensures the application is visually appealing and fully responsive across all devices.

## 🚀 Getting Started

1. **Clone the Repository**: `git clone https://github.com/0xSalik/edunova-assessment`
2. **Install Dependencies**: `bun install`
3. **Run the Development Server**: `bun run dev`
4. **Open in Browser**: [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

The EduNova Internship Assessment App embodies a minimalist yet powerful design approach. The clean and intuitive UI, powered by Tailwind CSS, is both aesthetically pleasing and functionally rich. This focus on user experience ensures that the app is as efficient as it is effective.

## 🔗 State Management and URL Synchronization

A standout feature of this application is its advanced state management system, synchronized with the URL. This design:

- Enables shareable and bookmarkable table configurations
- Enhances user navigation and experience
- Maintains state across sessions and page reloads
- Demonstrates advanced proficiency in React hooks and Next.js routing

This project exemplifies modern web development best practices, showcasing the ability to create efficient, user-friendly, and scalable applications using the latest technologies.
