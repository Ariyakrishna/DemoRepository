from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the frontend

# Connect to MongoDB running in Docker
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["mydatabase"]
collection = db["mycollection"]

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    username = data.get("username")
    age = data.get("age")
    
    if not username or not age:
        return jsonify({"message": "Username and age are required!"}), 400
    
    user_data = {"username": username, "age": age}
    collection.insert_one(user_data)
    
    return jsonify({"message": "Data stored successfully!"})

@app.route("/users", methods=["GET"])
def get_users():
    users = list(collection.find({}, {"_id": 0}))
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
