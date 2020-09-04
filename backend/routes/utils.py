import random

def RandomNoGenrator(start,end):
    return random.randint(start,end)

def ParseRequest(request,types):
    dict={}
    if request.method=='GET':
        for id in types:
            dict[id]=request.args.get(id)
    return dict