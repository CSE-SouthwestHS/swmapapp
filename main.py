from flask import Flask, flash, redirect, url_for, render_template, request, session, abort
from flask_mail import Mail, Message
from Map import route, defaults
from io import BytesIO
import base64

app = Flask(__name__, static_url_path='/static')
#mail sophisticated
app.config.update(dict(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = 'swcodeclub@gmail.com',
    MAIL_PASSWORD = 'mark&seay@1901'
))
mail = Mail(app)

@app.route("/")
@app.route("/home/")
def home():
    return render_template("index.html")

@app.route("/contact/")
def contact():
    return render_template("contact.html")

@app.route("/feedback/", methods=["POST"])
def feedback():
    msg = Message('MapSW Feedback', sender='swcodeclub@gmail.com', \
            recipients=['mpek66@gmail.com', 'seaystir@gmail.com', 'swcodeclub@gmail.com'])
    msg.body = request.form.get('firstname') + " " + request.form.get('lastname',) + \
                " has submitted feedback.\n" + \
                "Their experience was " + request.form.get('experience') + ".\n" + \
                "They said:\n" + \
                request.form.get('subject') + "\n" + \
                "Contact them at: " + request.form.get('email')
    mail.send(msg)
    return redirect(url_for("thank_you"))

@app.route("/thank-you/")
def thank_you():
    return render_template("thank-you.html")

@app.route("/help/")
def help():
    return render_template("help.html")

@app.route("/egg/")
def egg():
    return render_template("egg.html")

@app.route("/map/")
def blank():
    zero, one, two, three = defaults()
    return render_template("map.html", zero = zero, one = one, two = two, three = three)

@app.route("/map/<string:first>/")
def point(first):
    #generate the estimated time and fastes route images
    time, images = route(first,first)
    #check if we recieved an error, for now redirect back
    if time == "ERROR":
        """eventually error listening will be more sophisticated.
        I want time to contain "ERROR" and images to be a string of the error,
        so I can make a special HTML file to render with the error message."""
        return redirect(url_for("blank"))
    floors = []
    for floor in images:
        byte_io = BytesIO()
        images[floor].save(byte_io, 'PNG')
        byte_io.seek(0)
        result = base64.b64encode(byte_io.getvalue())
        result = str(result)[2:-1]
        floors.append(result)
    time = int(time)
    zero = floors[0]
    one = floors[1]
    two = floors[2]
    three = floors[3]
    return render_template("map.html",time=time,\
                           zero=zero,one=one,two=two,three=three)

@app.route("/map/<string:first>/<string:second>/")
def path(first, second):
    #generate the estimated time and fastes route images
    time, images = route(first,second)
    #check if we recieved an error, for now redirect back
    if time == "ERROR":
        """eventually error listening will be more sophisticated.
        I want time to contain "ERROR" and images to be a string of the error,
        so I can make a special HTML file to render with the error message."""
        return redirect(url_for("blank"))
    #code below does all the image shit
    floors = []
    for floor in images:
        byte_io = BytesIO()
        images[floor].save(byte_io, 'PNG')
        byte_io.seek(0)
        result = base64.b64encode(byte_io.getvalue())
        result = str(result)[2:-1]
        floors.append(result)
    time = int(time)
    zero = floors[0]
    one = floors[1]
    two = floors[2]
    three = floors[3]
    return render_template("map.html",time=time,\
                           zero=zero,one=one,two=two,three=three)

#if somebody tries to fuck with the url it'll take them to a blank map
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for("blank"))

if __name__ == "__main__":
    app.run()
