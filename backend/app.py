from flask import Flask,jsonify,request
from flask_cors import CORS
from routes.utils import ParseRequest
from routes.Serve import *
from routes.Typing import *


app = Flask(__name__)
CORS(app)
serveClient=Ngrok()
typingGame=Typing()

@app.route('/serve/start')
def start():
    # 300 port
    return serveClient.startServing(3000)

@app.route('/serve/stop')
def stop():
    return serveClient.stopServing()


@app.route('/typing',methods=['GET'])
def typing():
    inputs=ParseRequest(request,list(['id']))
    if inputs['id']==None:
        typingGame.set(None)
    else:
        typingGame.set(inputs['id'])

    return typingGame.story()

app.run(debug=True)
