const storiesData = {
    'kongjwi': {
        title: "콩쥐팥쥐",
        text: `옛날 옛적에 마음씨 착한 콩쥐와 심술궂은 팥쥐가 살았어요.
콩쥐는 새어머니와 팥쥐에게 구박을 받으면서도 항상 밝게 웃었답니다.

어느 날, 마을에 큰 잔치가 열렸어요.
새어머니는 콩쥐에게 밑 빠진 독에 물 채우기, 넓은 밭매기 등 어려운 일을 시키고 팥쥐와 함께 잔치에 가버렸어요.

슬퍼하는 콩쥐 앞에 두꺼비와 소, 선녀님이 나타나 도와주었어요!
선녀님이 주신 예쁜 옷과 꽃신을 신고 잔치에 간 콩쥐는 원님과 만나 행복하게 살게 되었답니다.

착한 마음을 가지면 언젠가 좋은 일이 생긴다는 이야기예요.`
    },
    'prince': {
        title: "어린왕자",
        text: `비행기 조종사인 '나'는 사막에 불시착했어요.
그곳에서 아주 작은 별 B612호에서 온 '어린왕자'를 만났어요.

어린왕자는 자신의 별에 있는 아름다운 장미꽃을 아주 사랑했어요.
하지만 장미꽃의 까다로운 성격 때문에 상처를 받고 여러 별을 여행하게 되었답니다.

지구에 온 어린왕자는 여우를 만나 아주 중요한 비밀을 배웠어요.
"가장 중요한 것은 눈에 보이지 않아. 마음으로 보아야 해."

어린왕자는 자신이 길들인 장미꽃이 세상에 단 하나뿐인 소중한 존재라는 것을 깨닫고 다시 자신의 별로 돌아갔어요.`
    }
};

function showStory(storyId) {
    const selectionDiv = document.getElementById('story-selection');
    const contentDiv = document.getElementById('story-content');
    const titleElement = document.getElementById('story-title');
    const textElement = document.getElementById('story-text');

    const story = storiesData[storyId];
    if (story) {
        titleElement.textContent = story.title;
        textElement.textContent = story.text;
        
        selectionDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
    }
}

function hideStory() {
    const selectionDiv = document.getElementById('story-selection');
    const contentDiv = document.getElementById('story-content');
    
    contentDiv.classList.add('hidden');
    selectionDiv.classList.remove('hidden');
}
