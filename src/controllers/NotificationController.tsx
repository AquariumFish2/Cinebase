import { createContext, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationType = 'success' | 'error';

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const notificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <notificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Global Toast Host */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: '-50%' }}
            animate={{ opacity: 1, y: 32, x: '-50%' }}
            exit={{ opacity: 0, y: -100, x: '-50%' }}
            className={`fixed top-0 left-1/2 z-200 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-2xl backdrop-blur-xl border ${
              notification.type === 'success' 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-red-500/20 border-red-500 text-red-500'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </notificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(notificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
