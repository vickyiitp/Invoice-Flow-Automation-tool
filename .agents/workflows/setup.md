---
description: Setup and run InvoiceFlow full-stack application
---

1. Install dependencies
// turbo
npm install

2. Set up environment variables
Create a `.env` file with:
- `DATABASE_URL="file:./dev.db"`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET`

3. Initialize Database
// turbo
npx prisma generate
// turbo
npx prisma db push

4. Run the development server
// turbo
npm run dev
