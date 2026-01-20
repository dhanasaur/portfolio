import { motion } from "framer-motion";

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium relative overflow-hidden transition-all duration-300";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20",
        outline: "border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {/* Gradient Shift Overlay for Primary Variant */}
            {variant === "primary" && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default Button;
