# Стадия сборки
FROM node:20-alpine AS builder

# Устанавливаем корневые сертификаты для Alpine
RUN apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /app

COPY package*.json ./


# Устанавливаем зависимости
RUN npm install

COPY . .

# Собираем production-версию
RUN npm run build

# Продакшен-стадия
FROM nginx:alpine

# Копируем собранные артефакты из стадии сборки
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг Nginx (если нужен)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 3000
EXPOSE 3000

# Запускаем Nginx в foreground режиме
CMD ["nginx", "-g", "daemon off;"]