import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Banana',
    subtitle: 'Fresh fruits',
    category: 'Fruits',
    price: 50,
    unit: 'kg',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
    description: 'An exotic and very good fruit for body health and extra vitamin and extra energy for body. Rich in potassium and essential dietary fiber, perfect for smoothies or daily nutrition.',
    relatedIds: ['prod_2', 'prod_3', 'prod_4'],
  },
  {
    id: 'prod_2',
    name: 'Orange',
    subtitle: 'Fresh fruits',
    category: 'Fruits',
    price: 70,
    unit: 'kg',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=500&q=80',
    description: 'Juicy, vibrant oranges loaded with Vitamin C and natural antioxidants. Sourced straight from local sun-drenched organic orchards.',
    relatedIds: ['prod_1', 'prod_3', 'prod_5'],
  },
  {
    id: 'prod_3',
    name: 'Pineapple',
    subtitle: 'Fresh fruits',
    category: 'Fruits',
    price: 120,
    unit: 'kg',
    rating: 4.9,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80',
    description: 'Sweet, tropical and refreshing pineapple bursting with natural enzymes, bromelain, and Vitamin C for optimal immune health.',
    relatedIds: ['prod_1', 'prod_2', 'prod_4'],
  },
  {
    id: 'prod_4',
    name: 'Lemon',
    subtitle: 'Fresh fruits',
    category: 'Fruits',
    price: 55,
    unit: 'kg',
    rating: 4.7,
    reviews: 62,
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=500&q=80',
    description: 'Tangy and aromatic lemons packed with citric acid and bioflavonoids. Ideal for refreshing drinks, detox water, and salad dressings.',
    relatedIds: ['prod_1', 'prod_2', 'prod_3'],
  },
  {
    id: 'prod_5',
    name: 'Tomato',
    subtitle: 'Fresh vegetable',
    category: 'Vegetables',
    price: 220,
    unit: 'kg',
    rating: 4.8,
    reviews: 140,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
    description: 'Plump, ripe ruby-red tomatoes fresh from organic farms. High in lycopene, vitamin K, and potassium. Essential for every meal.',
    relatedIds: ['prod_6', 'prod_7', 'prod_8'],
  },
  {
    id: 'prod_6',
    name: 'Capsicum',
    subtitle: 'Fresh vegetable',
    category: 'Vegetables',
    price: 65,
    unit: 'kg',
    rating: 4.6,
    reviews: 83,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=80',
    description: 'Crisp green and colorful bell peppers. Rich in dietary fiber, carotenoids, and vitamins A & C. Great for stir fry and crisp salads.',
    relatedIds: ['prod_5', 'prod_7', 'prod_8'],
  },
  {
    id: 'prod_7',
    name: 'Carrot',
    subtitle: 'Fresh vegetable',
    category: 'Vegetables',
    price: 60,
    unit: 'kg',
    rating: 4.9,
    reviews: 110,
    image: 'https://www.trustbasket.com/cdn/shop/articles/Carrot.jpg?v=1688378789',
    description: 'Sweet, crisp, freshly harvested orange carrots loaded with beta carotene for glowing skin and sharp eye health.',
    relatedIds: ['prod_5', 'prod_6', 'prod_8'],
  },
  {
    id: 'prod_8',
    name: 'Cabbage',
    subtitle: 'Fresh vegetable',
    category: 'Vegetables',
    price: 80,
    unit: 'kg',
    rating: 4.5,
    reviews: 48,
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=500&q=80',
    description: 'Tender layered green cabbage head packed with gut-healthy fiber, folate, and essential minerals. Crisp and versatile.',
    relatedIds: ['prod_5', 'prod_6', 'prod_7'],
  },
  {
    id: 'prod_9',
    name: 'Soy Pumpkin',
    subtitle: 'Fresh vegetable',
    category: 'Vegetables',
    price: 75,
    unit: 'kg',
    rating: 4.7,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=500&q=80',
    description: 'Hearty golden pumpkin with dense, sweet flesh. Packed with antioxidants, vitamin E, and fiber for wholesome wellness.',
    relatedIds: ['prod_5', 'prod_7', 'prod_8'],
  },
  {
    id: 'prod_10',
    name: 'Fresh Apple',
    subtitle: 'Fresh fruits',
    category: 'Fruits',
    price: 140,
    unit: 'kg',
    rating: 4.9,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
    description: 'Crisp, sweet red apples picked at peak ripeness. An apple a day keeps the doctor away with high dietary fiber and antioxidants.',
    relatedIds: ['prod_1', 'prod_2', 'prod_3'],
  },
];

export const AppProvider = ({ children }) => {
  // Current user role: 'Customer' or 'Admin'
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Johnson',
    email: 'customer@groceryshop.com',
    phone: '9876543210',
    address: '123 Market Street, City - 641001',
    role: 'Customer', // 'Customer' or 'Admin'
  });

  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Initial favorites matching Figma Screen 4
  const [favorites, setFavorites] = useState(['prod_1', 'prod_3', 'prod_5', 'prod_8']);

  // Initial cart items matching Figma Screen 7 (Banana 2kg, Pineapple 1kg, Tomato 1kg, Cabbage 1kg)
  const [cart, setCart] = useState([
    {
      productId: 'prod_1',
      name: 'Banana',
      subtitle: 'Fresh fruits',
      category: 'Fruits',
      price: 50,
      quantity: 2,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
    },
    {
      productId: 'prod_3',
      name: 'Pineapple',
      subtitle: 'Fresh fruits',
      category: 'Fruits',
      price: 120,
      quantity: 1,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80',
    },
    {
      productId: 'prod_5',
      name: 'Tomato',
      subtitle: 'Fresh vegetable',
      category: 'Vegetables',
      price: 220,
      quantity: 1,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
    },
    {
      productId: 'prod_8',
      name: 'Cabbage',
      subtitle: 'Fresh vegetable',
      category: 'Vegetables',
      price: 80,
      quantity: 1,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=500&q=80',
    },
  ]);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to favorites ❤️');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        showToast(`Updated ${product.name} quantity to ${updated[existingIndex].quantity} kg`);
        return updated;
      } else {
        showToast(`Added ${qty} kg ${product.name} to Cart 🛒`);
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            subtitle: product.subtitle || product.category,
            category: product.category,
            price: product.price,
            quantity: qty,
            unit: product.unit || 'kg',
            image: product.image,
          },
        ];
      }
    });
  };

  // Update item quantity (Part-III (iii): Add or Subtract items in cart)
  const updateCartQuantity = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Total cart amount calculation
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Role toggle helper
  const setRole = (role) => {
    setCurrentUser((prev) => ({
      ...prev,
      role: role,
      name: role === 'Admin' ? 'Admin Manager' : 'Alex Johnson',
      email: role === 'Admin' ? 'admin@groceryshop.com' : 'customer@groceryshop.com',
    }));
    showToast(`Switched to ${role} mode`);
  };

  // Profile update
  const updateProfile = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
    showToast('Profile updated successfully! ✅');
  };

  // Admin add product
  const addProduct = (newProduct) => {
    const id = `prod_${Date.now()}`;
    setProducts((prev) => [
      {
        id,
        ...newProduct,
        rating: 5.0,
        reviews: 1,
        relatedIds: ['prod_1', 'prod_2', 'prod_5'],
      },
      ...prev,
    ]);
    showToast(`Product "${newProduct.name}" added to catalog!`);
  };

  // Admin delete product
  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    setFavorites((prev) => prev.filter((id) => id !== productId));
    showToast('Product removed from catalog');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setRole,
        updateProfile,
        products,
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemsCount,
        addProduct,
        deleteProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
