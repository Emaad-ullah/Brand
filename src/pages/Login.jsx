import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertPopup from '../components/AlertPopup';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', pin: '' });
  const [alertInfo, setAlertInfo] = useState({ isOpen: false, message: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = login(formData.email, formData.pin);
      if (result.success) {
        setAlertInfo({ isOpen: true, message: 'Successfully logged in!' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setAlertInfo({ isOpen: true, message: result.message });
      }
    } else {
      if (!formData.name || !formData.email || !formData.pin) {
        setAlertInfo({ isOpen: true, message: 'Please fill in all fields.' });
        return;
      }
      signup(formData);
      setAlertInfo({ isOpen: true, message: 'Account created successfully!' });
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 pt-[48px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="font-serif text-[51px] text-brand-navy mb-4 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6" />
          <p className="text-brand-grey text-[18px] font-light uppercase tracking-[2px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            {isLogin ? 'Enter your details to access your account' : 'Join VALORE for a premium experience'}
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                <label className="text-[16px] uppercase tracking-[3px] text-brand-navy font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Full Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-brand-navy/20 py-4 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent transition-all drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  placeholder="John Doe"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-[16px] uppercase tracking-[3px] text-brand-navy font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Email Address</label>
            <input 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b border-brand-navy/20 py-4 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent transition-all drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[16px] uppercase tracking-[3px] text-brand-navy font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              {isLogin ? 'PIN / Password' : 'Set your Security PIN'}
            </label>
            <input 
              type="password"
              required
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              className="w-full border-b border-brand-navy/20 py-4 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent transition-all drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              placeholder="••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-navy text-white py-5 uppercase tracking-[3px] text-[18px] font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl hover:shadow-brand-gold/20"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-brand-grey text-[18px] font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-navy font-bold ml-2 hover:text-brand-gold transition-colors underline uppercase tracking-[1px]"
            >
              {isLogin ? 'Create One' : 'Login instead'}
            </button>
          </p>
        </div>
      </motion.div>

      <AlertPopup 
        isOpen={alertInfo.isOpen}
        onClose={() => setAlertInfo({ ...alertInfo, isOpen: false })}
        message={alertInfo.message}
      />
    </div>
  );
};

export default Login;
