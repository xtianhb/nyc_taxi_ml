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
├── ASSIGNMENT.md
├── Home_credit_default_risk.ipynb
├── README.md
└── requirements.txt
```

## Requirement

- black==23.1.0
- matplotlib==3.6.3
- numpy==1.24.2
- pandas==1.5.3
- scikit-learn==1.2.1
- seaborn==0.12.2

```pip install -r requirements.txt```


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

