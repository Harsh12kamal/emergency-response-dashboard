# 🚨 Emergency Response Coordination Dashboard

A full-stack web application for coordinating emergency response units using real-time geospatial tracking and AI-assisted incident severity classification.

This project simulates an emergency operations center where dispatchers can monitor incidents, assign the nearest available units, track response status, and analyze operational performance.

---

## 📌 Features

### 🚑 Incident Management
- Create emergency incidents with geographic coordinates
- AI-powered severity classification (Low / Medium / High)
- Track incident lifecycle: Pending → Dispatched → Resolved

### 🚓 Unit Dispatch System
- Register emergency response units with live GPS locations
- Automatically dispatch the nearest available unit using MongoDB geospatial queries
- Mark units as Busy or Available in real time
- Resolve incidents and free assigned units

### 🗺️ Live Map Visualization
- Interactive map built with Leaflet
- Visual markers for incidents and response units
- Status-based visualization (pending, dispatched, resolved)

### 📊 Operational Dashboard
- Incident and unit management panels
- Dispatch and resolve controls for operators

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Leaflet / React-Leaflet
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Geospatial Queries (2dsphere indexes)

### AI Integration
- OpenAI API for incident severity classification

## 📂 Project Structure
emergency-response-dashboard/
│
├── emergency-backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── services/
│ ├── config/
│ └── server.js
│
├── emergency-frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── .gitignore
└── README.md


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Harsh12kamal/emergency-response-dashboard.git
cd emergency-response-dashboard
````
---

### 2️⃣ Backend Setup

```bash
cd emergency-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd emergency-frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Incidents

* `POST /api/incidents` – Create incident
* `GET /api/incidents` – Get all incidents

### Dispatch & Units

* `POST /api/dispatch/units` – Create unit
* `GET /api/dispatch/units` – Get all units
* `POST /api/dispatch/:incidentId` – Dispatch nearest unit
* `POST /api/dispatch/resolve/:incidentId` – Resolve incident & free unit

---

## 🧪 Testing

You can test all backend endpoints using **Postman** or **cURL**.

Example:

```http
POST http://localhost:5000/api/incidents
```

---

## 🎯 Use Case

This project demonstrates a real-world emergency response workflow by combining:

* AI-powered decision support
* Geospatial data processing
* Real-time operational dashboards

## 🙌 Author
Harsh Kamal
GitHub: [https://github.com/Harsh12kamal](https://github.com/Harsh12kamal)


