const userInputElement = document.getElementById("user-input");
const resetBtn = document.getElementById("reset-btn");
const robotFace = document.getElementById("robot-face");
const chatContainer = document.getElementById("chat-container");
const chatHistory = document.getElementById("chat-history");


// Load remembered questions from localStorage or start fresh
let rememberedQuestions = JSON.parse(localStorage.getItem("rememberedQuestions")) || {};

let howAreYouCount = 0;


let chatLog = [];
let userName = "";

const greetings = ["hi", "hello", "hey","good morning","hiya"];
const botName = "Liftly Bot";

let bmiState = {
  asking: false,
  weight: null,
  height: null,
};

// Add user chat to the chat history
function addChat(userInput) {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", "user-chat");
  chatDiv.innerText = userInput;
  chatHistory.appendChild(chatDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Add bot response to the chat history
function addBot(botResponse) {
  const botDiv = document.createElement("div");
  botDiv.classList.add("chat", "bot-chat");
  botDiv.innerText = botResponse;
  chatHistory.appendChild(botDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}


// 🔸 Memory and pending question tracking
let pendingQuestion = "";
 

// 🔸 Handler for learning new questions
function teachHandler(e) {
  const answer = e.target.value.trim();
  if (answer && pendingQuestion) {
    rememberedQuestions[pendingQuestion] = answer;
    addChat("user", answer);
    addBot("Thanks! I've learned something new 😊");
    pendingQuestion = "";
    userInputElement.removeEventListener("change", teachHandler);
    saveChatHistory();
  }
}

// Update face based on user input (called inside handleUserInput)
function updateFace(userInput) {
  const lowerInput = userInput.toLowerCase();
  howAreYouCount = 0;
  robotFace.src = "assests/img/neutral.jpg";

  const response = qaMemory[lowerInput];
  if (response) {
    return response;
  } else {
    pendingQuestion = lowerInput;
    userInputElement.addEventListener("change", teachHandler);
    return `Hmm, I don't know answer for that yet 🤯. If you can say, I can remember: "${userInput}"?`;
  }
}

let qaMemory = {
  //open hours
  "what are your open hours": "We are open from 6AM to 10PM every day.",
  "open hours": "We are open from 6AM to 10PM every day.",
  "openning hours": "We are open from 6AM to 10PM every day.",
  
  //memebership
  "how much is membership fee": "Membership starts at $29/month 💰",
  "membership fee": "Membership starts at $29/month 💰",
  "membership plans": "We have monthly, quarterly, and yearly plans starting from $29/month.",
  "how much is it to join": "Our membership starts at just $29/month!",
  //facilities
  "what facilities are available": "We offer a full gym, swimming pool, yoga studio, and sauna.",
  "facilities available": "We offer a full gym, swimming pool, yoga studio, and sauna.",
  "facilities": "We have cardio and weight training equipment, sauna, and more.",
  "do you have a sauna": "Yes! We have a sauna available for all members.",

  //schedules
  "class schedules": "Our classes run daily from 7AM to 8PM. Check the schedule for Yoga, Zumba, HIIT and more.",
  "what classes do you offer": "We offer Yoga, Zumba, CrossFit, Spinning and more!",
  "which classes offer": "We offer Yoga, Zumba, CrossFit, Spinning and more!",
  "do you have yoga classes": "Yes! Yoga classes are every morning at 8AM and evenings at 6PM 🧘",
  "information about yoga classes": "Yes! Yoga classes are every morning at 8AM and evenings at 6PM 🧘",
  "yoga classes": "Yes! Yoga classes are every morning at 8AM and evenings at 6PM 🧘",
  "when is yoga classes": "Yes! Yoga classes are every morning at 8AM and evenings at 6PM 🧘",
  "when is zumba class": "Zumba is on Mondays, Wednesdays, and Fridays at 7PM 💃",
  "zumba class": "Zumba is on Mondays, Wednesdays, and Fridays at 7PM 💃",
  "information about zumba classes": "Yes! Zumba classes are on Mondays, Wednesdays, and Fridays at 7PM 💃 ",

  //recommendations 
  "workout recommendations": "Let me know your goal – weight loss, muscle gain, or general fitness – and I’ll suggest a routine!",
  "muscle gain workout recommendation": "Sure! For beginners, start with full-body workouts 3 times a week 💪",
  "suggest a workout": "Sure! For beginners, start with full-body workouts 3 times a week 💪",
  "what workout should i do": "Tell me your fitness level and goals – I’ll help you get started!",
  "recommend a workout": "Try 30 mins of cardio followed by bodyweight strength training!",

}

  function handleUserInput(input) {
  addChat(userInput);
  chatLog.push({ type: "user", text: userInput });


  let addBot = "";

  const lowerInput = input.toLowerCase();


  // ✅ Farewell detection
  const farewells = ["bye", "goodbye", "exit", "see you", "later", "cya"];
  if (farewells.some(f => lowerInput.includes(f))) {
    addBot(`Goodbye${userName ? `, ${userName}` : ""}! 👋 Stay strong and healthy! 🏋️`);
    return;
  }

  // ✅ "What's your name?" handling with repetition count
  if (lowerInput.includes("what's your name")) {
    howAreYouCount++;
    if (howAreYouCount === 1) {
      robotFace.src = "assests/img/happyface.png";
      addBot("I'm Liftly Bot 😊");
    } else if (howAreYouCount === 2) {
      robotFace.src = "assests/img/sadface.png";
      addBot("Hmm… you already asked that. 😕");
    } else {
      robotFace.src = "assests/img/Angry.png";
      addBot("Why are you repeating the same thing? 😠");
    }
    return;
  }

  // ✅ "How are you?" detection
  const howAreYouResponses = [
    "I'm doing great, thanks!",
    "I'm good, how about you?",
    "I'm feeling awesome today!",
    "Doing well, thank you!",
    "I'm here and ready to help!",
  ];
  if (lowerInput.includes("how are you")) {
    const randomResponse = howAreYouResponses[Math.floor(Math.random() * howAreYouResponses.length)];
    addBot(randomResponse);
    return;
  }

  // ✅ Greetings detection (once, only here)
  const greetingResponses = [
    "Hello! How can I assist you today?",
    "Hi there! What can I do for you?",
    "Hey! I'm here to help you with anything you need.",
    "Good morning! Ready to tackle your fitness goals?",
  ];
  if (greetings.some(g => lowerInput.includes(g))) {
    const randomGreeting = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    if (userName) {
      addBot(`${randomGreeting} Welcome back, ${userName}!`);
    } else {
      addBot(randomGreeting + " What's your name?");
    }
    return;
  }

  // ✅ Handle user giving their name
  if (!userName && input.match(/^[a-zA-Z\s]+$/)) {
    userName = input;
    addBot(`Nice to meet you, ${userName}! 💪 Ask me anything about the gym.`);
    return;
  }

  // ✅ BMI Calculator Start
  if (
    lowerInput.includes("bmi") ||
    lowerInput.includes("body mass index") ||
    lowerInput.includes("calculate my bmi")
  ) {
    bmiState.asking = true;
    bmiState.weight = null;
    bmiState.height = null;
    addBot("Sure! To calculate your BMI, please enter your weight in kilograms (kg) ⚖️");
    return;
  }

  // ✅ BMI Step 2: Getting weight and height
  if (bmiState.asking) {
    if (!bmiState.weight && !isNaN(parseFloat(input))) {
      bmiState.weight = parseFloat(input);
      addBot("Thanks! Now, please enter your height in meters (m) 📏");
      return;
    } else if (bmiState.weight && !bmiState.height && !isNaN(parseFloat(input))) {
      bmiState.height = parseFloat(input);
      const bmi = bmiState.weight / (bmiState.height * bmiState.height);
      const roundedBMI = bmi.toFixed(2);
      let category = "";

      if (bmi < 18.5) category = "underweight";
      else if (bmi < 24.9) category = "normal weight";
      else if (bmi < 29.9) category = "overweight";
      else category = "obese";

      addBot(`Your BMI is ${roundedBMI}, which is considered ${category}. 💡`);
      // Reset BMI state
      bmiState.asking = false;
      bmiState.weight = null;
      bmiState.height = null;
      return;
    } else {
      addBot("Please enter a valid number for your weight or height. 🔢");
      return;
    }
  }

  // ✅ Mood-based playlist
  const moodResponse = getMoodPlaylistResponse(input);
  if (moodResponse) {
    addBot(moodResponse);
    return;
  }

  // ✅ Memory Q&A response
  if (qaMemory[lowerInput]) {
    addBot(qaMemory[lowerInput]);
    return;
  }

  // ✅ Remembered questions
  if (rememberedQuestions[lowerInput]) {
    addBot(rememberedQuestions[lowerInput]);
    return;
  }

  // ✅ Fallback to emotion + teaching logic (updateFace)
  const botResponse = updateFace(input);
  if (botResponse) {
    addChat("bot", botResponse);
    saveChat("bot", botResponse);
  }
  userInputElement.value = "";
userInputElement.focus();
chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById("send-btn").addEventListener("click", () => {
  const userInput = userInputElement.value.trim();
  if (userInput) {
    addChat("user", userInput); // ✅ Show user message in chat
    handleUserInput(userInput);
    userInputElement.value = "";
    saveChatHistory();
  }
});

userInputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const userInput = userInputElement.value.trim();
    if (userInput) {
      addChat("user", userInput); // ✅ Show user message in chat
      handleUserInput(userInput);
      userInputElement.value = "";
      saveChatHistory();
    }
  }
});

resetBtn.addEventListener("click", () => {
  chatLog = [];
  rememberedQuestions = {};
  userName = "";
  chatHistory.innerHTML = "";
  saveChatHistory(); // save reset state
});

function saveChat(sender, text) {
  const item = `${sender === "user" ? userName || "You" : botName}: ${text}`;
  chatLog.push(item);
 
}


// 📌 Chatsave

function saveChatHistory() {
  localStorage.setItem("chatHistory", JSON.stringify(chatLog));
  localStorage.setItem("rememberedQuestions", JSON.stringify(rememberedQuestions));
}



// 🎤 Voice Recognition (Speech to Text)
const micBtn = document.getElementById("mic-btn");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.textContent = "🎙️ Listening...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInputElement.value = transcript;
    handleUserInput(transcript);
    saveChatHistory();
    micBtn.textContent = "🎤";
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    micBtn.textContent = "🎤";
  };

  recognition.onend = () => {
    micBtn.textContent = "🎤";
  };
} else {
  micBtn.disabled = true;
  micBtn.title = "Speech recognition not supported in this browser.";
}

// 🔊 Text to Speech (Bot voice)
function speak(text) {
  const synth = window.speechSynthesis;
  if (synth && text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  }
}

// 🧠 Override addBot to include speech
function addBot(text) {
  addChat("bot", text);
  saveChat("bot", text);
  speak(text);
}

const trainerSchedule = {
  Monday: ["Alex Johnson", "Sarah Lee"],
  Tuesday: ["Mike Chen"],
  Wednesday: ["Sarah Lee"],
  Thursday: ["Alex Johnson"],
  Friday: ["Mike Chen", "Sarah Lee"],
  Saturday: ["Alex Johnson", "Mike Chen"],
  Sunday: ["No Trainers Available"]
};

const trainerDetails = {
  "Alex Johnson": {
    name: "Alex Johnson",
    photo: "https://th.bing.com/th/id/OIP.8RmGhyEkn9hh5mxJQXW0swHaE7?cb=iwc1&rs=1&pid=ImgDetMain",
    specialty: "Strength & Conditioning",
    experience: "8 years"
  },
  "Sarah Lee": {
    name: "Sarah Lee",
    photo: "https://th.bing.com/th/id/OIP.JKYwx7Df_eRJ1nLpGdTxzwHaIg?w=169&h=194&c=7&r=0&o=5&cb=iwc1&dpr=1.3&pid=1.7",
    specialty: "Yoga & Flexibility",
    experience: "5 years"
  },
  "Mike Chen": {
    name: "Mike Chen",
    photo: "https://img.freepik.com/premium-photo/personal-man-trainer-smiling-fit-woman-gym-wellness-healthy-lifestyle_176697-5852.jpg",
    specialty: "HIIT & Cardio",
    experience: "6 years"
  }
};

document.getElementById("view-week-schedule").addEventListener("click", () => {
  document.getElementById("trainer-schedule-modal").classList.remove("hidden");
});

document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("trainer-schedule-modal").classList.add("hidden");
});

document.querySelectorAll(".day-btn").forEach(button => {
  button.addEventListener("click", () => {
    const day = button.dataset.day;
    const displayArea = document.getElementById("trainer-display");
    displayArea.innerHTML = "";

    const trainers = trainerSchedule[day];
    if (!trainers || trainers.includes("No Trainers Available")) {
      displayArea.innerHTML = "<p>No trainers available on this day.</p>";
      return;
    }

    trainers.forEach(name => {
      const trainer = trainerDetails[name];
      const card = document.createElement("div");
      card.className = "trainer-card";
      card.innerHTML = `
        <img src="${trainer.photo}" alt="${trainer.name}" class="trainer-photo">
        <h3>${trainer.name}</h3>
        <p>🏋️ ${trainer.specialty}</p>
        <p>🎓 ${trainer.experience} experience</p>
      `;
      displayArea.appendChild(card);
    });
  });
});


