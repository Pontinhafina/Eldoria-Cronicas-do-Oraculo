
// IA Cronista (Web Worker)
let chronicle = [];

self.onmessage = function(e) {
    const { type, data } = e.data;

    if (type === 'ADD_ENTRY') {
        const entry = createChronicleEntry(data);
        if (entry) {
            chronicle.push(entry);
            self.postMessage({ type: 'UPDATE', chronicle: chronicle });
        }
    } else if (type === 'LOAD') {
        chronicle = data.chronicle || [];
    }
};

function createChronicleEntry(data) {
    const { userMessage, aiResponse, character, time } = data;

    // Evita adicionar entradas vazias ou de sistema
    if (aiResponse.includes('Jogo salvo!') || aiResponse.includes('Missão rastreada')) {
        return null;
    }

    const summary = summarize(aiResponse);

    return {
        day: time.day,
        hour: time.hour,
        summary: summary,
        character: {
            name: character.name,
            level: character.level
        }
    };
}

function summarize(text) {
    // Lógica de sumarização simples (pode ser melhorada)
    const sentences = text.split('. ');
    return sentences[0] + '.';
}
