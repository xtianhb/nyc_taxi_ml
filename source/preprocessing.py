import os
import sys
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder


def categorize_hour(hour: int):
    """ """
    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 15:
        return "Noon"
    elif 15 <= hour < 18:
        return "Afternoon"
    elif 18 <= hour < 22:
        return "Evening"
    else:
        return "Night"


def categorize_rush_hour(hour: int):
    """ """
    if 16 <= hour <= 20:
        return 1
    else:
        return 0


def map_hour_zone(df: pd.DataFrame):
    df["hour_zone"] = df["hour_of_day"].apply(categorize_hour)
    return df


def map_rush_hour(df: pd.DataFrame):
    df["rush_hour"] = df["hour_of_day"].apply(categorize_rush_hour)
    return df


def filter_outliers(df: pd.DataFrame):
    rate_median = int(df["RatecodeID"].median())
    rate_outliers = df[(df["RatecodeID"] > 6)]
    df.loc[rate_outliers.index, "RatecodeID"] = rate_median

    passenger_median = df["passenger_count"].median()
    passenger_outliers = df[(df["passenger_count"] > 5) | (df["passenger_count"] == 0)]
    df.loc[passenger_outliers.index, "passenger_count"] = passenger_median

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
    df = df[(df["RatecodeID"] >= 0) & (df["RatecodeID"] <= 6)]

    df = df[(df["passenger_count"] >= 1) & (df["RatecodeID"] <= 5)]

    Q1 = df["fare_amount"].quantile(0.25)
    Q3 = df["fare_amount"].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 3 * IQR
    upper_bound = Q3 + 3 * IQR
    df = df[
        (df["fare_amount"] > 2)
        & (df["fare_amount"] >= lower_bound)
        & (df["fare_amount"] <= upper_bound)
    ]

    Q1 = df["trip_duration"].quantile(0.25)
    Q3 = df["trip_duration"].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 3 * IQR
    upper_bound = Q3 + 3 * IQR
    df = df[
        (df["trip_duration"] > 0)
        & (df["trip_duration"] >= lower_bound)
        & (df["trip_duration"] <= upper_bound)
    ]

    Q1 = df["trip_distance"].quantile(0.25)
    Q3 = df["trip_distance"].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 3 * IQR
    upper_bound = Q3 + 3 * IQR
    df = df[(df["trip_distance"] >= lower_bound) & (df["trip_distance"] <= upper_bound)]

    return df


def fill_na_values(df: pd.DataFrame):
    """ """
    mean_value = int(df["passenger_count"].mean())
    df["passenger_count"].fillna(mean_value, inplace=True)

    mean_value = int(df["RatecodeID"].mean())
    df["RatecodeID"].fillna(mean_value, inplace=True)

    return df


def add_trip_duration_feature(df: pd.DataFrame):
    """ """
    df["trip_duration"] = df["tpep_dropoff_datetime"] - df["tpep_pickup_datetime"]
    df["trip_duration"] = df["trip_duration"].dt.total_seconds() / 60
    return df


def drop_features(df: pd.DataFrame, features_drop_list: list):
    """ """
    df.drop(columns=features_drop_list, inplace=True)
    return df


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
    # final_df.drop(columns="RatecodeID", inplace=True)
    return final_df


def add_vendor_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["VendorID"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["VendorID"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    final_df.drop(columns="VendorID", inplace=True)
    return final_df


def add_dayofweek_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["day_of_week"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["day_of_week"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    # final_df.drop(columns="day_of_week", inplace=True)
    return final_df


def add_hourzone_encoding(df: pd.DataFrame):
    encoder = OneHotEncoder()
    encoded_data = encoder.fit_transform(df[["hour_zone"]])
    encoded_df = pd.DataFrame(
        encoded_data.toarray(), columns=encoder.get_feature_names_out(["hour_zone"])
    )
    final_df = pd.concat([df, encoded_df], axis=1, join="inner")
    final_df.drop(columns="hour_zone", inplace=True)
    return final_df


def add_rush_encoding(df: pd.DataFrame):
    l_encoder = LabelEncoder()
    df["rush_hour"] = l_encoder.fit_transform(df["rush_hour"])
    return df


def create_one_hot_encodings(df: pd.DataFrame):
    df = add_rate_encoding(df)
    df = add_vendor_encoding(df)
    df = add_dayofweek_encoding(df)
    df = add_hourzone_encoding(df)
    df = add_rush_encoding(df)
    return df


def split_dataset(df: pd.DataFrame):
    y_td, y_fa = df[["trip_duration"]], df[["fare_amount"]]
    X = df.drop(columns=["trip_duration", "fare_amount"], inplace=False)
    return X, y_td, y_fa
