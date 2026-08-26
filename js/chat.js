/* =========================================
   CONVERSATION DATA
========================================= */

const conversations = {

    support: {
        title: "Chal Sathi Concierge",

        messages: [
            {
                type: "bot",
                image: "../img/boy1.jpg",
                text: "Namaste! Welcome to Chal Sathi. I'm your host today. How can I make your experience better?",
                time: "10:00 AM"
            },

            {
                type: "user",
                text: "Hi! I wanted to check if you have any special events planned for the community this weekend?",
                time: "10:02 AM"
            },

            {
                type: "bot",
                image: "../img/boy2.jpg",
                text: 'We certainly do! This Saturday we\'re hosting a "Street Chai Stories" session at 4 PM. We\'d love for you to join. Would you like me to reserve a spot for you?',
                time: "10:03 AM"
            }
        ]
    },


    menu: {
        title: "Menu Inquiries",

        messages: [
            {
                type: "bot",
                image: "../img/boy.jpg",
                text: "Namaste! Welcome to Chal Sathi Menu Support. How can I help you today?",
                time: "9:30 AM"
            },

            {
                type: "user",
                text: "Hi! I wanted to ask about the food menu.",
                time: "9:32 AM"
            },

            {
                type: "bot",
                image: "../img/boy.jpg",
                text: "Of course! We have momo, chowmein, snacks, drinks and several other dishes. Is there a particular item you'd like to know about?",
                time: "9:33 AM"
            }
        ]
    }
};


/* =========================================
   GET HTML ELEMENTS
========================================= */

const conversationItems =
    document.querySelectorAll(".conversation-item");

const chatMessages =
    document.getElementById("chat-messages");

const chatTitle =
    document.getElementById("chat-title");


/* =========================================
   CLICK CONVERSATION
========================================= */

conversationItems.forEach(item => {

    item.addEventListener("click", function () {

        // Remove active class from all conversations
        conversationItems.forEach(conversation => {
            conversation.classList.remove("active");
        });

        // Add active class to clicked conversation
        this.classList.add("active");

        // Get conversation name
        const conversationName =
            this.dataset.conversation;

        // Load selected conversation
        loadConversation(conversationName);
    });

});


/* =========================================
   LOAD CONVERSATION
========================================= */

function loadConversation(name) {

    const conversation = conversations[name];

    if (!conversation) return;

    // Change title
    chatTitle.textContent = conversation.title;

    // Clear old messages
    chatMessages.innerHTML = "";

    // Today divider
    const divider = document.createElement("span");

    divider.className = "chat-day-divider";
    divider.textContent = "Today";

    chatMessages.appendChild(divider);

    // Create messages
    conversation.messages.forEach(message => {

        createMessage(
            message.type,
            message.text,
            message.time,
            message.image
        );

    });

    // Scroll to bottom
    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* =========================================
   CREATE MESSAGE
========================================= */

function createMessage(type, text, time, imageSrc) {

    const message = document.createElement("div");

    message.className =
        "chat-msg chat-msg--" + type;


    /* =================================
       BOT AVATAR
    ================================= */

    if (type === "bot") {

        const avatar =
            document.createElement("div");

        avatar.className = "avatar";


        const image =
            document.createElement("img");

        // Use the image specified for this message
        image.src = imageSrc;

        image.alt = "Chal Sathi";


        avatar.appendChild(image);

        message.appendChild(avatar);
    }


    /* =================================
       MESSAGE BUBBLE
    ================================= */

    const bubble =
        document.createElement("div");

    bubble.className =
        "chat-msg__bubble";


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        text;


    const timeElement =
        document.createElement("time");

    timeElement.textContent =
        time;


    bubble.appendChild(paragraph);
    bubble.appendChild(timeElement);

    message.appendChild(bubble);

    chatMessages.appendChild(message);
}

/* =========================================
   LOAD SUPPORT BY DEFAULT
========================================= */

loadConversation("support");