"""
Отправляет уведомления на email владельца о предзаказах и сообщениях с сайта ФруктоРай.
Поддерживает два типа: 'preorder' (предзаказ фрукта) и 'contact' (сообщение из формы контактов).
"""

import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def send_email(subject: str, html_body: str, to_email: str):
    smtp_host = os.environ.get("SMTP_HOST", "smtp.poehali.dev")
    smtp_port = int(os.environ.get("SMTP_PORT", "2525"))
    smtp_user = os.environ.get("SMTP_USER", "noreply@poehali.dev")
    smtp_pass = os.environ.get("SMTP_PASS", "")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"ФруктоРай <{smtp_user}>"
    msg["To"] = to_email

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        if smtp_pass:
            server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [to_email], msg.as_string())


def make_preorder_email(fruit: str, phone: str, email: str) -> str:
    return f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fffbf0; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 48px;">🥭</span>
        <h1 style="color: #FF6B00; margin: 8px 0;">Новый предзаказ!</h1>
      </div>
      <div style="background: white; border-radius: 12px; padding: 20px; border-left: 4px solid #FF6B00;">
        <p style="margin: 0 0 12px;"><strong>🍊 Фрукт:</strong> {fruit}</p>
        <p style="margin: 0 0 12px;"><strong>📱 Телефон:</strong> {phone}</p>
        {"<p style='margin: 0;'><strong>📧 Email:</strong> " + email + "</p>" if email else ""}
      </div>
      <p style="color: #999; font-size: 13px; text-align: center; margin-top: 20px;">
        Сообщение с сайта <a href="https://frukto-ray.ru" style="color: #FF6B00;">ФруктоРай</a>
      </p>
    </div>
    """


def make_contact_email(name: str, email: str, message: str) -> str:
    return f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fffbf0; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 48px;">✉️</span>
        <h1 style="color: #4CAF50; margin: 8px 0;">Новое сообщение!</h1>
      </div>
      <div style="background: white; border-radius: 12px; padding: 20px; border-left: 4px solid #4CAF50;">
        <p style="margin: 0 0 12px;"><strong>👤 Имя:</strong> {name}</p>
        <p style="margin: 0 0 12px;"><strong>📧 Email:</strong> {email}</p>
        <p style="margin: 0;"><strong>💬 Сообщение:</strong></p>
        <p style="background: #f9f9f9; padding: 12px; border-radius: 8px; margin-top: 8px; white-space: pre-wrap;">{message}</p>
      </div>
      <p style="color: #999; font-size: 13px; text-align: center; margin-top: 20px;">
        Сообщение с сайта <a href="https://frukto-ray.ru" style="color: #FF6B00;">ФруктоРай</a>
      </p>
    </div>
    """


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    notify_email = os.environ.get("NOTIFY_EMAIL", "")
    if not notify_email:
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "NOTIFY_EMAIL not configured"}),
        }

    body = json.loads(event.get("body") or "{}")
    notification_type = body.get("type", "")

    if notification_type == "preorder":
        fruit = body.get("fruit", "")
        phone = body.get("phone", "")
        email = body.get("email", "")

        if not fruit or not phone:
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "fruit and phone are required"}),
            }

        subject = f"🍊 Предзаказ: {fruit}"
        html = make_preorder_email(fruit, phone, email)

    elif notification_type == "contact":
        name = body.get("name", "")
        email = body.get("email", "")
        message = body.get("message", "")

        if not name or not email or not message:
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "name, email and message are required"}),
            }

        subject = f"✉️ Сообщение от {name}"
        html = make_contact_email(name, email, message)

    else:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "type must be preorder or contact"}),
        }

    send_email(subject, html, notify_email)

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True}),
    }
