chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "analyzeComment" && request.options) {
    analyzeComment(request.comment, request.options).then(sendResponse)
  }
  return true
})
const analyzeComment = async (comment, options) => {
    const {api_key} = options;
    const prompt = "한국어 에세이 철자 교정 및 개선 역할을 해 줘. 내가 한국어로 너와 대화할 때, 문법 오류를 교정한 후 더 명확하게 쓸 수 있는 문구는 명확하게 바꾼 뒤, 내가 사용한 낮은 수준의 단어와 문장을 더 아름답고 우아한 상위 수준의 단어와 문장으로 바꿔줘. 의미는 동일하게 유지하되 좀 더 문학적으로 바꿔줘. 수정 사항과 개선 사항만 답장하고 그 외의 설명은 작성하지 마.";
    const response = await fetch(`https://api.openai.com/v1/engines/text-davinci-003/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`,
        },
        body: JSON.stringify({
            prompt: `${prompt}: "${comment}"`,
            max_tokens: Number(1000),
            n: 1,
            stop: null,
            temperature: Number(0.7)
        }),
    });
    const data = await response.json();
    if (data.error) {
        return data.error.message;
    }
    return data.choices[0].text.trim();
}
