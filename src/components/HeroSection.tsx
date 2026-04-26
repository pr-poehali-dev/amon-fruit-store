import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/be2e714c-e9cd-4477-984c-c6d51fe7cb86";

const HERO_IMG = "https://cdn.poehali.dev/projects/5a477859-d53c-46b0-b684-52e440488a08/files/af7270f1-42c2-439a-99e0-d2332f70126d.jpg";

const CATALOG = [
  { emoji: "🥭", name: "Манго Альфонсо", origin: "Индия", price: "320 ₽/кг", season: "Июнь–Август", tag: "Сезонный" },
  { emoji: "🍓", name: "Клубника Эльсанта", origin: "Краснодар", price: "280 ₽/кг", season: "Май–Июль", tag: "Хит" },
  { emoji: "🍑", name: "Персик Инка", origin: "Узбекистан", price: "240 ₽/кг", season: "Июль–Сентябрь", tag: "Скоро" },
  { emoji: "🍇", name: "Виноград Мускат", origin: "Армения", price: "380 ₽/кг", season: "Август–Октябрь", tag: "Скоро" },
  { emoji: "🍍", name: "Ананас Голд", origin: "Коста-Рика", price: "290 ₽/шт", season: "Круглый год", tag: "Есть" },
  { emoji: "🥝", name: "Киви Хейворд", origin: "Новая Зеландия", price: "180 ₽/кг", season: "Октябрь–Май", tag: "Есть" },
];

const TAG_COLORS: Record<string, string> = {
  "Сезонный": "bg-orange-100 text-orange-700",
  "Хит": "bg-red-100 text-red-700",
  "Скоро": "bg-purple-100 text-purple-700",
  "Есть": "bg-green-100 text-green-700",
};

interface HeroSectionProps {
  visible: boolean;
  scrollTo: (id: string) => void;
  preorderFruit: string | null;
  setPreorderFruit: (v: string | null) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  preorderSuccess: boolean;
  setPreorderSuccess: (v: boolean) => void;
  preorderLoading: boolean;
  setPreorderLoading: (v: boolean) => void;
}

export default function HeroSection({
  visible,
  scrollTo,
  preorderFruit,
  setPreorderFruit,
  email,
  setEmail,
  phone,
  setPhone,
  preorderSuccess,
  setPreorderSuccess,
  preorderLoading,
  setPreorderLoading,
}: HeroSectionProps) {
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

  return (
    <>
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
              <span className="font-caveat text-orange-400">лета</span> — круглый год
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg max-w-lg">
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
    </>
  );
}
