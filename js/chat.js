// conversation data - keyed by conversation name

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


// element refs
const conversationItems = document.querySelectorAll(".conversation-item");
const chatMessages = document.getElementById("chat-messages");
const chatTitle = document.getElementById("chat-title");


// switch conversation on click
conversationItems.forEach(item => {

    item.addEventListener("click", function () {

        // clear active state from all, then highlight the one clicked
        conversationItems.forEach(conversation => {
            conversation.classList.remove("active");
        });

        this.classList.add("active");

        const conversationName = this.dataset.conversation;

        loadConversation(conversationName);
    });

});


// swaps in a conversation's messages + title
function loadConversation(name) {

    const conversation = conversations[name];

    if (!conversation) return;

    chatTitle.textContent = conversation.title;

    // wipe out whatever was there before
    chatMessages.innerHTML = "";

    // "Today" divider at the top
    const divider = document.createElement("span");

    divider.className = "chat-day-divider";
    divider.textContent = "Today";

    chatMessages.appendChild(divider);

    conversation.messages.forEach(message => {

        createMessage(
            message.type,
            message.text,
            message.time,
            message.image
        );

    });

    // jump to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// builds a single chat bubble (bot messages get an avatar, user ones don't)
function createMessage(type, text, time, imageSrc) {

    const message = document.createElement("div");

    message.className = "chat-msg chat-msg--" + type;


    // only bot messages show an avatar
    if (type === "bot") {

        const avatar = document.createElement("div");

        avatar.className = "avatar";


        const image = document.createElement("img");

        image.src = imageSrc;
        image.alt = "Chal Sathi";


        avatar.appendChild(image);

        message.appendChild(avatar);
    }


    // the actual message bubble (text + timestamp)
    const bubble = document.createElement("div");

    bubble.className = "chat-msg__bubble";


    const paragraph = document.createElement("p");

    paragraph.textContent = text;


    const timeElement = document.createElement("time");

    timeElement.textContent = time;


    bubble.appendChild(paragraph);
    bubble.appendChild(timeElement);

    message.appendChild(bubble);

    chatMessages.appendChild(message);
}


// show the support chat first when the page loads
loadConversation("support");