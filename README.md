# ระบบเช็คชื่อผู้ปกครอง

ระบบช่วยครูบันทึกการเข้าร่วมประชุมของผู้ปกครอง — deploy บน GitHub Pages

## Features

- เข้าสู่ระบบด้วย Google
- สร้างประชุมได้หลายครั้ง (เช่น ภาค 1/2567, ภาค 2/2567)
- บันทึกข้อมูลนักเรียน: เลขที่, ชั้น, ห้อง, ชื่อ, นามสกุล, สถานะผู้ปกครอง
- Dashboard สรุปรายห้อง พร้อมกราฟและรายชื่อผู้ปกครองที่ยังไม่มา
- Export ข้อมูลเป็น CSV

## Tech Stack

- React + Vite
- Firebase (Authentication + Firestore)
- TailwindCSS
- Recharts
- GitHub Actions → GitHub Pages

## การติดตั้ง (Local)

```bash
npm install
cp .env.local.example .env.local
# ใส่ค่า Firebase config ใน .env.local
npm run dev
```

## Firebase Setup

1. สร้างโปรเจกต์ที่ [console.firebase.google.com](https://console.firebase.google.com)
2. เปิด Authentication → Google Sign-In → เพิ่ม domain `<username>.github.io`
3. สร้าง Firestore Database (test mode)
4. สร้าง Web App → copy `firebaseConfig` ใส่ `.env.local`

## Deploy (GitHub Pages)

เพิ่ม GitHub Secrets ทั้ง 6 ตัว:

| Secret | ค่า |
|---|---|
| `VITE_FIREBASE_API_KEY` | apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
| `VITE_FIREBASE_PROJECT_ID` | projectId |
| `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
| `VITE_FIREBASE_APP_ID` | appId |

จากนั้น: Settings → Pages → Source → **GitHub Actions**

Push to `main` → deploy อัตโนมัติ
