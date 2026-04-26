CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  emoji TEXT NOT NULL DEFAULT '🍊',
  name TEXT NOT NULL,
  origin TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL,
  season TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Есть',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO products (emoji, name, origin, price, season, tag) VALUES
  ('🥭', 'Манго Альфонсо', 'Индия', '320 ₽/кг', 'Июнь–Август', 'Сезонный'),
  ('🍓', 'Клубника Эльсанта', 'Краснодар', '280 ₽/кг', 'Май–Июль', 'Хит'),
  ('🍑', 'Персик Инка', 'Узбекистан', '240 ₽/кг', 'Июль–Сентябрь', 'Скоро'),
  ('🍇', 'Виноград Мускат', 'Армения', '380 ₽/кг', 'Август–Октябрь', 'Скоро'),
  ('🍍', 'Ананас Голд', 'Коста-Рика', '290 ₽/шт', 'Круглый год', 'Есть'),
  ('🥝', 'Киви Хейворд', 'Новая Зеландия', '180 ₽/кг', 'Октябрь–Май', 'Есть');
