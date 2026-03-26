# Invoice Flow Automation Tool 🚀

**Streamlined Invoicing for Modern Freelancers and Creative Professionals.**

Invoice Flow is a comprehensive automation utility designed for freelancers, developers, and creative studios. It transforms the tedious task of invoicing into a seamless, automated workflow—allowing you to focus on what you do best.

## 🌟 Why Invoice Flow?

For many freelancers, manual invoicing is a time-sink. Invoice Flow solves this by integrating directly with the tools you already use, ensuring consistency, speed, and professionalism.

- **⏱️ Save Hours**: Automate invoice generation from your tracked work.
- **📈 Stay Organized**: Automatic synchronization with Google Sheets for effortless bookkeeping.
- **💸 Get Paid Faster**: Integrated dynamic UPI payment links for instant Indian bank transfers.
- **📄 Professional Output**: Generate high-quality PDF invoices that reflect your brand.

## 🛠️ Key Features

- **Google Sheets Integration**: Seamlessly sync client data and invoice records with your workspace.
- **Dynamic UPI Payment Links**: Automatically generate QR codes and payment links for every invoice.
- **Next-Gen Tech Stack**: Built with Next.js 14 and Framer Motion for a premium, high-performance experience.
- **Client Management**: A centralized hub to manage all your professional relationships.
- **PDF Generation**: Native support for creating and downloading professional invoices on the fly.

## 🚀 Technical Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/ORM**: [Prisma](https://www.prisma.io/) with SQLite
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **APIs**: [Google Sheets API](https://developers.google.com/sheets/api)
- **PDF**: [jspdf](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Google Cloud Project for Sheets integration

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/vickyiitp/Invoice-Flow-Automation-tool.git
    cd Invoice-Flow-Automation-tool
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file based on the provided environment variables:
    ```env
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="..."
    GOOGLE_CLIENT_ID="..."
    GOOGLE_CLIENT_SECRET="..."
    ```

4.  **Database Migration**:
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 📜 License

This project is licensed under the MIT License.
