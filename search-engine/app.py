from flask import Flask, render_template, request
from query_processor import QueryProcessor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',response=None)

@app.route('/results')
def results():
    return render_template('results.html',response=None)

@app.route('/result')
def result():
    return render_template('result.html',response=None)

@app.route('/test', methods=["GET"])
def test():
    if(request.method == "GET"):
        query = request.args['query']
        singer = None
        lyricist = None 
        musician = None
        if ('singer' in request.args):
            singer = request.args['singer']
        if ('lyricist' in request.args):
            lyricist = request.args['lyricist']
        if ('musician' in request.args):
            musician = request.args['musician']
        
        qp = QueryProcessor(query, singer, lyricist, musician)
        qp.preprocess()

        res = qp.execute()

    
    return render_template('test.html',response=res)

# @app.route('/search',methods=["POST"])
# def search():
#     res = []
#     if(request.method == "POST"):
#         query = request.form['query']
#         res = QueryProcessor.processQ(query)
#         print("Got %d Hits:" % res['hits']['total']['value'])
#     return render_template('index.html',response=res)
 
if __name__ == '__main__':
    app.DEBUG = True
    app.run()