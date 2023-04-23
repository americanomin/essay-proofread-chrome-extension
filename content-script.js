let resultElement = null;
const keysWithDefault = [
    ['api_key', 'your key'],
    ['model', 'text-davinci-003'],
    ['temperature', '0.7'],
    ['max_tokens', '1000'],
    ['selector', 'textarea[name="comment[body]"]:focus'],
    ['prompt', '한국어 에세이 철자 교정 및 개선 역할을 해 줘. 내가 한국어로 너와 대화할 때, 문법 오류를 교정한 후 더 명확하게 쓸 수 있는 문구는 명확하게 바꾼 뒤, 내가 사용한 낮은 수준의 단어와 문장을 더 아름답고 우아한 상위 수준의 단어와 문장으로 바꿔줘. 의미는 동일하게 유지하되 좀 더 문학적으로 바꿔줘. 수정 사항과 개선 사항만 답장하고 그 외의 설명은 작성하지 마.']
];
let lastComment = null;
chrome.storage.sync.get("options", ({options}) => {
    if (!options) {
        options = keysWithDefault.reduce((acc, [key, defaultValue]) => {
            acc[key] = defaultValue;
            return acc;
        })
        chrome.storage.sync.set({options});
    }
    const analyzeComment = async (comment) => {
        resultElement.innerHTML = `<marquee>교정중...✏️</marquee>`;
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(
                {type: "analyzeComment", comment, options},
                (improvedComment) => {
                    resolve(improvedComment);
                }
            );
        })
    }

    const onInput = async (event) => {
        const comment = event.target.value;
        if (comment.trim().length === 0 || comment === lastComment) return
        lastComment = comment;
        const improvedComment = await analyzeComment(comment);
        resultElement.innerHTML = `<p><strong>이렇게 작성하는 것은 어때요?😉</strong></p><p>${improvedComment}</p>`;
        observer.observe(document.body, {childList: true, subtree: true})
    };

    const observeCommentBox = () => {
        const commentBox = document.querySelector(options.selector);
        if (commentBox) {
            resultElement = document.createElement("div");
            commentBox.parentElement.appendChild(resultElement);
            commentBox.addEventListener("blur", onInput);
            return true;
        }
        return false;
    };

    const observer = new MutationObserver(() => {
        if (!observeCommentBox()) {
            setTimeout(observeCommentBox, 1000);
        } else {
            observer.disconnect();
        }
    });
    observer.observe(document.body, {childList: true, subtree: true})
});

