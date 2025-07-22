import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useEconomy } from "../../context/EconomyContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { wumpaCount, gemCount, relicCount } = useEconomy();
  const { username, logout } = useAuth();
  const location = useLocation();

  // Verificar si estamos en la página de inicio
  const isHomePage = location.pathname === '/home' || location.pathname === '/';
  const isInventoryPage = location.pathname === '/inventory';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
    setMenuOpen(false); // Cerrar el menú móvil si está abierto
  };

  const handleLogoutConfirm = () => {
    // Usar el logout del contexto que maneja todo correctamente
    logout();
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-left">Bazar N.Sanity</div>        <div className="navbar-right desktop-only">
          <div className="navbar-fruits">
            <img src="/images/wumpa-fruit.png" alt="Fruta" className="fruit-icon" />
            {wumpaCount}
          </div>
          <div className="navbar-fruits">
            <img src="/images/purple-crystal.webp" alt="Gemas" className="fruit-icon" />
            {gemCount}
          </div>
          <div className="navbar-fruits">
            <img src="/images/time_relic_crash.webp" alt="Reliquias" className="fruit-icon" />
            {relicCount}
          </div>
          {!isHomePage && (
            <Link to="/home" className="navbar-button">
              Inicio
            </Link>
          )}
          {!isInventoryPage && (
            <Link to="/inventory" className="navbar-button">
              Inventario
            </Link>
          )}
          <div className="mobile-item">{username}</div>
          <button className="navbar-button logout-button" onClick={handleLogoutClick} title="Cerrar Sesión">
            ⏻
          </button>
        </div>

        <button className="menu-toggle mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-item">
            <img src="/images/wumpa-fruit.png" alt="Fruta" className="fruit-icon" />
            {wumpaCount} frutas
          </div>
          <div className="mobile-item">
            <img src="/images/purple-crystal.webp" alt="Gemas" className="fruit-icon" />
            {gemCount} gemas
          </div>
          <div className="mobile-item">
            <img src="/images/time_relic_crash.webp" alt="Reliquias" className="fruit-icon" />
            {relicCount} reliquias
          </div>
          {!isHomePage && (
            <Link to="/home" className="mobile-item" onClick={() => setMenuOpen(false)}>
              🏠 Inicio
            </Link>
          )}
          {!isInventoryPage && (
            <Link to="/inventory" className="mobile-item" onClick={() => setMenuOpen(false)}>
              🎒 Inventario
            </Link>
          )}
          <div className="mobile-item">👤 {username}</div>
          <button className="logout-mobile-button" onClick={handleLogoutClick}>
            Cerrar Sesión
          </button>
        </div>
      )}

      <LogoutModal 
        isOpen={logoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};

export default Navbar;
