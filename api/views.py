import requests
from flask import (
    Blueprint,
    current_app,
    flash,
    jsonify,
    redirect,
    render_template,
    request,
    url_for,
)

router = Blueprint("app_router", __name__, template_folder="templates")

MODEL_URL = "http://modelsvc:5000/predict"


@router.route("/")
def hello_world():
    return render_template("index.html")


@router.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        # Get input data from the form
        trip_distance = float(request.form["trip_distance"])
        pickup_date = request.form["pickup_date"]
        pickup_time = request.form["pickup_date"]

        data = {
            "trip_distance": trip_distance,
            "pickup_date": pickup_date,
            "pickup_time": pickup_time,
        }

        response = requests.post(MODEL_URL, json=data)

        # Checking the response
        if response.status_code == 200:  # Check for the appropriate status code
            print("POST request successful!")
            print("Response:", response.json())  # Print the response content
            predictions = response.json()
            fare = predictions["fare_amount"]
            duration = predictions["trip_duration"]
        else:
            print("POST request failed with status code:", response.status_code)
            print(
                "Error message:", response.text
            )  # Print the error message if request failed
            fare, duration = -1, -1

        # Pass the prediction to the result page
        return render_template("result.html", fare=fare, duration=duration)
