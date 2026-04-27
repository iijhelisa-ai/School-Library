document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const charButtons = document.querySelectorAll('.char-select-btn');
    const currentCharSpan = document.getElementById('current-chat-char');

    let currentChar = 'kongjwi';

    const charData = {
        'kongjwi': {
            name: '콩쥐',
            greeting: '안녕? 난 콩쥐야. 만나서 반가워! 무슨 이야기를 할까?',
            responses: {
                '안녕': '응, 안녕! 오늘 하루 재미있게 보냈어?',
                '팥쥐': '팥쥐는 내 동생이야. 가끔 심술을 부리지만 그래도 가족인걸.',
                '두꺼비': '독에 난 구멍을 막아준 고마운 친구야!',
                '소': '넓은 밭을 맬 때 도와주었어. 정말 든든했지.',
                '선녀': '선녀님이 주신 꽃신 덕분에 잔치에 갈 수 있었어.',
                '잔치': '마을 잔치에 갔을 때 정말 신났어! 원님도 만났고.',
                '이름': '내 이름은 콩쥐야. 마음씨 착한 아이로 자라고 싶어.'
            },
            defaultResponse: '음... 그건 잘 모르겠어. 우리 두꺼비나 꽃신 이야기를 해볼까?'
        },
        'patjwi': {
            name: '팥쥐',
            greeting: '흥, 넌 누구야? 난 예쁜 팥쥐라고 해.',
            responses: {
                '안녕': '뭐야, 왜 인사해? 나한테 잘 보이려고?',
                '콩쥐': '흥, 콩쥐 언니는 맨날 일만 해! 내가 더 예쁘지?',
                '두꺼비': '어휴, 징그러운 두꺼비! 난 그런 거 싫어.',
                '꽃신': '그 예쁜 꽃신, 내가 신었어야 했는데!',
                '잔치': '잔치에서 내가 제일 돋보여야 하는데 콩쥐 때문에 망쳤어.',
                '이름': '난 팥쥐야! 마을에서 제일 예쁜 팥쥐!'
            },
            defaultResponse: '무슨 소리인지 모르겠네. 내 예쁜 옷 이야기나 하자!'
        },
        'prince': {
            name: '어린왕자',
            greeting: '안녕. 나는 B612라는 작은 별에서 왔어. 넌 지구인이니?',
            responses: {
                '안녕': '안녕. 지구는 정말 크고 이상한 별이야.',
                '장미': '내 장미꽃은 세상에 단 하나뿐이야. 투덜대긴 하지만 내가 책임져야 해.',
                '여우': '여우가 내게 비밀을 알려주었어. 길들인다는 건 서로에게 특별해지는 거래.',
                '양': '내가 그린 양이 상자 안에 있어. 양이 장미꽃을 먹어버리면 어떡하지?',
                '바오밥': '바오밥 나무는 어릴 때 뽑아야 해. 안 그러면 별이 터져버릴지도 몰라.',
                '이름': '내 이름은 지구 사람들이 지어준 거야. 어린왕자라고 부르더라.'
            },
            defaultResponse: '어른들은 정말 이상해. 가장 중요한 건 눈에 보이지 않는데 말이야.'
        }
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function initChat(charId) {
        currentChar = charId;
        chatMessages.innerHTML = ''; // Clear chat
        currentCharSpan.textContent = charData[charId].name;
        
        // Add greeting
        setTimeout(() => {
            addMessage(charData[charId].greeting, 'bot');
        }, 500);
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        addMessage(text, 'user');
        chatInput.value = '';

        // Bot response
        setTimeout(() => {
            let response = charData[currentChar].defaultResponse;
            const rules = charData[currentChar].responses;
            
            for (const key in rules) {
                if (text.includes(key)) {
                    response = rules[key];
                    break;
                }
            }
            addMessage(response, 'bot');
        }, 800);
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });

    charButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            charButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Init new chat
            initChat(btn.dataset.char);
        });
    });

    // Initial chat load
    initChat('kongjwi');
});
