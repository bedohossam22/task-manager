# 📝 Task Manager App

A simple full-stack **Task Management App** built with **Laravel**, **React (Inertia.js)**, and **MySQL**. Users can add, edit, delete, and mark tasks as complete — with support for descriptions and priorities.

🎥 [Demo Video](https://drive.google.com/file/d/18x6lwmfQuALiWu77FfD8PNQMZZhjFDos/view?usp=drive_link)

---

## 🚀 Features

- ✅ Add new tasks (title, description, priority)
- ✏️ Edit task details
- ✔️ Mark tasks as completed
- 🗑️ Delete tasks
- ⚙️ RESTful Laravel API
- 💡 Modern UI using React + Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Inertia.js, Tailwind CSS
- **Backend:** Laravel
- **Database:** MySQL
- **Optional Auth:** Laravel Breeze / Sanctum

---

## 📦 Installation & Setup

### 1. Clone the repository & run XAMPP

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```
2. Install backend & frontend dependencies
bash
Copy
Edit
composer install
npm install
3. Configure your .env file
Update the following in .env:

env
Copy
Edit
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_pass
Make sure the database exists in phpMyAdmin (via XAMPP).

4. Generate app key & run migrations
bash
Copy
Edit
php artisan key:generate
php artisan migrate
5. Run development servers
bash
Copy
Edit
npm run dev
php artisan serve
Then open:
👉 http://localhost:8000/tasks

💬 Notes
I haven’t fully mastered the ideal project structure yet, and there are some unused files due to earlier failed attempts.
That said, I prioritized early delivery and core functionality, and I’m confident in my ability to complete and improve the app further.

🙏 Thank You
Thank you for the opportunity 🙌
Made by Abdelrahman
#Self-Taught Developer
