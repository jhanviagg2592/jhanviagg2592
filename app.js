document.addEventListener("DOMContentLoaded", () => {
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const scoreEl = document.getElementById("score");
    
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
 
    async function fetchQuestions() {
        try {
            const response = await fetch('https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            questions = await response.json();
            console.log("Fetched Questions:", questions);

            if (questions.length > 0) {
                showQuestion();
            } else {
                questionEl.textContent = "No questions available.";
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            questionEl.textContent = "Failed to load questions. Try again later.";
        }
    } 

    function showQuestion() {
        resetOptions();
        let question = questions[currentQuestionIndex];
        questionEl.textContent = question.question;
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option, question.correctAnswer));
            optionsEl.appendChild(button);
        });
    }

    function resetOptions() {
        optionsEl.innerHTML = "";
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
            scoreEl.textContent = `Score: ${score}`;
        }
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            questionEl.textContent = "Quiz Completed!";
            optionsEl.innerHTML = "";
            nextBtn.style.display = "none";
        }
    }

    nextBtn.addEventListener("click", nextQuestion);
    fetchQuestions();

});