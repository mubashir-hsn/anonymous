# Anonify – Get Anonymous Feedback

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=flat-square&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.18.2-green?style=flat-square&logo=mongodb)
![MIT License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)

Anonify is a modern **Next.js** application designed to collect and manage **anonymous feedback** efficiently. Built with a powerful stack including **Next.js**, **Tailwind CSS**, **MongoDB**, and **NextAuth**, it allows users to submit and receive feedback without revealing their identity.

---

## 🌟 Features

- Submit feedback anonymously
- User authentication with **NextAuth**
- Email notifications using **Nodemailer** and **Resend**
- Dark/light theme support with **next-themes**
- Form validation using **React Hook Form** & **Zod**
- Beautiful UI components with **Radix UI** and **Tailwind CSS**
- Carousel display for multiple feedback items using **Embla Carousel**
- Responsive and accessible design

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Radix UI, Lucide React  
- **Backend:** Node.js, MongoDB, Mongoose  
- **Authentication:** NextAuth  
- **Email:** Nodemailer, Resend  
- **Form Validation:** React Hook Form, Zod  
- **Animations:** tw-animate-css, Sonner  
- **Other Utilities:** Axios, clsx, class-variance-authority

---
## Create a .env.local file and add your environment variables:
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASS=your_email_password

---
## ⚡ Installation

1. Clone the repository:

```bash
git clone https://github.com/mubashir-hsn/anonymous.git
cd anonymous

## Getting Started

First, run the development server:
npm install
# or
yarn
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 📄 License

This project is **MIT Licensed**.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
