import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ToastContainer from '../Components/ui/Toast';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-ink">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
        </div>
    );
}
