import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import navigation from '../data/navigation';
import { useAuth } from '../context/AuthContext';

function MenuLink({ item, onClick }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <NavLink to={item.path} className={({ isActive }) => (isActive ? 'current' : undefined)} onClick={onClick}>
      {item.label}
    </NavLink>
  );
}

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <MenuLink item={item} />
      </li>
    );
  }

  return (
    <li
      className={`dropdown${open ? ' hover-active' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href="#!" onClick={(e) => { e.preventDefault(); setOpen((o) => !o); }}>
        {item.label}
      </a>
      <ul className="dropdown-menu" style={{ display: open ? 'block' : undefined }}>
        {item.children.map((child) => (
          <li key={child.path || child.href}>
            <MenuLink item={child} onClick={() => setOpen(false)} />
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  function toggleMenu() {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.classList.toggle('mainMenu-open', next);
  }

  function closeMenu() {
    setMenuOpen(false);
    document.body.classList.remove('mainMenu-open');
  }

  return (
    <>
      <div id="topbar" className="dark submenu-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="top-menu d-none d-md-block">
                <li><a href="tel://+918979002000">Phone: +91 89790 02000 </a></li>
                <li><a href="mailto:care@vidhikdrafters.com">Email: care@vidhikdrafters.com </a></li>
              </ul>
              <ul className="top-menu d-block d-md-none">
                <li><a href="tel://+918979002000">&nbsp;&nbsp;📞 +91 89790 02000</a></li>
                <li><a href="mailto:care@vidhikdrafters.com">✉️ care@vidhikdrafters.com</a></li>
              </ul>
            </div>
            <div className="col-md-6 d-none d-sm-flex" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <div className="social-icons social-icons-colored-hover">
                <ul>
                  <li className="social-facebook"><a href="#"><i className="fab fa-facebook-f" /></a></li>
                  <li className="social-twitter"><a href="#"><i className="fab fa-twitter" /></a></li>
                  <li className="social-linkedin"><a href="#"><i className="fab fa-linkedin" /></a></li>
                  <li className="social-youtube"><a href="#"><i className="fab fa-youtube" /></a></li>
                </ul>
              </div>
              <div className="text-light" style={{ display: 'flex', gap: 12, marginLeft: 16, fontSize: 13, whiteSpace: 'nowrap' }}>
                {user ? (
                  <>
                    <Link to="/profile" className="text-light">Hi, {user.name.split(' ')[0]}</Link>
                    <a href="#!" className="text-light" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-light">Login</Link>
                    <Link to="/register" className="text-light">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <header id="header" className="dark" data-transparent="true">
        <div className="header-inner">
          <div className="container">
            <div id="logo">
              <Link to="/"><span className="logo-default">Vidhik</span><span className="logo-dark">Vidhik</span></Link>
            </div>

            <div id="mainMenu-trigger">
              <a className={`lines-button x${menuOpen ? ' toggle-active' : ''}`} onClick={toggleMenu} role="button" tabIndex={0}>
                <span className="lines" />
              </a>
            </div>

            <div
              id="mainMenu"
              className={`menu-onclick menu-lines${menuOpen ? ' menu-animate' : ''}`}
              style={{ maxHeight: menuOpen ? '2000px' : undefined }}
            >
              <div className="container">
                <nav>
                  <ul onClick={(e) => { if (e.target.tagName === 'A' && !e.target.closest('.dropdown')) closeMenu(); }}>
                    {navigation.map((item) => (
                      <DropdownItem key={item.label} item={item} />
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
