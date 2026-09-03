import { Link, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'
import Button from '../../Components/ui/Button'
import Card from '../../Components/ui/Card'
import Badge from '../../Components/ui/Badge'
import ProgressBar from '../../Components/ui/ProgressBar'
import StarRating from '../../Components/ui/StarRating'
import Avatar from '../../Components/ui/Avatar'
import SearchInput from '../../Components/ui/SearchInput'

const navigation = [
    { name: 'Dashboard', href: '/instructor/dashboard', icon: '📊', current: true },
    { name: 'My Courses', href: '/instructor/dashboard', icon: '📚', current: false },
    { name: 'Course Builder', href: '/instructor/dashboard', icon: '🔧', current: false },
    { name: 'Analytics', href: '/instructor/dashboard', icon: '📈', current: false },
    { name: 'Q&A Inbox', href: '/instructor/dashboard', icon: '💬', current: false },
    { name: 'Settings', href: '/profile', icon: '⚙', current: false },
]

const staticData = {
    user: { id: 2, name: 'Dr. Alex Rivera', email: 'alex.rivera@cortex.academy', avatar: null, role: 'instructor' },
    courses: [
        { id: 1, title: 'Deep Learning Fundamentals', slug: 'deep-learning-fundamentals', status: 'Published', enrollments: 156, revenue: 5890, rating: 4.9, completionRate: 78, students: 156 },
        { id: 2, title: 'Reinforcement Learning from Scratch', slug: 'reinforcement-learning', status: 'Published', enrollments: 89, revenue: 3340, rating: 4.8, completionRate: 65, students: 89 },
        { id: 3, title: 'Generative AI with LLMs', slug: 'generative-ai-llms', status: 'Draft', enrollments: 0, revenue: 0, rating: 0, completionRate: 0, students: 0 },
        { id: 4, title: 'Edge AI & TinyML', slug: 'edge-ai-tinyml', status: 'Under Review', enrollments: 0, revenue: 0, rating: 0, completionRate: 0, students: 0 },
    ],
    analytics: {
        totalStudents: 342,
        totalRevenue: 12450,
        avgRating: 4.8,
        activeCourses: 4,
        monthlyRevenue: [
            { month: 'Mar', amount: 1200 },
            { month: 'Apr', amount: 1800 },
            { month: 'May', amount: 2100 },
            { month: 'Jun', amount: 2450 },
            { month: 'Jul', amount: 2800 },
            { month: 'Aug', amount: 2100 },
        ],
        enrollmentTrends: [
            { month: 'Mar', count: 42 },
            { month: 'Apr', count: 58 },
            { month: 'May', count: 67 },
            { month: 'Jun', count: 89 },
            { month: 'Jul', count: 52 },
            { month: 'Aug', count: 34 },
        ],
        recentEnrollments: [
            { id: 1, student: 'Emma Wilson', course: 'Deep Learning Fundamentals', date: '2026-08-20' },
            { id: 2, student: 'Liam Park', course: 'Reinforcement Learning from Scratch', date: '2026-08-19' },
            { id: 3, student: 'Olivia Chen', course: 'Deep Learning Fundamentals', date: '2026-08-19' },
            { id: 4, student: 'Noah Kumar', course: 'Deep Learning Fundamentals', date: '2026-08-18' },
            { id: 5, student: 'Sophia Martinez', course: 'Reinforcement Learning from Scratch', date: '2026-08-18' },
        ],
        recentReviews: [
            { id: 1, student: 'Emma Wilson', course: 'Deep Learning Fundamentals', rating: 5, comment: 'Excellent course! The transformer section was particularly insightful.', date: '2026-08-20' },
            { id: 2, student: 'Liam Park', course: 'Reinforcement Learning from Scratch', rating: 4, comment: 'Great content, but some sections could use more practical exercises.', date: '2026-08-18' },
            { id: 3, student: 'Olivia Chen', course: 'Deep Learning Fundamentals', rating: 5, comment: 'Best deep learning course I have taken. Clear explanations.', date: '2026-08-16' },
        ],
        ratingDistribution: { 5: 89, 4: 42, 3: 8, 2: 2, 1: 1 },
    },
    questions: [
        { id: 1, student: 'Emma Wilson', question: 'Can you explain the difference between batch normalization and layer normalization in practice?', course: 'Deep Learning Fundamentals', date: '2026-08-20', replied: false },
        { id: 2, student: 'Liam Park', question: 'For the RL assignment, should we use epsilon-greedy or softmax for the exploration strategy?', course: 'Reinforcement Learning from Scratch', date: '2026-08-19', replied: true, reply: 'Either approach is acceptable for this assignment. Epsilon-greedy is simpler to implement, but softmax gives smoother exploration. I recommend starting with epsilon-greedy.' },
        { id: 3, student: 'Olivia Chen', question: 'The transformer attention mechanism lecture mentions multi-head attention. How do we determine the optimal number of heads?', course: 'Deep Learning Fundamentals', date: '2026-08-19', replied: false },
        { id: 4, student: 'Noah Kumar', question: 'In the DQN implementation, why do we use a target network? Can we skip it for simplicity?', course: 'Reinforcement Learning from Scratch', date: '2026-08-18', replied: true, reply: 'The target network is critical for training stability. Without it, the Q-values can diverge and training becomes unstable. For the assignment, please include it.' },
        { id: 5, student: 'Sophia Martinez', question: 'What GPU requirements are recommended for the final project? Can we use Google Colab?', course: 'Deep Learning Fundamentals', date: '2026-08-17', replied: true, reply: 'Google Colab works perfectly. Use the T4 GPU runtime. The final project is designed to run on modest hardware.' },
        { id: 6, student: 'James O\'Brien', question: 'For the policy gradient assignment, should we implement REINFORCE or can we use PPO?', course: 'Reinforcement Learning from Scratch', date: '2026-08-16', replied: false },
        { id: 7, student: 'Mia Tanaka', question: 'The loss function lecture mentions label smoothing. When would we use it vs standard cross-entropy?', course: 'Deep Learning Fundamentals', date: '2026-08-15', replied: true, reply: 'Label smoothing helps when you suspect noisy labels or want better calibration. Use it when your model is overconfident. For clean datasets, standard cross-entropy is fine.' },
        { id: 8, student: 'James O\'Brien', question: 'Can you clarify the discount factor gamma in the Q-learning update equation?', course: 'Reinforcement Learning from Scratch', date: '2026-08-14', replied: true, reply: 'Gamma (0-1) controls how much future rewards matter. Higher gamma (0.99) makes the agent more far-sighted. Lower gamma (0.9) makes it more short-sighted. For our grid world tasks, 0.99 works well.' },
    ],
}

const buildSteps = [
    { id: 1, name: 'Course Details', icon: '📝' },
    { id: 2, name: 'Sections & Lessons', icon: '📑' },
    { id: 3, name: 'Quiz Builder', icon: '❓' },
    { id: 4, name: 'Publish', icon: '🚀' },
]

export default function Instructor({ user: propUser, courses: propCourses, analytics: propAnalytics, questions: propQuestions }) {
    const user = propUser || staticData.user
    const courses = propCourses || staticData.courses
    const analytics = propAnalytics || staticData.analytics
    const questions = propQuestions || staticData.questions

    const [activeTab, setActiveTab] = useState('dashboard')
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedQuestion, setExpandedQuestion] = useState(null)
    const [replyText, setReplyText] = useState({})
    const [questionList, setQuestionList] = useState(questions)

    // Course Builder state
    const [builderStep, setBuilderStep] = useState(1)
    const [courseForm, setCourseForm] = useState({
        title: '', description: '', category: 'ai-ml', level: 'intermediate', price: '', thumbnail: null,
    })
    const [sections, setSections] = useState([
        { id: 1, title: 'Introduction', lessons: [
            { id: 1, title: 'Course Overview', type: 'video', content: '' },
            { id: 2, title: 'Prerequisites', type: 'article', content: '' },
        ]},
    ])
    const [quizQuestions, setQuizQuestions] = useState([
        { id: 1, question: '', options: ['', '', '', ''], correct: 0, explanation: '' },
    ])
    const [published, setPublished] = useState(false)

    const [courseList, setCourseList] = useState(courses)

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'courses', label: 'My Courses', icon: '📚' },
        { id: 'builder', label: 'Course Builder', icon: '🔧' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'qa', label: 'Q&A Inbox', icon: '💬' },
    ]

    const maxRevenue = Math.max(...analytics.monthlyRevenue.map(m => m.amount))
    const maxEnrollments = Math.max(...analytics.enrollmentTrends.map(m => m.count))
    const totalRatings = Object.values(analytics.ratingDistribution).reduce((a, b) => a + b, 0)

    const filteredCourses = courseList.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const unrepliedQuestions = questionList.filter(q => !q.replied)

    const handleTogglePublish = (courseId) => {
        setCourseList(prev => prev.map(c =>
            c.id === courseId
                ? { ...c, status: c.status === 'Published' ? 'Draft' : 'Published' }
                : c
        ))
    }

    const handleReply = (questionId) => {
        if (!replyText[questionId]?.trim()) return
        setQuestionList(prev => prev.map(q =>
            q.id === questionId
                ? { ...q, replied: true, reply: replyText[questionId] }
                : q
        ))
        setReplyText(prev => ({ ...prev, [questionId]: '' }))
        setExpandedQuestion(null)
    }

    const addSection = () => {
        setSections(prev => [...prev, { id: Date.now(), title: '', lessons: [] }])
    }

    const updateSectionTitle = (sectionId, title) => {
        setSections(prev => prev.map(s => s.id === sectionId ? { ...s, title } : s))
    }

    const addLesson = (sectionId) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, lessons: [...s.lessons, { id: Date.now(), title: '', type: 'article', content: '' }] }
                : s
        ))
    }

    const updateLesson = (sectionId, lessonId, field, value) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l) }
                : s
        ))
    }

    const moveLesson = (sectionId, lessonId, direction) => {
        setSections(prev => prev.map(s => {
            if (s.id !== sectionId) return s
            const idx = s.lessons.findIndex(l => l.id === lessonId)
            if (idx === -1) return s
            const newIdx = direction === 'up' ? idx - 1 : idx + 1
            if (newIdx < 0 || newIdx >= s.lessons.length) return s
            const newLessons = [...s.lessons]
            ;[newLessons[idx], newLessons[newIdx]] = [newLessons[newIdx], newLessons[idx]]
            return { ...s, lessons: newLessons }
        }))
    }

    const addQuizQuestion = () => {
        setQuizQuestions(prev => [...prev, { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0, explanation: '' }])
    }

    const updateQuizQuestion = (qId, field, value) => {
        setQuizQuestions(prev => prev.map(q => q.id === qId ? { ...q, [field]: value } : q))
    }

    const updateQuizOption = (qId, optIdx, value) => {
        setQuizQuestions(prev => prev.map(q =>
            q.id === qId ? { ...q, options: q.options.map((o, i) => i === optIdx ? value : o) } : q
        ))
    }

    const handlePublish = () => {
        setPublished(true)
        alert('Phase 1: Course submitted for review!')
    }

    return (
        <DashboardLayout
            title="Instructor Dashboard"
            navigation={navigation}
            user={user}
        >
            <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 border-b border-black/[0.08] pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-lime/10 text-lime border border-lime/30'
                                    : 'text-muted hover:text-body hover:bg-black/[0.03]'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                            {tab.id === 'qa' && unrepliedQuestions.length > 0 && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-danger text-white rounded-full">
                                    {unrepliedQuestions.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-display font-bold text-body">
                                Instructor Dashboard
                            </h1>
                            <p className="text-muted font-body mt-1">Welcome back, {user.name}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-lime">{analytics.totalStudents}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Students</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-success">${analytics.totalRevenue.toLocaleString()}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Revenue</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-violet">{analytics.avgRating}</div>
                                <div className="text-muted font-body text-sm mt-1">Avg Rating</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-body">{analytics.activeCourses}</div>
                                <div className="text-muted font-body text-sm mt-1">Active Courses</div>
                            </Card>
                        </div>

                        {/* Revenue Chart */}
                        <div>
                            <h2 className="text-lg font-display font-semibold text-body mb-4">Revenue (Last 6 Months)</h2>
                            <Card className="p-6 bg-white border-black/[0.08]">
                                <div className="flex items-end gap-3 h-48">
                                    {analytics.monthlyRevenue.map((month, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center">
                                            <span className="text-xs font-mono text-muted mb-1">${month.amount.toLocaleString()}</span>
                                            <div
                                                className="w-full bg-lime/30 border border-lime/50 rounded-t-lg transition-all duration-500"
                                                style={{ height: `${(month.amount / maxRevenue) * 140}px` }}
                                            />
                                            <span className="text-xs font-body text-muted mt-2">{month.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Enrollments */}
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Recent Enrollments</h2>
                                <Card className="bg-white border-black/[0.08] divide-y divide-black/[0.08]">
                                    {analytics.recentEnrollments.map(enrollment => (
                                        <div key={enrollment.id} className="flex items-center gap-3 px-5 py-3">
                                            <Avatar name={enrollment.student} className="w-8 h-8" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-body font-body text-sm truncate">{enrollment.student}</p>
                                                <p className="text-muted font-body text-xs truncate">{enrollment.course}</p>
                                            </div>
                                            <span className="text-muted font-body text-xs whitespace-nowrap">{enrollment.date}</span>
                                        </div>
                                    ))}
                                </Card>
                            </div>

                            {/* Recent Reviews */}
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Recent Reviews</h2>
                                <Card className="bg-white border-black/[0.08] divide-y divide-black/[0.08]">
                                    {analytics.recentReviews.map(review => (
                                        <div key={review.id} className="px-5 py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="font-body text-sm text-body font-medium">{review.student}</span>
                                                <StarRating rating={review.rating} size="sm" />
                                            </div>
                                            <p className="text-muted font-body text-xs mt-1">{review.course} · {review.date}</p>
                                            <p className="text-muted font-body text-sm mt-2">{review.comment}</p>
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {/* My Courses View */}
                {activeTab === 'courses' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">My Courses</h1>
                            <div className="flex gap-3">
                                <div className="w-64">
                    <SearchInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses..."
                    />
                                </div>
                                <Button onClick={() => setActiveTab('builder')}>
                                    + Create New Course
                                </Button>
                            </div>
                        </div>

                        {/* Course Table */}
                        <Card className="bg-white border-black/[0.08] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/[0.08]">
                                            <th className="text-left px-6 py-4 font-display font-semibold text-body text-sm">Course</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Status</th>
                                            <th className="text-right px-4 py-4 font-display font-semibold text-body text-sm">Students</th>
                                            <th className="text-right px-4 py-4 font-display font-semibold text-body text-sm">Revenue</th>
                                            <th className="text-right px-4 py-4 font-display font-semibold text-body text-sm">Rating</th>
                                            <th className="text-right px-4 py-4 font-display font-semibold text-body text-sm">Completion</th>
                                            <th className="text-right px-6 py-4 font-display font-semibold text-body text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/[0.08]">
                                        {filteredCourses.map(course => (
                                            <tr key={course.id} className="hover:bg-black/[0.03] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-body text-sm text-body font-medium">{course.title}</div>
                                                    <div className="text-muted font-body text-xs mt-0.5">/{course.slug}</div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <Badge variant={
                                                        course.status === 'Published' ? 'success' :
                                                        course.status === 'Draft' ? 'info' :
                                                        'warning'
                                                    }>
                                                        {course.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-4 text-right font-mono text-sm text-body">{course.enrollments}</td>
                                                <td className="px-4 py-4 text-right font-mono text-sm text-success">${course.revenue.toLocaleString()}</td>
                                                <td className="px-4 py-4 text-right">
                                                    {course.rating > 0 ? (
                                                        <div className="flex items-center justify-end gap-1">
                                                            <StarRating rating={course.rating} size="sm" />
                                                            <span className="text-xs font-mono text-muted">{course.rating}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted font-body text-sm">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-right font-mono text-sm text-body">
                                                    {course.completionRate > 0 ? `${course.completionRate}%` : '—'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/instructor/courses/${course.slug}/edit`}>
                                                            <Button size="sm" variant="secondary">Edit</Button>
                                                        </Link>
                                                        <Link href={`/courses/${course.slug}`}>
                                                            <Button size="sm" variant="secondary">View</Button>
                                                        </Link>
                                                        {course.status !== 'Under Review' && (
                                                            <Button
                                                                size="sm"
                                                                variant={course.status === 'Published' ? 'danger' : 'primary'}
                                                                onClick={() => handleTogglePublish(course.id)}
                                                            >
                                                                {course.status === 'Published' ? 'Unpublish' : 'Publish'}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Course Builder View */}
                {activeTab === 'builder' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">Course Builder</h1>
                            <Button variant="secondary" onClick={() => setActiveTab('courses')}>
                                Back to My Courses
                            </Button>
                        </div>

                        {published ? (
                            <Card className="p-12 bg-white border-black/[0.08] text-center">
                                <div className="text-5xl mb-4">🎉</div>
                                <h2 className="text-xl font-display font-bold text-body mb-2">Course Submitted!</h2>
                                <p className="text-muted font-body">Your course has been submitted for review. You will be notified once it is approved.</p>
                                <Button className="mt-6" onClick={() => {
                                    setPublished(false)
                                    setBuilderStep(1)
                                    setCourseForm({ title: '', description: '', category: 'ai-ml', level: 'intermediate', price: '', thumbnail: null })
                                    setSections([{ id: 1, title: 'Introduction', lessons: [{ id: 1, title: 'Course Overview', type: 'video', content: '' }, { id: 2, title: 'Prerequisites', type: 'article', content: '' }] }])
                                    setQuizQuestions([{ id: 1, question: '', options: ['', '', '', ''], correct: 0, explanation: '' }])
                                }}>
                                    Create Another Course
                                </Button>
                            </Card>
                        ) : (
                            <>
                                {/* Step Progress */}
                                <div className="flex items-center gap-2">
                                    {buildSteps.map((step, i) => (
                                        <div key={step.id} className="flex items-center">
                                            <button
                                                onClick={() => setBuilderStep(step.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-all ${
                                                    builderStep === step.id
                                                        ? 'bg-lime/10 text-lime border border-lime/30'
                                                        : builderStep > step.id
                                                        ? 'text-success'
                                                        : 'text-muted'
                                                }`}
                                            >
                                                <span className="w-6 h-6 rounded-full bg-black/[0.03] flex items-center justify-center text-xs font-mono">
                                                    {builderStep > step.id ? '✓' : step.id}
                                                </span>
                                                <span className="hidden sm:inline">{step.name}</span>
                                            </button>
                                            {i < buildSteps.length - 1 && (
                                                <div className={`w-8 h-px mx-1 ${builderStep > step.id ? 'bg-success' : 'bg-black/[0.03]'}`} />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Step 1: Course Details */}
                                {builderStep === 1 && (
                                    <Card className="p-6 bg-white border-black/[0.08] space-y-6">
                                        <h2 className="font-display font-semibold text-body text-lg">Course Details</h2>
                                        <div>
                                            <label className="block font-body text-sm text-muted mb-2">Course Title</label>
                                            <input
                                                type="text"
                                                value={courseForm.title}
                                                onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                                                placeholder="e.b., Advanced Neural Architectures"
                                                className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-body text-sm text-muted mb-2">Description</label>
                                            <textarea
                                                value={courseForm.description}
                                                onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Describe what students will learn in this course..."
                                                rows={4}
                                                className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50 resize-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block font-body text-sm text-muted mb-2">Category</label>
                                                <select
                                                    value={courseForm.category}
                                                    onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                                                    className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body focus:outline-none focus:border-lime/50"
                                                >
                                                    <option value="ai-ml">AI & Machine Learning</option>
                                                    <option value="deep-learning">Deep Learning</option>
                                                    <option value="nlp">Natural Language Processing</option>
                                                    <option value="cv">Computer Vision</option>
                                                    <option value="rl">Reinforcement Learning</option>
                                                    <option value="ethics">AI Ethics</option>
                                                    <option value="mlops">MLOps</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-body text-sm text-muted mb-2">Level</label>
                                                <select
                                                    value={courseForm.level}
                                                    onChange={(e) => setCourseForm(prev => ({ ...prev, level: e.target.value }))}
                                                    className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body focus:outline-none focus:border-lime/50"
                                                >
                                                    <option value="beginner">Beginner</option>
                                                    <option value="intermediate">Intermediate</option>
                                                    <option value="advanced">Advanced</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-body text-sm text-muted mb-2">Price ($)</label>
                                                <input
                                                    type="number"
                                                    value={courseForm.price}
                                                    onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                                                    placeholder="79.99"
                                                    className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-body text-sm text-muted mb-2">Thumbnail</label>
                                            <div className="w-full h-32 border-2 border-dashed border-black/[0.08] rounded-xl flex flex-col items-center justify-center text-muted hover:border-lime/30 transition-colors cursor-pointer">
                                                <span className="text-2xl mb-1">📷</span>
                                                <span className="font-body text-sm">Click to upload or drag and drop</span>
                                                <span className="font-body text-xs mt-1">PNG, JPG, up to 2MB</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button onClick={() => setBuilderStep(2)}>Next: Sections & Lessons</Button>
                                        </div>
                                    </Card>
                                )}

                                {/* Step 2: Sections & Lessons */}
                                {builderStep === 2 && (
                                    <div className="space-y-4">
                                        {sections.map((section, sIdx) => (
                                            <Card key={section.id} className="p-6 bg-white border-black/[0.08]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="font-mono text-sm text-muted">#{sIdx + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={section.title}
                                                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                                        placeholder="Section title..."
                                                        className="flex-1 px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                                    />
                                                </div>

                                                <div className="space-y-3 ml-6">
                                                    {section.lessons.map((lesson, lIdx) => (
                                                        <div key={lesson.id} className="bg-black/[0.04] rounded-xl p-4 space-y-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex flex-col gap-0.5">
                                                                    <button
                                                                        onClick={() => moveLesson(section.id, lesson.id, 'up')}
                                                                        disabled={lIdx === 0}
                                                                        className="text-xs text-muted hover:text-body disabled:opacity-30"
                                                                    >▲</button>
                                                                    <button
                                                                        onClick={() => moveLesson(section.id, lesson.id, 'down')}
                                                                        disabled={lIdx === section.lessons.length - 1}
                                                                        className="text-xs text-muted hover:text-body disabled:opacity-30"
                                                                    >▼</button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={lesson.title}
                                                                    onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                                                                    placeholder="Lesson title..."
                                                                    className="flex-1 px-3 py-1.5 bg-white border border-black/[0.08] rounded-lg font-body text-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                                                />
                                                                <select
                                                                    value={lesson.type}
                                                                    onChange={(e) => updateLesson(section.id, lesson.id, 'type', e.target.value)}
                                                                    className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-lg font-body text-body text-sm focus:outline-none focus:border-lime/50"
                                                                >
                                                                    <option value="article">📝 Article</option>
                                                                    <option value="video">🎬 Video</option>
                                                                    <option value="quiz">❓ Quiz</option>
                                                                    <option value="exercise">🏋️ Exercise</option>
                                                                </select>
                                                                <span className="text-muted font-mono text-xs">L{lIdx + 1}</span>
                                                            </div>
                                                            {lesson.type === 'video' && (
                                                                <input
                                                                    type="text"
                                                                    value={lesson.content}
                                                                    onChange={(e) => updateLesson(section.id, lesson.id, 'content', e.target.value)}
                                                                    placeholder="Video URL..."
                                                                    className="w-full px-3 py-1.5 bg-white border border-black/[0.08] rounded-lg font-body text-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                                                />
                                                            )}
                                                            {lesson.type === 'article' && (
                                                                <textarea
                                                                    value={lesson.content}
                                                                    onChange={(e) => updateLesson(section.id, lesson.id, 'content', e.target.value)}
                                                                    placeholder="Write your article content..."
                                                                    rows={3}
                                                                    className="w-full px-3 py-1.5 bg-white border border-black/[0.08] rounded-lg font-body text-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime/50 resize-none"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => addLesson(section.id)}
                                                        className="text-lime font-body text-sm hover:underline"
                                                    >
                                                        + Add Lesson
                                                    </button>
                                                </div>
                                            </Card>
                                        ))}
                                        <button
                                            onClick={addSection}
                                            className="text-lime font-body text-sm hover:underline px-6"
                                        >
                                            + Add Section
                                        </button>
                                        <div className="flex justify-between">
                                            <Button variant="secondary" onClick={() => setBuilderStep(1)}>Back</Button>
                                            <Button onClick={() => setBuilderStep(3)}>Next: Quiz Builder</Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Quiz Builder */}
                                {builderStep === 3 && (
                                    <div className="space-y-4">
                                        {quizQuestions.map((q, qIdx) => (
                                            <Card key={q.id} className="p-6 bg-white border-black/[0.08]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="font-mono text-sm text-muted">Q{qIdx + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={q.question}
                                                        onChange={(e) => updateQuizQuestion(q.id, 'question', e.target.value)}
                                                        placeholder="Enter your question..."
                                                        className="flex-1 px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-6 mb-3">
                                                    {q.options.map((opt, optIdx) => (
                                                        <div key={optIdx} className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuizQuestion(q.id, 'correct', optIdx)}
                                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-colors ${
                                                                    q.correct === optIdx
                                                                        ? 'bg-lime border-lime text-black'
                                                                        : 'border-black/[0.08] text-muted hover:border-lime/50'
                                                                }`}
                                                            >
                                                                {String.fromCharCode(65 + optIdx)}
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={opt}
                                                                onChange={(e) => updateQuizOption(q.id, optIdx, e.target.value)}
                                                                placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                                                                className="flex-1 px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="ml-6">
                                                    <textarea
                                                        value={q.explanation}
                                                        onChange={(e) => updateQuizQuestion(q.id, 'explanation', e.target.value)}
                                                        placeholder="Explanation for the correct answer..."
                                                        rows={2}
                                                        className="w-full px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime/50 resize-none"
                                                    />
                                                </div>
                                            </Card>
                                        ))}
                                        <button
                                            onClick={addQuizQuestion}
                                            className="text-lime font-body text-sm hover:underline px-6"
                                        >
                                            + Add Question
                                        </button>
                                        <div className="flex justify-between">
                                            <Button variant="secondary" onClick={() => setBuilderStep(2)}>Back</Button>
                                            <Button onClick={() => setBuilderStep(4)}>Next: Publish</Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Publish */}
                                {builderStep === 4 && (
                                    <Card className="p-6 bg-white border-black/[0.08] space-y-6">
                                        <h2 className="font-display font-semibold text-body text-lg">Course Preview & Publish</h2>
                                        <div className="bg-black/[0.03] rounded-xl p-6 space-y-4">
                                            <div>
                                                <span className="text-muted font-body text-xs uppercase tracking-wider">Title</span>
                                                <p className="font-display font-semibold text-body text-lg mt-1">
                                                    {courseForm.title || 'Untitled Course'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-muted font-body text-xs uppercase tracking-wider">Description</span>
                                                <p className="font-body text-body text-sm mt-1">
                                                    {courseForm.description || 'No description provided.'}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <span className="text-muted font-body text-xs uppercase tracking-wider">Category</span>
                                                    <p className="font-body text-body text-sm mt-1 capitalize">{courseForm.category.replace('-', ' ')}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted font-body text-xs uppercase tracking-wider">Level</span>
                                                    <p className="font-body text-body text-sm mt-1 capitalize">{courseForm.level}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted font-body text-xs uppercase tracking-wider">Price</span>
                                                    <p className="font-body text-body text-sm mt-1">${courseForm.price || '0.00'}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-muted font-body text-xs uppercase tracking-wider">Sections</span>
                                                <p className="font-body text-body text-sm mt-1">{sections.length} section(s) · {sections.reduce((acc, s) => acc + s.lessons.length, 0)} lessons</p>
                                            </div>
                                            <div>
                                                <span className="text-muted font-body text-xs uppercase tracking-wider">Quiz</span>
                                                <p className="font-body text-body text-sm mt-1">{quizQuestions.length} question(s)</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <Button variant="secondary" onClick={() => setBuilderStep(3)}>Back</Button>
                                            <Button onClick={handlePublish}>
                                                🚀 Publish Course
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Analytics View */}
                {activeTab === 'analytics' && (
                    <div className="space-y-8">
                        <h1 className="text-2xl font-display font-bold text-body">Analytics</h1>

                        {/* Overview Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-lime">{analytics.totalStudents}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Students</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 12% this month</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-success">${analytics.totalRevenue.toLocaleString()}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Revenue</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 8% this month</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-violet">{analytics.avgRating}</div>
                                <div className="text-muted font-body text-sm mt-1">Avg Rating</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 0.1 this month</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-body">{totalRatings}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Reviews</div>
                                <div className="text-muted font-mono text-xs mt-2">→ steady</div>
                            </Card>
                        </div>

                        {/* Enrollment Trends */}
                        <div>
                            <h2 className="text-lg font-display font-semibold text-body mb-4">Enrollment Trends</h2>
                            <Card className="p-6 bg-white border-black/[0.08]">
                                <div className="flex items-end gap-3 h-48">
                                    {analytics.enrollmentTrends.map((month, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center">
                                            <span className="text-xs font-mono text-muted mb-1">{month.count}</span>
                                            <div
                                                className="w-full bg-violet/30 border border-violet/50 rounded-t-lg transition-all duration-500"
                                                style={{ height: `${(month.count / maxEnrollments) * 140}px` }}
                                            />
                                            <span className="text-xs font-body text-muted mt-2">{month.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Revenue by Course */}
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Revenue by Course</h2>
                                <Card className="p-6 bg-white border-black/[0.08] space-y-4">
                                    {courseList.filter(c => c.revenue > 0).map(course => (
                                        <div key={course.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-body text-body truncate pr-2">{course.title}</span>
                                                <span className="font-mono text-success whitespace-nowrap">${course.revenue.toLocaleString()}</span>
                                            </div>
                                            <ProgressBar value={course.revenue} max={analytics.totalRevenue} />
                                        </div>
                                    ))}
                                </Card>
                            </div>

                            {/* Completion Rates */}
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Completion Rates</h2>
                                <Card className="p-6 bg-white border-black/[0.08] space-y-4">
                                    {courseList.filter(c => c.completionRate > 0).map(course => (
                                        <div key={course.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-body text-body truncate pr-2">{course.title}</span>
                                                <span className="font-mono text-muted">{course.completionRate}%</span>
                                            </div>
                                            <ProgressBar value={course.completionRate} max={100} />
                                        </div>
                                    ))}
                                </Card>
                            </div>

                            {/* Rating Distribution */}
                            <div className="lg:col-span-2">
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Rating Distribution</h2>
                                <Card className="p-6 bg-white border-black/[0.08]">
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map(star => (
                                            <div key={star} className="flex items-center gap-3">
                                                <span className="font-body text-sm text-muted w-8 text-right">{star}★</span>
                                                <div className="flex-1 h-4 bg-black/[0.03] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-lime/50 rounded-full transition-all duration-500"
                                                        style={{ width: `${(analytics.ratingDistribution[star] / totalRatings) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="font-mono text-sm text-muted w-12">{analytics.ratingDistribution[star]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {/* Q&A Inbox View */}
                {activeTab === 'qa' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">Q&A Inbox</h1>
                            <Badge variant="info">{unrepliedQuestions.length} unreplied</Badge>
                        </div>

                        <div className="space-y-4">
                            {questionList.map(q => (
                                <Card key={q.id} className="bg-white border-black/[0.08]">
                                    <div
                                        className="px-6 py-4 cursor-pointer"
                                        onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Avatar name={q.student} className="w-6 h-6" />
                                                    <span className="font-body text-sm text-body font-medium">{q.student}</span>
                                                    <Badge variant={q.replied ? 'success' : 'danger'} className="text-xs">
                                                        {q.replied ? 'Replied' : 'Pending'}
                                                    </Badge>
                                                </div>
                                                <p className="font-body text-body text-sm mt-2">{q.question}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="font-body text-xs text-muted">{q.course}</span>
                                                    <span className="text-muted">·</span>
                                                    <span className="font-body text-xs text-muted">{q.date}</span>
                                                </div>
                                            </div>
                                            <span className="text-muted text-lg mt-1">
                                                {expandedQuestion === q.id ? '▼' : '▶'}
                                            </span>
                                        </div>
                                    </div>

                                    {expandedQuestion === q.id && (
                                        <div className="px-6 pb-4 border-t border-black/[0.08] pt-4">
                                            {q.replied && q.reply && (
                                                <div className="bg-lime/5 border border-lime/20 rounded-xl p-4 mb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-lg">💬</span>
                                                        <span className="font-body text-sm text-lime font-medium">Your Reply</span>
                                                    </div>
                                                    <p className="font-body text-body text-sm">{q.reply}</p>
                                                </div>
                                            )}
                                            {!q.replied && (
                                                <div className="space-y-3">
                                                    <textarea
                                                        value={replyText[q.id] || ''}
                                                        onChange={(e) => setReplyText(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                        placeholder="Type your reply..."
                                                        rows={3}
                                                        className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime/50 resize-none"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleReply(q.id)}
                                                    >
                                                        Send Reply
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}