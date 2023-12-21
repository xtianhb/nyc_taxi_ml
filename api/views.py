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

from model.app_model import predict_taxi_fare_duration

router = Blueprint("app_router", __name__, template_folder="templates")


@router.route("/")
def hello_world():
    return render_template("index.html")


@router.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        # Get inpuz data from the form
        trip_distance = float(request.form["trip_distance"])
        pickup_date = request.form["pickup_date"]
        pickup_time = request.form["pickup_date"]

        # # Use the ML model to make predictions
        # status, fare_amount, trip_duration = predict_taxi_fare_duration(
        #     trip_distance, pickup_date, pickup_time
        # )

        # The following variables are fixed because we do not have a model function yet.
        fare = 20.0
        duration = 15

        # Pass the prediction to the result page
        return render_template("result.html", fare=fare, duration=duration)
