# Modern Grocery Shop Mobile App (React Native)

**Project:** Grocery Shop Mobile Application  
**Design Reference:** [Figma Design](https://www.figma.com/design/IjD9MY2USjtwpxX0Owzgk4/Modern-UI-Design-For-Grocery-Shop-Mobile-App--Copy-?node-id=0-1&p=f&t=kLP1OnhoT7J27zUR-0)

---

## 🚀 Live App Execution

The Expo server is running live!

- **Web Browser URL:** `http://localhost:8081`
- **Commands to run:**
  ```bash
  # From workspace root
  npm run web

  # Or inside grocery-app
  cd grocery-app
  npm run web
  # For Android device or emulator
  npm run android
  # For iOS simulator (macOS)
  npm run ios
  ```

---

## 📋 Hackathon Requirements & Implementation Matrix

### Part – I: React Native Screens (30 Marks)
| Requirement | Screen File | Status & Features |
|---|---|---|
| **1. Home Screen with options Sign up & Sign in (Admin & Customers)** (5 Marks) | [`HomeScreen.js`](file:///d:/hackethon/grocery-app/src/screens/HomeScreen.js), [`SignInScreen.js`](file:///d:/hackethon/grocery-app/src/screens/SignInScreen.js), [`SignUpScreen.js`](file:///d:/hackethon/grocery-app/src/screens/SignUpScreen.js) | ✅ Matches Figma hero screen. Role selector (Customer vs Admin), dedicated Sign In & Sign Up options with field validations, and 1-click evaluator demo logins. |
| **2. Daily Grocery Food Products List Screen (Admin & Customers)** (5 Marks) | [`DailyGroceryScreen.js`](file:///d:/hackethon/grocery-app/src/screens/DailyGroceryScreen.js) | ✅ Matches Figma screen 2 & 3. Header with hamburger drawer trigger, search filter, category pills (Fruits, Vegetables, All), 2-column cards, and Admin product creation modal with validation. |
| **3. Profile and Edit Profile Screen (only Customer)** (5 Marks) | [`ProfileScreen.js`](file:///d:/hackethon/grocery-app/src/screens/ProfileScreen.js) & [`EditProfileScreen.js`](file:///d:/hackethon/grocery-app/src/screens/EditProfileScreen.js) | ✅ Customer details, avatar, stats, role switcher, and Edit Profile form with strict field validations (email, 10-digit phone, non-empty fields). |
| **4. Add Favorite Screen (only Customer)** (5 Marks) | [`FavouriteScreen.js`](file:///d:/hackethon/grocery-app/src/screens/FavouriteScreen.js) | ✅ Matches Figma screen 4. Grid of favorited items with quick removal and direct "Add to Cart" functionality. |
| **5. Product’s Details Screen (only Customer)** (5 Marks) | [`ProductDetailsScreen.js`](file:///d:/hackethon/grocery-app/src/screens/ProductDetailsScreen.js) | ✅ Matches Figma screen 5 & 6. Large hero image, rating, weight selector `(-) 1kg (+)`, description toggle, related items scroll, and sticky bottom bar. |
| **6. My Cart Screen (Admin & Customer)** (5 Marks) | [`CartScreen.js`](file:///d:/hackethon/grocery-app/src/screens/CartScreen.js) | ✅ Matches Figma screen 7. List of items, total calculation, `+` and `-` quantity adjustment, and "Book Now >>>" checkout validation modal. |

---

### Part – II: React Navigation (30 Marks)
All three navigation mechanisms have been implemented and integrated seamlessly:

1. **Stack Navigation (10 Marks):**
   - Configured in [`RootNavigator.js`](file:///d:/hackethon/grocery-app/src/navigation/RootNavigator.js) using `@react-navigation/native-stack`.
   - Links `Auth` -> `MainDrawer` -> `ProductDetails` -> `EditProfile`.

2. **Tabs Navigation (10 Marks):**
   - Configured in [`TabNavigator.js`](file:///d:/hackethon/grocery-app/src/navigation/TabNavigator.js) using `@react-navigation/bottom-tabs`.
   - 4 Tabs: `Home`, `Favourite` (with count badge), `My Cart` (with live quantity badge), and `Profile`.

3. **Drawer Navigation (10 Marks):**
   - Configured in [`DrawerNavigator.js`](file:///d:/hackethon/grocery-app/src/navigation/DrawerNavigator.js) using `@react-navigation/drawer`.
   - Custom sidebar drawer with user info, active role badge, quick links, role toggle (Customer ⇄ Admin), and logout.

---

### Part – III: Functional Requirements (15 Marks)
1. **(i) All users can able to navigate each screen (5 Marks):**
   - Seamless navigation transitions across Stack, Tab, and Drawer.
2. **(ii) Add single or multiple products from products screen and/or favorite screen to cart (5 Marks):**
   - "Add to Cart" works directly from the Products Grid, Product Details screen, and Favourites screen ("+ Add All to Cart").
3. **(iii) Add or Subtract items in cart screen (5 Marks):**
   - `+` and `-` quantity controls update quantities in real-time, recalculate total amount, and remove items when reduced below 1.

---

### Additional Notes & Validations:
- **Design Accuracy:** Aligns >75% with the provided Figma mockups (soft lime `#F3F8EC` background, mustard yellow `#E0C522` pill buttons, rounded cards, and typography).
- **Basic Validations:** Implemented on Sign In / Sign Up, Edit Profile, Admin Product Addition, and Checkout Delivery.
- **No External Backend/DB Required:** State is preserved via centralized React Context (`AppContext.js`).
