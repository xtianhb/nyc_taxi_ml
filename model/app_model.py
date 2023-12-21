import sys
import os
import pandas as pd
from flask import Flask, request, jsonify, Response
import preprocessing
import pickle

if os.path.exists("model_td.pkl"):
    with open("model_td.pkl", "rb") as model_td_file:
        model_td = pickle.load(model_td_file)
else:
    print("TD model not found!")

if os.path.exists("model_fa.pkl"):
    with open("model_fa.pkl", "rb") as model_fa_file:
        model_fa = pickle.load(model_fa_file)
else:
    print("FA model not found!")

if os.path.exists("scaler.pkl"):
    with open("scaler.pkl", "rb") as scaler_file:
        scaler = pickle.load(scaler_file)
else:
    print("Scaler model not found!")

if os.path.exists("encoders.pkl"):
    with open("encoders.pkl", "rb") as encoders_file:
        encoders = pickle.load(encoders_file)
else:
    print("Encoders model not found!")

app = Flask(__name__)


@app.route("/test", methods=["GET"])
def test():
    try:
        trip_distance = "5.5"
        pickup_date = "2023/12/21"
        pickup_time = "14:30:21"inference_preprocess
        features = preprocessing.(
            trip_distance, pickup_date, pickup_time
        )
        for encoder in encoders:
            features = encoder.transform(features)
        trip_duration = model_td.predict(features)
        fare_amount = model_fa.predict(features)
        return jsonify(
            {
                "status": ("OK", 200),
                "trip_duration": trip_duration,
                "fare_amount": fare_amount,
            }
        )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        return Response(
            f"Error {exc_type} in line {exc_tb.tb_lineno}: {e}",
            status=400,
        )


@app.route("/predict", methods=["GET", "POST"])
def predict():
    try:
        data = request.get_json()
        trip_distance = data["trip_distance"]
        pickup_date = data["pickup_date"]
        pickup_time = data["pickup_time"]
        features = preprocessing.inference_preprocess(
            trip_distance, pickup_date, pickup_time
        )
        features = scaler.transform(features)
        trip_duration = model_td.predict(features)
        fare_amount = model_fa.predict(features)
        return jsonify(
            {
                "status": ("OK", 200),
                "trip_duration": trip_duration,
                "fare_amount": fare_amount,
            }
        )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return Response(
            f"Error {exc_type} in line {exc_tb.tb_lineno}: {e}",
            status=400,
        )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
