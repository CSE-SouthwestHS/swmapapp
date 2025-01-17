from PIL import Image, ImageDraw
import os

#draws an individual point
def draw_vertex(draw, vertex, r, fill = (100, 50, 180)):
    draw.ellipse([vertex.getx()-r, vertex.gety()-r, \
                 vertex.getx()+r, vertex.gety()+r], \
                 outline = (100, 50, 180), fill = fill)

#draws a clean line
def draw_line(draw, v1, v2, r):
    draw_vertex(draw, v1, r)
    draw.line([v1.getx(), v1.gety(), v2.getx(), v2.gety()], \
                             width = r*2, fill = (100, 50, 180))
    draw_vertex(draw, v2, r)

#creates path images in a folder, in a folder
def draw_path(vertices, r = 12):
    if len(vertices) < 1:
        #failsafe
        return False
    realpath = os.path.dirname(os.path.realpath(__file__))+"/static/FloorPlans/"
    floor_map = {
        "0": realpath + "SW_Map_Floor_0.png",
        "1": realpath + "SW_Map_Floor_1.png",
        "2": realpath + "SW_Map_Floor_2.png",
        "3": realpath + "SW_Map_Floor_3.png"
    }
    images = {
        "0": Image.open(floor_map["0"]),
        "1": Image.open(floor_map["1"]),
        "2": Image.open(floor_map["2"]),
        "3": Image.open(floor_map["3"])
    }
    #initialize shit
    if len(vertices) == 1:
        #one item case
        curimage = images[vertices[0].getfloor()]
        curdraw = ImageDraw.Draw(curimage)
        draw_vertex(curdraw, vertices[0], r*1.7)
        return images
    #the big cajun
    #we delay drawing first node till the end to make it a different color
    ix = 0
    curimage = images[vertices[0].getfloor()]
    curdraw = ImageDraw.Draw(curimage)
    while ix < len(vertices)-1:
        v1 = vertices[ix]
        v2 = vertices[ix + 1]
        if v1.getfloor() == v2.getfloor():
            draw_line(curdraw, v1, v2, r)
        else:
            draw_vertex(curdraw, v1, r*1.7)
            curimage = images[v2.getfloor()]
            curdraw = ImageDraw.Draw(curimage)
            draw_vertex(curdraw, v2, r*1.7)
        ix += 1
    #draw the first and last ones pretty
    draw_vertex(curdraw, vertices[-1], r*1.7, fill = (0,0,0))
    draw_vertex(curdraw, vertices[-1], r*1.3, fill = (255,255,255))
    curimage = images[vertices[0].getfloor()]
    curdraw = ImageDraw.Draw(curimage)
    draw_vertex(curdraw, vertices[0], r*1.7, fill = (0,0,0))
    draw_vertex(curdraw, vertices[0], r*1.4, fill = (100,50,180))
    return images
