import time

#a function to read vertices from a .txt file
def load_vertices(name):
    fin = open(name, "r")
    result = []
    for line in fin:
        if line[0] != "#":
            clean = line.split()
            result.append(Vertex(clean[0]))
    return result

#a function to read edges from a .txt file
def load_edges(name):
    fin = open(name, "r")
    result = []
    for line in fin:
        if line[0] != "#":
            split = line.split()
            result.append([split[0], split[1], float(split[2])])
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
        return self.__floor

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
    def __init__(self, vertices = [], edges = []):
        self.__vertices = vertices
        self.__edges = Edges(edges)
    #getters
    def distance(self, k1, k2):
        return self.__edges.get(k1,k2)

    #the smaller cajun, recursive aspect of the path finding

    #the big cajun, find the path between two vertices
    def path(self, k1, k2):
        #initialize visited to false, distance to inf, and path to to empty list
        tovisit = {}
        distance = {}
        pathto = {}
        for vertex in self.__vertices:
            distance[vertex.getkey()] = "inf"

        #loopin let's do it
        current = k1
        tovisit[current] = True
        distance[current] = 0
        pathto[current] = [current]
        while len(tovisit) > 0:
            connections = self.__edges.connections(current)
            for key in connections:
                this_distance = distance[current] + connections[key]
                if distance[key] == "inf" or distance[key] > this_distance:
                    distance[key] = this_distance
                    pathto[key] = pathto[current] + [key]
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
    print("start")
    v = []
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
        v.extend(load_vertices(key))
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
        e.extend(load_edges(key))

    g = Graph(v, e)
    print("initialized")
    start = float(time.time())
    print(g.path("E106","W2BR"))
    print(float(time.time())-start)

if __name__ == "__main__":
    main()
