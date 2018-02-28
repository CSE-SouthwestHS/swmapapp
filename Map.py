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
    if v1.getkey()[1] == v2.getkey()[1]:
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
        return self.__key[1]

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
        #shouldn't be necesarry but a failsafe
        return (distance[k2], pathto[k2])
            

def main():
    print("Starting Program")
    v = {}
    e = []
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
            v[vertex.getkey()] = vertex
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
    print("Initialized Graph")

    #code to generate random paths to take for testing
    """
    keys = sorted(list(v.keys()))
    for _ in range(100):
        ax = random.randint(0, len(keys)-1)
        bx = random.randint(0, len(keys)-1)
        while keys[ax][2] == "N":
            ax = random.randint(0, len(keys)-1)
        while keys[bx][2] == "N":
            bx = random.randint(0, len(keys)-1)
        print(keys[ax] + " to " + keys[bx])
        (time, path) = g.path(keys[ax], keys[bx])
        Draw.draw_path(path)
    return
    """

    #classic procedure
    path = g.path(input("Starting Node: "), input("Ending Node: "))
    print("Estimated Time: " + str(path[0]) + " seconds")
    print("Route: ")
    for vertex in path[1]:
        print(vertex.getkey())
    Draw.draw_path(path[1])

if __name__ == "__main__":
    main()
