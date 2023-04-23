/* options */

const keysWithDefault = [
    ['api_key', 'your key']
];
chrome.storage.sync.get('options', ({options}) => {
    keysWithDefault.forEach(([key, defaultValue]) => {
        document.getElementById(key).value = options ? options[key] : defaultValue;
    });
})

document.getElementById('save_button').addEventListener('click', () => {
    const options = {};
    keysWithDefault.forEach(([key, defaultValue]) => {
        options[key] = document.getElementById(key).value;
    });
    chrome.storage.sync.set({ options }, () => {
        alert('저장되었습니다. 새로고침후 이용해주세요.');
    });
})


document.getElementById('reset_button').addEventListener('click', () => {
    const options = {};
    keysWithDefault.forEach(([key, defaultValue]) => {
        options[key] = defaultValue
        document.getElementById(key).value = defaultValue;
    });
    chrome.storage.sync.set({ options }, () => {
        alert('리셋되었습니다.');
    });
})

