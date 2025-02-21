FROM node:18-alpine

WORKDIR /app

# Создаем новое React приложение
RUN npx create-react-app . --template typescript

# Удаляем стандартные файлы и .ts файлы (оставляем только .tsx)
RUN rm -rf src/* public/* src/*.ts

# Копируем наши файлы
COPY frontend/package*.json ./
COPY frontend/public ./public
COPY frontend/src ./src
COPY frontend/tsconfig.json ./

# Устанавливаем зависимости
RUN npm install

# Собираем приложение
RUN npm run build

EXPOSE 3000

# Запускаем сервер разработки
CMD ["npm", "start"] 