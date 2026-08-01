# 🚖 Taxi Booking Application

A modern full-stack Taxi Booking Application built with **Angular 22** and **Node.js + Express**.

This project is being developed as a learning project using modern Angular and backend best practices while keeping the architecture clean and scalable.

---

## 🏗️ Project Structure

```
taxi/
│
├── frontend/     # Angular 22 application
│
├── backend/      # Express.js REST API
│
└── README.md
```

---

# 🚀 Technologies

## Frontend

- Angular 22
- TypeScript
- Angular Signals
- Standalone Components
- Reactive Forms
- Angular Router
- HttpClient

## Backend

- Node.js
- Express 5
- TypeScript
- REST API
- tsx

---

# ✨ Current Features

## Frontend

- Home Page
- Booking Page
- Passenger Information
- Booking Summary
- Booking Confirmation
- Dynamic Pricing
- Vehicle Selection
- Journey Estimation
- Session Storage

## Backend

- Express REST API
- Location Endpoint
- Journey Distance Calculation
- Mock Route Service

---

# 🔌 API

### POST

```
POST /api/location
```

Request

```json
{
    "pickupLocation":"Maasmechelen",
    "destination":"Genk"
}
```

Response

```json
{
    "distanceKm":18.5,
    "durationMinutes":30
}
```

---

# 🖥️ Running the project

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm install
npm start
```

Frontend

```
http://localhost:4200
```

---

# 📅 Roadmap

- ✅ Angular Frontend
- ✅ Express Backend
- ⏳ Google Routes API
- ⏳ MongoDB
- ⏳ Authentication
- ⏳ Booking Database
- ⏳ Admin Dashboard
- ⏳ Payment Integration

---

# 👨‍💻 Author

Amro Eldewiny

GitHub:
https://github.com/amroeldewiny