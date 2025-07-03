// JavaScript code for the typing test application
// Sample texts for each difficulty level
const sampleTexts = {
    easy: [
        "This is an easy example.",
        "Start off simple.",
        "Typing is fun and easy to learn.",
        "Practice makes perfect."
    ],
    medium: [
        "JavaScript is a versatile programming language used for web development.",
        "Bootstrap helps create responsive and mobile-friendly websites.",
        "Typing speed tests are a great way to improve your skills.",
        "The quick brown fox jumps over the lazy dog.",
        "This example is more of a challenge than the previous level."
    ],
    hard: [
        "Artificial intelligence is transforming the way we interact with technology.",
        "The complexity of algorithms can vary based on their time and space efficiency.",
        "Understanding asynchronous programming is crucial for modern web development.",
        "You should find this example text quite challenging to type accurately.",
    ]
};

// Function to get a random paragraph based on difficulty
function getRandomParagraph(difficulty) {
    const texts = sampleTexts[difficulty];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Function to set the default sample text
function setDefaultSampleText() {
    const defaultDifficulty = "easy"; // Set the default difficulty level
    const sampleText = getRandomParagraph(defaultDifficulty); // Get a random paragraph for the default difficulty
    document.getElementById("sample-text").textContent = sampleText; // Set the sample text
}

// Function to set the default difficulty in the dropdown
function setDefaultDifficulty() {
    document.getElementById("difficulty-select").value = "easy"; // Set the dropdown to "easy"
}

// Call the functions when the page loads
document.addEventListener("DOMContentLoaded", () => {
    setDefaultDifficulty(); // Set the default difficulty
    setDefaultSampleText(); // Set the default sample text
});

// Variables to track the start and end time
let startTime = null;
let endTime = null;
let testRunning = false; // Flag to check if the test is running

// Function to reset the typing test

function resetTest() {
    document.getElementById("typing-input").value = "";
    setDefaultSampleText();
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;
    document.getElementById("typing-input").disabled = false; // Enable typing

    // Reset Stats/Info section
    const statsInfo = document.querySelector(".col-md-4 .p-3");
    statsInfo.innerHTML = `
        <h2>Stats/Info</h2>
        <p>This is where additional information or stats will be displayed.</p>
    `;

    // Reset timer variables
    startTime = null;
    endTime = null;
}

// Event listener for the Retry button
document.getElementById("retry-btn").addEventListener("click", resetTest);


// Function to start the typing test
function startTypingTest() {
    startTime = new Date();
    testRunning = true;
    document.getElementById("stop-btn").disabled = false;
    document.getElementById("typing-input").disabled = false;
    // Optionally, remove the input event listener if you want to prevent retriggering
}

// Function to stop the typing test
function stopTypingTest() {
    endTime = new Date();
    testRunning = false;
    document.getElementById("typing-input").disabled = true; // Disable typing
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    const accuracy = calculateAccuracy();
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;
    displayTestTime(timeTaken, accuracy);
}


// Function to calculate typing accuracy
function calculateAccuracy() {
    const userInput = document.getElementById("typing-input").value;
    const sampleText = document.getElementById("sample-text").textContent.trim();

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === sampleText[i]) {
            correctChars++;
        }
    }
    return userInput.length > 0 ? ((correctChars / userInput.length) * 100).toFixed(2) : "100.00";
}

// Function to calculate and display typing accuracy
function updateTypingAccuracy() {
    if (!testRunning) return;

    const accuracy = calculateAccuracy();

    // Update only the accuracy line in Stats/Info, preserving other info if present
    const statsInfo = document.querySelector(".col-md-4 .p-3");
    let statsHtml = statsInfo.innerHTML;

    // Remove any existing accuracy line
    statsHtml = statsHtml.replace(/<p>Accuracy:.*?<\/p>/, "");

    // Add updated accuracy
    statsInfo.innerHTML = statsHtml + `<p>Accuracy: ${accuracy}%</p>`;
}
  

// Function to display the test time
function displayTestTime(timeTaken, accuracy) {
    const statsInfo = document.querySelector(".col-md-4 .p-3");
    statsInfo.innerHTML = `
        <h2>Results</h2>
        <p>Time taken: ${timeTaken} seconds</p>
        <p>Accuracy: ${accuracy}%</p>
    `;
}

// Event listener for the Start button
//document.getElementById("start-btn").addEventListener("click", startTypingTest);

// Listen for the first input in the textarea to start the test
document.getElementById("typing-input").addEventListener("input", function autoStartTest() {
    if (!testRunning && document.getElementById("typing-input").value.length > 0) {
        startTypingTest();
    }
});

// Event listener for the Stop button
//document.getElementById("stop-btn").addEventListener("click", stopTypingTest);
// listen for the Enter key to stop the test
document.getElementById("typing-input").addEventListener("keydown",function(event) {
    if (event.key === "Enter" && testRunning) {
        event.preventDefault(); // Prevent the default action of Enter key
        stopTypingTest(); // Call the function to stop the test
    }
});

// Event listener for the difficulty dropdown
document.getElementById("difficulty-select").addEventListener("change", () => {
    const difficulty = document.getElementById("difficulty-select").value; // Get selected difficulty
    const sampleText = getRandomParagraph(difficulty); // Get random text
    document.getElementById("sample-text").textContent = sampleText; // Update the text dynamically
});

  // Add event listener for real-time accuracy feedback
document.getElementById("typing-input").addEventListener("input", updateTypingAccuracy);
