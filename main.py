from flask import Flask, flash, redirect, url_for, render_template, request, session, abort
from random import randint

from Map import route, defaults
from io import BytesIO
import base64

app = Flask(__name__, static_url_path='/static')

@app.route("/")
@app.route("/home/")
def home():
    return render_template("index.html")

@app.route("/contact/")
def contact():
    return render_template("contact.html")

@app.route("/help/")
def help():
    return render_template("help.html")

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

if __name__ == "__main__":
    app.run()
