## Machine Learning Model

### How to run in Docker

1) Run `model_train.ipynb` in your local to generate models.

2) Run docker app:

`docker build -t mlapp .`

`docker run -p 5000:5000 mlapp`

The go to your browser and type:

`http://127.0.0.1:5000/test`

You should see something like:

```
{
  "fare_amount": 21.37,
  "status": [
    "OK",
    200
  ],
  "trip_duration": 26
}
```