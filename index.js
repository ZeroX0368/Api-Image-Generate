
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Image generation endpoint
app.get('/api/generate-image', async (req, res) => {
  try {
    const { 
      prompt, 
      width = 1024, 
      height = 1024, 
      model = 'midjourney', 
      nologo = true, 
      private = false, 
      enhance = true, 
      seed 
    } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Build the Pollinations AI URL
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    const encodedPrompt = encodeURIComponent(prompt);
    
    let imageUrl = `${baseUrl}${encodedPrompt}?width=${width}&height=${height}&model=${model}&nologo=${nologo}&private=${private}&enhance=${enhance}`;
    
    if (seed) {
      imageUrl += `&seed=${seed}`;
    }

    res.json({
      image_url: imageUrl,
      prompt: prompt,
      parameters: {
        width,
        height,
        model,
        nologo,
        private,
        enhance,
        seed
      }
    });

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Example endpoint that matches your format
app.get('/api/cat-example', (req, res) => {
  const imageUrl = 'https://image.pollinations.ai/prompt/cat?width=1024&height=1024&model=midjourney&nologo=true&private=false&enhance=true&seed=563910';
  
  res.json({
    image_url: imageUrl
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Image Generation API',
    endpoints: {
      generate: '/api/generate-image?prompt=your_prompt',
      example: '/api/cat-example'
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Image generation API running on port ${port}`);
  console.log(`Example: http://localhost:${port}/api/generate-image?prompt=beautiful%20landscape`);
});
