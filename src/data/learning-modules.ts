export interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: { title: string; content: string; videoUrl?: string }[];
  icon: string;
}

export const learningModules: LearningModule[] = [
  {
    id: "intro-ai",
    title: "Introduction to AI",
    description: "Understand what Artificial Intelligence is, its history, and real-world applications.",
    level: "beginner",
    icon: "🤖",
    lessons: [
      {
        title: "What is AI?",
        content: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines. These machines are programmed to think and learn like humans. AI can be categorized into Narrow AI (designed for specific tasks) and General AI (hypothetical machines with human-like cognitive abilities).\n\nKey concepts:\n- **Machine Learning**: A subset of AI that enables systems to learn from data\n- **Deep Learning**: A subset of ML using neural networks with many layers\n- **Natural Language Processing**: AI that understands human language\n- **Computer Vision**: AI that interprets visual information",
        videoUrl: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
      },
      {
        title: "History of AI",
        content: "AI has a rich history dating back to the 1950s:\n\n- **1950**: Alan Turing proposes the Turing Test\n- **1956**: The term 'Artificial Intelligence' is coined at Dartmouth Conference\n- **1966**: ELIZA chatbot is created\n- **1997**: IBM's Deep Blue defeats chess champion Kasparov\n- **2011**: IBM Watson wins Jeopardy!\n- **2016**: AlphaGo defeats Go champion Lee Sedol\n- **2022**: ChatGPT launches, bringing AI to the mainstream",
      },
    ],
  },
  {
    id: "python-ml",
    title: "Python for ML",
    description: "Learn Python fundamentals essential for machine learning development.",
    level: "beginner",
    icon: "🐍",
    lessons: [
      {
        title: "Python Basics for Data Science",
        content: "Python is the most popular language for ML. Key libraries include:\n\n- **NumPy**: Numerical computing with arrays\n- **Pandas**: Data manipulation and analysis\n- **Matplotlib/Seaborn**: Data visualization\n- **Scikit-learn**: Machine learning algorithms\n\n```python\nimport numpy as np\nimport pandas as pd\n\n# Create a simple dataset\ndata = pd.DataFrame({\n    'feature': np.random.randn(100),\n    'target': np.random.randint(0, 2, 100)\n})\nprint(data.head())\n```",
      },
    ],
  },
  {
    id: "supervised-learning",
    title: "Supervised Learning",
    description: "Master classification and regression techniques with hands-on examples.",
    level: "intermediate",
    icon: "📊",
    lessons: [
      {
        title: "Classification vs Regression",
        content: "Supervised learning uses labeled data to train models.\n\n**Classification**: Predicts discrete categories\n- Email spam detection (spam/not spam)\n- Image classification (cat/dog)\n- Disease diagnosis (positive/negative)\n\n**Regression**: Predicts continuous values\n- House price prediction\n- Stock price forecasting\n- Temperature prediction\n\nCommon algorithms:\n- Linear/Logistic Regression\n- Decision Trees\n- Random Forests\n- Support Vector Machines (SVM)\n- k-Nearest Neighbors (kNN)",
      },
    ],
  },
  {
    id: "neural-networks",
    title: "Neural Networks",
    description: "Dive deep into neural network architectures and backpropagation.",
    level: "intermediate",
    icon: "🧠",
    lessons: [
      {
        title: "How Neural Networks Work",
        content: "Neural networks are inspired by biological neurons.\n\n**Architecture:**\n- **Input Layer**: Receives the data\n- **Hidden Layers**: Process and transform data\n- **Output Layer**: Produces the prediction\n\n**Key Concepts:**\n- **Weights & Biases**: Learnable parameters\n- **Activation Functions**: ReLU, Sigmoid, Tanh\n- **Backpropagation**: Algorithm to update weights\n- **Loss Function**: Measures prediction error\n- **Gradient Descent**: Optimization algorithm\n\nThe training process:\n1. Forward pass: Input → Hidden → Output\n2. Calculate loss\n3. Backward pass: Compute gradients\n4. Update weights using optimizer",
        videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
      },
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning & CNNs",
    description: "Explore convolutional neural networks and advanced deep learning architectures.",
    level: "advanced",
    icon: "🔬",
    lessons: [
      {
        title: "Convolutional Neural Networks",
        content: "CNNs are specialized for processing grid-like data (images).\n\n**Key Layers:**\n- **Convolutional Layer**: Applies filters to detect features\n- **Pooling Layer**: Reduces spatial dimensions\n- **Fully Connected Layer**: Final classification\n\n**Famous Architectures:**\n- LeNet-5 (1998)\n- AlexNet (2012)\n- VGGNet (2014)\n- ResNet (2015)\n- EfficientNet (2019)\n\nApplications: Image classification, object detection, facial recognition, medical imaging.",
      },
    ],
  },
  {
    id: "transformers",
    title: "Transformers & LLMs",
    description: "Understand the architecture behind GPT, BERT, and modern language models.",
    level: "advanced",
    icon: "⚡",
    lessons: [
      {
        title: "The Transformer Architecture",
        content: "Transformers revolutionized NLP with the 'Attention Is All You Need' paper (2017).\n\n**Key Innovation: Self-Attention**\nAllows the model to weigh the importance of different parts of the input.\n\n**Architecture:**\n- **Encoder**: Processes input sequence\n- **Decoder**: Generates output sequence\n- **Multi-Head Attention**: Multiple attention mechanisms in parallel\n- **Positional Encoding**: Adds position information\n\n**Major Models:**\n- BERT (Bidirectional Encoder)\n- GPT series (Generative Pre-trained Transformer)\n- T5, PaLM, LLaMA, Claude\n\nThese models are trained on massive text corpora and can be fine-tuned for specific tasks.",
      },
    ],
  },
];
