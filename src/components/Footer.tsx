
import { FaShoppingCart } from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 text-white py-6 px-6 md:px-16 lg:px-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite', // Renk geçişi animasyonu
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Logo ve Başlık (En Üstte) */}
        <motion.div
          className="flex items-center mb-4 md:mb-0"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <FaShoppingCart className="h-10 w-10 text-white mr-2" />
          <span className="text-xl font-semibold">Market</span>
        </motion.div>

        {/* Sosyal Medya ve Telefon (Aynı Satırda) */}
        <div className="flex items-center justify-center space-x-6 md:space-x-8">
          {/* Sosyal Medya Linkleri */}
          <div className="flex space-x-4">
            <motion.a
              href="https://www.instagram.com/gyrat_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaInstagram className="h-7 w-7 text-white hover:text-gray-300 transition-all" />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@gyrat_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTiktok className="h-7 w-7 text-white hover:text-gray-300 transition-all" />
            </motion.a>
          </div>

          {/* Telefon Numarası */}
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <a
              href="tel:+99361983821"
              className="text-white hover:text-gray-300 transition"
            >
              +993 61 98 38 21
            </a>
          </motion.div>
        </div>
      </div>

      {/* Copyright Bölümü */}
      <div className="mt-4 text-center border-t border-gray-400 pt-2 text-sm">
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>

      <style>
        {`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </motion.footer>

  );
};

export default Footer;