# 📋 ระบบเช็คชื่อผู้ปกครอง

[![Deploy to GitHub Pages](https://github.com/itertius/checkin-helper/actions/workflows/deploy.yml/badge.svg)](https://github.com/itertius/checkin-helper/actions/workflows/deploy.yml)

ระบบช่วยครูบันทึกการเข้าร่วมประชุมของผู้ปกครอง สร้างด้วย React + Firebase พร้อม deploy บน GitHub Pages

🌐 **[เปิดใช้งาน](https://itertius.github.io/checkin-helper/)**

---

## ✨ Features

- 🔐 **เข้าสู่ระบบด้วย Google** — ไม่ต้องสมัครสมาชิก
- 📅 **หลายประชุม** — สร้างและจัดการได้หลายครั้ง เช่น ภาค 1/2567, ภาค 2/2567
- ✅ **เช็คชื่อแบบ Real-time** — บันทึกข้อมูลนักเรียนและสถานะผู้ปกครองทันที
- 📊 **Dashboard สรุปผล** — กราฟและตารางสรุปรายห้อง
- 📋 **รายชื่อผู้ปกครองที่ยังไม่มา** — กรองอัตโนมัติ
- 📥 **Export CSV** — ดาวน์โหลดข้อมูลไปใช้ต่อได้เลย

---

## 🛠 Tech Stack

| | |
|---|---|
| Frontend | React + Vite |
| Styling | TailwindCSS v4 |
| Auth & DB | Firebase (Authentication + Firestore) |
| Charts | Recharts |
| Deploy | GitHub Actions → GitHub Pages |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/itertius/checkin-helper.git
cd checkin-helper
npm install
```

### 2. Firebase Setup

1. สร้างโปรเจกต์ที่ [Firebase Console](https://console.firebase.google.com)
2. เปิด **Authentication** → Sign-in method → **Google**
3. เพิ่ม Authorized domain: `itertius.github.io`
4. สร้าง **Firestore Database** (test mode)
5. Project Settings → เพิ่ม Web App → copy `firebaseConfig`

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

แล้วใส่ค่า Firebase ใน `.env.local`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. Run

```bash
npm run dev
```

---

## 🔄 Deploy to GitHub Pages

### GitHub Secrets

ไปที่ `Settings → Secrets and variables → Actions` แล้วเพิ่ม 6 secrets:

| Secret | ค่า |
|---|---|
| `VITE_FIREBASE_API_KEY` | apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
| `VITE_FIREBASE_PROJECT_ID` | projectId |
| `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
| `VITE_FIREBASE_APP_ID` | appId |

### Enable Pages

`Settings → Pages → Source → GitHub Actions`

Push to `main` → deploy อัตโนมัติ

---

## 📁 Project Structure

```
src/
├── contexts/        # Firebase Auth context
├── hooks/           # useMeetings, useCheckins, useDashboard
├── pages/           # Login, Meetings, MeetingDetail, Dashboard
├── components/
│   ├── layout/      # Navbar, ProtectedRoute
│   ├── meetings/    # MeetingCard, CreateMeetingModal
│   ├── checkins/    # CheckInForm, CheckInList, AttendanceToggle
│   └── dashboard/   # Charts, Tables, CSV Export
└── utils/           # csvExport, classUtils
```

---

## 📄 License

MIT
