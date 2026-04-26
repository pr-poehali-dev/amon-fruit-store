import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О нас" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

interface NavBarProps {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, menuOpen, setMenuOpen, scrollTo }: NavBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
          <span className="text-3xl animate-float inline-block">🍊</span>
          <div className="flex flex-col items-start">
            <span className="font-caveat text-2xl font-bold leading-tight" style={{ color: "var(--fruit-orange)" }}>
              ФруктоРай
            </span>
            <span className="text-xs text-gray-400 font-medium leading-tight">Махсуджонов Амон Абдусамиевич</span>
          </div>
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

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+79028133445"
            className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Icon name="Phone" size={16} />
            8 (902) 813-34-45
          </a>
          <button
            onClick={() => scrollTo("catalog")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
          >
            <Icon name="ShoppingBasket" size={16} />
            Заказать
          </button>
        </div>

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
          <a
            href="tel:+79028133445"
            className="flex items-center gap-2 py-2 font-bold text-orange-600"
          >
            <Icon name="Phone" size={16} />
            8 (902) 813-34-45
          </a>
        </div>
      )}
    </header>
  );
}