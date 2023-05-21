from flask import Flask, jsonify, json, request, render_template

app = Flask(__name__)

@app.route("/my_route/",methods=['POST'])
def my_route():
    print('Received POST request at /my_route/')
    return 'Received POST request at /my_route/'

@app.route('/')
def render_main():
    return render_template('index.html')

@app.route('/hystogram', methods=["POST"])
def hystogram():
    json_data = request.get_json()
    print(json_data)
    return { 'response': 'Nice' }

if __name__ == '__main__':
    app.run()