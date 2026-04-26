"""
API для управления товарами: получение списка и обновление (с проверкой пароля админа).
"""
import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    # GET — публичный список товаров
    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, emoji, name, origin, price, season, tag FROM products ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        products = [
            {"id": r[0], "emoji": r[1], "name": r[2], "origin": r[3],
             "price": r[4], "season": r[5], "tag": r[6]}
            for r in rows
        ]
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"products": products}, ensure_ascii=False),
        }

    body = json.loads(event.get("body") or "{}")
    password = body.get("password", "")
    admin_password = os.environ.get("ADMIN_PASSWORD", "")

    if not admin_password or password != admin_password:
        return {
            "statusCode": 401,
            "headers": cors,
            "body": json.dumps({"error": "Неверный пароль"}, ensure_ascii=False),
        }

    conn = get_conn()
    cur = conn.cursor()

    # PUT — обновление товара
    if method == "PUT":
        cur.execute(
            "UPDATE products SET emoji=%s, name=%s, origin=%s, price=%s, season=%s, tag=%s, updated_at=NOW() WHERE id=%s",
            (body.get("emoji"), body.get("name"), body.get("origin"),
             body.get("price"), body.get("season"), body.get("tag"), body.get("id")),
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    # POST — добавить товар
    if method == "POST":
        cur.execute(
            "INSERT INTO products (emoji, name, origin, price, season, tag) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (body.get("emoji", "🍊"), body.get("name", "Новый товар"),
             body.get("origin", ""), body.get("price", "0 ₽"),
             body.get("season", ""), body.get("tag", "Есть")),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "id": new_id})}

    # DELETE — удалить товар
    if method == "DELETE":
        cur.execute("DELETE FROM products WHERE id=%s", (body.get("id"),))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    cur.close()
    conn.close()
    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
