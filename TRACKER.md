# Трекер — DOSOWNSITE (yernardos.space)

## Активные задачи (от DOS — делать сейчас)

---

## Аудит #2 — 2026-03-27

**Статистика:** Критичных: 3 | Важных: 9 | Улучшений: 8 | Всего: 20
**Исправлено:** 20 из 20 | **Осталось:** 0
**Файлов изменено:** 16

### Критичное
- ✅ **#2-01** [критичное] lite-yt CSS отсутствует в case-styles.css — YouTube embed в кейсах не рендерился. Скопированы правила .lite-yt-cover, .review-media--yt, .abs-center из styles.min.css
- ✅ **#2-02** [критичное] Сломанный счётчик в case-kazgeotech.html — `data-target="Сотни"` не анимируется (regex парсит только цифры). Заменено на `data-target="500+"`
- ✅ **#2-03** [критичное] Сломанный счётчик в case-kazgeotech.html — `data-target="WhatsApp"` застревает на 0. Убран data-target, текст "WhatsApp" установлен напрямую

### Важное
- ✅ **#2-04** [важное] 3 отсутствующих .webp файла (404 при загрузке) — aida-personal-lawyer.webp, forte-review.webp, dostyq-review.webp сконвертированы из .jpg через cwebp
- ✅ **#2-05** [важное] 2 несуществующих .mov fallback source — удалены ссылки на nurasyl.mov (case-amadey.html) и personal-lawyer-reel.mov (case-personal-lawyer.html), обновлены download-ссылки на .mp4
- ✅ **#2-06** [важное] Некорректные цвета категорий в case-dostyq.html — Amadey карточка cat-yellow→cat-purple, Personal Lawyer карточка cat-sky→cat-green
- ✅ **#2-07** [важное] Некорректный цвет категории в case-adal.html — Personal Lawyer карточка cat-purple→cat-green
- ✅ **#2-08** [важное] Непоследовательный tooltip-скрипт в case-dostyq.html — inline style подход заменён на CSS class .show (как на остальных кейс-страницах)
- ✅ **#2-09** [важное] Footer не синхронизированы на 4 страницах — blog.html, dialogs.html, privacy.html, thank-you.html: добавлены role=contentinfo, Telegram Channel, вторая строка ссылок, ИП YERNARMARKETING, target/rel атрибуты
- ✅ **#2-10** [важное] Несоответствие конверсии 48.6%→49.6% — исправлено в index.html и blog.html
- ✅ **#2-11** [важное] dialogs.html — stylesheet без cache-busting (styles.min.css без ?v=). Добавлен ?v=5
- ✅ **#2-12** [важное] 404.html — отсутствует footer. Добавлен минимальный footer с copyright

### Улучшения
- ✅ **#2-13** [улучшение] Видео-обёртка слишком широкая (case-personal-lawyer.html) — добавлен CSS-класс .review-video-wrap (max-width:400px, центрирован, скруглён)
- ✅ **#2-14** [улучшение] aria-label отсутствует на mobile CTA на 11 страницах — добавлен aria-label="Написать в WhatsApp" на все мобильные CTA
- ✅ **#2-15** [улучшение] 404.html — отсутствуют OG meta-теги — добавлены og:type, og:title, og:url, og:locale, canonical
- ✅ **#2-16** [улучшение] Footer ссылки на blog.html без target="_blank" на внешних ссылках — добавлены target/rel атрибуты
- ✅ **#2-17** [улучшение] Footer ссылки на dialogs.html без target="_blank" на внешних ссылках — добавлены target/rel атрибуты
- ✅ **#2-18** [улучшение] privacy.html — минимальный footer без навигации — расширен до полного footer с контактами и ссылками
- ✅ **#2-19** [улучшение] thank-you.html — footer без Telegram Channel — добавлен
- ✅ **#2-20** [улучшение] blog.html — footer без второй строки ссылок и ИП — добавлены

---

## Архив

<details><summary>Аудит #1 — 2026-03-27 (завершён)</summary>

**Статистика:** Критичных: 3 | Важных: 7 | Улучшений: 3 | Всего: 13
**Исправлено:** 13 из 13 | **Осталось:** 0
**Файлов проверено:** 20 из 20 (100%)

### Критичное
- ✅ **#1-01** [критичное] WhatsApp share-ссылки в blog.html без номера телефона — добавлен номер 77052051992 в wa.me ссылки
- ✅ **#1-02** [критичное] SW cache.addAll() без error handling (sw.js) — добавлен fallback: если addAll падает, кешируем ресурсы по одному
- ✅ **#1-03** [критичное] Видео-отзывы воспроизводятся без звука — НЕ баг кода: muted=false, volume=1, проблема в самих MP4-файлах (нет аудиодорожки)

### Важное
- ✅ **#1-04** [важное] FAQ inline onclick handlers (faq.html:18 элементов) — удалены inline onclick/onkeydown, заменены на addEventListener
- ✅ **#1-05** [важное] .back-link на мобилке без z-index (case-styles.css) — НЕ баг: z-index:100 уже установлен корректно
- ✅ **#1-06** [важное] Phone validation несоответствие (main.js) — НЕ баг: валидация проверяет length>=11 и первая цифра '7', сообщение корректно
- ✅ **#1-07** [важное] Тестовые файлы с hardcoded абсолютными путями (tests/*.js) — заменены на path.join(__dirname, '..')
- ✅ **#1-08** [важное] Footer в faq.html отличается от index.html — синхронизирован: добавлены Telegram Channel, вторая строка ссылок, ИП, role=contentinfo
- ✅ **#1-09** [важное] SW нет очистки старых кэшей v1-v5 (sw.js) — НЕ баг: activate handler уже очищает все кэши кроме текущего
- ✅ **#1-10** [важное] Inline styles в кейс-файлах (179 штук в 7 case-*.html) — извлечены в 15 CSS-классов в case-styles.css, осталось 5 обоснованных inline (уникальные отступы, динамические url)

### Улучшения
- ✅ **#1-11** [улучшение] Favicon SVG 32x32 может быть размытым на HiDPI — НЕ баг: SVG векторный, масштабируется без потери качества
- ✅ **#1-12** [улучшение] IntersectionObserver'ы без disconnect — НЕ баг: все observers либо используют unobserve() после срабатывания, либо непрерывные (не SPA)
- ✅ **#1-13** [улучшение] Missing meta theme-color на подстраницах — добавлен на privacy.html (остальные уже имели)

</details>
