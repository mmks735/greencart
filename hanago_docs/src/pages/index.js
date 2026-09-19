import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const PRODUCTS = {
  vegetables: [
    { id: 'v1', name: 'Organic Broccoli', price: 1.99, icon: '🥦', color: '#e8f5e9', unit: 'per head' },
    { id: 'v2', name: 'Fresh Spinach', price: 2.49, icon: '🥬', color: '#e8f5e9', unit: 'bunch' },
    { id: 'v3', name: 'Organic Carrots', price: 2.19, icon: '🥕', color: '#e8f5e9', unit: '1lb bag' },
    { id: 'v4', name: 'Red Tomatoes', price: 1.49, icon: '🍅', color: '#e8f5e9', unit: '1lb' },
  ],
  fruits: [
    { id: 'f1', name: 'Red Apples', price: 2.99, icon: '🍎', color: '#ffebee', unit: '1lb' },
    { id: 'f2', name: 'Fresh Bananas', price: 1.29, icon: '🍌', color: '#ffebee', unit: 'bunch' },
    { id: 'f3', name: 'Sweet Strawberries', price: 3.99, icon: '🍓', color: '#ffebee', unit: 'box' },
    { id: 'f4', name: 'Organic Avocado', price: 2.49, icon: '🥑', color: '#ffebee', unit: 'each' },
  ],
  dairy: [
    { id: 'd1', name: 'Fresh Milk 1%', price: 3.49, icon: '🥛', color: '#e3f2fd', unit: '1 gal' },
    { id: 'd2', name: 'Greek Yogurt', price: 1.89, icon: '🍦', color: '#e3f2fd', unit: 'each' },
    { id: 'd3', name: 'Organic Eggs', price: 4.29, icon: '🥚', color: '#e3f2fd', unit: '12 pcs' },
  ],
  pantry: [
    { id: 'p1', name: 'Organic Pasta', price: 1.79, icon: '🍝', color: '#efebe9', unit: '1lb' },
    { id: 'p2', name: 'Olive Oil Extra Virgin', price: 8.99, icon: '🫒', color: '#efebe9', unit: '500ml' },
    { id: 'p3', name: 'White Rice Premium', price: 2.49, icon: '🌾', color: '#efebe9', unit: '2lb bag' },
  ],
  snacks: [
    { id: 's1', name: 'Potato Chips Salted', price: 2.99, icon: '🥔', color: '#fff3e0', unit: 'bag' },
    { id: 's2', name: 'Mixed Nuts Salted', price: 5.99, icon: '🥜', color: '#fff3e0', unit: 'pack' },
  ],
  beverages: [
    { id: 'b1', name: 'Orange Juice Fresh', price: 3.99, icon: '🍊', color: '#f3e5f5', unit: '1L' },
    { id: 'b2', name: 'Green Tea Organic', price: 4.49, icon: '🍵', color: '#f3e5f5', unit: '20 bags' },
  ],
  frozen: [
    { id: 'fr1', name: 'Frozen Berries Mix', price: 4.99, icon: '🫐', color: '#efebe9', unit: 'bag' },
    { id: 'fr2', name: 'Vanilla Ice Cream', price: 3.99, icon: '🍨', color: '#efebe9', unit: 'pint' },
  ],
  household: [
    { id: 'h1', name: 'Paper Towels Double', price: 5.49, icon: '🧻', color: '#eceff1', unit: '2 rolls' },
    { id: 'h2', name: 'Dish Soap Lavender', price: 2.99, icon: '🧼', color: '#eceff1', unit: '24oz' },
  ],
};

const ALL_PRODUCTS = Object.values(PRODUCTS).flat();

const RECIPES = [
  {
    name: 'Creamy Avocado Salad',
    category: 'Lunch',
    time: '5 mins',
    difficulty: 'Easy',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    description: 'A light, refreshing salad rich in healthy fats, fresh greens, and delicious cherry tomatoes.',
    ingredients: [
      { id: 'f4', name: 'Organic Avocado', price: 2.49, icon: '🥑' },
      { id: 'v2', name: 'Fresh Spinach', price: 2.49, icon: '🥬' },
      { id: 'v4', name: 'Red Tomatoes', price: 1.49, icon: '🍅' },
    ],
  },
  {
    name: 'Tomato Garlic Pasta',
    category: 'Dinner',
    time: '15 mins',
    difficulty: 'Medium',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    description: 'A classic Italian comfort food cooked with premium pasta, extra virgin olive oil, garlic, and fresh crushed red tomatoes.',
    ingredients: [
      { id: 'p1', name: 'Organic Pasta', price: 1.79, icon: '🍝' },
      { id: 'p2', name: 'Olive Oil Extra Virgin', price: 8.99, icon: '🫒' },
      { id: 'v4', name: 'Red Tomatoes', price: 1.49, icon: '🍅' },
    ],
  },
  {
    name: 'Berry Banana Smoothie',
    category: 'Breakfast',
    time: '8 mins',
    difficulty: 'Easy',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    description: 'Fuel your morning with antioxidants! Blend sweet strawberries, fresh milk, and ripe bananas together.',
    ingredients: [
      { id: 'f3', name: 'Sweet Strawberries', price: 3.99, icon: '🍓' },
      { id: 'f2', name: 'Fresh Bananas', price: 1.29, icon: '🍌' },
      { id: 'd1', name: 'Fresh Milk 1%', price: 3.49, icon: '🥛' },
    ],
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  // Interactive simulator states
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Fukakusa, Kyoto');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('vegetables');
  const [toast, setToast] = useState('');
  const [recipeExpanded, setRecipeExpanded] = useState(null);
  const [promoInput, setPromoInput] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  
  // Chatbot states
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am Hana, your personal grocery assistant. How can I help you today? Ask me for recipe ideas, active coupons, or summer fruits!",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  
  // Ref to automatically scroll chat messages
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Add to cart helper
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setToast(`Added ${product.name} to cart!`);
  };

  // Add multiple items to cart (e.g. recipe ingredients)
  const addBundleToCart = (items, bundleName) => {
    setCart((prevCart) => {
      let newCart = [...prevCart];
      items.forEach((item) => {
        const existing = newCart.find((cItem) => cItem.id === item.id);
        if (existing) {
          newCart = newCart.map((cItem) =>
            cItem.id === item.id ? { ...cItem, quantity: cItem.quantity + 1 } : cItem
          );
        } else {
          newCart.push({ ...item, quantity: 1 });
        }
      });
      return newCart;
    });
    setToast(`Added all ingredients for ${bundleName}!`);
  };

  // Subtract/remove from cart helper
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);
      if (!existing) return prevCart;
      if (existing.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Chat message sending logic
  const handleSendChatMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text };
    setChatMessages((prev) => [...prev, userMsg]);
    setCustomInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      let replyProducts = [];
      const normalized = text.toLowerCase();

      if (normalized.includes('recipe') || normalized.includes('salad') || normalized.includes('pasta') || normalized.includes('cook') || normalized.includes('dinner')) {
        replyText = "I highly recommend cooking a **Tomato Garlic Pasta**! It is savory, healthy, and easy to prep. Here are the fresh ingredients you can order right now:";
        replyProducts = [
          { id: 'p1', name: 'Organic Pasta', price: 1.79, icon: '🍝' },
          { id: 'p2', name: 'Olive Oil Extra Virgin', price: 8.99, icon: '🫒' },
          { id: 'v4', name: 'Red Tomatoes', price: 1.49, icon: '🍅' },
        ];
      } else if (normalized.includes('discount') || normalized.includes('coupon') || normalized.includes('offer') || normalized.includes('deal') || normalized.includes('sale')) {
        replyText = "Fantastic! You can use code **FRESH40** on your Cart tab to get **40% off** your order. Here are some of our discounted fresh picks:";
        replyProducts = [
          { id: 'v1', name: 'Organic Broccoli', price: 1.99, icon: '🥦' },
          { id: 'f3', name: 'Sweet Strawberries', price: 3.99, icon: '🍓' },
        ];
      } else if (normalized.includes('fruit') || normalized.includes('berry') || normalized.includes('banana') || normalized.includes('apple')) {
        replyText = "Here are our current sweet, premium organic fruits. Freshly picked from local orchards:";
        replyProducts = [
          { id: 'f1', name: 'Red Apples', price: 2.99, icon: '🍎' },
          { id: 'f2', name: 'Fresh Bananas', price: 1.29, icon: '🍌' },
          { id: 'f3', name: 'Sweet Strawberries', price: 3.99, icon: '🍓' },
        ];
      } else if (normalized.includes('track') || normalized.includes('status') || normalized.includes('delivery') || normalized.includes('where')) {
        replyText = "I found your active order **#HN-2026-90**! Our delivery courier has picked it up and is currently **4 minutes** away. Hold tight! 🛵";
      } else {
        replyText = "I can definitely help with that! At GreenCart, we offer 32 screens of Flutter layouts, an integrated AI assistant, and a dark-green design system. Would you like to check today's coupons or suggest a salad recipe?";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: replyText,
          products: replyProducts,
        },
      ]);
    }, 1200);
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal > 20 || cartSubtotal === 0 ? 0 : 2.0;
  const discountAmount = isPromoApplied ? cartSubtotal * 0.4 : 0;
  const cartTotal = cartSubtotal + deliveryFee - discountAmount;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Search results filtering
  const searchResults = searchQuery
    ? ALL_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContainer}>
        {/* Left text column */}
        <div className={styles.heroContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <img src="/img/logo.png" alt="GreenCart Logo" style={{ width: '48px', height: '48px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
            <div className="badge badge--success" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 16px', borderRadius: '20px', fontWeight: 600 }}>
              Next-Gen Grocery E-Commerce
            </div>
          </div>
          <h1 className={styles.heroTitle}>
            Freshness Delivered <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              To Your Doorstep
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            GreenCart is a state-of-the-art grocery e-commerce platform bringing fresh farm-to-table vegetables, premium organic fruits, and daily essentials straight to your kitchen.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg gradient-btn"
              to="/intro">
              Get Started with GreenCart
            </Link>
          </div>
        </div>

        {/* Right mockup column with physical smartphone shell */}
        <div className={styles.heroImageContainer}>
          <div className={styles.glowCircle} style={{ 
            background: activeTab === 'hana-ai' ? 'rgba(124, 58, 237, 0.25)' : activeTab === 'recipes' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)' 
          }}></div>
          
          {/* Toast Notification inside phone */}
          {toast && (
            <div className={styles.toastNotification}>
              <span>✨</span> {toast}
            </div>
          )}

          <div className={clsx(styles.phoneWrapper, 'floating-elem')}>
            {/* Physical Side Buttons */}
            <div className={styles.volumeUp}></div>
            <div className={styles.volumeDown}></div>
            <div className={styles.powerButton}></div>

            {/* Smart Phone Frame */}
            <div className={styles.phoneMockup}>
              {/* Speaker Grill */}
              <div className={styles.speakerGrill}></div>

              {/* Status bar */}
              <div className={styles.notchContainer}>
                <span>9:41</span>
                {/* Dynamic Island Notch with Camera Lens */}
                <div className={styles.notch}>
                  <div className={styles.cameraLens}></div>
                </div>
                <div className={styles.statusBarRight}>
                  {/* Custom CSS status bar icons */}
                  <div className={styles.statusBarIcons}>
                    {/* Signal bars */}
                    <span style={{ fontSize: '0.65rem' }}>📶</span>
                    {/* Wifi symbol */}
                    <span style={{ fontSize: '0.65rem' }}>🛜</span>
                    {/* Battery */}
                    <span style={{ fontSize: '0.75rem', color: '#10b981', marginLeft: '1px' }}>🔋</span>
                  </div>
                </div>
              </div>

              {/* Header / Location Selection (Shown on Home and Categories tabs) */}
              {(activeTab === 'home' || activeTab === 'category') && (
                <div className={styles.phoneHeader}>
                  <span className={styles.deliverLabel}>Deliver to</span>
                  <div className={styles.locationRow}>
                    <div 
                      className={styles.locationBadge}
                      onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                    >
                      <span style={{ color: '#22c55e' }}>●</span> {selectedLocation} ❯
                    </div>
                    <div className={styles.shopSelector}>
                      Shop ▾
                    </div>
                  </div>

                  {/* Search box with real input */}
                  <div className={clsx(styles.phoneSearchBox, searchFocused && styles.phoneSearchBoxFocus)}>
                    <span>🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search food..." 
                      className={styles.searchInput}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    />
                    {searchQuery && (
                      <span 
                        style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#9ca3af', fontWeight: 'bold' }}
                        onClick={() => setSearchQuery('')}
                      >
                        ✕
                      </span>
                    )}
                  </div>

                  {/* Location Selector Dropdown */}
                  {locationDropdownOpen && (
                    <div className={styles.locationDropdown}>
                      {['Fukakusa, Kyoto', 'Shinjuku, Tokyo', 'Kita, Osaka', 'Minato, Tokyo'].map((loc) => (
                        <div 
                          key={loc} 
                          className={styles.dropdownItem}
                          onClick={() => {
                            setSelectedLocation(loc);
                            setLocationDropdownOpen(false);
                          }}
                        >
                          📍 {loc}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search Results Dropdown Overlay */}
                  {searchQuery && (
                    <div className={styles.searchResultsPanel}>
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <div 
                            key={product.id} 
                            className={styles.searchItemRow}
                            onClick={() => {
                              addToCart(product);
                              setSearchQuery('');
                            }}
                          >
                            <span className={styles.searchItemIcon}>{product.icon}</span>
                            <div className={styles.searchItemInfo}>
                              <span className={styles.searchItemName}>{product.name}</span>
                              <span className={styles.searchItemPrice}>${product.price} ({product.unit})</span>
                            </div>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>+ Add</span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.searchNoResults}>No products found "{searchQuery}"</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Phone Screen Body Content */}
              <div className={styles.phoneBody}>
                
                {/* 1. HOME TAB */}
                {activeTab === 'home' && (
                  <>
                    {/* Horizontal Pills */}
                    <div className={styles.horizontalPills}>
                      <div 
                        className={clsx(styles.pillCard, styles.pillCard1)}
                        onClick={() => {
                          setActiveTab('category');
                          setActiveCategory('vegetables');
                        }}
                      >
                        <span className={styles.pillTitle}>Grocery</span>
                        <span className={styles.pillDesc}>Everyday essentials</span>
                        <div style={{ textAlign: 'right', fontSize: '1rem', marginTop: '2px' }}>🥦</div>
                      </div>
                      <div 
                        className={clsx(styles.pillCard, styles.pillCard2)}
                        onClick={() => {
                          setActiveTab('category');
                          setActiveCategory('fruits');
                        }}
                      >
                        <span className={styles.pillTitle}>Top Deals</span>
                        <span className={styles.pillDesc}>Save more today</span>
                        <div style={{ textAlign: 'right', fontSize: '1rem', marginTop: '2px' }}>🍊</div>
                      </div>
                      <div 
                        className={clsx(styles.pillCard, styles.pillCard3)}
                        onClick={() => {
                          setActiveTab('category');
                          setActiveCategory('dairy');
                        }}
                      >
                        <span className={styles.pillTitle}>Fresh Picks</span>
                        <span className={styles.pillDesc}>Freshly Picked</span>
                        <div style={{ textAlign: 'right', fontSize: '1rem', marginTop: '2px' }}>🥛</div>
                      </div>
                    </div>

                    {/* Main Promo Banner */}
                    <div className={styles.mainBanner}>
                      <span className={styles.bannerTag}>Autumn Fresh Deals</span>
                      <div className={styles.bannerHeading}>
                        Up to 40% Off<br />
                        Fresh Groceries
                      </div>
                      <button 
                        className={styles.bannerBtn}
                        onClick={() => {
                          // Add Tomato Pasta ingredients and open cart
                          const pastaIngredients = RECIPES[1].ingredients;
                          addBundleToCart(pastaIngredients, 'Tomato Garlic Pasta (Autumn Deal)');
                          setActiveTab('profile');
                        }}
                      >
                        Shop Now
                      </button>
                      <div className={styles.bannerIllustration}>🍂</div>
                    </div>

                    {/* Categories Header */}
                    <div className={styles.sectionHeader}>
                      <span className={styles.sectionTitle}>Categories</span>
                      <span className={styles.seeAll} onClick={() => setActiveTab('category')}>See all</span>
                    </div>

                    {/* Categories Grid */}
                    <div className={styles.categoryGrid}>
                      {[
                        { key: 'vegetables', label: 'Vegetables', bg: '#e8f5e9', emoji: '🥦' },
                        { key: 'fruits', label: 'Fruits', bg: '#ffebee', emoji: '🍎' },
                        { key: 'dairy', label: 'Dairy', bg: '#e3f2fd', emoji: '🥛' },
                        { key: 'pantry', label: 'Pantry', bg: '#efebe9', emoji: '🍝' },
                        { key: 'snacks', label: 'Snacks', bg: '#fff3e0', emoji: '🍪' },
                        { key: 'beverages', label: 'Beverages', bg: '#f3e5f5', emoji: '🍊' },
                        { key: 'frozen', label: 'Frozen', bg: '#efebe9', emoji: '🍨' },
                        { key: 'household', label: 'Household', bg: '#eceff1', emoji: '🧼' },
                      ].map((cat) => (
                        <div 
                          key={cat.key} 
                          className={styles.categoryItem}
                          onClick={() => {
                            setActiveTab('category');
                            setActiveCategory(cat.key);
                          }}
                        >
                          <div className={styles.categoryIconBox} style={{ background: cat.bg }}>{cat.emoji}</div>
                          <span className={styles.categoryLabel}>{cat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Featured Section */}
                    <div className={styles.sectionHeader}>
                      <span className={styles.sectionTitle}>Featured Items</span>
                    </div>
                    <div className={styles.featuredGrid}>
                      {[
                        { id: 'f4', name: 'Organic Avocado', price: 2.49, icon: '🥑', color: '#ffebee', unit: 'each' },
                        { id: 'f3', name: 'Sweet Strawberries', price: 3.99, icon: '🍓', color: '#ffebee', unit: 'box' },
                      ].map((item) => (
                        <div key={item.id} className={styles.productCard}>
                          <div className={styles.productImgBox} style={{ background: item.color }}>{item.icon}</div>
                          <div className={styles.productInfo}>
                            <span className={styles.productName}>{item.name}</span>
                            <span className={styles.productUnit}>{item.unit}</span>
                          </div>
                          <div className={styles.productPriceRow}>
                            <span className={styles.productPrice}>${item.price}</span>
                            <button className={styles.addBtn} onClick={() => addToCart(item)}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* 2. CATEGORY TAB */}
                {activeTab === 'category' && (
                  <div className={styles.categoryLayout}>
                    {/* Sidebar menu */}
                    <div className={styles.sidebar}>
                      {[
                        { key: 'vegetables', label: 'Veggie', emoji: '🥦' },
                        { key: 'fruits', label: 'Fruits', emoji: '🍎' },
                        { key: 'dairy', label: 'Dairy', emoji: '🥛' },
                        { key: 'pantry', label: 'Pantry', emoji: '🍝' },
                        { key: 'snacks', label: 'Snacks', emoji: '🍪' },
                        { key: 'beverages', label: 'Drinks', emoji: '🥤' },
                        { key: 'frozen', label: 'Frozen', emoji: '🍨' },
                        { key: 'household', label: 'House', emoji: '🧼' },
                      ].map((cat) => (
                        <div 
                          key={cat.key}
                          className={clsx(styles.sidebarItem, activeCategory === cat.key && styles.sidebarItemActive)}
                          onClick={() => setActiveCategory(cat.key)}
                        >
                          <span className={styles.sidebarIcon}>{cat.emoji}</span>
                          <span className={styles.sidebarLabel}>{cat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Products Grid */}
                    <div className={styles.categoryProductsPane}>
                      <div className={styles.categoryTitle}>{activeCategory}</div>
                      <div className={styles.categoryProductsGrid}>
                        {PRODUCTS[activeCategory]?.map((product) => (
                          <div key={product.id} className={styles.productCard}>
                            <div className={styles.productImgBox} style={{ background: product.color }}>{product.icon}</div>
                            <div className={styles.productInfo}>
                              <span className={styles.productName}>{product.name}</span>
                              <span className={styles.productUnit}>{product.unit}</span>
                            </div>
                            <div className={styles.productPriceRow}>
                              <span className={styles.productPrice}>${product.price}</span>
                              <button className={styles.addBtn} onClick={() => addToCart(product)}>+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. HANA AI TAB */}
                {activeTab === 'hana-ai' && (
                  <div className={styles.chatContainer}>
                    {/* Chat Header */}
                    <div className={styles.chatHeader}>
                      <div className={styles.aiAvatar}>
                        <img src="/img/logo.png" className={styles.aiAvatarImg} alt="Hana AI Logo" />
                      </div>
                      <div className={styles.aiStatusBox}>
                        <span className={styles.aiName}>Hana AI Assistant</span>
                        <span className={styles.aiStatus}>
                          <span className={styles.statusDot}></span> Online
                        </span>
                      </div>
                    </div>

                    {/* Chat History */}
                    <div className={styles.chatMessageList}>
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={clsx(styles.messageRow, msg.sender === 'user' ? styles.userMessageRow : styles.aiMessageRow)}
                        >
                          <div className={clsx(styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble)}>
                            {msg.text}

                            {/* Product scroll suggestion in bubble */}
                            {msg.products && msg.products.length > 0 && (
                              <div className={styles.aiProductScroll}>
                                {msg.products.map((product) => (
                                  <div key={product.id} className={styles.aiProductCard}>
                                    <div className={styles.aiProductCardIcon}>{product.icon}</div>
                                    <div className={styles.aiProductCardName}>{product.name}</div>
                                    <div className={styles.aiProductCardPrice}>${product.price}</div>
                                    <button 
                                      className={styles.aiAddBtn}
                                      onClick={() => addToCart(product)}
                                    >
                                      + Add
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Typing indicator */}
                      {isTyping && (
                        <div className={clsx(styles.messageRow, styles.aiMessageRow)}>
                          <div className={styles.typingBubble}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatEndRef} />
                    </div>

                    {/* Footer Suggestions & Input */}
                    <div className={styles.chatFooter}>
                      <div className={styles.suggestionRow}>
                        {[
                          { text: "Recommend a recipe", label: "🍳 Suggest Recipe" },
                          { text: "Are there discount offers?", label: "🏷️ Offers & Codes" },
                          { text: "Recommend summer fruits", label: "🍎 Fresh Fruits" },
                          { text: "Track my order delivery", label: "🛵 Order Status" },
                        ].map((chip, i) => (
                          <button 
                            key={i}
                            className={styles.suggestionChip}
                            onClick={() => handleSendChatMessage(chip.text)}
                            disabled={isTyping}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>

                      <form 
                        className={styles.chatInputBox}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendChatMessage(customInput);
                        }}
                      >
                        <input 
                          type="text" 
                          placeholder="Ask Hana AI..." 
                          className={styles.chatInput}
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          disabled={isTyping}
                        />
                        <button type="submit" className={styles.chatSendBtn} disabled={isTyping || !customInput.trim()}>
                          ➔
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* 4. RECIPES TAB */}
                {activeTab === 'recipes' && (
                  <div className={styles.recipeList}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, margin: '4px 0 2px 0' }}>Cook Organic Meals</div>
                    {RECIPES.map((recipe, idx) => {
                      const isExpanded = recipeExpanded === idx;
                      const ingredientsTotal = recipe.ingredients.reduce((sum, item) => sum + item.price, 0).toFixed(2);
                      return (
                        <div key={idx} className={styles.recipeCard}>
                          {/* Recipe Header block */}
                          <div 
                            className={styles.recipeHero}
                            style={{ 
                              background: recipe.gradient,
                              cursor: 'pointer'
                            }}
                            onClick={() => setRecipeExpanded(isExpanded ? null : idx)}
                          >
                            <div className={styles.recipeHeroGlow}></div>
                            <span className={styles.recipeCategoryBadge}>{recipe.category}</span>
                            <div className={styles.recipeMetaRow}>
                              <span className={styles.recipeTitle}>{recipe.name}</span>
                              <span className={styles.recipeTime}>⏱️ {recipe.time} | {recipe.difficulty}</span>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className={styles.recipeDetails}>
                              <p className={styles.recipeDesc}>{recipe.description}</p>
                              <div className={styles.ingredientsTitle}>Ingredients Needed:</div>
                              <div className={styles.ingredientList}>
                                {recipe.ingredients.map((ing, i) => (
                                  <div key={i} className={styles.ingredientRow}>
                                    <span className={styles.ingredientName}>{ing.icon} {ing.name}</span>
                                    <span className={styles.ingredientPrice}>${ing.price}</span>
                                  </div>
                                ))}
                              </div>
                              <button 
                                className={styles.recipeAddCartBtn}
                                onClick={() => addBundleToCart(recipe.ingredients, recipe.name)}
                              >
                                Add Ingredients (${ingredientsTotal}) to Cart
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 5. PROFILE & CART TAB */}
                {activeTab === 'profile' && (
                  <div className={styles.profileContainer}>
                    {/* User profile banner */}
                    <div className={styles.profileCard}>
                      <div className={styles.profileAvatar}>
                        <img src="/img/profile_image.png" className={styles.profileAvatarImg} alt="Jane Doe" />
                      </div>
                      <div className={styles.profileInfo}>
                        <span className={styles.profileName}>Jane Doe</span>
                        <span className={styles.profileBadge}>🏆 Gold Member</span>
                      </div>
                    </div>

                    {/* Cart Header */}
                    <div className={styles.cartHeaderRow}>
                      <span className={styles.cartTitle}>My Shopping Cart</span>
                      {cart.length > 0 && (
                        <button className={styles.cartClearBtn} onClick={clearCart}>Clear All</button>
                      )}
                    </div>

                    {/* Cart List */}
                    <div className={styles.cartList}>
                      {cart.length > 0 ? (
                        cart.map((item) => (
                          <div key={item.id} className={styles.cartItem}>
                            <div 
                              className={styles.cartItemIconBox}
                              style={{ background: item.color || '#f3f4f6' }}
                            >
                              {item.icon}
                            </div>
                            <div className={styles.cartItemDetails}>
                              <span className={styles.cartItemName}>{item.name}</span>
                              <span className={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className={styles.cartItemControl}>
                              <button 
                                className={styles.cartItemBtn}
                                onClick={() => removeFromCart(item.id)}
                              >
                                -
                              </button>
                              <span className={styles.cartItemQty}>{item.quantity}</span>
                              <button 
                                className={styles.cartItemBtn}
                                onClick={() => addToCart(item)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.emptyCart}>
                          <span className={styles.emptyCartIcon}>🛍️</span>
                          <span className={styles.emptyCartText}>Your cart is empty</span>
                          <button 
                            className={styles.emptyCartBtn}
                            onClick={() => setActiveTab('home')}
                          >
                            Browse Products
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Promo code entry */}
                    {cart.length > 0 && (
                      <div className={styles.promoSection}>
                        <div className={styles.promoRow}>
                          <input 
                            type="text" 
                            placeholder="Enter Promo Code (e.g. FRESH40)"
                            className={styles.promoInput}
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            disabled={isPromoApplied}
                          />
                          <button 
                            className={clsx(styles.promoBtn, isPromoApplied && styles.promoBtnApplied)}
                            onClick={() => {
                              if (promoInput.toUpperCase().trim() === 'FRESH40') {
                                setIsPromoApplied(true);
                              } else {
                                alert("Invalid coupon! Try code: FRESH40");
                              }
                            }}
                            disabled={isPromoApplied}
                          >
                            {isPromoApplied ? 'Applied' : 'Apply'}
                          </button>
                        </div>
                        {isPromoApplied && (
                          <div className={styles.promoMsg} style={{ color: '#10b981' }}>
                            ✓ Code FRESH40 applied! 40% discount activated.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Receipt breakdown */}
                    {cart.length > 0 && (
                      <>
                        <div className={styles.receiptSummary}>
                          <div className={styles.receiptRow}>
                            <span>Subtotal</span>
                            <span>${cartSubtotal.toFixed(2)}</span>
                          </div>
                          <div className={styles.receiptRow}>
                            <span>Delivery Fee</span>
                            <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                          </div>
                          {isPromoApplied && (
                            <div className={styles.receiptRow} style={{ color: '#10b981', fontWeight: 600 }}>
                              <span>Promo (40% Off)</span>
                              <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className={clsx(styles.receiptRow, styles.receiptRowTotal)}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Checkout button */}
                        <button 
                          className={styles.checkoutBtn}
                          onClick={() => setCheckoutStatus('success')}
                        >
                          Checkout & Place Order (${cartTotal.toFixed(2)})
                        </button>
                      </>
                    )}

                    {/* Success Overlay Modal */}
                    {checkoutStatus === 'success' && (
                      <div className={styles.checkoutSuccess}>
                        <span className={styles.successIcon}>🎉</span>
                        <h3 className={styles.successText}>Order Placed!</h3>
                        <p className={styles.successDesc}>
                          Your fresh groceries are being packed. Expect delivery in **25 minutes** to your address!
                        </p>
                        <button 
                          className={styles.successBtn}
                          onClick={() => {
                            clearCart();
                            setIsPromoApplied(false);
                            setPromoInput('');
                            setCheckoutStatus(null);
                            setActiveTab('home');
                          }}
                        >
                          Keep Shopping
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* Bottom Nav bar */}
              <div className={styles.bottomNav}>
                <div 
                  className={clsx(styles.navItem, activeTab === 'home' && styles.navItemActive)}
                  onClick={() => setActiveTab('home')}
                >
                  <span className={styles.navIcon}>
                    <img src="/img/navi_icon/Home.svg" className={styles.navIconImg} alt="Home" />
                  </span>
                  <span className={styles.navLabel}>Home</span>
                </div>
                <div 
                  className={clsx(styles.navItem, activeTab === 'category' && styles.navItemActive)}
                  onClick={() => setActiveTab('category')}
                >
                  <span className={styles.navIcon}>
                    <img src="/img/navi_icon/category.svg" className={styles.navIconImg} alt="Category" />
                  </span>
                  <span className={styles.navLabel}>Category</span>
                </div>
                <div 
                  className={clsx(styles.navItem, activeTab === 'hana-ai' && styles.navItemActive)}
                  onClick={() => setActiveTab('hana-ai')}
                >
                  <span className={styles.navIcon}>
                    <img src="/img/navi_icon/hanaai.svg" className={styles.navIconImg} alt="Hana AI" style={{ width: '22px', height: '22px' }} />
                  </span>
                  <span className={styles.navLabel}>Hana AI</span>
                </div>
                <div 
                  className={clsx(styles.navItem, activeTab === 'recipes' && styles.navItemActive)}
                  onClick={() => setActiveTab('recipes')}
                >
                  <span className={styles.navIcon}>
                    <img src="/img/navi_icon/recipes.svg" className={styles.navIconImg} alt="Recipes" />
                  </span>
                  <span className={styles.navLabel}>Recipes</span>
                </div>
                <div 
                  className={clsx(styles.navItem, activeTab === 'profile' && styles.navItemActive)}
                  onClick={() => setActiveTab('profile')}
                >
                  <span className={styles.navIcon}>
                    <img src="/img/navi_icon/profile.svg" className={styles.navIconImg} alt="Profile" />
                    {cartCount > 0 && (
                      <span className={styles.navCartBadge}>{cartCount}</span>
                    )}
                  </span>
                  <span className={styles.navLabel}>{cartCount > 0 ? 'Cart' : 'Profile'}</span>
                </div>
              </div>

              {/* Home Indicator Bar */}
              <div className={styles.homeIndicator}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Fresh & Organic Produce',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    description: 'Direct partnerships with local farms ensure that the highest quality fruits, vegetables, and pantry essentials reach your home fresh every day.',
  },
  {
    title: 'Express Local Delivery',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    description: 'Get your daily groceries and essentials delivered right to your doorstep within hours using our smart geolocated delivery system.',
  },
  {
    title: 'Smart Shopping Experience',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    description: 'Browse curated recipe recommendations, filter by fresh categories, and checkout in seconds with our optimized and user-friendly interface.',
  },
];

function HomepageFeatures() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.featuresTitle}>Why Choose GreenCart?</h2>
        <div className="row" style={{ gap: '2rem', justifyContent: 'center', margin: '0' }}>
          {FeatureList.map((props, idx) => (
            <div key={idx} className={clsx('col col--4', 'premium-card')} style={{ flex: '1', minWidth: '280px', padding: '2rem', margin: '0 8px' }}>
              <div style={{ background: 'rgba(11, 90, 67, 0.05)', width: '70px', height: '70px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {props.icon}
              </div>
              <Heading as="h3" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--ifm-color-primary)' }}>
                {props.title}
              </Heading>
              <p style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)', lineHeight: '1.6' }}>
                {props.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`GreenCart - Premium Grocery E-Commerce`}
      description="Modern Grocery App & Interactive Shopping Assistant">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
