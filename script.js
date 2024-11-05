document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // const form = event.target;
    // const formData = {
    //     age: form.age.value,
    //     sex: form.sex.value,
    //     cp: form.cp.value,
    //     trestbps: form.trestbps.value,
    //     chol: form.chol.value,
    //     fbs: form.fbs.value,
    //     restecg: form.restecg.value,
    //     thalach: form.thalach.value,
    //     exang: form.exang.value,
    //     oldpeak: form.oldpeak.value,
    //     slope: form.slope.value,
    //     ca: form.ca.value,
    //     thal: form.thal.value
    // };

    // // Make the fetch request to the Flask API
    // fetch('http://localhost:5000/predict', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         // If the response is not okay, throw an error with the status text
    //         throw new Error('Failed to fetch: ' + response.statusText);
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     // Handle the data from the backend
    //     document.getElementById('predictionResult').innerHTML = data.prediction ?
    //         'Prediction: ' + data.prediction :
    //         'No prediction received. Please check input data.';
    // })
    // .catch(error => {
    //     // Handle any network or response parsing errors
    //     console.error('Error:', error);
    //     document.getElementById('predictionResult').innerHTML = 'Error: ' + error.message;
    // });




    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the value of the cholesterol input from the form
    const cholesterol = document.getElementById('chol').value;

    // Check the cholesterol value to determine the health message
    let codedPrediction;
    if (cholesterol > 200) {
        codedPrediction = 'The user has heart health issues';
    } else {
        codedPrediction = 'The user is healthy';
    }

    // Array of diet recommendations
    const dietRecommendations = [
        "Diet Plan A: Include plenty of fruits and vegetables, whole grains, and low-fat dairy products. Reduce sodium in your diet.",
        "Diet Plan B: Focus on eating fish high in omega-3 fatty acids, such as salmon, twice a week. Limit saturated fats and trans fats.",
        "Diet Plan C: Opt for lean meats and poultry without skin. Prepare foods without added sugars, saturated fats, and sodium."
    ];

    // Randomly select a diet recommendation if the user has health issues
    let selectedDiet = '';
    if (cholesterol > 200) {
        const randomIndex = Math.floor(Math.random() * dietRecommendations.length);
        selectedDiet = `Recommended Diet: ${dietRecommendations[randomIndex]}`;
    }

    // Display the prediction result and optionally the selected diet recommendation
    document.getElementById('predictionResult').innerHTML = `
        Prediction: ${codedPrediction}<br>
        ${selectedDiet}
    `;
});
