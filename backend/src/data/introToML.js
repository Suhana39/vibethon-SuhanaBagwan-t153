const introToMLModule = {
  id: "intro-to-ml",
  title: "Intro to Machine Learning",
  level: "Beginner",
  summary:
    "Learn how ML systems learn patterns from data and how models are evaluated before deployment.",
  concepts: [
    {
      title: "What is ML?",
      text: "Machine Learning is a way to build systems that improve performance on a task by learning from examples instead of hard-coded rules.",
      useCase: "Email spam filtering learns from labeled spam/ham messages."
    },
    {
      title: "Training vs Testing",
      text: "Training data is used to fit model parameters; test data checks how well the model generalizes to unseen examples.",
      useCase: "A fraud detector is trained on historical transactions and tested on recent unseen records."
    },
    {
      title: "Evaluation Metrics",
      text: "Accuracy, precision, recall, and F1 score reveal different strengths and weaknesses based on your business goal.",
      useCase:
        "Medical screening usually prioritizes recall to avoid missing true positive cases."
    }
  ],
  quiz: [
    {
      id: 1,
      question: "What is the primary goal of the training dataset?",
      options: [
        "To estimate model performance on unseen data",
        "To fit model parameters from examples",
        "To deploy the model in production",
        "To replace feature engineering"
      ],
      answer: 1
    },
    {
      id: 2,
      question: "Which metric is often prioritized when false negatives are costly?",
      options: ["Recall", "Latency", "Model size", "Variance"],
      answer: 0
    }
  ]
};

module.exports = { introToMLModule };
