<h1 align="center">🧾 FinsightAI — Ledger AI Reader</h1>

<p align="center">
  <b>AI-powered financial document reader</b><br/>
  Analyze PDFs, extract insights, and ask questions — all in one place.
</p>

<p align="center">
  <a href="https://finsightai-ogj3.onrender.com/" target="_blank">
    🔗 Live Demo
  </a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/ceo4u/FinSightAI" target="_blank">
    📂 GitHub Repository
  </a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">✨ Features</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tech-stack">🧰 Tech Stack</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-installation">📦 Installation</a>
</p>

---



## 🚀 Live Demo

> 🔗 Visit: [https://finsightai-ogj3.onrender.com](https://finsightai-ogj3.onrender.com)

Upload a financial PDF and extract summaries, insights, and run Q&A — instantly.

---

## ✨ Features

- 📄 Upload **PDFs** such as earnings reports or financial statements
- 🤖 Get **AI-generated summaries** from document content
- 🔍 Ask **natural language questions** from document context
- 🎨 **Clean, responsive UI** with ShadCN + TailwindCSS
- ⚡ **Fast frontend** powered by Vite + React + React Query
- 🌐 Seamless **SPA routing** with React Router

---

## 🧰 Tech Stack

| Category      | Technologies |
|---------------|--------------|
| **Frontend**  | React, Vite, TypeScript |
| **UI**        | ShadCN UI, TailwindCSS, Lucide Icons |
| **Forms**     | React Hook Form, Zod |
| **State Mgmt**| TanStack React Query |
| **Routing**   | React Router DOM |
| **Deployment**| Render |
| **Extras**    | Embla Carousel, Sonner, clsx, class-variance-authority |

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ceo4u/FinSightAI.git
cd FinSightAI
npm install
```

Start in development:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## ☁️ Deployment on Render

Install the serve package:
```bash
npm install serve
```

Add the following to your `package.json` scripts:
```json
"start": "serve -s dist -l $PORT"
```

Push to GitHub and connect to Render using the static site setup.

## 📁 Project Structure (Simplified)

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 🧠 How It Works

1. Upload a PDF file.
2. Text is extracted and sent to an LLM.
3. The AI generates summaries and allows Q&A from the document.
4. The frontend displays it all in a clean, interactive interface.

## 🙌 Contributing

Contributions are welcome! Feel free to fork the repository, submit pull requests, and improve the app together.

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

## 📬 Contact

Built by [@ceo4u](https://github.com/ceo4u)  
Reach out for feedback or collaboration!
