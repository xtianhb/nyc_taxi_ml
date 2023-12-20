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


@router.route("/")
def hello_world():
    return render_template("index.html")


@router.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        # Get inpuz data from the form
        trip_distance = float(request.form["trip_distance"])
        pickup_date = request.form["pickup_date"]
        time = request.form["time"]

        # # Use the ML model to make predictions
        # prediction = predict_taxi_fare_duration(
        #     trip_distance, pickup_date, weather, time, transit
        # )

        # The following variables are fixed because we do not have a model function yet.
        fare = 20.0
        duration = 15

        # Pass the prediction to the result page
        return render_template("result.html", fare=fare, duration=duration)
