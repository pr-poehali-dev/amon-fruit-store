import Icon from "@/components/ui/icon";

const SEASONAL_IMG = "https://cdn.poehali.dev/projects/5a477859-d53c-46b0-b684-52e440488a08/files/051771ba-c2fd-40d2-861d-734b78712da9.jpg";
const DELIVERY_IMG = "https://cdn.poehali.dev/projects/5a477859-d53c-46b0-b684-52e440488a08/files/142ed142-3ba9-4121-9da0-8ca24e6ac30a.jpg";

export default function AboutDelivery() {
  return (
    <>
      {/* ABOUT */}
      <section id="about" className="py-24" style={{ backgroundColor: "var(--fruit-bg)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4">
              🌿 О нас
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Почему{" "}
              <span className="gradient-text">ФруктоРай?</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Мы объединяем лучших фермеров и любителей свежих фруктов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={SEASONAL_IMG} alt="Сезонные фрукты" className="w-full h-[400px] object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(255,107,0,0.6), transparent 60%)" }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-caveat text-3xl font-bold text-white">Прямо с ферм — на ваш стол</p>
              </div>
            </div>

            <div>
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
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
              <Icon name="Truck" size={14} /> Доставка и самовывоз
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Быстро и{" "}
              <span className="gradient-text">свежо</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Доставляем по Заводоуковску и Упорово. Также можно забрать самовывозом в удобное время.
            </p>
          </div>

          {/* Зона покрытия */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: "MapPin", label: "Заводоуковск", color: "bg-orange-100 text-orange-700 border-orange-200" },
              { icon: "MapPin", label: "Упорово", color: "bg-orange-100 text-orange-700 border-orange-200" },
              { icon: "ShoppingBag", label: "Самовывоз", color: "bg-green-100 text-green-700 border-green-200" },
            ].map((z) => (
              <div key={z.label} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-bold text-sm ${z.color}`}>
                <Icon name={z.icon} size={15} />
                {z.label}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-orange-100 bg-orange-50 hover:border-orange-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-yellow))" }}>
                  <Icon name="Zap" size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-800">Доставка по Заводоуковску</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Привезём в течение дня. Адрес самовывоза — по звонку:{" "}
                    <a href="tel:+79028133445" className="text-orange-600 font-bold hover:underline">8 (902) 813-34-45</a>
                  </p>
                </div>
                <span className="font-black text-orange-600 whitespace-nowrap">150 ₽</span>
              </div>

              {[
                { icon: "Truck", title: "Доставка в Упорово", desc: "Доставка в оговорённый день", price: "250 ₽" },
                { icon: "Package", title: "Бесплатная доставка", desc: "При заказе от 2 000 ₽", price: "0 ₽" },
                { icon: "ShoppingBag", title: "Самовывоз", desc: "Упорово, ул. Чивилёва, 1 — заберите сами в удобное время", price: "Бесплатно" },
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
    </>
  );
}
