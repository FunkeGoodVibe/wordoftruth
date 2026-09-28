import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CurtainReveal = () => {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? 450 : 2700,
    );

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="curtain-reveal fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.35 : 0.2 }}
        >
          {reduceMotion ? (
            <motion.div
              className="absolute inset-0 bg-curtain"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            />
          ) : (
            <>
              <motion.div
                className="curtain-half curtain-left absolute inset-y-0 left-0 w-[55%] bg-curtain"
                initial={{ x: "0%" }}
                animate={{ x: "-106%" }}
                transition={{ delay: 0.8, duration: 1.55, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="curtain-half curtain-right absolute inset-y-0 right-0 w-[55%] bg-curtain"
                initial={{ x: "0%" }}
                animate={{ x: "106%" }}
                transition={{ delay: 0.8, duration: 1.55, ease: [0.76, 0, 0.24, 1] }}
              />

              <motion.div
                className="curtain-lightning curtain-lightning-main absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-lightning"
                initial={{ opacity: 0, scaleY: 0.15 }}
                animate={{ opacity: [0, 1, 0.15, 1, 0], scaleY: [0.15, 1, 1, 1, 1] }}
                transition={{ delay: 0.32, duration: 0.72, times: [0, 0.16, 0.38, 0.58, 1] }}
              />
              <motion.div
                className="curtain-lightning curtain-lightning-branch absolute left-1/2 top-[31%] h-32 w-20 bg-lightning"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0, 0.7, 0] }}
                transition={{ delay: 0.42, duration: 0.58 }}
              />
              <motion.div
                className="curtain-flash absolute inset-0 bg-lightning"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.16, 0, 0.1, 0] }}
                transition={{ delay: 0.35, duration: 0.65 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurtainReveal;