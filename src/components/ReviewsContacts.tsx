import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/be2e714c-e9cd-4477-984c-c6d51fe7cb86";

const REVIEWS = [
  { name: "Анна К.", text: "Заказываю уже третий сезон! Клубника просто обалденная, приходит всегда свежей и вовремя.", rating: 5, fruit: "🍓" },
  { name: "Михаил Р.", text: "Подписался на уведомления о манго — получил СМС первым. Вкус космический!", rating: 5, fruit: "🥭" },
  { name: "Светлана В.", text: "Наконец-то нашла магазин, где фрукты пахнут настоящим летом. Рекомендую всем!", rating: 5, fruit: "🍑" },
];

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О нас" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

interface ReviewsContactsProps {
  scrollTo: (id: string) => void;
  contactForm: { name: string; email: string; message: string };
  setContactForm: (v: { name: string; email: string; message: string }) => void;
  contactSuccess: boolean;
  setContactSuccess: (v: boolean) => void;
  contactLoading: boolean;
  setContactLoading: (v: boolean) => void;
}

export default function ReviewsContacts({
  scrollTo,
  contactForm,
  setContactForm,
  contactSuccess,
  setContactSuccess,
  contactLoading,
  setContactLoading,
}: ReviewsContactsProps) {
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
    <>
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
                { icon: "User", label: "Владелец", value: "Махсуджонов Амон Абдусамиевич" },
                { icon: "Phone", label: "Телефон", value: "8 (902) 813-34-45" },
                { icon: "Mail", label: "Email", value: "amonmahsydjonovrabsis@gmail.com" },
                { icon: "MapPin", label: "Адрес", value: "Заводоуковск — Упорово" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 8:00 – 22:00" },
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
    </>
  );
}