# DESIGN-QUALITY-REPORT — Lillies Spa

تقرير الجودة الإلزامي وفق `DESIGN-SKILLS-RULES.md`. يوثّق المهارات المُستدعاة وكيف طُبّقت.

## 1) المهارات المُستدعاة
- **`ui-ux-pro-max`** ✅ — استُدعيت، وشُغّل:
  `python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "beauty salon spa elegant feminine" --design-system -p "Lillies Spa"`
- **`design-taste-frontend`** ✅ — anti-slop، design tokens، Pre-Flight Check.
- **`emil-design-eng`** ✅ — الموشن الناعم، منحنيات easing مخصّصة، التفاصيل غير المرئية.

## 2) مخرجات ui-ux-pro-max وكيف تعاملنا معها
| المخرج | التوصية | قرارنا |
|---|---|---|
| Pattern | Hero-Centric + Social Proof | اعتُمد: hero قوي ثم trust bar فوراً. |
| Style | Soft UI Evolution (ظلال ناعمة، WCAG AA+) | اعتُمد: ظلال ناعمة مائلة للبرقوقي، تباين عالٍ. |
| Colors | وردي/لافندر فاخر (#EC4899…) | **استُبدل عمداً** بحسب البريف: ليلكي + عاجي + ذهبي + برقوقي، لتمييز الهوية عن المواقع الشقيقة الوردية، مع الحفاظ على روح "soft pink + lavender luxury". |
| Typography | Playfair/Inter (spa/beauty editorial) | **استُبدل** بالخطوط العربية المطلوبة: **El Messiri** (عناوين) + **Tajawal** (نص) — نفس المزاج (elegant/luxury) بالعربية. |
| AVOID | neon / harsh anim / dark mode | التُزم: لا نيون، حركة ناعمة فقط، وضع فاتح. |

## 3) قرارات UI/UX الأساسية (design-taste-frontend)
- **Design Read:** Landing page لسبا نسائي، جمهور محلي مهتم بالجمال، لغة floral-luxury، vanilla CSS + El Messiri/Tajawal.
- **Dials:** VARIANCE 7 / MOTION 5 / DENSITY 3 (راقٍ، واسع، حركة محسوبة).
- **Anti-slop:** لا AI-purple-glow، لون مميز واحد (ذهبي accent) مقفول عبر الصفحة، نظام radius موحّد (pill للأزرار، 14–22px للكروت).
- **Layout families متنوعة:** hero split، trust chips، services grid، why (قسم برقوقي معكوس الإحساس ضمن نفس الثيم)، gallery masonry، booking split، location split، final CTA، footer — ≥4 عائلات.
- **Eyebrow discipline:** eyebrows قصيرة فوق العناوين، ليست مرقّمة (لا "01/INDEX").
- **Hero:** عنوان سطرين، subtext < 20 كلمة فعلية، CTA ظاهر فوق الطية، صورة حقيقية كبيرة.
- **Images:** 5 صور حقيقية حصراً، لا fake screenshots، لا SVG illustrations مرسومة يدوياً (الأيقونات فقط من نظام stroke موحّد).
- **No em-dash** في أي نص ظاهر.

## 4) تطبيق Emil / الموشن
- منحنيات مخصّصة: `--ease-out: cubic-bezier(.23,1,.32,1)` و`--ease-soft` للقائمة.
- أزرار: `:active { scale(0.97) }` ردّ فعل لمسي فوري.
- مدد قصيرة: micro 160–220ms، انتقالات ≤ 280ms، scroll-reveal 700ms (دخول لطيف).
- transform/opacity فقط (لا layout thrash). القائمة تنزلق بـ ease ناعم.
- كل ما يتحرك يحترم `prefers-reduced-motion` (يُلغى تماماً).

## 5) Accessibility
- `<html lang="ar" dir="rtl">`، HTML سيمانتيك (header/nav/main/section/footer)، تدرّج h1→h3 بلا قفز.
- تباين: نص برقوقي #3E2342 على عاجي، وأبيض على برقوقي/ليلكي عميق، وذهبي #B5893A للنصوص الصغيرة — كلها ≥ 4.5:1.
- `:focus-visible` outline 3px ليلكي على كل عنصر تفاعلي.
- كل أيقونة زر لها `aria-label`؛ كل صورة لها `alt` عربي وصفي + width/height؛ الصور غير الهيرو `loading="lazy"`.
- النموذج: labels ظاهرة، أخطاء تحت الحقل، `aria-live` للـ toast، focus على أول حقل خاطئ، input types (tel/date).
- أهداف لمس ≥ 48px.

## 6) Layout & Responsive
- Mobile-first، breakpoints 768/1024، `100dvh` للقائمة، لا تمرير أفقي عند 390px (مُختبر).
- **قائمة الجوال = overlay ملء الشاشة 100vw/100dvh خلفية برقوقية صلبة + زر X واضح** (ليست side-drawer).

## 7) النصوص
- سعودية طبيعية، **محايدة جندريًا** (احجز/تواصل/اطلب — لا احجزي/لكِ).
- **لا أسعار مخترعة:** كل خدمة "الأسعار حسب الطلب"؛ استُبعدت صورة العرض الترويجي (115 ريال) من المعرض.
- التقييم الحقيقي فقط: 4.5 / 1,480 من خرائط قوقل.

## 8) اختبار الذوق (Impeccable / §9)
- فاخر؟ نعم — ليلكي/ذهبي/برقوقي، ظلال ناعمة، خط El Messiri.
- سعودي مناسب للنشاط؟ نعم — RTL، نسائي راقٍ، أجواء سبا.
- يقنع خلال 3 ثوانٍ؟ نعم — hero + تقييم + CTA واضح.
- لا يشبه قالبًا مجانيًا؟ نعم — هوية مخصّصة، صور حقيقية، تفاصيل حركة.

## 9) نتيجة الاختبارات
Playwright: **20/20 ناجحة** على mobile (iPhone 13) و desktop (1440).
