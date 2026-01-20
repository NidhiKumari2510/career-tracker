# Career & Application Tracker

A career-focused web application designed to help students and early professionals **track job applications, organize preparation resources, and follow a structured DSA roadmap** in a single place.

The project emphasizes **clarity, simplicity, and real-world usability**, with a clean and formal user interface suitable for daily use during internship and job preparation.

---

## 📌 Project Overview

Managing job applications, interview preparation, and DSA progress simultaneously can be overwhelming.  
This application provides a centralized system to:

- Track job applications and their current stages
- Visualize application progress through a dashboard
- Follow a structured DSA learning roadmap
- Access curated preparation resources
- Get resume feedback (static in the current version)

The current version is intentionally designed as a **device-based application without authentication**, keeping the experience simple and focused.

---

## ✨ Features

### 📄 Job Application Tracking
- Add job applications with details such as:
  - Job title
  - Company name
  - Location
  - Job type (Internship / Full-time)
  - Application status (Applied, Interviewing, Offer, Rejected)
  - Date applied
  - Notes
- View all applications in a searchable and filterable list
- Filter applications based on status
- Quickly search by company, role, or location

---

### 📊 Dashboard
- High-level overview with:
  - Total applications
  - Interviewing applications
  - Offers received
  - Rejected applications
- Recent applications section
- Search functionality for quick access to recent entries

---

### 🧠 DSA Roadmap
- Structured roadmap covering:
  - Programming fundamentals
  - Time and space complexity
  - Core data structures
  - Searching and sorting algorithms
  - Trees and graphs
  - Problem-solving patterns
  - Dynamic programming
- Topic-wise checklist with visual indicators
- Section-wise and overall progress tracking
- Progress persists across page refreshes

---

### 📚 Resources Section
- Dedicated section for preparation resources
- Contains curated links and references for:
  - DSA preparation
  - Interview preparation
  - Career guidance
- Acts as a centralized hub for commonly used resources

---

### 📄 Resume Feedback
- Resume upload interface
- Displays **static, predefined feedback** common to all users
- Designed as a placeholder for future enhancements
- Planned to be upgraded with dynamic and personalized feedback in later versions

---

## 🧠 Data Storage Approach

This project uses **browser-based localStorage** for data persistence.

- Job applications are stored locally on the user’s device
- DSA roadmap progress is saved as completed topic keys
- No user authentication or login is implemented in the current version

This approach keeps the application lightweight, fast, and easy to use for a single-user, device-based workflow.

> ⚠️ Clearing browser storage will remove saved data.

---

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- localStorage (device-based persistence)

---

## 🔮 Future Improvements

- User authentication
- Cloud-based data synchronization
- Personalized and dynamic resume feedback
- Mock interview scheduling
- Multi-device support