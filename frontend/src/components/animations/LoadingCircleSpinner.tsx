import { motion, Variants } from "framer-motion"

function LoadingCircleSpinner() {
    const spinnerVariants: Variants = {
        rotate: {
            rotate: 360,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            },
        },
    }

    return (
        <div className="flex justify-center">
            <motion.div
            animate="rotate"
            className="w-[50px] h-[50px] border-[5px] border-neutral-500 border-t-blue-500 rounded-full will-change-transform"
            variants={spinnerVariants}
        />
        </div>
    )
}

export default LoadingCircleSpinner
