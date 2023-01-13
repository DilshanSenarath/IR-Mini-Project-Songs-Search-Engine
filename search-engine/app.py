from flask import Flask, render_template, request

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