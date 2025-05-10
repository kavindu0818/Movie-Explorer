import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">MovieFlix</h4>
            <p className="text-neutral-400 mb-4">
              Discover your next favorite film with our comprehensive movie database.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Navigation</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/favorites" className="text-neutral-400 hover:text-white transition-colors">Favorites</Link></li>
              <li><Link to="/login" className="text-neutral-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-neutral-400 hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Categories</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Action</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Comedy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Drama</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Sci-Fi</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Horror</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-700 text-center text-neutral-500">
          <p>
            &copy; {year} MovieFlix. All rights reserved.
            <span className="block mt-2 text-xs">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;