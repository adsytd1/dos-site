# Трекер — DOSOWNSITE (yernardos.space)

## Активные задачи (от DOS — делать сейчас)

---

## Бэклог из аудита
- ✅ Рефакторинг: удалены 47 неиспользуемых CSS-классов из styles.css (phone-mockup, stack-grid, magnets-grid, video-placeholder, floating-phone, desktop-sticky, hero-cta-center, cost-card, compare-card-mobile и др.) + styles.min.css пересобран

---

## Архив

<details><summary>Аудит #2 — 2026-03-27 (завершён)</summary>

**Статистика:** Критичных: 5 | Важных: 13 | Улучшений: 13 | Всего: 31
**Исправлено:** 31 из 31 | **Осталось:** 0
**Файлов изменено:** 22

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

### JS-аудит (main.js + inline scripts)
- ✅ **#2-21** [критичное] `const ro` redeclaration в dialogs.html — main.js тоже объявляет `const ro`, SyntaxError убивает ВСЮ логику main.js на этой странице. Обёрнут в IIFE
- ✅ **#2-22** [критичное] GA4 и Яндекс.Метрика отсутствуют на 8 страницах — 7 кейсов + 404.html без аналитики, весь трафик невидим. Добавлены оба счётчика
- ✅ **#2-23** [важное] faq.html scroll handler — `document.querySelector('.faq-nav').offsetHeight` без null check, crash на каждом scroll если элемент не найден. Добавлен null check
- ✅ **#2-24** [важное] faq.html scroll handler не throttled — 60+ вызовов/сек на мобилке. Добавлен requestAnimationFrame throttle + passive:true
- ✅ **#2-25** [важное] blog.html revealCards — querySelectorAll('.blog-card') на каждом scroll без фильтрации, накапливает сотни setTimeout. Переписан: :not(.revealed) + rAF throttle + passive:true
- ✅ **#2-26** [важное] main.js inline demo chat — clearTimeout(timeoutId) не вызывается в .catch(), таймер висит после ошибки. Добавлен clearTimeout в catch
- ✅ **#2-27** [важное] main.js body.style.overflow='hidden' не восстанавливается при bfcache — pageshow listener добавлен для восстановления overflow
- ✅ **#2-28** [улучшение] blog.html reading progress bar — null check для bar элемента + CSS '0'→'0%'
- ✅ **#2-29** [улучшение] faq.html `const ro` потенциальный конфликт — обёрнут в IIFE превентивно (faq.html не грузит main.js, но может в будущем)

### CSS-аудит (styles.css + case-styles.css)
- ✅ **#2-30** [улучшение] `@keyframes mapPulse` анимирует width/height — layout thrashing на каждом кадре. Переписан на transform:scale()
- ✅ **#2-31** [улучшение] 3 элемента без `-webkit-backdrop-filter` (trust-progress, navbar mobile, swipe-hint) — blur не работал в старом Safari. Добавлен вендорный префикс
- ✅ **#2-32** [улучшение] Font-weight 900 не загружается (index.html hero) — добавлен в Google Fonts URL, styles.min.css пересобран
- ✅ **#2-33** [код-качество] 47 неиспользуемых CSS-классов удалены из styles.css — styles.min.css пересобран

</details>

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
