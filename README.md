<<<<<<< HEAD
# MOD-Camp-Day-Booking-System-Final
=======
# MOD Camp Booking System

React + Vite frontend and Express backend for a one-day camp booking system in Sabhan, Kuwait.

## Test accounts

User:
- Email: `aisha@test.com`
- Password: `1234`
- Phone: `55775252`

Staff:
- Email: `staff@mod.com`
- Password: `admin123`

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Run Backend

```bash
cd backend
npm install
npm run dev
```

## Environment

Copy the example file:

```bash
cd backend
copy .env.example .env
```

Default local MongoDB URI:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mod_camp_booking
JWT_SECRET=modcampsecret
```

## Features

- Arabic / English language toggle
- Working navbar routes
- User login and register
- Protected booking page
- Simple captcha in booking form
- Sabhan Google Map location
- Tent selection: Small, Large, VIP
- Staff login
- Staff dashboard to confirm, update, or cancel bookings
- Aisha test data included
>>>>>>> 9622fb1 (Final MOD-Camp-Booking-System)
