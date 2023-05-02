let resultElement = null;
const keysWithDefault = [
    ['api_key', 'key']
];
let lastComment = null;

document.addEventListener('mouseup', function(event) {
  var selectedText = window.getSelection().toString().trim();
  console.log(selectedText);
  if (selectedText !== '') {
    var icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('images/icon_32.png');
    icon.id = 'myIcon';
//    icon.style.position = 'absolute';

    // 드래그한 텍스트의 위치를 파악하여 아이콘 이미지 위치를 조정합니다.
    var range = window.getSelection().getRangeAt(0);
    var rect = range.getBoundingClientRect();
    icon.style.left = rect.right + 'px';
    icon.style.top = rect.top + 'px';

    icon.addEventListener('click', function() {
        icon.remove();

        var tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.style.position = 'absolute';
        tooltip.style.top = (event.pageY + 10) + 'px';
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.textContent = 'Tooltip content';

        document.body.appendChild(tooltip);
    });
    console.log(icon)
    // 아이콘 이미지를 텍스트 옆에 위치시킵니다.
    range.insertNode(icon);
  }
});

//chrome.storage.sync.get("options", ({options}) => {
//    if (!options) {
//        options = keysWithDefault.reduce((acc, [key, defaultValue]) => {
//            acc[key] = defaultValue;
//            return acc;
//        })
//        chrome.storage.sync.set({options});
//    }
//    const analyzeComment = async (comment) => {
//        resultElement.innerHTML = `<marquee>교정중...✏️</marquee>`;
//        return new Promise((resolve) => {
//            chrome.runtime.sendMessage(
//                {type: "analyzeComment", comment, options},
//                (improvedComment) => {
//                    resolve(improvedComment);
//                }
//            );
//        })
//    }
//
//    const onInput = async (event) => {
//        console.log("oninput");
//        const comment = event.target.value;
//        if (comment.trim().length === 0 || comment === lastComment) return
//        lastComment = comment;
//        const improvedComment = await analyzeComment(comment);
//        resultElement.innerHTML = `<p><strong>이렇게 작성하는 것은 어때요?😉</strong></p><p>${improvedComment}</p>`;
//        observer.observe(document.body, {childList: true, subtree: true})
//    };
//
//    const iconButton = document.getElementById("icon-button");
//    iconButton.addEventListener("click", onInput);
//});
//
