import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS_URL = "https://functions.poehali.dev/7c9365a7-e017-4248-a4f3-8c5fc25258a3";

const TAGS = ["Есть", "Хит", "Сезонный", "Скоро"];

interface Product {
  id: number;
  emoji: string;
  name: string;
  origin: string;
  price: string;
  season: string;
  tag: string;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveOk, setSaveOk] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    emoji: "🍊", name: "", origin: "", price: "", season: "", tag: "Есть",
  });

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetch(PRODUCTS_URL);
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(PRODUCTS_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id: 0, emoji: "", name: "", origin: "", price: "", season: "", tag: "" }),
    });
    if (res.status === 401) {
      setAuthError("Неверный пароль");
      return;
    }
    setAuthed(true);
    setAuthError("");
    loadProducts();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setSaveError("");
    setSaveOk(false);
    const res = await fetch(PRODUCTS_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ...editing }),
    });
    setSaving(false);
    if (res.ok) {
      setSaveOk(true);
      setEditing(null);
      loadProducts();
      setTimeout(() => setSaveOk(false), 2000);
    } else {
      setSaveError("Ошибка сохранения");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    setDeleting(id);
    await fetch(PRODUCTS_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    setDeleting(null);
    loadProducts();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(PRODUCTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ...newProduct }),
    });
    setSaving(false);
    setAddMode(false);
    setNewProduct({ emoji: "🍊", name: "", origin: "", price: "", season: "", tag: "Есть" });
    loadProducts();
  };

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--fruit-bg)" }}>
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">🍊</span>
            <h1 className="text-2xl font-black text-gray-800">Админ-панель</h1>
            <p className="text-gray-500 text-sm mt-1">ФруктоРай</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              required
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none font-medium"
            />
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-white font-black text-lg"
              style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--fruit-bg)" }}>
      <header className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍊</span>
            <span className="font-black text-gray-800">Управление товарами</span>
          </div>
          <a href="/" className="text-sm text-gray-500 hover:text-orange-500 flex items-center gap-1">
            <Icon name="ArrowLeft" size={14} /> На сайт
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {saveOk && (
          <div className="mb-4 p-4 rounded-2xl bg-green-100 text-green-700 font-bold text-center">
            ✅ Сохранено!
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-gray-800">Товары ({products.length})</h2>
          <button
            onClick={() => setAddMode(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}
          >
            <Icon name="Plus" size={16} /> Добавить товар
          </button>
        </div>

        {/* Форма добавления */}
        {addMode && (
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 mb-6 shadow-md">
            <h3 className="font-black text-lg text-gray-800 mb-4">Новый товар</h3>
            <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Эмодзи (напр. 🍊)" value={newProduct.emoji}
                onChange={(e) => setNewProduct({ ...newProduct, emoji: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-orange-200 outline-none" />
              <input required placeholder="Название" value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-orange-200 outline-none" />
              <input placeholder="Происхождение (страна)" value={newProduct.origin}
                onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-orange-200 outline-none" />
              <input required placeholder="Цена (напр. 300 ₽/кг)" value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-orange-200 outline-none" />
              <input placeholder="Сезон (напр. Май–Июль)" value={newProduct.season}
                onChange={(e) => setNewProduct({ ...newProduct, season: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-orange-200 outline-none" />
              <select value={newProduct.tag}
                onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-orange-200 outline-none bg-white">
                {TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-2xl text-white font-black"
                  style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}>
                  {saving ? "Сохраняем..." : "Добавить"}
                </button>
                <button type="button" onClick={() => setAddMode(false)}
                  className="px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold">
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Загрузка...</div>
        ) : (
          <div className="flex flex-col gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border-2 border-orange-50 shadow-sm p-5">
                {editing?.id === p.id ? (
                  <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input placeholder="Эмодзи" value={editing.emoji}
                      onChange={(e) => setEditing({ ...editing, emoji: e.target.value })}
                      className="px-4 py-2 rounded-xl border-2 border-orange-300 outline-none" />
                    <input required placeholder="Название" value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                      className="px-4 py-2 rounded-xl border-2 border-orange-300 outline-none" />
                    <input placeholder="Происхождение" value={editing.origin}
                      onChange={(e) => setEditing({ ...editing, origin: e.target.value })}
                      className="px-4 py-2 rounded-xl border-2 border-orange-300 outline-none" />
                    <input required placeholder="Цена" value={editing.price}
                      onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                      className="px-4 py-2 rounded-xl border-2 border-orange-300 outline-none" />
                    <input placeholder="Сезон" value={editing.season}
                      onChange={(e) => setEditing({ ...editing, season: e.target.value })}
                      className="px-4 py-2 rounded-xl border-2 border-orange-300 outline-none" />
                    <select value={editing.tag}
                      onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                      className="px-4 py-2 rounded-xl border-2 border-orange-300 outline-none bg-white">
                      {TAGS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    {saveError && <p className="sm:col-span-2 text-red-500 text-sm">{saveError}</p>}
                    <div className="sm:col-span-2 flex gap-3">
                      <button type="submit" disabled={saving}
                        className="flex-1 py-2 rounded-2xl text-white font-black"
                        style={{ background: "linear-gradient(135deg, var(--fruit-orange), var(--fruit-red))" }}>
                        {saving ? "Сохраняем..." : "Сохранить"}
                      </button>
                      <button type="button" onClick={() => setEditing(null)}
                        className="px-6 py-2 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold">
                        Отмена
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-gray-800">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.origin} · {p.season}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-orange-600">{p.price}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          p.tag === "Есть" ? "bg-green-100 text-green-700" :
                          p.tag === "Хит" ? "bg-red-100 text-red-700" :
                          p.tag === "Скоро" ? "bg-purple-100 text-purple-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>{p.tag}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setEditing(p)}
                        className="p-2 rounded-xl border-2 border-orange-200 hover:border-orange-400 text-orange-500 transition-colors">
                        <Icon name="Pencil" size={16} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                        className="p-2 rounded-xl border-2 border-red-200 hover:border-red-400 text-red-400 transition-colors">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
