# ระบบเช็คชื่อผู้ปกครอง 📋

> ระบบช่วยครูบันทึกการเข้าร่วมประชุมของผู้ปกครอง พร้อม Dashboard สรุปผลแบบ Real-time

[![Deploy to GitHub Pages](https://github.com/itertius/checkin-helper/actions/workflows/deploy.yml/badge.svg)](https://github.com/itertius/checkin-helper/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28.svg)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4.svg)](https://tailwindcss.com/)

## 🌟 Features

- **เช็คชื่อแบบ Real-time**
  - บันทึกข้อมูลนักเรียน: เลขที่, ชั้น, ห้อง, ชื่อ, นามสกุล
  - สลับสถานะ "มา / ไม่มา" ได้ทันที
  - ข้อมูลอัปเดตแบบ Real-time ทุกหน้าจอ

- **Dashboard สรุปผล**
  - กราฟแท่งแสดงการเข้าร่วมรายห้อง
  - ตารางสรุปจำนวนและเปอร์เซ็นต์รายห้อง
  - รายชื่อผู้ปกครองที่ยังไม่มา
  - Export ข้อมูลเป็น CSV

- **จัดการหลายประชุม**
  - สร้างประชุมได้หลายครั้ง เช่น ภาค 1/2567, ภาค 2/2567
  - เข้าสู่ระบบด้วย Google Account

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/itertius/checkin-helper.git
cd checkin-helper
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
# ใส่ค่า Firebase config ใน .env.local
```

4. **Run the application**
```bash
npm run dev
```

## 🛠 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: TailwindCSS v4
- **Auth & Database**: Firebase (Authentication + Firestore)
- **Charts**: Recharts
- **Deploy**: GitHub Actions → GitHub Pages

## 🔧 Firebase Setup

1. สร้างโปรเจกต์ที่ [Firebase Console](https://console.firebase.google.com)
2. เปิด **Authentication** → Sign-in method → **Google**
3. เพิ่ม Authorized domain: `itertius.github.io`
4. สร้าง **Firestore Database** (test mode)
5. Project Settings → เพิ่ม Web App → copy `firebaseConfig`

ใส่ค่าใน `.env.local`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 📁 Project Structure

```
src/
├── contexts/           # Firebase Auth context
├── hooks/              # useMeetings, useCheckins, useDashboard
├── pages/              # Login, Meetings, MeetingDetail, Dashboard
├── components/
│   ├── layout/         # Navbar, ProtectedRoute
│   ├── meetings/       # MeetingCard, CreateMeetingModal
│   ├── checkins/       # CheckInForm, CheckInList, AttendanceToggle
│   └── dashboard/      # Charts, Tables, CSV Export
└── utils/              # csvExport, classUtils
```

## 📦 Deployment

เพิ่ม GitHub Secrets ทั้ง 6 ตัวที่ `Settings → Secrets and variables → Actions`:

| Secret | ค่า |
|---|---|
| `VITE_FIREBASE_API_KEY` | apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
| `VITE_FIREBASE_PROJECT_ID` | projectId |
| `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
| `VITE_FIREBASE_APP_ID` | appId |

จากนั้น `Settings → Pages → Source → GitHub Actions` → push to `main` → deploy อัตโนมัติ

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🖊️ Authors

**Developer**
- **Witsanupong Kolakul** - [itertius](https://github.com/itertius) @ [iterrius_te](https://www.instagram.com/iterrius_te/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
