from flask import Flask, request
import joblib
import os


app = Flask(__name__)


@app.route("/rain", methods=["POST"])
def do_rain_prediction():
    if request.method == "POST":
        model = joblib.load(
            os.path.dirname(__file__) + "/../training/models/rain_model.pkl")
        data = request.json

        if type(data) != list and len(data) != 6:
            return "Bad Data", 400

        res = str(model.predict([data]))
        if res[-2] == ".":  # ex: "[1.]"
            res = res[:-1] + "0" + res[-1:]
        print(res)
        return res, 200
    else:
        return "Method Not Allowed", 405


if __name__ == "__main__":
    app.run(port=8000)
