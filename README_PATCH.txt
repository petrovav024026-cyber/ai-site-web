AI Studio B2BcAI — PATCH: Лёгкая админка услуг + динамический /solutions
=======================================================================
Содержимое архива — ПОВЕРХ текущего проекта (Next.js App Router). Все файлы UTF‑8.

Что добавлено:
1) /data/services.json — список услуг (можно редактировать вручную).
2) API для услуг:
   - /app/api/services/route.ts (GET/POST upsert)
   - /app/api/services/[id]/route.ts (DELETE)
3) Мини‑FS утилита:
   - /lib/fsdb.ts (readJSON/writeJSON, без алиасов и зависимостей)
4) Админка (в ЛК):
   - /app/cabinet/admin/page.tsx
   - /app/cabinet/admin/services/page.tsx
5) Обновлённая страница «AI решения для B2B»:
   - /app/solutions/page.tsx (читает список услуг из API, fallback на статический)

Установка/запуск:
- Скопируйте файлы из архива в корень проекта, подтвердите замену /app/solutions/page.tsx.
- Убедитесь, что Node >= 18, pnpm установлен.
- Запуск: pnpm dev

Маршруты:
- /solutions — список услуг динамически.
- /cabinet/admin — точка входа админки.
- /cabinet/admin/services — CRUD по услугам.

Примечания:
- Импорты сделаны относительными (без @/ алиасов), чтобы исключить проблемы с tsconfig paths.
- Хранилище — файл /data/services.json (UTF‑8). В проде можно легко заменить на БД/Prisma.
- Страницы/API кешируются как no-store для моментальной видимости правок в dev.
