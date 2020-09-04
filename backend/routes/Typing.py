import os
from flask import jsonify
from routes.utils import RandomNoGenrator 
FileCount=12

class Typing:
    def __init__(self):
        self.path="typing/stories/"

    def set(self,id):
        if(id==None):
            id=RandomNoGenrator(1,FileCount)
        self.id=id
        self.filepath=self.path+str(id)

    def story(self):
        with open(self.filepath,"r") as FileOBJ:
            self.content=FileOBJ.read()
            FileOBJ.close()
        print(self.filepath)
        return jsonify({"content":self.content,"id":self.id})

