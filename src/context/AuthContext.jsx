import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('valore_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (userData) => {
    // userData contains name, email, pin
    const newUser = {
      ...userData,
      initials: userData.name ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
    };
    setUser(newUser);
    localStorage.setItem('valore_user', JSON.stringify(newUser));
    // In a real app, we would save to a database here
  };

  const login = (email, pin) => {
    // Basic mock login: check if we have a saved user and if credentials match
    const savedUser = localStorage.getItem('valore_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email && parsedUser.pin === pin) {
        setUser(parsedUser);
        return { success: true };
      }
    }
    return { success: false, message: 'Invalid credentials. Please sign up if you haven\'t.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('valore_user');
  };

  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    // Recalculate initials if name changed
    if (newData.name) {
      updatedUser.initials = newData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    setUser(updatedUser);
    localStorage.setItem('valore_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
