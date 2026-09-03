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
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊', current: true },
    { name: 'Users', href: '/admin/dashboard', icon: '👥', current: false },
    { name: 'Courses', href: '/admin/dashboard', icon: '📚', current: false },
    { name: 'Categories', href: '/admin/dashboard', icon: '🏷', current: false },
    { name: 'Orders', href: '/admin/dashboard', icon: '💰', current: false },
    { name: 'Reviews', href: '/admin/dashboard', icon: '⭐', current: false },
    { name: 'Settings', href: '/profile', icon: '⚙', current: false },
]

const staticData = {
    user: { id: 3, name: 'Jordan Blake', email: 'jordan@cortex.academy', avatar: null, role: 'admin' },
    stats: {
        totalUsers: 10247,
        totalCourses: 203,
        revenue: 84500,
        activeLearners: 3421,
    },
    users: [
        { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'student', joined: '2026-01-15', status: 'active' },
        { id: 2, name: 'Dr. Alex Rivera', email: 'alex.rivera@cortex.academy', role: 'instructor', joined: '2025-09-01', status: 'active' },
        { id: 3, name: 'Prof. Maya Patel', email: 'maya.patel@cortex.academy', role: 'instructor', joined: '2025-10-12', status: 'active' },
        { id: 4, name: 'Liam Park', email: 'liam.park@example.com', role: 'student', joined: '2026-02-20', status: 'active' },
        { id: 5, name: 'Olivia Chen', email: 'olivia.chen@example.com', role: 'student', joined: '2026-03-05', status: 'suspended' },
        { id: 6, name: 'Dr. James Liu', email: 'james.liu@cortex.academy', role: 'instructor', joined: '2025-11-08', status: 'active' },
        { id: 7, name: 'Noah Kumar', email: 'noah.kumar@example.com', role: 'student', joined: '2026-04-12', status: 'active' },
        { id: 8, name: 'Jordan Blake', email: 'jordan@cortex.academy', role: 'admin', joined: '2025-06-01', status: 'active' },
        { id: 9, name: 'Sophia Martinez', email: 'sophia.martinez@example.com', role: 'student', joined: '2026-05-18', status: 'active' },
        { id: 10, name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'student', joined: '2026-06-01', status: 'active' },
    ],
    courses: {
        published: [
            { id: 1, title: 'Deep Learning Fundamentals', instructor: 'Dr. Alex Rivera', students: 1580, rating: 4.9, status: 'Published', revenue: 59200, completionRate: 78 },
            { id: 2, title: 'Natural Language Processing Mastery', instructor: 'Prof. Maya Patel', students: 1240, rating: 4.8, status: 'Published', revenue: 42300, completionRate: 82 },
            { id: 3, title: 'Computer Vision with PyTorch', instructor: 'Dr. James Liu', students: 980, rating: 4.7, status: 'Published', revenue: 35100, completionRate: 74 },
            { id: 4, title: 'Python for AI & Machine Learning', instructor: 'Prof. Maya Patel', students: 2100, rating: 4.9, status: 'Published', revenue: 68400, completionRate: 91 },
            { id: 5, title: 'Reinforcement Learning from Scratch', instructor: 'Dr. Alex Rivera', students: 890, rating: 4.8, status: 'Published', revenue: 31200, completionRate: 65 },
            { id: 6, title: 'AI Ethics & Responsible Design', instructor: 'Dr. James Liu', students: 670, rating: 4.8, status: 'Published', revenue: 22100, completionRate: 88 },
            { id: 7, title: 'MLOps & Model Deployment', instructor: 'Prof. Maya Patel', students: 450, rating: 4.6, status: 'Published', revenue: 15300, completionRate: 72 },
            { id: 8, title: 'Mathematics for Machine Learning', instructor: 'Dr. Alex Rivera', students: 1340, rating: 4.7, status: 'Published', revenue: 41200, completionRate: 80 },
        ],
        pending: [
            { id: 9, title: 'Generative AI with LLMs', instructor: 'Dr. Alex Rivera', submitted: '2026-08-15', status: 'Under Review' },
            { id: 10, title: 'Edge AI & TinyML', instructor: 'Dr. Alex Rivera', submitted: '2026-08-18', status: 'Under Review' },
            { id: 11, title: 'Neural Architecture Search', instructor: 'Dr. James Liu', submitted: '2026-08-19', status: 'Under Review' },
        ],
    },
    categories: [
        { id: 1, name: 'AI & Machine Learning', description: 'Core AI and ML concepts', courseCount: 8 },
        { id: 2, name: 'Deep Learning', description: 'Neural networks and deep architectures', courseCount: 12 },
        { id: 3, name: 'Natural Language Processing', description: 'Text processing and language models', courseCount: 6 },
        { id: 4, name: 'Computer Vision', description: 'Image recognition and video analysis', courseCount: 5 },
        { id: 5, name: 'Reinforcement Learning', description: 'Decision making and game theory', courseCount: 4 },
        { id: 6, name: 'MLOps', description: 'Model deployment and monitoring', courseCount: 7 },
        { id: 7, name: 'AI Ethics', description: 'Responsible AI and fairness', courseCount: 3 },
        { id: 8, name: 'Data Science', description: 'Statistics and data analysis', courseCount: 9 },
    ],
    orders: [
        { id: 'ORD-7842', user: 'Sarah Chen', course: 'Deep Learning Fundamentals', amount: 79.99, date: '2026-08-20', status: 'completed' },
        { id: 'ORD-7841', user: 'Liam Park', course: 'Reinforcement Learning from Scratch', amount: 89.99, date: '2026-08-19', status: 'completed' },
        { id: 'ORD-7840', user: 'Noah Kumar', course: 'Python for AI & Machine Learning', amount: 69.99, date: '2026-08-19', status: 'pending' },
        { id: 'ORD-7839', user: 'Sophia Martinez', course: 'Computer Vision with PyTorch', amount: 89.99, date: '2026-08-18', status: 'completed' },
        { id: 'ORD-7838', user: 'Emma Wilson', course: 'Deep Learning Fundamentals', amount: 79.99, date: '2026-08-18', status: 'refunded' },
        { id: 'ORD-7837', user: 'Liam Park', course: 'AI Ethics & Responsible Design', amount: 59.99, date: '2026-08-17', status: 'completed' },
        { id: 'ORD-7836', user: 'Sarah Chen', course: 'NLP Mastery', amount: 89.99, date: '2026-08-16', status: 'completed' },
        { id: 'ORD-7835', user: 'Olivia Chen', course: 'MLOps & Model Deployment', amount: 79.99, date: '2026-08-15', status: 'completed' },
    ],
    reviews: [
        { id: 1, reviewer: 'Emma Wilson', course: 'Deep Learning Fundamentals', rating: 5, comment: 'Fantastic course. The transformer section alone is worth the price.', date: '2026-08-20', status: 'approved' },
        { id: 2, reviewer: 'Liam Park', course: 'Reinforcement Learning from Scratch', rating: 4, comment: 'Good content but some quizzes have incorrect answers.', date: '2026-08-19', status: 'approved' },
        { id: 3, reviewer: 'Noah Kumar', course: 'Python for AI & ML', rating: 5, comment: 'Perfect for beginners. Dr. Patel explains everything clearly.', date: '2026-08-18', status: 'approved' },
        { id: 4, reviewer: 'Sophia Martinez', course: 'Computer Vision with PyTorch', rating: 3, comment: 'Decent course but feels outdated. No mention of ViT or recent architectures.', date: '2026-08-18', status: 'flagged' },
        { id: 5, reviewer: 'Sarah Chen', course: 'AI Ethics & Responsible Design', rating: 5, comment: 'Eye-opening content that every AI practitioner should study.', date: '2026-08-17', status: 'approved' },
        { id: 6, reviewer: 'Emma Wilson', course: 'MLOps & Model Deployment', rating: 4, comment: 'Practical and well-structured. Would love more Kubernetes content.', date: '2026-08-16', status: 'approved' },
        { id: 7, reviewer: 'James O\'Brien', course: 'Deep Learning Fundamentals', rating: 1, comment: 'This is a terrible course and a scam!!!', date: '2026-08-15', status: 'flagged' },
        { id: 8, reviewer: 'Mia Tanaka', course: 'NLP Mastery', rating: 5, comment: 'Best NLP course on the platform. Comprehensive and up-to-date.', date: '2026-08-14', status: 'approved' },
    ],
}

const recentActivity = [
    { id: 1, message: 'Sarah Chen enrolled in Deep Learning Fundamentals', time: '2 hours ago', icon: '📚' },
    { id: 2, message: 'New review submitted for Computer Vision (3 stars)', time: '4 hours ago', icon: '⭐' },
    { id: 3, message: 'Dr. Alex Rivera submitted "Generative AI with LLMs" for review', time: '5 hours ago', icon: '🔧' },
    { id: 4, message: 'Order ORD-7842 completed — $79.99', time: '6 hours ago', icon: '💰' },
    { id: 5, message: 'Emma Wilson earned certificate for NLP Mastery', time: '8 hours ago', icon: '🏆' },
    { id: 6, message: 'Order ORD-7838 refunded — $79.99', time: '1 day ago', icon: '↩️' },
    { id: 7, message: 'New user registered: Liam Park (student)', time: '1 day ago', icon: '👤' },
    { id: 8, message: 'Prof. Maya Patel updated course "Python for AI & ML"', time: '2 days ago', icon: '✏️' },
]

export default function Admin({ user: propUser, stats: propStats, users: propUsers, pendingCourses: propPending, categories: propCategories, orders: propOrders, reviews: propReviews }) {
    const user = propUser || staticData.user
    const stats = propStats || staticData.stats
    const initialUsers = propUsers || staticData.users
    const initialCategories = propCategories || staticData.categories
    const initialOrders = propOrders || staticData.orders
    const initialReviews = propReviews || staticData.reviews
    const courses = staticData.courses

    const [activeTab, setActiveTab] = useState('dashboard')
    const [searchQuery, setSearchQuery] = useState('')
    const [userRoleFilter, setUserRoleFilter] = useState('all')
    const [userList, setUserList] = useState(initialUsers)
    const [courseTab, setCourseTab] = useState('published')
    const [categoryList, setCategoryList] = useState(initialCategories)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [newCategory, setNewCategory] = useState({ name: '', description: '' })
    const [editingCategory, setEditingCategory] = useState(null)
    const [editCategoryForm, setEditCategoryForm] = useState({ name: '', description: '' })
    const [orderFilter, setOrderFilter] = useState('all')
    const [orderList, setOrderList] = useState(initialOrders)
    const [reviewList, setReviewList] = useState(initialReviews)
    const [pendingCourses, setPendingCourses] = useState(courses.pending)

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'courses', label: 'Courses', icon: '📚' },
        { id: 'categories', label: 'Categories', icon: '🏷' },
        { id: 'orders', label: 'Orders', icon: '💰' },
        { id: 'reviews', label: 'Reviews', icon: '⭐' },
    ]

    const filteredUsers = userList.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter
        return matchesSearch && matchesRole
    })

    const filteredOrders = orderFilter === 'all'
        ? orderList
        : orderList.filter(o => o.status === orderFilter)

    const handleToggleUserStatus = (userId) => {
        setUserList(prev => prev.map(u =>
            u.id === userId
                ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
                : u
        ))
    }

    const handleChangeRole = (userId, newRole) => {
        setUserList(prev => prev.map(u =>
            u.id === userId ? { ...u, role: newRole } : u
        ))
    }

    const handleApproveCourse = (courseId) => {
        setPendingCourses(prev => prev.filter(c => c.id !== courseId))
        alert(`Phase 1: Course ${courseId} approved and published.`)
    }

    const handleRejectCourse = (courseId) => {
        setPendingCourses(prev => prev.filter(c => c.id !== courseId))
        alert(`Phase 1: Course ${courseId} rejected.`)
    }

    const handleAddCategory = () => {
        if (!newCategory.name.trim()) return
        setCategoryList(prev => [...prev, {
            id: Date.now(),
            name: newCategory.name,
            description: newCategory.description,
            courseCount: 0,
        }])
        setNewCategory({ name: '', description: '' })
        setShowAddCategory(false)
    }

    const handleEditCategory = (cat) => {
        setEditingCategory(cat.id)
        setEditCategoryForm({ name: cat.name, description: cat.description })
    }

    const handleSaveEditCategory = (catId) => {
        setCategoryList(prev => prev.map(c =>
            c.id === catId ? { ...c, name: editCategoryForm.name, description: editCategoryForm.description } : c
        ))
        setEditingCategory(null)
    }

    const handleDeleteCategory = (catId) => {
        setCategoryList(prev => prev.filter(c => c.id !== catId))
    }

    const handleReviewAction = (reviewId, action) => {
        setReviewList(prev => prev.map(r => {
            if (r.id !== reviewId) return r
            if (action === 'approve') return { ...r, status: 'approved' }
            if (action === 'flag') return { ...r, status: 'flagged' }
            return r
        }))
    }

    const handleRemoveReview = (reviewId) => {
        setReviewList(prev => prev.filter(r => r.id !== reviewId))
    }

    return (
        <DashboardLayout
            title="Admin Dashboard"
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
                        </button>
                    ))}
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-display font-bold text-body">Admin Dashboard</h1>
                            <p className="text-muted font-body mt-1">Platform overview and management</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-lime">{stats.totalUsers.toLocaleString()}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Users</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 248 this month</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-violet">{stats.totalCourses}</div>
                                <div className="text-muted font-body text-sm mt-1">Total Courses</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 12 this month</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-success">${stats.revenue.toLocaleString()}</div>
                                <div className="text-muted font-body text-sm mt-1">Revenue</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 15% this month</div>
                            </Card>
                            <Card className="p-5 bg-white border-black/[0.08]">
                                <div className="text-3xl font-display font-bold text-body">{stats.activeLearners.toLocaleString()}</div>
                                <div className="text-muted font-body text-sm mt-1">Active Learners</div>
                                <div className="text-success font-mono text-xs mt-2">↑ 5.2% this week</div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Activity */}
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Recent Activity</h2>
                                <Card className="bg-white border-black/[0.08] divide-y divide-black/[0.08]">
                                    {recentActivity.map(activity => (
                                        <div key={activity.id} className="flex items-center gap-3 px-5 py-3">
                                            <span className="text-xl">{activity.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-body font-body text-sm truncate">{activity.message}</p>
                                            </div>
                                            <span className="text-muted font-body text-xs whitespace-nowrap">{activity.time}</span>
                                        </div>
                                    ))}
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <h2 className="text-lg font-display font-semibold text-body mb-4">Quick Actions</h2>
                                <Card className="p-6 bg-white border-black/[0.08] space-y-3">
                                    <Button
                                        className="w-full justify-start"
                                        variant="secondary"
                                        onClick={() => setActiveTab('courses')}
                                    >
                                        <span className="mr-2">📚</span>
                                        Approve Pending Courses ({pendingCourses.length})
                                    </Button>
                                    <Button
                                        className="w-full justify-start"
                                        variant="secondary"
                                        onClick={() => setActiveTab('users')}
                                    >
                                        <span className="mr-2">👥</span>
                                        Manage Users ({userList.filter(u => u.status === 'suspended').length} suspended)
                                    </Button>
                                    <Button
                                        className="w-full justify-start"
                                        variant="secondary"
                                        onClick={() => setActiveTab('reviews')}
                                    >
                                        <span className="mr-2">⭐</span>
                                        Review Flagged Reviews ({reviewList.filter(r => r.status === 'flagged').length})
                                    </Button>
                                    <Button
                                        className="w-full justify-start"
                                        variant="secondary"
                                        onClick={() => setActiveTab('orders')}
                                    >
                                        <span className="mr-2">💰</span>
                                        View Orders ({orderList.filter(o => o.status === 'pending').length} pending)
                                    </Button>
                                    <Button
                                        className="w-full justify-start"
                                        variant="secondary"
                                        onClick={() => setActiveTab('categories')}
                                    >
                                        <span className="mr-2">🏷</span>
                                        Manage Categories
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users View */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">Users</h1>
                            <div className="w-64">
                    <SearchInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users..."
                    />
                            </div>
                        </div>

                        {/* Role Filter Tabs */}
                        <div className="flex gap-2">
                            {['all', 'student', 'instructor', 'admin'].map(role => (
                                <button
                                    key={role}
                                    onClick={() => setUserRoleFilter(role)}
                                    className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                                        userRoleFilter === role
                                            ? 'bg-lime/10 text-lime border border-lime/30'
                                            : 'text-muted hover:text-body hover:bg-black/[0.03] border border-transparent'
                                    }`}
                                >
                                    {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}s
                                </button>
                            ))}
                        </div>

                        {/* Users Table */}
                        <Card className="bg-white border-black/[0.08] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/[0.08]">
                                            <th className="text-left px-6 py-4 font-display font-semibold text-body text-sm">User</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Role</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Joined</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Status</th>
                                            <th className="text-right px-6 py-4 font-display font-semibold text-body text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/[0.08]">
                                        {filteredUsers.map(u => (
                                            <tr key={u.id} className="hover:bg-black/[0.03] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar name={u.name} className="w-8 h-8" />
                                                        <div>
                                                            <div className="font-body text-sm text-body font-medium">{u.name}</div>
                                                            <div className="text-muted font-body text-xs">{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <select
                                                        value={u.role}
                                                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                                                        className="px-3 py-1 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body text-sm focus:outline-none focus:border-lime/50"
                                                    >
                                                        <option value="student">Student</option>
                                                        <option value="instructor">Instructor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-4 font-body text-sm text-muted">{u.joined}</td>
                                                <td className="px-4 py-4">
                                                    <Badge variant={u.status === 'active' ? 'success' : 'danger'}>
                                                        {u.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant={u.status === 'active' ? 'danger' : 'primary'}
                                                            onClick={() => handleToggleUserStatus(u.id)}
                                                        >
                                                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                                                        </Button>
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

                {/* Courses View */}
                {activeTab === 'courses' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-display font-bold text-body">Courses</h1>

                        {/* Course Tabs */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCourseTab('published')}
                                className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                                    courseTab === 'published'
                                        ? 'bg-lime/10 text-lime border border-lime/30'
                                        : 'text-muted hover:text-body hover:bg-black/[0.03] border border-transparent'
                                }`}
                            >
                                Published ({courses.published.length})
                            </button>
                            <button
                                onClick={() => setCourseTab('pending')}
                                className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                                    courseTab === 'pending'
                                        ? 'bg-lime/10 text-lime border border-lime/30'
                                        : 'text-muted hover:text-body hover:bg-black/[0.03] border border-transparent'
                                }`}
                            >
                                Pending Approval ({pendingCourses.length})
                            </button>
                        </div>

                        {/* Published Courses Grid */}
                        {courseTab === 'published' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.published.map(course => (
                                    <Card key={course.id} className="p-5 bg-white border-black/[0.08]">
                                        <div className="flex items-center justify-between mb-3">
                                            <Badge variant="success">{course.status}</Badge>
                                            <StarRating rating={course.rating} size="sm" />
                                        </div>
                                        <h3 className="font-display font-semibold text-body">{course.title}</h3>
                                        <p className="text-muted font-body text-sm mt-1">{course.instructor}</p>
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <div>
                                                <div className="text-sm font-mono text-body">{course.students.toLocaleString()}</div>
                                                <div className="text-xs text-muted font-body">Students</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-mono text-success">${course.revenue.toLocaleString()}</div>
                                                <div className="text-xs text-muted font-body">Revenue</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-mono text-body">{course.completionRate}%</div>
                                                <div className="text-xs text-muted font-body">Completion</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-mono text-body">{course.rating}</div>
                                                <div className="text-xs text-muted font-body">Rating</div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Pending Courses */}
                        {courseTab === 'pending' && (
                            <div className="space-y-3">
                                {pendingCourses.length === 0 ? (
                                    <Card className="p-12 bg-white border-black/[0.08] text-center">
                                        <div className="text-4xl mb-4">✅</div>
                                        <p className="text-muted font-body">No pending courses to review.</p>
                                    </Card>
                                ) : (
                                    pendingCourses.map(course => (
                                        <Card key={course.id} className="p-5 bg-white border-black/[0.08]">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-display font-semibold text-body">{course.title}</h3>
                                                        <Badge variant="warning">{course.status}</Badge>
                                                    </div>
                                                    <p className="text-muted font-body text-sm">{course.instructor}</p>
                                                    <p className="text-muted font-body text-xs mt-1">Submitted: {course.submitted}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" onClick={() => handleApproveCourse(course.id)}>
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleRejectCourse(course.id)}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Categories View */}
                {activeTab === 'categories' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-display font-bold text-body">Categories</h1>
                            <Button onClick={() => setShowAddCategory(!showAddCategory)}>
                                {showAddCategory ? 'Cancel' : '+ Add Category'}
                            </Button>
                        </div>

                        {/* Add Category Form */}
                        {showAddCategory && (
                            <Card className="p-6 bg-white border-black/[0.08] border-lime/30">
                                <h2 className="font-display font-semibold text-body mb-4">New Category</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-body text-sm text-muted mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={newCategory.name}
                                            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="e.g., Generative AI"
                                            className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-sm text-muted mb-2">Description</label>
                                        <input
                                            type="text"
                                            value={newCategory.description}
                                            onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Brief description..."
                                            className="w-full px-4 py-2 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/50"
                                        />
                                    </div>
                                    <Button onClick={handleAddCategory}>Create Category</Button>
                                </div>
                            </Card>
                        )}

                        {/* Categories List */}
                        <Card className="bg-white border-black/[0.08] divide-y divide-black/[0.08]">
                            {categoryList.map(cat => (
                                <div key={cat.id} className="px-6 py-4">
                                    {editingCategory === cat.id ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={editCategoryForm.name}
                                                onChange={(e) => setEditCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body text-sm focus:outline-none focus:border-lime/50"
                                            />
                                            <input
                                                type="text"
                                                value={editCategoryForm.description}
                                                onChange={(e) => setEditCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                                                className="w-full px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-lg font-body text-body text-sm focus:outline-none focus:border-lime/50"
                                            />
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={() => handleSaveEditCategory(cat.id)}>Save</Button>
                                                <Button size="sm" variant="secondary" onClick={() => setEditingCategory(null)}>Cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">🏷</span>
                                                    <div>
                                                        <h3 className="font-body text-body font-medium">{cat.name}</h3>
                                                        <p className="text-muted font-body text-xs">{cat.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-mono text-sm text-muted">{cat.courseCount} courses</span>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="secondary" onClick={() => handleEditCategory(cat)}>
                                                        Edit
                                                    </Button>
                                                    <Button size="sm" variant="danger" onClick={() => handleDeleteCategory(cat.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Card>
                    </div>
                )}

                {/* Orders View */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-display font-bold text-body">Orders</h1>

                        {/* Filter */}
                        <div className="flex gap-2">
                            {['all', 'completed', 'pending', 'refunded'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setOrderFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                                        orderFilter === status
                                            ? 'bg-lime/10 text-lime border border-lime/30'
                                            : 'text-muted hover:text-body hover:bg-black/[0.03] border border-transparent'
                                    }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Orders Table */}
                        <Card className="bg-white border-black/[0.08] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/[0.08]">
                                            <th className="text-left px-6 py-4 font-display font-semibold text-body text-sm">Order ID</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">User</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Course</th>
                                            <th className="text-right px-4 py-4 font-display font-semibold text-body text-sm">Amount</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Date</th>
                                            <th className="text-left px-4 py-4 font-display font-semibold text-body text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/[0.08]">
                                        {filteredOrders.map(order => (
                                            <tr key={order.id} className="hover:bg-black/[0.03] transition-colors">
                                                <td className="px-6 py-4 font-mono text-sm text-body">{order.id}</td>
                                                <td className="px-4 py-4 font-body text-sm text-body">{order.user}</td>
                                                <td className="px-4 py-4 font-body text-sm text-muted max-w-[200px] truncate">{order.course}</td>
                                                <td className="px-4 py-4 text-right font-mono text-sm text-body">${order.amount}</td>
                                                <td className="px-4 py-4 font-body text-sm text-muted">{order.date}</td>
                                                <td className="px-4 py-4">
                                                    <Badge variant={
                                                        order.status === 'completed' ? 'success' :
                                                        order.status === 'pending' ? 'info' :
                                                        'danger'
                                                    }>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Reviews View */}
                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-display font-bold text-body">Reviews Moderation</h1>

                        <div className="space-y-4">
                            {reviewList.map(review => (
                                <Card key={review.id} className="p-5 bg-white border-black/[0.08]">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Avatar name={review.reviewer} className="w-6 h-6" />
                                                <span className="font-body text-sm text-body font-medium">{review.reviewer}</span>
                                                <Badge variant={
                                                    review.status === 'approved' ? 'success' :
                                                    review.status === 'flagged' ? 'danger' :
                                                    'info'
                                                }>
                                                    {review.status}
                                                </Badge>
                                            </div>
                                            <StarRating rating={review.rating} size="sm" />
                                            <p className="font-body text-sm text-body mt-2">{review.comment}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="font-body text-xs text-muted">{review.course}</span>
                                                <span className="text-muted">·</span>
                                                <span className="font-body text-xs text-muted">{review.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {review.status !== 'approved' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReviewAction(review.id, 'approve')}
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            {review.status !== 'flagged' && (
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() => handleReviewAction(review.id, 'flag')}
                                                >
                                                    Flag
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleRemoveReview(review.id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}