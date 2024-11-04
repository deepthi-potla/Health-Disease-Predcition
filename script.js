document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formElements = event.target.elements;
    const formData = {
        age: formElements.age.value,
        sex: formElements.sex.value,
        cp: formElements.cp.value,
        trestbps: formElements.trestbps.value,
        chol: formElements.chol.value,
        fbs: formElements.fbs.value,
        restecg: formElements.restecg.value,
        thalach: formElements.thalach.value,
        exang: formElements.exang.value,
        oldpeak: formElements.oldpeak.value,
        slope: formElements.slope.value,
        ca: formElements.ca.value,
        thal: formElements.thal.value
    };

    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('predictionResult').innerHTML = 'Prediction: ' + data.prediction;
    })
    .catch(error => console.error('Error:', error));
});
