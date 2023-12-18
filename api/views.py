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
