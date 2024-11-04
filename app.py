from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS if your frontend is on a different domain or port

# Function to safely load pickled models
def load_model(path):
    try:
        with open(path, 'rb') as file:
            return pickle.load(file)
    except Exception as e:
        print(f"Error loading the model {path}: {str(e)}")
        return None

# Load your trained models and scaler from pickle files
models = {
    'logistic_regression': load_model('models/log_reg_model.pkl'),
    'naive_bayes': load_model('models/naive_bayes_model.pkl'),
    'decision_tree': load_model('models/decision_tree_model.pkl'),
    'support_vector_machine': load_model('models/svc_model.pkl'),
}
scaler = load_model('models/scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    model_name = data.get('model')
    features = np.array(data.get('features', [])).reshape(1, -1)  # Ensure features are in the right shape

    # Check if model exists and scaler is loaded
    if model_name in models and models[model_name] is not None and scaler is not None:
        # Scale the features using the loaded scaler
        features_scaled = scaler.transform(features)
        # Get the model and make prediction
        model = models[model_name]
        prediction = model.predict(features_scaled)
        return jsonify({'prediction': int(prediction[0])})
    elif model_name not in models:
        return jsonify({'error': f'Model {model_name} not found'}), 404
    else:
        return jsonify({'error': 'Model or scaler could not be loaded'}), 500

if __name__ == '__main__':
    app.run(debug=True)
