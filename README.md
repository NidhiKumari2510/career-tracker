# Career & Application Tracker

A career tracking web application that helps users manage job applications and track their Data Structures & Algorithms (DSA) preparation using a structured roadmap.

The application is designed as a **device-based productivity tool** with a clean, formal, and minimal UI.

---

## 🚀 Features

- Add and manage job applications
- Track application status:
  - Applied
  - Interviewing
  - Offer
  - Rejected
- Dashboard with:
  - Total applications
  - Interviewing count
  - Offers received
  - Rejected applications
- Recent applications with search functionality
- View all job applications with search and status filters
- Structured DSA roadmap:
  - Topic-wise checklist
  - Section-wise progress
  - Overall completion percentage
- Visual progress indicators
- Responsive and professional UI

---

## 🧠 Data Storage Approach

This project currently uses **browser-based localStorage** for data persistence.

- Job applications are stored locally on the user’s device
- DSA roadmap progress is saved as completed topic keys
- No authentication or user login is implemented in the current version

This approach keeps the application simple, fast, and device-based.  
Cloud-based storage and authentication can be added in future versions.

---

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- localStorage (for device-based persistence)

---

## 📂 Project Structure (High Level)

