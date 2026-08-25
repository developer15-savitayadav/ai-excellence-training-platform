<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LearnController extends Controller
{
    public function show($slug)
    {
        return Inertia::render('Learn/Player', [
            'course' => [
                'id' => 'course_001',
                'slug' => $slug,
                'title' => 'Deep Learning Fundamentals',
                'description' => 'Master neural networks, CNNs, RNNs, and transformers from scratch.',
                'instructor' => ['name' => 'Dr. Sarah Mitchell', 'avatar' => '/avatars/sarah-mitchell.jpg'],
                'category' => 'Deep Learning',
                'level' => 'Intermediate',
                'image' => '/images/courses/deep-learning.jpg',
            ],
            'sections' => [
                [
                    'id' => 'sec_001',
                    'title' => 'Introduction to Deep Learning',
                    'lessons' => [
                        [
                            'id' => 'les_001',
                            'title' => 'What is Deep Learning?',
                            'type' => 'video',
                            'duration' => 18,
                            'isPreview' => true,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_002',
                            'title' => 'The Neural Network Landscape',
                            'type' => 'article',
                            'duration' => 12,
                            'isPreview' => true,
                            'content' => 'Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to progressively extract higher-level features from raw input. For example, in image recognition, lower layers may identify edges, while higher layers may identify the concepts relevant to humans such as digits, letters, or faces. The "deep" in deep learning refers to the number of layers in the network. Modern deep learning models may have hundreds of layers, enabling them to learn extremely complex functions. Unlike traditional machine learning algorithms that require hand-crafted feature engineering, deep learning models learn hierarchical representations directly from data. This ability to automatically discover the representations needed for detection or classification eliminates the need for manual feature engineering, making deep learning particularly powerful for unstructured data like images, text, and audio.',
                        ],
                        [
                            'id' => 'les_003',
                            'title' => 'Setting Up Your Environment',
                            'type' => 'video',
                            'duration' => 22,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_004',
                            'title' => 'Your First Neural Network',
                            'type' => 'video',
                            'duration' => 35,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_005',
                            'title' => 'Module 1 Quiz',
                            'type' => 'quiz',
                            'duration' => 15,
                            'isPreview' => false,
                            'content' => null,
                        ],
                    ],
                ],
                [
                    'id' => 'sec_002',
                    'title' => 'Neural Network Architectures',
                    'lessons' => [
                        [
                            'id' => 'les_006',
                            'title' => 'Perceptrons and Multi-Layer Networks',
                            'type' => 'video',
                            'duration' => 28,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_007',
                            'title' => 'Activation Functions Deep Dive',
                            'type' => 'article',
                            'duration' => 15,
                            'isPreview' => false,
                            'content' => 'Activation functions are mathematical equations that determine the output of a neural network model. They introduce non-linearity into the network, enabling it to learn complex patterns in data. Without activation functions, a neural network, no matter how many layers it has, would behave just like a single-layer perceptron because composing linear functions results in another linear function. The most common activation functions include Sigmoid, which maps inputs to values between 0 and 1, making it useful for binary classification; Tanh, which maps inputs to values between -1 and 1, providing zero-centered outputs; ReLU (Rectified Linear Unit), which outputs the input directly if positive or zero otherwise, becoming the most popular choice due to its computational efficiency and effectiveness in mitigating the vanishing gradient problem; Leaky ReLU, which addresses the "dying ReLU" problem by allowing a small positive gradient for negative inputs; and Softmax, which converts a vector of numbers into a vector of probabilities, typically used in the output layer for multi-class classification.',
                        ],
                        [
                            'id' => 'les_008',
                            'title' => 'Backpropagation Explained',
                            'type' => 'video',
                            'duration' => 32,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_009',
                            'title' => 'Gradient Descent Optimization',
                            'type' => 'video',
                            'duration' => 25,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_010',
                            'title' => 'Batch Normalization and Dropout',
                            'type' => 'video',
                            'duration' => 20,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_011',
                            'title' => 'Build a Digit Classifier',
                            'type' => 'assignment',
                            'duration' => 45,
                            'isPreview' => false,
                            'content' => null,
                        ],
                    ],
                ],
                [
                    'id' => 'sec_003',
                    'title' => 'Convolutional Neural Networks',
                    'lessons' => [
                        [
                            'id' => 'les_012',
                            'title' => 'Introduction to CNNs',
                            'type' => 'video',
                            'duration' => 24,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_013',
                            'title' => 'Convolution and Pooling Layers',
                            'type' => 'video',
                            'duration' => 30,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_014',
                            'title' => 'Classic Architectures: LeNet, AlexNet, VGG',
                            'type' => 'article',
                            'duration' => 18,
                            'isPreview' => false,
                            'content' => 'The evolution of CNN architectures tells the story of deep learning itself. LeNet-5 (1998) by Yann LeCun was among the first successful CNNs, demonstrating that learned features could outperform hand-crafted ones for digit recognition. AlexNet (2012) ignited the deep learning revolution by winning ImageNet with a dramatic margin, introducing ReLU activations and dropout regularization. VGGNet (2014) showed that depth matters, using uniformly small 3x3 filters stacked in increasingly deep architectures (16-19 layers). The key insight was that multiple small filters can capture the same receptive field as a single large filter while being deeper and more computationally efficient. These architectures laid the groundwork for modern computer vision, establishing patterns of increasingly deep networks with skip connections, batch normalization, and sophisticated training strategies.',
                        ],
                        [
                            'id' => 'les_015',
                            'title' => 'Transfer Learning with Pre-trained Models',
                            'type' => 'video',
                            'duration' => 28,
                            'isPreview' => false,
                            'content' => null,
                        ],
                        [
                            'id' => 'les_016',
                            'title' => 'Image Classification Project',
                            'type' => 'assignment',
                            'duration' => 60,
                            'isPreview' => false,
                            'content' => null,
                        ],
                    ],
                ],
            ],
            'currentLesson' => [
                'id' => 'les_006',
                'title' => 'Perceptrons and Multi-Layer Networks',
                'type' => 'video',
                'duration' => 28,
                'isPreview' => false,
                'content' => null,
                'videoUrl' => '/videos/deep-learning/perceptrons.mp4',
                'resources' => [
                    ['name' => 'Lecture Slides', 'url' => '/resources/perceptron-slides.pdf', 'size' => '2.4 MB'],
                    ['name' => 'Code Notebook', 'url' => '/resources/perceptron-notebook.ipynb', 'size' => '156 KB'],
                ],
            ],
            'progress' => [
                'completedLessons' => 3,
                'totalLessons' => 16,
                'percentage' => 19,
            ],
            'notes' => [
                [
                    'id' => 'note_001',
                    'lessonId' => 'les_001',
                    'lessonTitle' => 'What is Deep Learning?',
                    'content' => 'Key takeaway: Deep learning learns hierarchical feature representations automatically. Lower layers detect simple patterns (edges, textures), higher layers detect complex concepts (faces, objects).',
                    'createdAt' => '2024-10-20T14:30:00Z',
                ],
                [
                    'id' => 'note_002',
                    'lessonId' => 'les_002',
                    'lessonTitle' => 'The Neural Network Landscape',
                    'content' => 'Difference between AI, ML, and DL: AI is the broadest concept, ML is a subset of AI, DL is a subset of ML that specifically uses neural networks with multiple layers.',
                    'createdAt' => '2024-10-21T09:15:00Z',
                ],
            ],
            'quiz' => [
                'id' => 'quiz_001',
                'title' => 'Module 1: Introduction to Deep Learning',
                'questions' => [
                    [
                        'id' => 'q_001',
                        'question' => 'What is the primary advantage of deep learning over traditional machine learning?',
                        'options' => [
                            'It requires less data to train',
                            'It automatically learns feature representations from raw data',
                            'It always achieves higher accuracy',
                            'It does not require any computational resources',
                        ],
                        'correctIndex' => 1,
                        'explanation' => 'Deep learning automatically learns hierarchical feature representations from raw data, eliminating the need for manual feature engineering that traditional ML requires.',
                    ],
                    [
                        'id' => 'q_002',
                        'question' => 'Which of the following is NOT a type of neural network architecture?',
                        'options' => [
                            'Convolutional Neural Network (CNN)',
                            'Recurrent Neural Network (RNN)',
                            'Bayesian Decision Network',
                            'Generative Adversarial Network (GAN)',
                        ],
                        'correctIndex' => 2,
                        'explanation' => 'A Bayesian Decision Network is a probabilistic graphical model, not a neural network architecture. CNNs, RNNs, and GANs are all neural network architectures.',
                    ],
                    [
                        'id' => 'q_003',
                        'question' => 'What does the "deep" in deep learning refer to?',
                        'options' => [
                            'The complexity of the math involved',
                            'The depth of the data pipeline',
                            'The number of layers in the neural network',
                            'The amount of training data required',
                        ],
                        'correctIndex' => 2,
                        'explanation' => 'The "deep" in deep learning refers to the multiple (deep) layers in the neural network. A "deep" network typically has more than one hidden layer.',
                    ],
                    [
                        'id' => 'q_004',
                        'question' => 'Which Python library was developed by Google for deep learning?',
                        'options' => [
                            'scikit-learn',
                            'TensorFlow',
                            'pandas',
                            'NumPy',
                        ],
                        'correctIndex' => 1,
                        'explanation' => 'TensorFlow is an open-source machine learning framework developed by Google Brain. scikit-learn is for general ML, while pandas and NumPy are data manipulation libraries.',
                    ],
                    [
                        'id' => 'q_005',
                        'question' => 'What is the role of an activation function in a neural network?',
                        'options' => [
                            'To normalize the input data',
                            'To initialize the weights randomly',
                            'To introduce non-linearity into the network',
                            'To reduce the learning rate over time',
                        ],
                        'correctIndex' => 2,
                        'explanation' => 'Activation functions introduce non-linearity into the neural network, allowing it to learn and model complex patterns. Without them, the network would be limited to learning only linear relationships.',
                    ],
                ],
            ],
        ]);
    }
}
