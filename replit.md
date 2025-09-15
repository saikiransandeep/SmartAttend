# Smart Attendance Management System

## Overview

A comprehensive role-based attendance tracking system for educational institutions. The system enables faculty to mark attendance, provides real-time analytics, and offers customized dashboards for different user roles including students, faculty, class incharges, HODs, and principals. The application emphasizes efficiency in attendance marking with features like quick toggle interfaces, batch processing for lab sessions, and comprehensive reporting capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system following Material Design principles
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful API structure with /api prefix routing
- **Build Process**: ESBuild for production bundling

### Data Storage
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Connection pooling via @neondatabase/serverless with WebSocket support

### Role-Based Access Control
The system implements a hierarchical role structure:
- **Faculty**: Mark attendance, view subject statistics, manage classes
- **Students**: View personal attendance percentages and records
- **Class Incharge**: Access consolidated class attendance and defaulter reports
- **HOD**: Department-wide attendance data and analytics
- **Principal/Dean**: Institution-wide statistics and comprehensive reporting

### Design System
- **Theme Support**: Light/dark mode with system preference detection
- **Typography**: Inter font family from Google Fonts
- **Color Palette**: Material Design inspired with semantic color tokens
- **Component Library**: Comprehensive set of reusable UI components
- **Responsive Design**: Mobile-first approach with sidebar navigation

## External Dependencies

### Database & Storage
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **connect-pg-simple**: PostgreSQL session store

### UI & Design
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **recharts**: Chart library for attendance analytics
- **lucide-react**: Icon library

### Development & Build
- **vite**: Fast build tool and development server
- **typescript**: Type checking and development experience
- **@replit/vite-plugin-***: Replit-specific development plugins

### Validation & Forms
- **zod**: Schema validation library
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers

The system prioritizes data security with tamper-proof logs, implements comprehensive analytics with visual representations, and integrates seamlessly with existing timetable systems for a complete attendance management solution.