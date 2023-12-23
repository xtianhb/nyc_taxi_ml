import os
import sys
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder


hour_zones = [
    "hour_zone_morning",
    "hour_zone_noon",
    "hour_zone_afternoon",
    "hour_zone_evening",
    "hour_zone_night",
]

features = ["trip_distance", "hour_of_day", "rush_hour", "hour_zone"]
targets = ["fare_amount", "trip_duration"]


def categorize_hour(hour: int):
    """ """
    if 6 <= hour < 12:
        return "morning"
    elif 12 <= hour < 13:
        return "noon"
    elif 13 <= hour < 18:
        return "afternoon"
    elif 18 <= hour < 22:
        return "evening"
    else:
        return "night"


def categorize_rush_hour(hour: int):
    """ """
    if 16 <= hour <= 20:
        return 1
    else:
        return 0


def add_hour_zone(df: pd.DataFrame):
    """ """
    df["hour_zone"] = df["hour_of_day"].apply(categorize_hour)
    return df


def add_rush_hour(df: pd.DataFrame):
    """ """
    df["rush_hour"] = df["hour_of_day"].apply(categorize_rush_hour)
    return df


def process_outliers(df: pd.DataFrame, action: str = "delete"):
    """ """

    if action == "delete":
        df = delete_outliers(df)
    elif action == "impute":
        df = impute_outliers(df)
    else:
        pass
    return df


def impute_outliers(df: pd.DataFrame):
    """ """

    fare_median = df["fare_amount"].median()
    fare_outliers = df[(df["fare_amount"] < 0) | (df["fare_amount"] > 70)]
    df.loc[fare_outliers.index, "fare_amount"] = fare_median

    trip_duration_median = df["trip_duration"].median()
    trip_duration_outliers = df[(df["trip_duration"] < 0) | (df["trip_duration"] > 75)]
    df.loc[trip_duration_outliers.index, "trip_duration"] = trip_duration_median

    trip_distance_median = df["trip_distance"].median()
    trip_distance_outliers = df[(df["trip_distance"] > 20)]
    df.loc[trip_distance_outliers.index, "trip_distance"] = trip_distance_median

    return df


def delete_outliers(df: pd.DataFrame):
    """ """

    lower_bound = df["trip_distance"].quantile(0.01)
    upper_bound = df["trip_distance"].quantile(0.99)
    df = df[
        (df["trip_distance"] >= 0)
        & (df["trip_distance"] >= lower_bound)
        & (df["trip_distance"] <= upper_bound)
    ]

    lower_bound = df["fare_amount"].quantile(0.01)
    upper_bound = df["fare_amount"].quantile(0.99)
    df = df[
        (df["fare_amount"] >= 0)
        & (df["fare_amount"] >= lower_bound)
        & (df["fare_amount"] <= upper_bound)
    ]

    lower_bound = df["trip_duration"].quantile(0.01)
    upper_bound = df["trip_duration"].quantile(0.99)
    df = df[
        (df["trip_duration"] >= 0)
        & (df["trip_duration"] >= lower_bound)
        & (df["trip_duration"] <= upper_bound)
    ]

    return df


def fill_na_values(df: pd.DataFrame):
    """ """
    mean_value = int(df["passenger_count"].mean())
    df["passenger_count"].fillna(mean_value, inplace=True)

    mean_value = int(df["RatecodeID"].mean())
    df["RatecodeID"].fillna(mean_value, inplace=True)

    return df


def add_trip_duration(df: pd.DataFrame):
    """ """
    df["trip_duration"] = df["tpep_dropoff_datetime"] - df["tpep_pickup_datetime"]
    df["trip_duration"] = df["trip_duration"].dt.total_seconds() / 60
    return df


def select_features(df: pd.DataFrame, selected_features: list):
    """ """
    return df[selected_features]


def add_day_of_week(df: pd.DataFrame):
    """ """
    df["day_of_week"] = df["tpep_pickup_datetime"].dt.day_of_week
    return df


def add_hour_of_day(df: pd.DataFrame):
    """ """
    df["hour_of_day"] = df["tpep_pickup_datetime"].dt.hour
    return df


def add_rate_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["RatecodeID"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["RatecodeID"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    return final_df, (encoder, "RatecodeID")


def add_vendor_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["VendorID"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["VendorID"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    final_df.drop(columns="VendorID", inplace=True)
    return final_df, (encoder, "VendorID")


def add_dayofweek_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["day_of_week"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["day_of_week"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    return final_df, (encoder, "day_of_week")


def add_hourzone_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["hour_zone"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["hour_zone"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    final_df.drop(columns="hour_zone", inplace=True)
    return final_df, (encoder, "hour_zone")


def add_targets(df: pd.DataFrame):
    """ """
    df = add_trip_duration(df)
    return df


def add_features(df: pd.DataFrame):
    """ """
    df = add_hour_of_day(df)
    df = add_hour_zone(df)
    df = add_rush_hour(df)
    return df


def create_one_hot_encodings(df: pd.DataFrame, features: str):
    """ """
    encoders = []

    if "rate_id" in features:
        df, encoder = add_rate_encoding(df)
        encoders.append(encoder)
    if "vendor_id" in features:
        df, encoder = add_vendor_encoding(df)
        encoders.append(encoder)
    if "day_of_week" in features:
        df, encoder = add_dayofweek_encoding(df)
        encoders.append(encoder)
    if "hour_zone" in features:
        df, encoder = add_hourzone_encoding(df)
        encoders.append(encoder)

    return df, encoders


def split_dataset(df: pd.DataFrame):
    y = df[["trip_duration", "fare_amount"]]
    X = df.drop(columns=["trip_duration", "fare_amount"], inplace=False)
    return X, y


def process_inference():
    pass
