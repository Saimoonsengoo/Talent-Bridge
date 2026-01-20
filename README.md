# TalentBridge

TalentBridge is a job portal system connecting **Job Seekers** and **Employers**.  
It uses a **hybrid backend setup** with **MongoDB Atlas** for main data storage and **Supabase** for image storage and authentication.

---

## Features

- User registration & login (Supabase Auth)  
- Role-based dashboards (Job Seeker / Employer / Admin)  
- Job posting, listing, and applications  
- Profile and job image upload via Supabase  
- Admin dashboard for managing users and jobs  

---

## Technology Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas  
- **Image Storage & Auth:** Supabase  
- **Libraries:** Axios, Mongoose, Multer, React Router  

---

## Pre-requisites

- Node.js v18+  
- npm v9+ or Yarn  
- Git  
- MongoDB Atlas account  
- Supabase account  

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Saimoonsengoo/Talent-Bridge.git
cd Talent-Bridge
```

### 2. Backend Setup
#### 1.Navigate to backend:
```bash
cd backend
```
#### 2. Install dependencies:
```bash
npm install
```
#### 3. Create .env File
```ini
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
``` 
