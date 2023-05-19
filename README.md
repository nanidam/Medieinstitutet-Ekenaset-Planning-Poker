[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/V_7RZ58X)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11057552&assignment_repo_type=AssignmentRepo)

# Planning Poker

This is a group project for a class on Agile Methods. The application is called Planning Poker and it is designed for scoring tasks based on Fibonacci numbers. The project timeline is two weeks.

The Planning Poker application allows users to log in as either an ordinary user or an admin. Ordinary users have the ability to vote on tasks, while admins have access to additional features such as leading sessions, adding tasks, selecting the next task, and changing the final score point.

### User Roles

**Ordinary User:** This type of user can log in and vote on tasks. They have limited access and can only view the list of tasks, the task that is currently being scored, and the completed score tasks. They also have the option to leave the session.

**Admin:** This type of user has access to all features of the application. They can lead sessions, add tasks, select the next task, and change the final score point. Admins can also end the session, which logs everyone out and returns them to the main page.

### Scoring

The application uses Fibonacci numbers to score tasks. There are 6 options to choose from when scoring a task. After all users in the session have voted, a common score of the average number is displayed. The number is then rounded to the closest Fibonacci number to provide a score. The larger the Fibonacci number, the more effort and time it is expected to take to complete the task.

### How to Use

To use the Planning Poker application, simply log in as either an ordinary user or an admin. From there, you can view the list of tasks, vote on tasks, and use the additional features available to admins.

Thank you for using Planning Poker!

## Demo

👩‍💻 [Link to demo](http://164.92.152.210/)

## Installation

Note that this repository contains both the frontend and backend folders.

To install the dependencies for the backend, navigate to the backend folder in your terminal and run the command "npm install".

```bash
  npm install
```

After the dependencies have finished installing, run "npm run dev" to start the backend server.

```bash
  npm run dev
```

Similarly, to install the dependencies for the frontend, navigate to the frontend folder in your terminal and run the command "npm install". After the dependencies have finished installing, run "npm run dev" to start the frontend server.

## Tech Stack

Vite 🕸️,
Sass 💄,
Socket.io-client 📡,
Express 🔌,
MongoDB 📦
Mongoose 🔑,
Socket.io 📡,
Crypto-js 🔒,
Cors 🌐,
Debug 🐞,
Dotenv 🌍,
Express-async-handler 🚦,
Morgan 📝,
Prettier 🎨,
Typescript 💻,
Nodemon 🚀,

## Authors

👩‍💻 [Hanna](https://github.com/hannaforssell)
👨‍🔬 [Robin](https://github.com/robin-sevelin)
👨‍💻 [Alexander](https://github.com/alexwallden)
👩‍🎨 [Nani](https://github.com/nanidam)
