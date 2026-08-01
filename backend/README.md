# 🚀 Taxi Backend API

Node.js + Express backend for the Taxi Booking Application.

---

# Technologies

- Node.js
- Express 5
- TypeScript
- tsx

---

# Folder Structure

```
backend/

src/

routes/

services/

app.ts
```

---

# Start Development

```bash
npm install
npm run dev
```

Server

```
http://localhost:3000
```

---

# Available Endpoints

## GET /

Returns

```
Taxi Backend is running 🚖
```

---

## POST /api/location

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

# Architecture

```
Angular

↓

HTTP POST

↓

Express Router

↓

Location Service

↓

JSON Response

↓

Angular
```

---

# Current Services

- Location Service
- Journey Estimation
- Mock Distance Calculator

---

# Future Improvements

- Google Routes API
- MongoDB
- Authentication
- JWT
- Booking History
- Driver Management
- Admin API

---

# Author

Amro Eldewiny