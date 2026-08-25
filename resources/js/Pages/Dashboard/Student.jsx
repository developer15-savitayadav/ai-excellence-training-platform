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
    { name: 'Dashboard', href: '/dashboard', icon: '📊', current: true },
    { name: 'My Courses', href: '/dashboard', icon: '📚', current: false },
    { name: 'Certificates', href: '/dashboard', icon: '🏆', current: false },
    { name: 'Wishlist', href: '/dashboard', icon: '♥', current: false },
    { name: 'Notifications', href: '/dashboard', icon: '🔔', current: false },
    { name: 'Settings', href: '/profile', icon: '⚙', current: false },
]

const staticData = {
    user: { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', avatar: null, role: 'student' },
    enrollments: [
        { id: 1, course: { id: 1, title: 'Deep Learning Fundamentals', slug: 'deep-learning-fundamentals', instructor: 'Dr. Alex Rivera', image: null, level: 'Intermediate', duration: '42 hours' }, progress: 62, enrolled_at: '2026-06-15', last_accessed: '2026-08-19', completed_at: null },
        { id: 2, course: { id: 2, title: 'Natural Language Processing Mastery', slug: 'nlp-mastery', instructor: 'Prof. Maya Patel', image: null, level: 'Advanced', duration: '36 hours' }, progress: 100, enrolled_at: '2026-03-10', last_accessed: '2026-07-28', completed_at: '2026-07-28' },
        { id: 3, course: { id: 3, title: 'Computer Vision with PyTorch', slug: 'computer-vision-pytorch', instructor: 'Dr. James Liu', image: null, level: 'Intermediate', duration: '38 hours' }, progress: 34, enrolled_at: '2026-07-01', last_accessed: '2026-08-17', completed_at: null },
        { id: 4, course: { id: 4, title: 'Reinforcement Learning from Scratch', slug: 'reinforcement-learning', instructor: 'Dr. Alex Rivera', image: null, level: 'Advanced', duration: '40 hours' }, progress: 8, enrolled_at: '2026-08-10', last_accessed: '2026-08-15', completed_at: null },
        { id: 5, course: { id: 5, title: 'Python for AI & Machine Learning', slug: 'python-ai-ml', instructor: 'Prof. Maya Patel', image: null, level: 'Beginner', duration: '28 hours' }, progress: 100, enrolled_at: '2026-01-05', last_accessed: '2026-04-20', completed_at: '2026-04-20' },
    ],
    certificates: [
        { id: 1, course: 'Natural Language Processing Mastery', issued_at: '2026-07-28', verification_code: 'CORTEX-NLP-2026-A7X9', instructor: 'Prof. Maya Patel' },
        { id: 2, course: 'Python for AI & Machine Learning', issued_at: '2026-04-20', verification_code: 'CORTEX-PYM-2026-B3K1', instructor: 'Prof. Maya Patel' },
    ],
    notifications: [
        { id: 1, message: 'New lesson available in Deep Learning Fundamentals: "Transformer Architecture"', time: '2 hours ago', read: false, icon: '📚' },
        { id: 2, message: 'Certificate issued for Natural Language Processing Mastery', time: '3 days ago', read: false, icon: '🏆' },
        { id: 3, message: 'Quiz graded: 92% in Computer Vision with PyTorch', time: '5 days ago', read: true, icon: '📝' },
        { id: 4, message: 'Dr. Alex Rivera replied to your question in Reinforcement Learning', time: '1 week ago', read: true, icon: '💬' },
        { id: 5, message: 'New course recommendation: "Generative AI with LLMs"', time: '1 week ago', read: true, icon: '✨' },
        { id: 6, message: 'You earned a 12-day learning streak! Keep it up!', time: '2 weeks ago', read: true, icon: '🔥' },
        { id: 7, message: 'Your peer review submission was approved', time: '2 weeks ago', read: true, icon: '✅' },
        { id: 8, message: 'Maintenance scheduled for August 25th, 2:00 AM UTC', time: '3 weeks ago', read: true, icon: '🔧' },
    ],
    recommendations: [
        { id: 1, title: 'Generative AI with LLMs', instructor: 'Dr. Alex Rivera', level: 'Advanced', rating: 4.9, students: 1200, slug: 'generative-ai-llms' },
        { id: 2, title: 'MLOps & Model Deployment', instructor: 'Prof. Maya Patel', level: 'Intermediate', rating: 4.7, students: 890, slug: 'mlops-deployment' },
        { id: 3, title: 'AI Ethics & Responsible Design', instructor: 'Dr. James Liu', level: 'Beginner', rating: 4.8, students: 2100, slug: 'ai-ethics' },
    ],
    wishlist: [
        { id: 1, title: 'Generative AI with LLMs', instructor: 'Dr. Alex Rivera', level: 'Advanced', price: 89.99, rating: 4.9, slug: 'generative-ai-llms' },
        { id: 2, title: 'MLOps & Model Deployment', instructor: 'Prof. Maya Patel', level: 'Intermediate', price: 79.99, rating: 4.7, slug: 'mlops-deployment' },
        { id: 3, title: 'AI Ethics & Responsible Design', instructor: 'Dr. James Liu', level: 'Beginner', price: 59.99, rating: 4.8, slug: 'ai-ethics' },
        { id: 4, title: 'Edge AI & TinyML', instructor: 'Dr. Alex Rivera', level: 'Intermediate', price: 69.99, rating: 4.6, slug: 'edge-ai-tinyml' },
    ],
}

const recentActivity = [
    { id: 1, type: 'lesson', message: 'Completed lesson "Backpropagation Deep Dive" in Deep Learning Fundamentals', time: '2 hours ago', icon: '✅' },
    { id: 2, type: 'certificate', message: 'Earned certificate for Natural Language Processing Mastery', time: '3 days ago', icon: '🏆' },
    { id: 3, type: 'quiz', message: 'Scored 92% on quiz "CNN Architectures" in Computer Vision', time: '5 days ago', icon: '📝' },
    { id: 4, type: 'lesson', message: 'Started lesson "Markov Decision Processes" in Reinforcement Learning', time: '6 days ago', icon: '📖' },
    { id: 5, type: 'streak', message: 'Achieved a 12-day learning streak', time: '1 week ago', icon: '🔥' },
]

export default function Student({ user: propUser, enrollments: propEnrollments, certificates: propCertificates, notifications: propNotifications, recommendations: propRecommendations, wishlist: propWishlist }) {
    const user = propUser || staticData.user
    const enrollments = propEnrollments || staticData.enrollments
    const certificates = propCertificates || staticData.certificates
    const notifications = propNotifications || staticData.notifications
    const recommendations = propRecommendations || staticData.recommendations
    const wishlist = propWishlist || staticData.wishlist

    const [activeTab, setActiveTab] = useState('dashboard')
    const [notificationList, setNotificationList] = useState(notifications)
    const [wishlistState, setWishlistState] = useState(wishlist)
    const [searchQuery, setSearchQuery] = useState('')

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const inProgressCourse = enrollments.find(e => e.progress > 0 && e.progress < 100)
    const stats = {
        coursesEnrolled: enrollments.length,
        hoursLearned: 48,
        certificates: certificates.length,
        streak: 12,
    }

    const handleMarkAsRead = (id) => {
        setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }

    const handleMarkAllAsRead = () => {
        setNotificationList(prev => prev.map(n => ({ ...n, read: true })))
    }

    const handleRemoveFromWishlist = (id) => {
        setWishlistState(prev => prev.filter(w => w.id !== id))
    }

    const handleEnroll = (course) => {
        alert(`Phase 1: Enroll in "${course.title}" — this will connect to the enrollment endpoint.`)
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'courses', label: 'My Courses', icon: '📚' },
        { id: 'certificates', label: 'Certificates', icon: '🏆' },
        { id: 'wishlist', label: 'Wishlist', icon: '♥' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
    ]

    const filteredCourses = enrollments.filter(e =>
        e.course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout
            title="Student Dashboard"
            navigation={navigation}
            user={user}
        >
            <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 border-b border-panel pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-lime/10 text-lime border border-lime/30'
                                    : 'text-muted hover:text-body hover:bg-surface'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                            {tab.id === 'notifications' && notificationList.filter(n => !n.read).length > 0 && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-danger text-white rounded-full">
                                    {notificationList.filter(n => !n.read).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Welcome */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-display font-bold text-body">
                                    Welcome back, {user.name}!
                                </h1>
                                <p className="text-muted font-body mt-1">{currentDate}</p>
                            </div>
                            <Avatar name={user.name} className="w-12 h-12" />
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-5 bg-surface border-panel">
                                <div className="text-3xl font-display font-bold text-lime">{stats.coursesEnrolled}</div>
                                <div className="text-muted font-body text-sm mt-1">Courses Enrolled</div>
                            </Card>
                            <Card className="p-5 bg-surface border-panel">
                                <div className="text-3xl font-display font-bold text-violet">{stats.hoursLearned}</div>
                                <div className="text-muted font-body text-sm mt-1">Hours Learned</div>
                            </Card>
                            <Card className="p-5 bg-surface border-panel">
                                <div className="text-3xl font-display font-bold text-success">{stats.certificates}</div>
                                <div className="text-muted font-body text-sm mt-1">Certificates</div>
                            </Card>
                            <Card className="p-5 bg-surface border-panel">
                                <div className="text-3xl font-display font-bold text-danger">{stats.streak} days</div>
                                <div className="text-muted font-body text-sm mt-1">Learning Streak</div>
                            </Card>
                        </div>

                        {/* Continue Learning */}
                        {inProgressCourse && (
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Continue Learning</h2>
                                <Card className="p-6 bg-surface border-panel">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="w-full md:w-48 h-28 bg-panel rounded-xl flex items-center justify-center text-2xl">
                                            🧠
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display font-semibold text-body text-lg">
                                                {inProgressCourse.course.title}
                                            </h3>
                                            <p className="text-muted font-body text-sm mt-1">
                                                by {inProgressCourse.course.instructor}
                                            </p>
                                            <div className="mt-3">
                                                <ProgressBar value={inProgressCourse.progress} max={100} />
                                                <p className="text-xs text-muted font-mono mt-1">{inProgressCourse.progress}% complete</p>
                                            </div>
                                        </div>
                                        <Link href={`/learn/${inProgressCourse.course.slug}`}>
                                            <Button className="whitespace-nowrap">
                                                Resume
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Recent Activity */}
                        <div>
                            <h2 className="text-lg font-display font-semibold text-body mb-4">Recent Activity</h2>
                            <Card className="bg-surface border-panel divide-y divide-panel">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="flex items-center gap-3 px-6 py-4">
                                        <span className="text-xl">{activity.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-body font-body text-sm">{activity.message}</p>
                                        </div>
                                        <span className="text-muted font-body text-xs whitespace-nowrap">{activity.time}</span>
                                    </div>
                                ))}
                            </Card>
                        </div>

                        {/* Recommendations */}
                        <div>
                            <h2 className="text-lg font-display font-semibold text-body mb-4">Recommended for You</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {recommendations.map(rec => (
                                    <Card key={rec.id} className="p-5 bg-surface border-panel hover:border-lime/30 transition-colors">
                                        <h3 className="font-display font-semibold text-body">{rec.title}</h3>
                                        <p className="text-muted font-body text-sm mt-1">{rec.instructor}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="info">{rec.level}</Badge>
                                            <StarRating rating={rec.rating} size="sm" />
                                            <span className="text-muted font-body text-xs">({rec.students})</span>
                                        </div>
                                        <Link href={`/courses/${rec.slug}`} className="mt-4 block">
                                            <Button variant="secondary" className="w-full text-sm">
                                                View Course
                                            </Button>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* My Courses View */}
                {activeTab === 'courses' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">My Courses</h1>
                            <div className="w-64">
                    <SearchInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses..."
                    />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map(enrollment => (
                                <Card key={enrollment.id} className="bg-surface border-panel overflow-hidden">
                                    <div className="h-40 bg-panel flex items-center justify-center text-4xl">
                                        {enrollment.course.title.includes('Deep') && '🧠'}
                                        {enrollment.course.title.includes('Natural') && '💬'}
                                        {enrollment.course.title.includes('Computer') && '👁'}
                                        {enrollment.course.title.includes('Reinforcement') && '🎮'}
                                        {enrollment.course.title.includes('Python') && '🐍'}
                                    </div>
                                    <div className="p-5">
                                        <Badge variant={enrollment.progress === 100 ? 'success' : 'info'} className="mb-2">
                                            {enrollment.progress === 100 ? 'Completed' : 'In Progress'}
                                        </Badge>
                                        <h3 className="font-display font-semibold text-body mt-2">
                                            {enrollment.course.title}
                                        </h3>
                                        <p className="text-muted font-body text-sm mt-1">
                                            {enrollment.course.instructor}
                                        </p>
                                        <div className="mt-3">
                                            <div className="flex justify-between text-xs text-muted font-mono mb-1">
                                                <span>Progress</span>
                                                <span>{enrollment.progress}%</span>
                                            </div>
                                            <ProgressBar value={enrollment.progress} max={100} />
                                        </div>
                                        <p className="text-xs text-muted font-body mt-2">
                                            Last accessed: {enrollment.last_accessed}
                                        </p>
                                        <div className="mt-4">
                                            <Link href={`/learn/${enrollment.course.slug}`}>
                                                <Button className="w-full text-sm">
                                                    {enrollment.progress === 100 ? 'Review' : 'Continue'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certificates View */}
                {activeTab === 'certificates' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-display font-bold text-body">My Certificates</h1>

                        {certificates.length === 0 ? (
                            <Card className="p-12 bg-surface border-panel text-center">
                                <div className="text-4xl mb-4">🏆</div>
                                <p className="text-muted font-body">No certificates yet. Complete a course to earn one!</p>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {certificates.map(cert => (
                                    <div
                                        key={cert.id}
                                        className="bg-panel border border-lime/30 rounded-2xl p-6 relative overflow-hidden"
                                    >
                                        <div className="absolute top-4 right-4 text-4xl opacity-20">🏆</div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-2xl">🎓</span>
                                            <span className="font-display font-bold text-lime text-sm uppercase tracking-wider">
                                                Certificate of Completion
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-body text-xl">
                                            {cert.course}
                                        </h3>
                                        <p className="text-muted font-body text-sm mt-1">
                                            Instructor: {cert.instructor}
                                        </p>
                                        <div className="mt-4 space-y-1">
                                            <p className="text-muted font-body text-sm">
                                                Completed: {cert.issued_at}
                                            </p>
                                            <p className="text-muted font-mono text-xs">
                                                Verification: {cert.verification_code}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mt-6">
                                            <Link href={`/certificate/${cert.verification_code}`}>
                                                <Button size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => alert(`Phase 1: Download certificate ${cert.verification_code}`)}
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Wishlist View */}
                {activeTab === 'wishlist' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-display font-bold text-body">My Wishlist</h1>

                        {wishlistState.length === 0 ? (
                            <Card className="p-12 bg-surface border-panel text-center">
                                <div className="text-4xl mb-4">♥</div>
                                <p className="text-muted font-body">Your wishlist is empty.</p>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlistState.map(item => (
                                    <Card key={item.id} className="p-5 bg-surface border-panel">
                                        <div className="h-32 bg-panel rounded-xl flex items-center justify-center text-3xl mb-4">
                                            {item.title.includes('Generative') && '✨'}
                                            {item.title.includes('MLOps') && '🚀'}
                                            {item.title.includes('Ethics') && '⚖️'}
                                            {item.title.includes('Edge') && '📱'}
                                        </div>
                                        <h3 className="font-display font-semibold text-body">{item.title}</h3>
                                        <p className="text-muted font-body text-sm mt-1">{item.instructor}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="info">{item.level}</Badge>
                                            <StarRating rating={item.rating} size="sm" />
                                        </div>
                                        <div className="font-display font-bold text-lime text-lg mt-3">
                                            ${item.price}
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Link href={`/courses/${item.slug}`} className="flex-1">
                                                <Button className="w-full text-sm">
                                                    Enroll
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Notifications View */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">Notifications</h1>
                            {notificationList.some(n => !n.read) && (
                                <Button variant="secondary" size="sm" onClick={handleMarkAllAsRead}>
                                    Mark all as read
                                </Button>
                            )}
                        </div>

                        <Card className="bg-surface border-panel divide-y divide-panel">
                            {notificationList.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className={`flex items-start gap-4 px-6 py-4 cursor-pointer transition-colors hover:bg-panel/50 ${
                                        !notification.read ? 'bg-lime/5' : ''
                                    }`}
                                >
                                    <span className="text-xl mt-0.5">{notification.icon}</span>
                                    <div className="flex-1">
                                        <p className={`font-body text-sm ${!notification.read ? 'text-body font-medium' : 'text-muted'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-muted font-body text-xs mt-1">{notification.time}</p>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-lime rounded-full mt-2 flex-shrink-0" />
                                    )}
                                </div>
                            ))}
                        </Card>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}