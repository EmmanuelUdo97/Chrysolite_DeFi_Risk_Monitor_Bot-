# 1️⃣ Create Next.js project folder without auto-install
npx create-next-app@latest frontend --ts --eslint --tailwind --app --no-install

# 2️⃣ Move into the folder
cd frontend

# 3️⃣ Install main dependencies manually
npm install react react-dom next

# 4️⃣ Install dev dependencies manually
npm install typescript @types/node @types/react @types/react-dom --save-dev
npm install tailwindcss @tailwindcss/postcss postcss autoprefixer --save-dev
npm install eslint eslint-config-next --save-dev

# 5️⃣ Install additional libraries for dashboard
npm install recharts axios

# 6️⃣ Optional: Start dev server
Write-Host "`n✅ All dependencies installed. Start dev server with:`n"
Write-Host "cd frontend"
Write-Host "npm run dev"
