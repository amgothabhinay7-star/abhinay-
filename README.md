# 🚗 RideHub - All-In-One Ride Sharing App

A comprehensive ride-sharing platform that connects riders and drivers with budget-friendly options, insurance coverage, and referral rewards.

## 📋 Features

- ✅ Multiple ride types (Economy, Premium, Shared, etc.)
- ✅ Trip planning with budget optimization
- ✅ Driver information with photos and ratings
- ✅ Insurance coverage (2 Lakh rupees)
- ✅ Real-time communication between riders and drivers
- ✅ User authentication (Login/Registration)
- ✅ Referral program with discounts
- ✅ Payment integration (Stripe/Razorpay)
- ✅ Route optimization using Google Maps API

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js** - REST API server
- **MongoDB** - Database
- **JWT** - Authentication
- **Firebase/Twilio** - Real-time notifications
- **Google Maps API** - Geolocation & routing

### Frontend
- **React.js** - Web application
- **Tailwind CSS** - UI styling
- **Axios** - HTTP client
- **Google Maps React** - Map integration

## 📁 Project Structure

```
ridehub-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amgothabhinay7-star/abhinay-.git
   cd abhinay-
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm start
   ```

## 📊 Revenue Model

- **Commission per ride** (10-15% from rider or driver)
- **Premium subscription** (monthly pass for frequent riders)
- **In-app advertisements**
- **Insurance premium** (small cut per ride)
- **Referral rewards** (discount given, commission gained)

## 📞 Contact & Support

For issues or suggestions, please create an issue in the repository.

---

**Let's build the future of ride-sharing! 🚀**
