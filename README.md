## NYC Taxi Fare and Trip Duration Prediction

![NYCtaxi](https://github.com/Dotto-Luis/Projects/assets/93018629/7a30c89d-aeeb-4cc1-8bea-f971d7d0f15e)

## Business Goal

NYC Taxi Fare and Trip Duration Prediction

This project aims to leverage the vast amount of ride data in New York City to predict taxi ride fares and durations. The focus is on utilizing data available at the beginning of a ride, including pickup/dropoff coordinates, trip distance, start time, passenger count, and rate code (standard or airport). Predicting these factors can assist passengers in making informed commuting decisions and help drivers choose more profitable rides.

The project involves building predictive models trained on a dataset of NYC taxi rides, split into training and testing sets. Evaluation will be based on the model's accuracy in predicting fares and durations. Additionally, the project can extend to analyze factors impacting rides, such as traffic, weather, and road closures, providing insights for operational optimization and customer satisfaction.

Furthermore, the project explores the potential to predict taxi demand, assisting dispatchers in decision-making for profit margin improvement. In summary, it offers an opportunity to apply machine learning to real-world data, gaining valuable insights into NYC's transportation industry.


## About the data

The dataset can be accessed from the [Official NYC web site](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page). For this particular project we advise you to use the 2022 TLC Trip Record Data given is the most complete and up-to-date dataset on the site at the moment.

We are going to use only the data corresponding to "Yellow Taxi Trip Records".

Because of the dataset size, it was split into separate files, one for each month of the year. You can start doing experiments using only one month of data. We advise you to use [Yellow Taxi Trip Records (PARQUET) - May 2022 as a start](https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2022-05.parquet).

## Project workflow

![Screenshot from 2023-12-22 13-00-59](https://github.com/xtianhb/nyc_taxi_ml/assets/93018629/d66217f8-0c9b-47c5-a19a-84ba7767e1a5)


## Project Structure

Before starting to work, let's take a deep overview of the project structure and each module inside:

```console
├── dataset
│   ├── application_test_aai.csv
│   ├── application_train_aai.csv
│   ├── HomeCredit_columns_description.csv
├── src
│   ├── __init__.py
│   ├── config.py
│   ├── data_utils.py
│   ├── preprocessing.py
└── tests
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_data_utils.py
│   └── test_preprocessing.py
├── NYC_TAXI_ML.ipynb
├── README.md
└── requirements.txt
```

## 1. Getting Started with project configurations

Before you start, you'll need to set up some configurations.

### Environment Variables

Create a `.env` file in the root of webapp/client folder of your project like .env.example and add the following variables:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/
NEXT_PUBLIC_GOOGLE_API_KEY=GOOGLE_MAPS_API_KEY
```

### Google Maps API Key

To obtain a Google Maps API key, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. In the sidebar, navigate to "APIs & Services" > "Credentials."
4. Click on "Create Credentials" and choose "API Key."
5. Restrict your API key based on your project needs (e.g., restrict it to Maps JavaScript API).
6. Copy the generated API key.

For a step-by-step tutorial, you can refer to the [Google Maps API Key Setup Guide](https://developers.google.com/maps/documentation/embed/get-api-key).

If you prefer a video walkthrough, watch [this video tutorial](https://www.youtube.com/watch?v=2_HZObVbe-g) on obtaining and configuring your Google Maps API key.

Replace the placeholder GOOGLE_MAPS_API_KEY in your .env file with the actual API key you obtained from the Google Cloud Console.

## 2. Running Model Notebooks Locally

Before running the notebooks, ensure that you have set up a virtual environment and installed the necessary requirements.

### Setting Up Model Environment

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment (commands may vary depending on the operating system)
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate

# Install requirements
pip install -r model/requirements.txt
```

### Running Notebooks

1. Average Speed Calculation: avg_speed.ipynb

- Navigate to the model/avg_speed.ipynb notebook and run the cells in order.

2. Model Training: model_train.ipynb

- After completing the steps in avg_speed.ipynb, proceed to the model_train.ipynb notebook.
- Run the cells in order to train the model.

Make sure to activate your virtual environment before launching the Jupyter Notebook server. Additionally, ensure that any dependencies required for the notebooks are installed in your virtual environment.

## 3. Building and running your application

When you're ready, start your application by running:
`docker compose up --build -d` .

Your application will be available at http://localhost:3000

To stop the services:
`docker-compose down`


## Project References

Papers and articles
- [Fare and Duration Prediction: A Study of New York City Taxi Rides](https://cs229.stanford.edu/proj2016/report/AntoniadesFadaviFobaAmonJuniorNewYorkCityCabPricing-report.pdf)
-[Towards Data Science - NYC Taxi Fare Prediction](https://towardsdatascience.com/nyc-taxi-fare-prediction-605159aa9c24)
- [New York Yellow Taxi Demand prediction using Machine Learning (Optional part)](https://medium.com/analytics-vidhya/new-york-yellow-taxi-demand-prediction-using-machine-learning-fc697d20ff86)

Data Dictionaries and MetaData
- [Trip Record User Guide](https://www.nyc.gov/assets/tlc/downloads/pdf/trip_record_user_guide.pdf)
- [Yellow Trips Data Dictionary](https://www.nyc.gov/assets/tlc/downloads/pdf/data_dictionary_trip_records_yellow.pdf)

Taxi Zone Maps and Lookup Tables
- [Taxi Zone Lookup Table (CSV)](https://d37ci6vzurychx.cloudfront.net/misc/taxi+_zone_lookup.csv)
- [Taxi Zone Shapefile (PARQUET)](https://d37ci6vzurychx.cloudfront.net/misc/taxi_zones.zip)

