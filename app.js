// E-commerce site JavaScript functionality

// Product and service data
const productsData = [
  {
    "id": 1,
    "name": "天然保濕面霜",
    "price": "NT$ 850",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&auto=format"
  },
  {
    "id": 2,
    "name": "竹纖維毛巾組",
    "price": "NT$ 650",
    "image": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&auto=format"
  },
  {
    "id": 3,
    "name": "有機精油組合",
    "price": "NT$ 1,200",
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop&auto=format"
  },
  {
    "id": 4,
    "name": "陶瓷花瓶",
    "price": "NT$ 950",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&auto=format"
  },
  {
    "id": 5,
    "name": "純棉床單組",
    "price": "NT$ 1,680",
    "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=300&fit=crop&auto=format"
  },
  {
    "id": 6,
    "name": "手工香氛蠟燭",
    "price": "NT$ 480",
    "image": "https://images.unsplash.com/photo-1602874801007-36df190b8f18?w=300&h=300&fit=crop&auto=format"
  }
];

const servicesData = [
  {
    "title": "免費配送",
    "description": "滿千免運，快速到貨",
    "icon": "🚚"
  },
  {
    "title": "30天退換",
    "description": "不滿意可退換貨",
    "icon": "↩️"
  },
  {
    "title": "24小時客服",
    "description": "專業客服隨時為您服務",
    "icon": "💬"
  }
];

// State management
let cartCount = 0;

// DOM elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const productsGrid = document.getElementById('productsGrid');
const servicesGrid = document.getElementById('servicesGrid');
const cartCountElement = document.querySelector('.cart-count');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  renderProducts();
  renderServices();
  initializeScrollBehavior();
  initializeCartFunctionality();
  initializeScrollEffects();
  handleResponsiveImages();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Create a more attractive placeholder image
function createPlaceholderImage(productName) {
  // Create a colorful gradient placeholder based on product name
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  ];
  
  const colorIndex = productName.charCodeAt(0) % colors.length;
  const gradient = colors[colorIndex];
  
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  // Create gradient
  const grd = ctx.createLinearGradient(0, 0, 300, 300);
  grd.addColorStop(0, '#667eea');
  grd.addColorStop(1, '#764ba2');
  
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 300, 300);
  
  // Add product name text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(productName, 150, 150);
  
  return canvas.toDataURL();
}

// Render products
function renderProducts() {
  if (!productsGrid) return;

  const productsHTML = productsData.map(product => `
    <div class="product-card" data-product-id="${product.id}">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="product-card__image"
        loading="lazy"
        onload="this.style.opacity=1"
        onerror="this.src='${createPlaceholderImage(product.name)}'; this.style.opacity=1;"
        style="opacity: 0; transition: opacity 0.3s ease;"
      >
      <div class="product-card__content">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__price">${product.price}</p>
        <button class="btn btn--primary product-card__button add-to-cart-btn" data-product-id="${product.id}">
          加入購物車
        </button>
      </div>
    </div>
  `).join('');

  productsGrid.innerHTML = productsHTML;
  
  // Set up proper image loading
  setTimeout(() => {
    setupImageLoading();
  }, 100);
}

// Set up proper image loading with better fallbacks
function setupImageLoading() {
  const productImages = document.querySelectorAll('.product-card__image');
  
  productImages.forEach((img, index) => {
    // Add loading animation
    img.style.backgroundColor = '#f5f5f5';
    img.style.backgroundImage = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
    img.style.backgroundSize = '200% 100%';
    img.style.animation = 'loading 1.5s infinite';
    
    // Try to load the image
    const testImg = new Image();
    testImg.onload = function() {
      img.src = this.src;
      img.style.opacity = '1';
      img.style.backgroundImage = 'none';
      img.style.animation = 'none';
    };
    
    testImg.onerror = function() {
      // Create a better placeholder
      const product = productsData[index];
      const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
      const bgColor = colors[index % colors.length];
      
      img.style.backgroundColor = bgColor;
      img.style.backgroundImage = 'none';
      img.style.animation = 'none';
      img.style.opacity = '1';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.color = 'white';
      img.style.fontSize = '14px';
      img.style.fontWeight = 'bold';
      img.style.textAlign = 'center';
      img.alt = product.name;
      
      // Create a text overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        background: rgba(0,0,0,0.3);
        padding: 8px;
        border-radius: 4px;
      `;
      overlay.textContent = product.name;
      
      const cardContainer = img.parentElement;
      cardContainer.style.position = 'relative';
      cardContainer.appendChild(overlay);
    };
    
    testImg.src = img.src;
  });
}

// Add CSS animation for loading
const style = document.createElement('style');
style.textContent = `
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
document.head.appendChild(style);

// Render services
function renderServices() {
  if (!servicesGrid) return;

  const servicesHTML = servicesData.map(service => `
    <div class="service-card">
      <span class="service-card__icon">${service.icon}</span>
      <h3 class="service-card__title">${service.title}</h3>
      <p class="service-card__description">${service.description}</p>
    </div>
  `).join('');

  servicesGrid.innerHTML = servicesHTML;
}

// Initialize smooth scrolling behavior
function initializeScrollBehavior() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Hero CTA button scroll to products
  const heroCTA = document.querySelector('.hero .btn--primary');
  if (heroCTA) {
    heroCTA.addEventListener('click', function() {
      const productsSection = document.querySelector('#products');
      if (productsSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = productsSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
}

// Initialize cart functionality
function initializeCartFunctionality() {
  // Add to cart button functionality
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
      const productId = event.target.getAttribute('data-product-id');
      addToCart(productId);
    }
  });

  // Cart button click (placeholder functionality)
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      showCartMessage();
    });
  }
}

// Add to cart functionality
function addToCart(productId) {
  const product = productsData.find(p => p.id == productId);
  
  if (product) {
    cartCount++;
    updateCartCount();
    showAddToCartMessage(product.name);
    
    // Add visual feedback to the button
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = '已加入！';
      button.style.backgroundColor = 'var(--color-success)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 1500);
    }
  }
}

// Update cart count display
function updateCartCount() {
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    
    // Add animation effect
    cartCountElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
      cartCountElement.style.transform = 'scale(1)';
    }, 200);
  }
}

// Show add to cart message
function showAddToCartMessage(productName) {
  // Create and show a temporary message
  const message = document.createElement('div');
  message.textContent = `${productName} 已加入購物車！`;
  message.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  document.body.appendChild(message);
  
  // Animate in
  setTimeout(() => {
    message.style.transform = 'translateX(0)';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    message.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(message);
    }, 300);
  }, 3000);
}

// Show cart message (placeholder)
function showCartMessage() {
  if (cartCount === 0) {
    alert('購物車是空的！先去選購一些商品吧。');
  } else {
    alert(`購物車中有 ${cartCount} 件商品。`);
  }
}

// Utility function to handle responsive images
function handleResponsiveImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });
}

// Handle scroll effects
function initializeScrollEffects() {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    // Add/remove shadow on scroll
    if (currentScrollY > 10) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Handle window resize for better responsiveness
window.addEventListener('resize', function() {
  // Close mobile menu on resize to larger screens
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Export functions for potential use in other scripts
window.ECommerceApp = {
  addToCart,
  updateCartCount,
  cartCount: () => cartCount
};