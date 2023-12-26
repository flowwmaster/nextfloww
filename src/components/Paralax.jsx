"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Paralax() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const text = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
  const ybg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="paralax-wrap" ref={ref}>
      <motion.div className="paralax-head" style={{ y: text }}>
        What we do?
      </motion.div>
      <motion.div className="mountains"></motion.div>
      <motion.div className="planets" style={{ y: ybg }}></motion.div>
      <motion.div className="stars" style={{ x: ybg }}></motion.div>
    </div>
  );
}

export default Paralax;
