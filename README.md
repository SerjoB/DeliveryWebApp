# DeliveryWebApp - Web-приложение для приемки заказа на доставку

Описание

## Функциональность

- Создание заказов на доставку
- Просмотр списка всех заказов
- Просмотр детальной информации о заказе

## Технологический стек

- .NET 9
- Entity Framework Core
- PostgreSQL
- Docker & Docker Compose
- Swagger
- React JS

## Запуск через Docker

### Предварительные требования
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

1. Клонируйте репозиторий:
```bash
git clone https://github.com/SerjoB/DeliveryWebApp.git
cd DeliveryWebApp
```

2. Запустите приложение с помощью Docker Compose:
```bash
docker-compose up --build
```

3. Доступ к клиенту:
- http://localhost:3000

4. Доступ к API:
- http://localhost:8080/api/orders

4. Остановка приложения:
```bash
docker-compose down
```

5. Остановка и удаление всех данных:
```bash
docker-compose down -v
```

## Запуск локально (без Docker)

### Предварительные требования
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Bun](https://bun.sh)


1. Клонируйте репозиторий:
```bash
git clone https://github.com/SerjoB/DeliveryWebApp.git
cd DeliveryWebApp
```

2. Обновите строку подключения к БД:
```bash
# Скопировать и настроить конфигурацию
cp src/DeliveryWebApp.API/appsettings.Development.example.json src/DeliveryWebApp.API/appsettings.Development.json
# Указать данные вашей БД и порт вашего клиента в appsettings.Development.json

cd src/DeliveryWebApp.API
dotnet run
```

3. 
```bash
# Скопировать и настроить конфигурацию
cp src/DeliveryWebApp.Client/src/config.example.js src/DeliveryWebApp.Client/src/config.js
# Указать в config.js порт своего API

cd src/DeliveryWebApp.Client
bun install
bun run dev
```

API будет доступен на http://localhost:{PORT}  
Swagger UI на http://localhost:{PORT}/Swagger
Клиент будет доступен на http://localhost:{PORT}