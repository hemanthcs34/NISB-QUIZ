# Engineering Knowledge Quiz

A sleek, responsive, and modern quiz website designed for rapid-fire questions. This project is built with vanilla HTML, CSS, and JavaScript, focusing on a clean user interface, smooth animations, and a challenging streak-based pass/fail system.

 <!-- Placeholder image, you can replace this with your own screenshot -->

## ✨ Features

-   **30-Question Challenge**: A comprehensive set of 30 questions.
-   **Strict 30-Second Timer**: Each question has a countdown timer. If it runs out, the question is marked as incorrect, and the streak is broken.
-   **Streak-Based Logic**:
    -   Answer **5 consecutive questions correctly** to pass the quiz instantly.
    -   Fail to achieve a 5-streak by the end of 30 questions, and you fail the quiz.
-   **Pass/Fail System**: No scores are shown. The result is a simple, clean "Pass" or "Fail" flashcard.
-   **Modern & Responsive UI**: A beautiful glassmorphism-style UI with an animated gradient background that looks great on all devices.
-   **Dynamic Feedback**: Includes a progress bar, a visible streak counter with a "fire" icon, and a pulsing timer for the last 10 seconds.
-   **Randomized Questions**: Questions are shuffled every time the quiz starts to ensure a unique experience on each attempt.
-   **Easy Customization**: The question set can be easily replaced without breaking the application's logic.

## 🚀 How to Run

This is a pure front-end project. No complex setup is required.

1.  Clone the repository or download the files.
2.  Open the `index.html` file in any modern web browser (like Chrome, Firefox, or Edge).
3.  That's it! The quiz will start.

## 🔧 How to Customize Questions

The project is designed to be easily customizable.

1.  Open the `script.js` file.
2.  Navigate to the `const questions = [...]` array.
3.  You can delete the existing question objects and add your own.
4.  Ensure your new question objects follow the exact same structure:

```javascript
{
    question: "Your question text goes here?",
    answers: [
        { text: "Correct Answer", correct: true },
        { text: "Wrong Answer 1", correct: false },
        { text: "Wrong Answer 2", correct: false },
        { text: "Wrong Answer 3", correct: false }
    ]
}
```

**Important**: Each question must have exactly one answer where `correct` is set to `true`.

## 🛠️ Tech Stack

-   **HTML5**
-   **CSS3** (with CSS Variables and Animations)
-   **JavaScript (ES6+)**

## ☁️ Deployment

This project is deployment-ready. Since it contains only static files (HTML, CSS, JS), you can deploy it for free on various platforms:

-   **Vercel**: Connect your GitHub repository and it will deploy automatically.
-   **Netlify**: Drag and drop the project folder or connect your Git repository.
-   **GitHub Pages**: Enable GitHub Pages in your repository settings.