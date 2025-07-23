# Shop Single Page Application

Интерактивное веб-приложение для сравнения характеристик товаров (смартфонов) с возможностью замены товаров в сравнении.

## Особенности

- Сравнение до 6 товаров одновременно
- Режим отображения только отличающихся характеристик
- Интерактивная замена товаров в сравнении

## Технологии

- **React** (TypeScript)
- **Next.js** (App Router)
- **Redux Toolkit** для управления состоянием
- **CSS Modules** для стилизации
- **Figma** для дизайна интерфейса

## Установка и запуск
1. Клонируйте репозиторий:
```
git clone https://github.com/vldpvnnk/shopSinglePageApp.git
```
2. Установите зависимости:
```
npm install
```
3. Запустите development сервер:
```
npm run dev
```
Приложение будет доступно по адресу: http://localhost:3000

## Структура проекта
```
/src
  /pages
    /index.tsx                # Главная страница
  /components
    /product-card             # Компонент карточки товара
    /product-table            # Таблица сравнения
    /product-list             # Таблица сравнения c продуктами
    /product-change-modal     # Модальное окно замены товара
    /icons                    # SVG иконки
  /store
    featuresSlice.ts          # Redux slice для управления состоянием
    store.ts                  # Redux store
  /types
    Product.ts                # Типы данных
```
