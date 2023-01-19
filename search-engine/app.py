from flask import Flask, render_template, request
from query_processor import QueryProcessor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',response=None)

@app.route('/results')
def results():
    res = None
    if(request.method == "GET"):
        query = request.args['query']
        
        qp = QueryProcessor(query)
        qp.preprocess()

        res = qp.execute()
    return render_template('results.html',response=res)

@app.route('/result')
def result():
    res = None
    if(request.method == "GET"):
        id = request.args['id']
        
        qp = QueryProcessor(None)
        res = qp.get_singal_result(id)
        res['hits']['hits'][0]['_source']['video_watch'] = res['hits']['hits'][0]['_source']['video_watch'].replace('watch?v=', 'embed/')
    return render_template('result.html',response=res)
 
if __name__ == '__main__':
    app.DEBUG = True
    app.run()