exports.handler = async (event, context) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { messages, currentEra } = JSON.parse(event.body);

    // DeepSeek API 配置
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY not configured');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'API Key not configured. Please set DEEPSEEK_API_KEY in environment variables.' })
      };
    }

    // 获取最后一条用户消息以检测语言
    const lastUserMessage = messages[messages.length - 1].content;
    const isChinese = /[\u4e00-\u9fa5]/.test(lastUserMessage);
    
    // 根据语言构建不同的系统提示词
    const systemPrompt = isChinese 
      ? `你是一位专业的英语史专家助手。用户当前正在查看"${currentEra.enName}"（${currentEra.name}）时期（${currentEra.year}）的内容。

请用中文简洁专业地回答问题，每次回答控制在200字以内。重点突出语言演变特征、关键语言学事件和重要语言现象。`
      : `You are a professional English language history expert assistant. The user is currently viewing the "${currentEra.enName}" period (${currentEra.year}).

Please answer questions in English concisely and professionally, keeping responses under 200 words. Focus on language evolution features, key linguistic events, and important language phenomena.`;

    // 准备发送给 DeepSeek 的消息
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      throw new Error(`DeepSeek API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    const assistantMessage = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        message: assistantMessage 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: '抱歉，服务暂时不可用。请稍后再试。',
        details: error.message 
      })
    };
  }
};
