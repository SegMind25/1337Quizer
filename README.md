# 1337Quizer - 42 Piscine Tester

An interactive web application designed to help 42 Piscine students prepare for their C programming evaluations. It simulates the strict environment of the 42 intranet, featuring Moulinette-style grading, strict rules, and a random problem generator to test your actual coding skills.

![42 Style](https://img.shields.io/badge/Style-42%20Piscine-00babc) ![React](https://img.shields.io/badge/React-18-61dafb) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 🚀 Features

- **Comprehensive Quizzes:** Multiple-choice questions for modules C00 to C09 based strictly on the official 42 subject PDFs.
- **Moulinette Scoring:** Strict grading system. Score below 50% and face the dreaded `-42` cheat detection penalty.
- **Random Problem Generator:** After passing a quiz, claim a random practical coding exercise extracted from the hardest parts of the module.
- **Terminal-Inspired UI:** Dark mode, monospaced fonts, and a strict layout that mimics the 42 intranet and terminal environment.
- **Instant Feedback:** Immediate evaluation and detailed score breakdown.

## 🛠 Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.
```bash
node -v
npm -v
```

### Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd 1337Quizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

## 📖 How to Use

1. **Dashboard:** Upon launching the app, you will see a grid of available modules (C00 to C09).
2. **Start Evaluation:** Click the `START EVALUATION` button on any module to begin the quiz.
3. **Answer Questions:** Carefully read the questions. They cover prototypes, allowed functions, Norminette rules, and edge cases. Select the correct option to proceed.
4. **View Results:** After the last question, the Moulinette will output your score. You need at least `50%` to validate the project.
5. **Claim Random Problem:** If you pass, click `CLAIM RANDOM EXAM PROBLEM`. A terminal-style prompt will appear with a real C exercise from the module. Use the text area to sketch out your solution.
6. **Compile & Test:** Click the `COMPILE & TEST` button to simulate running your code through `cc -Wall -Wextra -Werror` and `norminette`.

## 🗺 Project Structure

```text
1337Quizer/
├── index.html              # Main HTML entry point
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration (Tailwind)
├── tailwind.config.js      # Tailwind CSS configuration (42 Colors)
├── vite.config.js          # Vite configuration
└── src/
    ├── app.jsx             # Main application logic & 42 Data
    ├── index.css           # Global styles & Tailwind directives
    └── main.jsx            # React DOM entry point
```

## 📌 Note

This tool is meant for study preparation. The text area in the "Problem Solving" section is currently a local sketchpad and does not actually compile C code or check Norminette (yet). Ensure you test your final solutions in your actual 42 VM or terminal!

## 🤝 Contributing

Found a bug or want to add more questions from other modules (like Rushes or BSQ)? 
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-module`)
3. Commit your changes (`git commit -m 'Add C10 module'`)
4. Push to the branch (`git push origin feature/new-module`)
5. Open a Pull Request

---
```**By Bekkali, by SegMind25! Use your brain!!!** 🧠⚡```
