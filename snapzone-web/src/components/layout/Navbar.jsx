import { useState } from 'react'
import { ShoppingCart, User, Search, Menu, X, Heart, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import AuthModal from '../auth/AuthModal'

const Navbar = ({ onCartClick, onSearchChange, searchQuery }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { user, signOut } = useAuth()
  const { getCartCount } = useCart()

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
    setShowUserMenu(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  const cartCount = getCartCount()

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo */}
          <div style={styles.logo}>
            <h2 style={styles.logoText}>Snapzone</h2>
          </div>

          {/* Search Bar - Desktop */}
          <div className="navbar-search-container" style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-nav" style={styles.desktopNav}>
            {user ? (
              <div style={styles.userSection}>
                <button style={styles.iconButton}>
                  <Heart size={20} />
                </button>
                
                <button onClick={onCartClick} style={styles.cartButton}>
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span style={styles.cartBadge}>{cartCount}</span>
                  )}
                </button>

                <div style={styles.userMenu}>
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    style={styles.userButton}
                  >
                    <User size={20} />
                    <span style={styles.userName}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div style={styles.userDropdown}>
                      <button style={styles.dropdownItem}>My Profile</button>
                      <button style={styles.dropdownItem}>My Orders</button>
                      <button style={styles.dropdownItem}>Wishlist</button>
                      <hr style={styles.divider} />
                      <button onClick={handleSignOut} style={styles.dropdownItem}>
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={styles.authButtons}>
                <button 
                  onClick={() => handleAuthClick('signin')}
                  style={styles.signInButton}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  style={styles.signUpButton}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="navbar-mobile-menu-button"
            style={styles.mobileMenuButton}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <div style={styles.mobileSearchContainer}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={styles.mobileSearchInput}
              />
            </div>

            {user ? (
              <div style={styles.mobileUserSection}>
                <button style={styles.mobileMenuItem}>
                  <Heart size={20} />
                  Wishlist
                </button>
                <button onClick={onCartClick} style={styles.mobileMenuItem}>
                  <ShoppingCart size={20} />
                  Cart ({cartCount})
                </button>
                <button style={styles.mobileMenuItem}>
                  <User size={20} />
                  My Profile
                </button>
                <button onClick={handleSignOut} style={styles.mobileMenuItem}>
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={styles.mobileAuthButtons}>
                <button 
                  onClick={() => handleAuthClick('signin')}
                  style={styles.mobileSignInButton}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  style={styles.mobileSignUpButton}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}

const styles = {
  navbar: {
    backgroundColor: '#5e474d',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px',
    margin: '0 30px',
    display: 'none'
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#7f8c8d'
  },
  searchInput: {
    width: '100%',
    padding: '12px 15px 12px 45px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    outline: 'none'
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease'
  },
  cartButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    position: 'relative',
    transition: 'background-color 0.3s ease'
  },
  cartBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  userMenu: {
    position: 'relative'
  },
  userButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '20px',
    transition: 'background-color 0.3s ease'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500'
  },
  userDropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    padding: '8px 0',
    minWidth: '180px',
    marginTop: '5px'
  },
  dropdownItem: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s ease'
  },
  divider: {
    margin: '8px 0',
    border: 'none',
    borderTop: '1px solid #eee'
  },
  authButtons: {
    display: 'flex',
    gap: '10px'
  },
  signInButton: {
    background: 'none',
    border: '2px solid white',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  signUpButton: {
    backgroundColor: 'white',
    border: '2px solid white',
    color: '#5e474d',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '5px'
  },
  mobileMenu: {
    backgroundColor: '#5e474d',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '20px'
  },
  mobileSearchContainer: {
    position: 'relative',
    marginBottom: '20px'
  },
  mobileSearchInput: {
    width: '100%',
    padding: '12px 15px 12px 45px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    outline: 'none'
  },
  mobileUserSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  mobileMenuItem: {
    width: '100%',
    padding: '12px 0',
    background: 'none',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  mobileAuthButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  mobileSignInButton: {
    background: 'none',
    border: '2px solid white',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  mobileSignUpButton: {
    backgroundColor: 'white',
    border: '2px solid white',
    color: '#5e474d',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  }
}

// Media queries
const mediaQueries = `
  @media (min-width: 768px) {
    .search-container { display: block !important; }
    .mobile-menu-button { display: none !important; }
  }
  
  @media (max-width: 767px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-button { display: block !important; }
  }
`

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = mediaQueries
  document.head.appendChild(styleSheet)
}

export default Navbar