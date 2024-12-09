// Hardcoded user credentials
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
];

// Redirect based on login status
if (window.location.pathname.includes("health.html") && !localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

// Handle login logic
if (window.location.pathname.includes("index.html")) {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'health.html';
        } else {
            loginError.textContent = "Invalid username or password!";
        }
    });
}

// Handle health recommendations logic
if (window.location.pathname.includes("health.html")) {
    const predictionForm = document.getElementById('predictionForm');
    const predictionResult = document.getElementById('predictionResult');
    const logoutButton = document.getElementById('logoutButton');

    predictionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cholesterol = document.getElementById('chol').value;

        if (cholesterol > 200) {
            // Weekly schedule for high cholesterol
            const weeklySchedule = `
                <h3>Weekly Exercise and Diet Schedule (For 3 Months)</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Exercise</th>
                            <th>Diet Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Monday</td>
                            <td>30 minutes Cardio + Chest Workouts</td>
                            <td>Oatmeal with fruits, Grilled chicken salad, Steamed veggies with brown rice</td>
                        </tr>
                        <tr>
                            <td>Tuesday</td>
                            <td>30 minutes Brisk Walk + Weight Training</td>
                            <td>Whole-grain toast with avocado, Lentil soup, Quinoa with grilled salmon</td>
                        </tr>
                        <tr>
                            <td>Wednesday</td>
                            <td>Yoga + Full-body Strength Training</td>
                            <td>Low-fat yogurt with nuts, Mixed greens with chickpeas, Baked sweet potato with turkey</td>
                        </tr>
                        <tr>
                            <td>Thursday</td>
                            <td>HIIT Cardio + Upper Body Workouts</td>
                            <td>Fruit smoothie with protein powder, Grilled tofu salad, Stir-fried veggies with tofu</td>
                        </tr>
                        <tr>
                            <td>Friday</td>
                            <td>45 minutes Cycling + Core Workouts</td>
                            <td>Scrambled eggs with spinach, Quinoa bowl with veggies, Grilled chicken with asparagus</td>
                        </tr>
                        <tr>
                            <td>Saturday</td>
                            <td>Swimming + Active Stretching</td>
                            <td>Whole-grain pancakes with berries, Caesar salad with grilled chicken, Sautéed fish with rice</td>
                        </tr>
                        <tr>
                            <td>Sunday</td>
                            <td>Rest Day / Light Yoga</td>
                            <td>Fresh fruit bowl, Veggie wrap, Homemade vegetable soup</td>
                        </tr>
                    </tbody>
                </table>
                <p><strong>Note:</strong> Repeat this weekly plan for 3 months for optimal results.</p>
            `;

            predictionResult.innerHTML = `
                <p><strong>High cholesterol detected.</strong> Follow this plan for better health:</p>
                ${weeklySchedule}
            `;
        } else {
            // Recommendations for normal cholesterol
            predictionResult.innerHTML = `
                <p><strong>Cholesterol levels are normal.</strong> Maintain a healthy lifestyle with balanced meals and regular exercise.</p>
            `;
        }
    });

    // Logout functionality
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
}
