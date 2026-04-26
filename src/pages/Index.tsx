import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/be2e714c-e9cd-4477-984c-c6d51fe7cb86";

const HERO_IMG = "https://cdn.poehali.dev/projects/5a477859-d53c-46b0-b684-52e440488a08/files/af7270f1-42c2-439a-99e0-d2332f70126d.jpg";
const SEASONAL_IMG = "https://cdn.poehali.dev/projects/5a477859-d53c-46b0-b684-52e440488a08/files/051771ba-c2fd-40d2-861d-734b78712da9.jpg";
const DELIVERY_IMG = "https://cdn.poehali.dev/projects/5a477859-d53c-46b0-b684-52e440488a08/files/142ed142-3ba9-4121-9da0-8ca24e6ac30a.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О нас" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const CATALOG = [
  { emoji: "🥭", name: "Манго Альфонсо", origin: "Индия", price: "320 ₽/кг", season: "Июнь–Август", tag: "Сезонный" },
  { emoji: "🍓", name: "Клубника Эльсанта", origin: "Краснодар", price: "280 ₽/кг", season: "Май–Июль", tag: "Хит" },
  { emoji: "🍑", name: "Персик Инка", origin: "Узбекистан", price: "240 ₽/кг", season: "Июль–Сентябрь", tag: "Скоро" },
  { emoji: "🍇", name: "Виноград Мускат", origin: "Армения", price: "380 ₽/кг", season: "Август–Октябрь", tag: "Скоро" },
  { emoji: "🍍", name: "Ананас Голд", origin: "Коста-Рика", price: "290 ₽/шт", season: "Круглый год", tag: "Есть" },
  { emoji: "🥝", name: "Киви Хейворд", origin: "Новая Зеландия", price: "180 ₽/кг", season: "Октябрь–Май", tag: "Есть" },
];

const REVIEWS = [
  { name: "Анна К.", text: "Заказываю уже третий сезон! Клубника просто обалденная, приходит всегда свежей и вовремя.", rating: 5, fruit: "🍓" },
  { name: "Михаил Р.", text: "Подписался на уведомления о манго — получил СМС первым. Вкус космический!", rating: 5, fruit: "🥭" },
  { name: "Светлана В.", text: "Наконец-то нашла магазин, где фрукты пахнут настоящим летом. Рекомендую всем!", rating: 5, fruit: "🍑" },
];

const TAG_COLORS: Record<string, string> = {
  "Сезонный": "bg-orange-100 text-orange-700",
  "Хит": "bg-red-100 text-red-700",
  "Скоро": "bg-purple-100 text-purple-700",
  "Есть": "bg-green-100 text-green-700",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [preorderFruit, setPreorderFruit] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preorderSuccess, setPreorderSuccess] = useState(false);
  const [preorderLoading, setPreorderLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePreorder = (fruitName: string) => {
    setPreorderFruit(fruitName);
    setPreorderSuccess(false);
    setEmail("");
    setPhone("");
  };

  const submitPreorder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPreorderLoading(true);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "preorder", fruit: preorderFruit, phone, email }),
      });
    } catch (err) { console.error(err); }
    setPreorderLoading(false);
    setPreorderSuccess(true);
    setTimeout(() => setPreorderFruit(null), 2500);
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...contactForm }),
      });
    } catch (err) { console.error(err); }
    setContactLoading(false);
    setContactSuccess(true);
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen font-montserrat" style={{ backgroundColor: "var(--fruit-bg)" }}>
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-3xl animate-float inline-block">🍊</span>
            <span className="font-caveat text-2xl font-bold" style={{ color: "var(--fruit-orange)" }}>
              ФруктоРай
            </span>
          </button>

          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`nav-link text-sm font-semibold transition-colors ${
                  activeSection === l.id ? "text-orange-500" : "text-gray-700"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("catalog")}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
          >
            <Icon name="ShoppingBasket" size={16} />
            Заказать
          </button>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} className="text-gray-700" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 px-4 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left py-2 font-semibold text-gray-700 hover:text-orange-500 transition-colors border-b border-orange-50"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen relative overflow-hidden flex items-center">
        <div
          className="absolute top-20 right-[-100px] w-[500px] h-[500px] opacity-20 animate-blob rounded-full"
          style={{ background: "radial-gradient(circle, var(--fruit-orange), var(--fruit-yellow))" }}
        />
        <div
          className="absolute bottom-20 left-[-80px] w-[350px] h-[350px] opacity-15 rounded-full"
          style={{ background: "radial-gradient(circle, var(--fruit-green), var(--fruit-yellow))", animation: "blob 8s ease-in-out 3s infinite" }}
        />

        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative">
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-6">
              <span>🌿</span> Свежие фрукты от фермеров
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Вкус{" "}
              <span className="gradient-text">настоящего</span>
              <br />
              <span className="font-caveat text-6xl md:text-7xl">лета</span>{" "}
              круглый год
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
              Экзотические и сезонные фрукты прямо с ферм — с доставкой до вашей двери. Подпишитесь на предзаказ и получайте лучшие фрукты первыми.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
              >
                Смотреть каталог 🍊
              </button>
              <button
                onClick={() => scrollTo("delivery")}
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-orange-300 text-orange-600 hover:bg-orange-50 transition-all"
              >
                Условия доставки
              </button>
            </div>
            <div className="mt-10 flex gap-8">
              {[["500+", "довольных клиентов"], ["48 ч", "максимальная доставка"], ["30+", "видов фруктов"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black gradient-text">{val}</div>
                  <div className="text-xs text-gray-500 font-medium mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "0.2s" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={HERO_IMG}
                alt="Свежие тропические фрукты"
                className="w-full h-[480px] object-cover"
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: "linear-gradient(to top, var(--fruit-orange), transparent)" }}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3" style={{ animation: "float 4s ease-in-out infinite" }}>
              <span className="text-3xl">🥭</span>
              <div>
                <div className="font-bold text-sm text-gray-800">Манго сезон!</div>
                <div className="text-xs text-green-600 font-semibold">Предзаказ открыт</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-2" style={{ animation: "float2 5s ease-in-out infinite" }}>
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-black text-lg text-gray-800">4.9</div>
                <div className="text-xs text-gray-500">213 отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
              🌱 Наш ассортимент
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="gradient-text-green">Каталог</span> фруктов
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Выберите фрукт и оформите предзаказ с уведомлением — мы сообщим, как только появится свежая партия.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG.map((item) => (
              <div
                key={item.name}
                className="fruit-card bg-white border-2 border-orange-50 rounded-3xl p-6 flex flex-col gap-4 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="text-6xl">{item.emoji}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${TAG_COLORS[item.tag]}`}>
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Icon name="MapPin" size={14} />
                    {item.origin}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-black text-xl" style={{ color: "var(--fruit-orange)" }}>{item.price}</span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Icon name="Calendar" size={14} />
                    {item.season}
                  </div>
                </div>
                <button
                  onClick={() => handlePreorder(item.name)}
                  className="w-full py-3 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105"
                  style={
                    item.tag === "Есть"
                      ? { background: "linear-gradient(135deg, var(--fruit-green), #66BB6A)" }
                      : { background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-yellow))" }
                  }
                >
                  {item.tag === "Есть" ? "Заказать сейчас" : "Предзаказ + уведомление 🔔"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREORDER MODAL */}
      {preorderFruit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && setPreorderFruit(null)}
        >
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" style={{ animation: "scaleIn 0.3s ease-out" }}>
            {!preorderSuccess ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-5xl mb-3 block">🔔</span>
                  <h3 className="text-2xl font-black text-gray-800">Предзаказ</h3>
                  <p className="text-gray-500 mt-2">
                    <strong>{preorderFruit}</strong> — мы уведомим вас, когда появится свежая партия
                  </p>
                </div>
                <form onSubmit={submitPreorder} className="flex flex-col gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Ваш телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Email (необязательно)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    disabled={preorderLoading}
                    className="w-full py-4 rounded-2xl text-white font-black text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
                  >
                    {preorderLoading ? "Отправляем..." : "Подписаться на уведомление 🍊"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreorderFruit(null)}
                    className="text-center text-gray-400 text-sm hover:text-gray-600"
                  >
                    Отмена
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <span className="text-6xl block mb-4">✅</span>
                <h3 className="text-2xl font-black text-gray-800">Отлично!</h3>
                <p className="text-gray-500 mt-2">Мы сообщим вам, как только <strong>{preorderFruit}</strong> появится в наличии.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ABOUT */}
      <section id="about" className="py-24" style={{ backgroundColor: "var(--fruit-bg)" }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={SEASONAL_IMG} alt="Сезонные фрукты" className="w-full h-[420px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-3xl shadow-xl p-6 max-w-[200px]">
              <div className="text-4xl mb-2">🌿</div>
              <div className="font-black text-2xl" style={{ color: "var(--fruit-orange)" }}>100%</div>
              <div className="text-sm text-gray-600 font-medium">Натуральные фрукты без химии</div>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-6">
              🧑‍🌾 О нас
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Прямые поставки{" "}
              <span className="font-caveat text-5xl gradient-text">от фермеров</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Мы работаем напрямую с фермерами в России и по всему миру. Никаких посредников — только свежие фрукты, собранные в нужной степени зрелости и доставленные прямо к вашему столу.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Leaf", text: "Без химии и консервантов" },
                { icon: "Truck", text: "Доставка за 24–48 часов" },
                { icon: "Users", text: "Прямые контракты с фермерами" },
                { icon: "Star", text: "Контроль качества каждой партии" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow-sm">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-yellow))" }}
                  >
                    <Icon name={item.icon} size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
              <Icon name="Truck" size={14} /> Доставка
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Быстро и{" "}
              <span className="gradient-text">свежо</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Доставляем фрукты в специальных охлаждаемых боксах, чтобы сохранить свежесть и аромат.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "Zap", title: "Экспресс-доставка", desc: "В течение 4 часов по городу", price: "299 ₽" },
                { icon: "Clock", title: "Стандартная доставка", desc: "На следующий день, с 9:00 до 21:00", price: "150 ₽" },
                { icon: "Package", title: "Бесплатная доставка", desc: "При заказе от 2 000 ₽", price: "0 ₽" },
                { icon: "RefreshCw", title: "Регулярная подписка", desc: "Еженедельная доставка со скидкой 15%", price: "По тарифу" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl border-2 border-orange-100 bg-orange-50 hover:border-orange-300 transition-colors">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-yellow))" }}
                  >
                    <Icon name={item.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <span className="font-black text-orange-600 whitespace-nowrap">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={DELIVERY_IMG} alt="Доставка фруктов" className="w-full h-[420px] object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(255,107,0,0.8), transparent 50%)" }}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-caveat text-3xl font-bold">Свежесть гарантирована!</p>
                <p className="text-sm opacity-90 mt-1">Если фрукты не понравились — вернём деньги без вопросов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ backgroundColor: "var(--fruit-bg)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-bold mb-4">
              ⭐ Отзывы
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Нас <span className="gradient-text">любят</span>
            </h2>
            <p className="text-gray-500">Более 500 довольных клиентов уже попробовали наши фрукты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {REVIEWS.map((r) => (
              <div key={r.name} className="fruit-card bg-white rounded-3xl p-6 shadow-md border-2 border-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <span className="text-4xl">{r.fruit}</span>
                </div>
                <p className="text-gray-600 leading-relaxed italic mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
                  >
                    {r.name[0]}
                  </div>
                  <span className="font-bold text-gray-800">{r.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-3xl p-10 text-white text-center"
            style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red), var(--fruit-pink))" }}
          >
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Попробуй первым новый сезон 🌿
            </h3>
            <p className="text-white/80 text-lg mb-6 max-w-lg mx-auto">
              Подпишитесь на предзаказ сезонных фруктов и получайте уведомления первыми
            </p>
            <button
              onClick={() => scrollTo("catalog")}
              className="px-10 py-4 bg-white font-black text-orange-600 rounded-full text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Перейти в каталог 🍊
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
              <Icon name="Phone" size={14} /> Контакты
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Свяжитесь с <span className="gradient-text-green">нами</span>
            </h2>
            <p className="text-gray-500">Ответим в течение часа в рабочее время</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "Email", value: "hello@frukto-ray.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Садовая, 12" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 9:00 – 21:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-5 rounded-2xl bg-orange-50 border-2 border-orange-100">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--fruit-green), #81C784)" }}
                  >
                    <Icon name={item.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.label}</div>
                    <div className="font-bold text-gray-800 mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl border-2 border-orange-100 shadow-lg p-8">
              {!contactSuccess ? (
                <form onSubmit={submitContact} className="flex flex-col gap-5">
                  <h3 className="text-2xl font-black text-gray-800">Напишите нам</h3>
                  <input
                    required
                    type="text"
                    placeholder="Ваше имя"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none font-medium"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none font-medium"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Ваш вопрос или сообщение"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none font-medium resize-none"
                  />
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full py-4 rounded-2xl text-white font-black text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, var(--fruit-green), #66BB6A)" }}
                  >
                    {contactLoading ? "Отправляем..." : "Отправить сообщение 🌿"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <span className="text-6xl block mb-4">🎉</span>
                  <h3 className="text-2xl font-black text-gray-800">Сообщение отправлено!</h3>
                  <p className="text-gray-500 mt-2">Мы ответим вам в ближайшее время.</p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-6 px-6 py-3 rounded-full border-2 border-orange-300 text-orange-600 font-bold hover:bg-orange-50"
                  >
                    Написать ещё
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 text-white"
        style={{ background: "linear-gradient(135deg, #1a1a1a, #2d1a00)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍊</span>
            <div>
              <div className="font-caveat text-2xl font-bold text-orange-400">ФруктоРай</div>
              <div className="text-xs text-gray-400">Свежие фрукты с доставкой</div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 justify-center">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors font-medium"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="text-sm text-gray-500">© 2024 ФруктоРай</div>
        </div>
      </footer>
    </div>
  );
}