from os import terminal_size
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from threading import Thread

smtp_server = "smtp.gmail.com"
sender_email = ""
password = ""
port = 465  # For SSL

def send_new_user_email(receiver_email, username):
    t = Thread(target=thread_send_email_new_user, args=(receiver_email, username))
    t.start()

def thread_send_email_new_user(receiver_email, username):
    message = MIMEMultipart("alternative")
    message["Subject"] = "Registrazione RedMenu"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message

    html = """\
<html>
    <body>
        <div class = "container" style = 
            "border-radius: 15px;
            margin: auto;
            width: 80%;
            border:solid rgb(207, 206, 206) 1px;
            height: 100%;">
            <div class="title" style = "border-radius: 15px;
            background-color: #ff4136;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            color: white;
            font-family: 'Poppins';
            font-size: 30px;">Red Menu</div>
            <div class = "content" style = "font-family: 'Poppins';
            font-size: 16px;
            text-align: center;">
                Ciao """ + username + """,<br>
                RedMenu &copy; d&agrave; il benvenuto.<br>
                RedMenu è un'applicazione per ordinare prodotti al bar in modo semplice e veloce.
            </div>
        </div>
    </body>
</html>
    """

    # Turn these into plain/html MIMEText objects
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )

def send_order_refused_email(receiver_email, username):
    t = Thread(target=thread_send_order_refused, args=(receiver_email, username))
    t.start()

def thread_send_order_refused(receiver_email, username):
        message = MIMEMultipart("alternative")
        message["Subject"] = "Rifiutato ordine RedMenu"
        message["From"] = sender_email
        message["To"] = receiver_email

        # Create the plain-text and HTML version of your message

        html = """\
        <html>
    <body>
        <div class = "container" style = 
            "border-radius: 15px;
            margin: auto;
            width: 80%;
            border:solid rgb(207, 206, 206) 1px;
            height: 100%;">
            <div class="title" style = "border-radius: 15px;
            background-color: #ff4136;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            color: white;
            font-family: 'Poppins';
            font-size: 30px;">Red Menu</div>
            <div class = "content" style = "font-family: 'Poppins';
            font-size: 16px;
            text-align: center;">
                Ciao """ + username + """,<br>
                    RedMenu &copy; ti avvisa che il tuo ultimo ordine è stato rifiutato dal bar<br>
                    L'ordine può essere stato rifiutato per le seguenti motivazioni:
                    <ul>
                    <li>L'amministratore ha rimosso un prodotto che era presente nel tuo ordine</li>
                    <li>Il bar ha rifiutato il suo ordine perchè non riesce a gestirlo</li>
                    </ul>
            </div>
        </div>
    </body>
</html>
        """

        # Turn these into plain/html MIMEText objects
        part2 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part2)

        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )

def send_email_ordine_accettato(receiver_email, username):
    t = Thread(target=thread_send_ordine_accettato, args=(receiver_email, username))
    t.start()

def thread_send_ordine_accettato(receiver_email, username):
        message = MIMEMultipart("alternative")
        message["Subject"] = "Accettato ordine RedMenu"
        message["From"] = sender_email
        message["To"] = receiver_email

        # Create the plain-text and HTML version of your message

        html = """\
                <html>
    <body>
        <div class = "container" style = 
            "border-radius: 15px;
            margin: auto;
            width: 80%;
            border:solid rgb(207, 206, 206) 1px;
            height: 100%;">
            <div class="title" style = "border-radius: 15px;
            background-color: #ff4136;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            color: white;
            font-family: 'Poppins';
            font-size: 30px;">Red Menu</div>
            <div class = "content" style = "font-family: 'Poppins';
            font-size: 16px;
            text-align: center;">
                Ciao """ + username + """,<br>
                    RedMenu &copy; ti avvisa che il tuo ultimo ordine è stato preso in carico
            </div>
        </div>
    </body>
</html>
        """

        # Turn these into plain/html MIMEText objects
        part2 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part2)

        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )

def send_email_ordine_pronto(receiver_email, username):
    t = Thread(target=thread_send_ordine_pronto, args=(receiver_email, username))
    t.start()

def thread_send_ordine_pronto(receiver_email, username):
        message = MIMEMultipart("alternative")
        message["Subject"] = "Ordine pronto RedMenu"
        message["From"] = sender_email
        message["To"] = receiver_email

        # Create the plain-text and HTML version of your message

        html = """\
                    <html>
    <body>
        <div class = "container" style = 
            "border-radius: 15px;
            margin: auto;
            width: 80%;
            border:solid rgb(207, 206, 206) 1px;
            height: 100%;">
            <div class="title" style = "border-radius: 15px;
            background-color: #ff4136;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            color: white;
            font-family: 'Poppins';
            font-size: 30px;">Red Menu</div>
            <div class = "content" style = "font-family: 'Poppins';
            font-size: 16px;
            text-align: center;">
                Ciao """ + username + """,<br>
                    RedMenu &copy; ti avvisa che il tuo ultimo ordine è pronto e quindi puoi andare a ritirarlo, se non lo hai ancora fatto
            </div>
        </div>
    </body>
</html>
        """

        # Turn these into plain/html MIMEText objects
        part2 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part2)

        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )