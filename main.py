from flask import Flask, flash, redirect, url_for, render_template, request, session, abort, jsonify
from flask_mail import Mail, Message
from Map import route, defaults
from io import BytesIO
import base64
import os

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
global_location = "home"

@app.route("/home/", methods=["GET","POST"])
def home():
    return render_template("index.html", page=global_location)

@app.route("/page_navigation/")
def page_navigation():
    try:
        goal = request.args.get('goal', None, type=str)
        if goal == None:
            return url_for("home")
        realpath = os.path.dirname(os.path.realpath(__file__))+"/templates/parts/"
        with open(realpath + goal + "head.html","r") as f:
                head = f.read()
        with open(realpath + goal + "body.html","r") as f:
                body = f.read()
        return jsonify(head=head, body=body)

    except Exception as e:
        return redirect(url_for("home"))

#these routes are needed to go from the map interface back to regular
@app.route("/gohome/")
def gohome():
    global global_location
    global_location = "home"
    return redirect(url_for("home"))
@app.route("/contact/")
def contact():
    global global_location
    global_location = "contact"
    return redirect(url_for("home"))
@app.route("/help/")
def help():
    global global_location
    global_location = "help"
    return redirect(url_for("home"))

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

@app.route("/egg/")
def egg():
    return render_template("egg.html")

@app.route("/map/")
def blank():
    zero, one, two, three = defaults()
    return render_template("map.html", zero = zero, one = one, two = two, three = three)

@app.route("/load_path/")
def load_path():
    try:
        #get the input
        start = request.args.get('start', "NOSTART", type=str)
        end = request.args.get('end', "NOEND", type=str)
        #get the route
        time, images = route(start, end)
        if time == "ERROR":
            zero, one, two, three = defaults()
            return jsonify(time=time,zero=zero,one=one,two=two,three=three)
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
        return jsonify(time=time,zero=zero,one=one,two=two,three=three)
    except Exception as e:
        #if theres an error return defaults
        zero, one, two, three = defaults()
        return jsonify(time=str(e),zero=zero,one=one,two=two,three=three)

#if somebody tries to fuck with the url it'll take them to a blank map
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run()
