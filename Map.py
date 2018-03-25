import Draw
import random

#a function to read vertices from a .txt file
def load_vertices(name):
    fin = open(name, "r")
    result = []
    for line in fin:
        if line[0] != "#":
            clean = line.split()
            result.append(Vertex(clean[0], int(clean[1]), int(clean[2])))
    return result

#a function to get the distance between two points
def distance(x1, y1, x2, y2):
    return ((x1-x2)**2+(y1-y2)**2)**(.5)

def time_between(v1, v2):
    scale = {
        "0": 16/165,
        "1": 54/468,
        "2": 36/447,
        "3": 38/422
    }
    if v1.getfloor() == v2.getfloor():
        d = distance(v1.getx(), v1.gety(), v2.getx(), v2.gety())
        t = d*scale[v1.getkey()[1]]
        #adjust distance for scale factor
        return t
    else:
        #assuming it takes twelve seconds to go up/down a flight of stairs
        return 13

#a function to read edges from a .txt file
def load_edges(vertices, name):
    fin = open(name, "r")
    result = []
    for line in fin:
        if line[0] != "#":
            #if it's not a commented line
            split = line.split()
            if len(split) == 2:
                #if it is not a hardcoded distance
                k1 = split[0]
                k2 = split[1]
                v1 = vertices[k1]
                v2 = vertices[k2]
                t = time_between(v1, v2)
                result.append([k1, k2, t])
            else:
                #if a distance is hardcoded
                result.append([split[0],split[1], float(split[2])])
    fin.close()
    return result

class Vertex:
    #basically just a neat way to organize data for a vertex
    def __init__(self, key, x = 0, y = 0):
        self.__key = key
        self.__x = x
        self.__y = y
    #getters and setters
    def getx(self):
        return self.__x
    def gety(self):
        return self.__y
    def getpos(self):
        return (self.getx(), self.gety())
    def getkey(self):
        return self.__key
    def getfloor(self):
        evaluate = {
            "N": self.__key[1],
            "W": self.__key[1],
            "C": self.__key[1],
            "E": self.__key[1]
        }
        return evaluate.get(self.__key[0], self.__key[0])

class Edges:
    #two-dimensional associative array to store distances
    #connections is the list of connections, (v1, v2, distance) per element
    def __init__(self, connections):
        self.__edges = {}
        for connection in connections:
            k1 = connection[0]
            k2 = connection[1]
            d = connection[2]
            if k1 in self.__edges:
                self.__edges[k1][k2] = d
            else:
                self.__edges[k1] = {k2: d}
            if k2 in self.__edges:
                self.__edges[k2][k1] = d
            else:
                self.__edges[k2] = {k1: d}
            new = connection[:]

    #returns a dictionary mapping of keys to distances from a given point
    def connections(self, key):
        return self.__edges[key]

    def get(self, k1, k2):
        if k1 in self.__edges:
            return self.__edges[first].get(second, None)
        return None

class Graph:
    #a class to represeent our final graph
    def __init__(self, vertices = {}, edges = []):
        self.__vertices = vertices
        self.__edges = Edges(edges)
    #getters
    def distance(self, k1, k2):
        return self.__edges.get(k1,k2)

    #the big cajun, find the path between two vertices
    def path(self, k1, k2):
        #initialize visited to false, distance to inf, and path to to empty list
        tovisit = {}
        distance = {}
        pathto = {}
        for vertex in self.__vertices:
            distance[vertex] = "inf"

        #loopin let's do it
        current = k1
        tovisit[current] = True
        distance[current] = 0
        pathto[current] = [self.__vertices[current]]
        while len(tovisit) > 0:
            connections = self.__edges.connections(current)
            for key in connections:
                #this if statement makes sure only navigation nodes are considered,
                #or bathrooms/elevators if that's what were looking for
                if key[2] != "N" and key != k2 and key[-2:] not in ["BM", "BW", "EV", "BB"] and key[-3:] != "BGN":
                    continue
                this_distance = distance[current] + connections[key]
                if distance[key] == "inf" or distance[key] > this_distance:
                    distance[key] = this_distance
                    pathto[key] = pathto[current] + [self.__vertices[key]]
                    tovisit[key] = True
            del tovisit[current]
            min_distance = "inf"
            next_cur = None
            for key in tovisit:
                if min_distance == "inf" or distance[key] < min_distance:
                    next_cur = key
                    min_distance = distance[key]
            current = next_cur
            #when we get to our location
            if current == k2:
                return (distance[k2], pathto[k2])
            if (k2 == "BM" or k2 == "BW") and (current[-2:] == k2 or current[-2:] == "BB"):
                return (distance[current], pathto[current])
            if (k2 == "BGN") and (current[-3:] == k2):
                return (distance[current], pathto[current])
            if (k2 == "EV") and (current[-2:] == k2):
                return (distance[current], pathto[current])
        #shouldn't be necesarry but a failsafe
        return (distance[k2], pathto[k2])

#a function to take a user input and turn it into a node namespace
def parse_input(raw):
    raw = raw.replace("%", " ")
    parse = {
        "Art": "N144",
        "Athletic Dir.": "N1AD",
        "Boys Locker Room": "N1BLR",
        "Cafeteria": "C1CF",
        "Community Ed": "C1CE",
        "Courtyard Upper": "C1CY",
        "Girls Locker Room": "N1GLR",
        "Kitchen": "C1KT",
        "Main Office": "C1MO",
        "Pool Seating": "E1PS",
        "The Cove": "W1CV",
        "The Garages": "W1GG",
        "Weight Room": "N1WR",
        "West Gym": "N1WG",
        "Men's Bathroom": "BM",
        "Women's Bathroom": "BW",
        "Gender Neutral Bathroom": "BGN",
        "Elevator": "Elevator",
        "Door 1": "C1D1",
        "Door 2": "W1D2",
        "Door 5": "W1D5",
        "Door 6": "N1D6",
        "Athletic Entrance": "N1D7",
        "Door 7": "N1D7",
        "Door 12": "N1D12",
        "Door 12": "N1D13",
        "Door 15": "C1D15",
        "Door 16": "C1D16",
        "Door 17": "E1D17",
        "Auditorium": "W2AU",
        "Band": "W2BR",
        "BlackBox": "W2XB",
        "Choir": "W2CR",
        "Dance": "W2DR",
        "Media Center": "C2MC",
        "W232 A-M": "W232",
        "Guitar Room": "W2GR",
        "Pool Locker Rooms": "E0LR",
        "Pool": "E0PO",
        "Courtyard Lower": "C1CY",
        "East Gym": "E0EG",
        "Elevator": "EV"
    }
    return parse.get(raw, raw)

#return blank base64 encodings
def defaults():
    zin = open("static/FloorPlans/Floor0.txt", "r")
    zero = zin.read()
    zin.close()
    fin = open("static/FloorPlans/Floor1.txt", "r")
    one = fin.read()
    fin.close()
    sin = open("static/FloorPlans/Floor2.txt", "r")
    two = sin.read()
    sin.close()
    tin = open("static/FloorPlans/Floor3.txt", "r")
    three = tin.read()
    tin.close()
    return (zero, one, two, three)

def route(start, end):
    #parse start and end Nodes
    start = parse_input(start)
    end = parse_input(end)
    #vertices and edges
    v = {}
    e = []
    #boolean variable to check if keys are valid
    startvalid = False
    endvalid = False
    for key in ["Data/W1verts.txt",
                "Data/N1verts.txt",
                "Data/W2verts.txt",
                "Data/W3verts.txt",
                "Data/C1verts.txt",
                "Data/C2verts.txt",
                "Data/C3verts.txt",
                "Data/E0verts.txt",
                "Data/E1verts.txt"
                ]:
        vertices = load_vertices(key)
        for vertex in vertices:
            #set up the necesarry mappings
            v[vertex.getkey()] = vertex
            if vertex.getkey() == start:
                startvalid = True
            if vertex.getkey() == end:
                endvalid = True
            if end in ["BM", "BW", "BGN", "EV"]:
                endvalid = True
    if not endvalid or not startvalid:
        return "ERROR", "Bad Key"
    for key in ["Data/W1edges.txt",
                "Data/N1edges.txt",
                "Data/W2edges.txt",
                "Data/W3edges.txt",
                "Data/C1edges.txt",
                "Data/C2edges.txt",
                "Data/C3edges.txt",
                "Data/E0edges.txt",
                "Data/E1edges.txt",
                "Data/BetweenSections.txt"
                ]:
        e.extend(load_edges(v, key))
    g = Graph(v, e)
    #classic procedure
    path = g.path(start, end)
    images = Draw.draw_path(path[1])
    return (path[0], images)
