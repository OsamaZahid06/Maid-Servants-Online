import { useEffect, useState } from "react";
import {
  Bell,
  Heart,
  Link as LinkIcon,
  Menu,
  MessageCircle,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar({ user, setUser, favorites }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => setOpen(false), [location.pathname]);
  const logout = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <UsersRound size={18} />
          </span>
          <span>
            Maid & Servants <em>Online</em>
          </span>
        </Link>
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="site-navigation"
          className={open ? "nav-links open" : "nav-links"}
        >
          {[
            "/",
            "/workers",
            "/jobs",
            "/map",
            "/assistant",
            "/how-it-works",
            "/about",
            "/contact",
          ].map((path) => {
            const labels = {
              "/": "Home",
              "/workers": "Find Workers",
              "/jobs": "Find Jobs",
              "/map": "Find in map",
              "/assistant": "Ask AI",
              "/how-it-works": "How It Works",
              "/about": "About",
              "/contact": "Contact",
            };
            return (
              <Link
                key={path}
                className={location.pathname === path ? "active" : ""}
                to={path}
                onClick={() => setOpen(false)}
              >
                {labels[path]}
              </Link>
            );
          })}
          <span className="nav-divider" />
          {user ? (
            <>
              <Link to="/messages" className="nav-icon" title="Messages">
                <MessageCircle size={19} />
              </Link>
              <Link
                to="/notifications"
                className="nav-icon"
                title="Notifications"
              >
                <Bell size={19} />
              </Link>
              <Link
                to="/favorites"
                className="nav-icon favorite-nav"
                title="Favorites"
              >
                <Heart size={19} />
                <small>{favorites.length}</small>
              </Link>
              <Link to="/profile" className="user-chip">
                <span>{user.name.charAt(0)}</span>
                {user.name.split(" ")[0]}
              </Link>
              <button className="text-btn" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Log in
              </Link>
              <Link to="/register" className="button button-small">
                Get started <LinkIcon size={15} />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">
              <UsersRound size={18} />
            </span>
            <span>
              Maid & Servants <em>Online</em>
            </span>
          </Link>
          <p>A more thoughtful way to find trusted help for home and family.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/workers">Find workers</Link>
          <Link to="/jobs">Find jobs</Link>
          <Link to="/how-it-works">How it works</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help center</Link>
        </div>
        <div>
          <h4>Trust & safety</h4>
          <p className="footer-note">
            <ShieldCheck size={16} /> Profiles are community-reported and
            user-reviewed.
          </p>
          <Link to="/help">Safety guidance</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Maid & Servants Online</span>
        <span>Made for better homes, together.</span>
      </div>
    </footer>
  );
}
