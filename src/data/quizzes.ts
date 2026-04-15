export interface Quiz {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizzes: Quiz[] = [
  {
    id: "ai-basics",
    title: "AI Fundamentals",
    level: "beginner",
    questions: [
      {
        id: "q1",
        question: "What does AI stand for?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Analog Interface"],
        correctIndex: 1,
        explanation: "AI stands for Artificial Intelligence — the simulation of human intelligence by machines.",
      },
      {
        id: "q2",
        question: "Which of the following is a subset of AI?",
        options: ["Cloud Computing", "Machine Learning", "Blockchain", "Cybersecurity"],
        correctIndex: 1,
        explanation: "Machine Learning is a subset of AI focused on learning from data without explicit programming.",
      },
      {
        id: "q3",
        question: "What was the first computer program to defeat a world chess champion?",
        options: ["AlphaGo", "Watson", "Deep Blue", "ELIZA"],
        correctIndex: 2,
        explanation: "IBM's Deep Blue defeated world chess champion Garry Kasparov in 1997.",
      },
      {
        id: "q4",
        question: "Which programming language is most commonly used in ML?",
        options: ["Java", "C++", "Python", "JavaScript"],
        correctIndex: 2,
        explanation: "Python is the most popular language for ML due to libraries like NumPy, Pandas, and scikit-learn.",
      },
      {
        id: "q5",
        question: "What is the Turing Test designed to evaluate?",
        options: ["Computer speed", "Machine intelligence", "Network security", "Data storage"],
        correctIndex: 1,
        explanation: "The Turing Test evaluates whether a machine can exhibit intelligent behavior indistinguishable from a human.",
      },
    ],
  },
  {
    id: "ml-concepts",
    title: "ML Concepts",
    level: "intermediate",
    questions: [
      {
        id: "q1",
        question: "In supervised learning, what is a 'label'?",
        options: ["A variable name", "The known output/answer", "A data type", "A model parameter"],
        correctIndex: 1,
        explanation: "A label is the known correct answer that the model tries to predict during training.",
      },
      {
        id: "q2",
        question: "What does overfitting mean?",
        options: [
          "Model performs well on all data",
          "Model is too simple",
          "Model memorizes training data but fails on new data",
          "Model trains too slowly",
        ],
        correctIndex: 2,
        explanation: "Overfitting occurs when a model learns noise in training data, performing well on training but poorly on unseen data.",
      },
      {
        id: "q3",
        question: "Which metric is used for classification tasks?",
        options: ["Mean Squared Error", "R-squared", "Accuracy / F1-Score", "Mean Absolute Error"],
        correctIndex: 2,
        explanation: "Accuracy and F1-Score are common metrics for classification. MSE and MAE are used for regression.",
      },
      {
        id: "q4",
        question: "What is the purpose of a validation set?",
        options: [
          "To train the model",
          "To tune hyperparameters and prevent overfitting",
          "To deploy the model",
          "To collect data",
        ],
        correctIndex: 1,
        explanation: "The validation set is used to tune model hyperparameters and monitor overfitting during training.",
      },
    ],
  },
  {
    id: "deep-learning-quiz",
    title: "Deep Learning",
    level: "advanced",
    questions: [
      {
        id: "q1",
        question: "What activation function is most commonly used in hidden layers?",
        options: ["Sigmoid", "Softmax", "ReLU", "Step function"],
        correctIndex: 2,
        explanation: "ReLU (Rectified Linear Unit) is preferred because it helps mitigate the vanishing gradient problem.",
      },
      {
        id: "q2",
        question: "What does the 'attention mechanism' in Transformers do?",
        options: [
          "Speeds up training",
          "Allows the model to focus on relevant parts of the input",
          "Reduces model size",
          "Increases batch size",
        ],
        correctIndex: 1,
        explanation: "Attention allows the model to weigh the importance of different input elements relative to each other.",
      },
      {
        id: "q3",
        question: "Which architecture is primarily used for image recognition?",
        options: ["RNN", "Transformer", "CNN", "GAN"],
        correctIndex: 2,
        explanation: "CNNs (Convolutional Neural Networks) are designed to process grid-like data and excel at image recognition.",
      },
    ],
  },
];
