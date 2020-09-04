from flask import Flask,jsonify
from threading import Thread 
import json
import time
import subprocess

class Ngrok:
    def __init__(self):
        self.isAlive=True
        self.thread=None
        self.ngrokLocal='curl http://127.0.0.1:4040/api/tunnels'
        self.destructiveCommand="kill -9 $(ps -ef | grep 'ngrok' | grep -v 'grep' | awk '{print $2}')"

    def ngrokStart(self,portNo):
        self.command="ngrok http {}".format(portNo)
        self.res=subprocess.Popen(self.command,stdout=subprocess.PIPE,shell=True)
        (out,err)=self.res.communicate()

    def startServing(self,portNo):
        self.thread = Thread(target = self.ngrokStart, args =(portNo, ), daemon = True) 
        self.thread.start()
        time.sleep(5)
        self.URL=self.urlGenerator()
        return jsonify({"url":self.URL})
    
    def urlGenerator(self):
        self.res=subprocess.Popen(self.ngrokLocal,stdout=subprocess.PIPE,shell=True)
        self.response=json.loads(self.res.stdout.read().decode('ascii'))
        return self.response['tunnels'][1]['public_url']

    def stopServing(self):
        self.res=subprocess.Popen(self.destructiveCommand,stdout=subprocess.PIPE,shell=True)
        (out,err)=self.res.communicate()
        self.thread=None
        return jsonify({"res":True})



