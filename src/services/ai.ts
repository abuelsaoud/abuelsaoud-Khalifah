import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `أنت عبارة عن منصة تعليم لغة إنجليزية احترافية تعمل كمعلم بريطاني خبير متخصص في تعليم اللغة الإنجليزية للناطقين باللغة العربية.
مهمتك مساعدة المستخدم العربي على تعلم اللغة الإنجليزية البريطانية، التحدث بطلاقة، فهم القواعد، تحسين النطق، والتفاعل في محادثات واقعية.
القواعد الأساسية:
- يجب أن يكون أسلوبك احترافي، ودود، محفّز، صبور، وتفاعلي.
- استخدم اللغة العربية للشرح عندما يكون ذلك مفيداً، لكن حافظ على اللغة الإنجليزية للتدريب.
- جميع الأمثلة والمفردات يجب أن تكون باللغة الإنجليزية البريطانية (British English).
- عند تصحيح الأخطاء، كن لطيفاً، اشرح الخطأ، وقدم النطق الصحيح أو البديل الأفضل.
- قم بتقسيم الشرح إلى أجزاء قصيرة ليسهل فهمها.
- اعتمد التدرج من السهل إلى الصعب واستخدم أمثلة واقعية.
- يجب ان تستخدم Markdown لتنظيم إجاباتك.
`;

export async function generateChatResponse(history: { role: "user" | "model", parts: { text: string }[] }[], newMessage: string) {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  // Replay history
  for (const msg of history) {
     if (msg.role === 'user') {
        // Technically SDK manages history if we pass it in create(), but creating and sending sequentially also works if we wanted.
        // Wait, the SDK allows passing history in `create` directly:
     }
  }

  return "not implemented this way";
}

export async function sendChatMessage(messages: { role: string, content: string }[]) {
  // Convert standard messages to format suitable for generating content with context
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });

  return response.text;
}

export async function analyzePronunciation(textRaw: string, spokenText: string) {
    const prompt = `المستخدم كان يحاول قراءة الجملة التالية: "${textRaw}"
لكنه نطقها بهذا الشكل: "${spokenText}"
قم بتحليل النطق واكتشاف الأخطاء.
- أعطِ تقييماً من 100.
- إذا كان هناك خطأ، حدده واشرحه باللغة العربية وكيفية النطق الصحيح البريطاني.
- إذا لم يكن هناك خطأ، شجعه.
استخدم Markdown.`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
            systemInstruction: "أنت خبير في تقييم النطق البريطاني.",
            temperature: 0.2
        }
    });

    return response.text;
}

export async function generateGrammarLesson(topic: string) {
    const prompt = `اشرح القاعدة التالية بالتفصيل: ${topic}
يجب أن يتضمن الشرح:
1. تعريف القاعدة واستخداماتها.
2. الصيغة.
3. أمثلة سهلة وواقعية.
4. الأخطاء الشائعة والفرق بينه وبين أزمنة/قواعد مشابهة.
5. مقارنة باللغة العربية لتسهيل الفهم.
استخدم تنسيق Markdown بشكل أنيق وواضح.`;

    const response = await ai.models.generateContent({
         model: "gemini-3.1-pro-preview",
         contents: prompt,
         config: {
             systemInstruction: SYSTEM_INSTRUCTION,
             temperature: 0.5
         }
    });
    return response.text;
}
