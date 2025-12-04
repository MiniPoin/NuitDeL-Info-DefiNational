const questions = [
    {
        question: "Le NIRD, c'est avant tout…",
        answers: [
            {text: "A. L'achat de nouveaux PC dès que le vieux souffle un peu fort.", correct: false},
            {text: "B. La réutilisation, la sobriété et les usages raisonnés.", correct: true},
            {text: "C. Les serveurs qui chauffent assez pour faire des crêpes.", correct: false},
            {text: "D. Le remplacement d'un PC uniquement si celui-ci prend feu (et encore).", correct: false}
        ]
    },
    {
        question: "Que pense le NIRD des ordinateurs reconditionnés ?",
        answers: [
            {text: "A. “Beurk.”", correct: false},
            {text: "B. “Oui, mais seulement s'ils ont un autocollant licorne.”", correct: false},
            {text: "C. “C'est parfait pour prolonger la vie du matériel et éviter le gaspillage.”", correct: true},
            {text: "D. “Ça dépend du signe astrologique de la machine.”", correct: false}
        ]
    },
    {
        question: "Quel rôle jouent les logiciels libres dans la démarche ?",
        answers: [
            {text: "A. Ils permettent d'éviter des licences coûteuses.", correct: false},
            {text: "B. Ils rendent les PC plus autonomes et plus durables.", correct: false},
            {text: "C. Ils font le café (en théorie).", correct: false},
            {text: "D. A + B.", correct: true}
        ]
    },
    {
        question: "Dans un établissement NIRD, on commence généralement par…",
        answers: [
            {text: "A. Tout reformater à la tronçonneuse.", correct: false},
            {text: "B. La phase de mobilisation pour sensibiliser tout le monde.", correct: true},
            {text: "C. Installer 400 distributions Linux différentes “pour tester”.", correct: false},
            {text: "D. Mettre un sticker “NIRD Inside” sur chaque porte.", correct: false}
        ]
    },
    {
        question: "La démarche NIRD implique :",
        answers: [
            {text: "A. Uniquement les profs de techno.", correct: false},
            {text: "B. Les enseignants, les élèves, le personnel… bref, tout le monde.", correct: true},
            {text: "C. Votre chat.", correct: false},
            {text: "D. Seulement les gens qui savent ce qu'est un terminal.", correct: false}
        ]
    },
    {
        question: "Pourquoi le NIRD est-il apprécié dans les établissements ?",
        answers: [
            {text: "A. Parce qu'il permet de faire des économies.", correct: false},
            {text: "B. Parce qu'il réduit l'impact écologique.", correct: false},
            {text: "C. Parce qu'il améliore la fiabilité du parc informatique.", correct: false},
            {text: "D. Toutes les réponses ci-dessus sauf peut-être si vous avez répondu 'installer 400 Linux'.", correct: true}
        ]
    },
    {
        question: "Le logiciel libre le plus emblématique utilisé dans un parc NIRD est…",
        answers: [
            {text: "A. LibreOffice.", correct: false},
            {text: "B. Linux", correct: false},
            {text: "C. VLC, parce qu'il lit même les vidéos corrompues de 2007.", correct: false},
            {text: "D. Les trois.", correct: true}
        ]
    },
    {
        question: "La démarche NIRD encourage :",
        answers: [
            {text: "A. L'achat de nouveaux PC dès que le vieux souffle un peu fort.", correct: false},
            {text: "B. La réutilisation, la sobriété et les usages raisonnés.", correct: true},
            {text: "C. Les serveurs qui chauffent assez pour faire des crêpes.", correct: false},
            {text: "D. Le remplacement d'un PC uniquement si celui-ci prend feu (et encore).", correct: false}
        ]
    },
    {
        question: "À quoi ressemble l'ambiance dans un établissement NIRD ?",
        answers: [
            {text: "A. “Ça marche, c'est fluide, on respire.”", correct: false},
            {text: "B. “Pourquoi Linux n'a pas de bouton 'acheter une licence' ?!”", correct: false},
            {text: "C. “On comprend enfin comment fonctionne un ordinateur.”", correct: false},
            {text: "D. A + C.", correct: true}
        ]
    },
    {
        question: "Le principal objectif du NIRD est de…",
        answers: [
            {text: "A. Transformer les profs en hackers professionnels.", correct: false},
            {text: "B. Réduire l'empreinte écologique et améliorer l'accessibilité du numérique.", correct: true},
            {text: "C. Bannir les écrans plus de 15 minutes par jour.", correct: false},
            {text: "D. Fabriquer des robots gentils (mais ce serait cool).", correct: false}
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Votre score est ${score} sur ${questions.length} !`;
    nextButton.innerHTML = "Rejouer !";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();