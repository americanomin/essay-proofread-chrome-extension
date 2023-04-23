let resultElement = null;
const keysWithDefault = [
    ['api_key', 'key']
];
let lastComment = null;

document.addEventListener('mouseup', function(event) {
  console.log("mouseup");
  var selectedText = window.getSelection().toString().trim();
  if (selectedText !== '') {
    var icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('images/icon_32.png');
    icon.id = 'myIcon';
    icon.style.position = 'fixed';
    icon.style.left = event.pageX + 'px';
    icon.style.top = event.pageY + 'px';
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
    document.body.appendChild(icon);
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
