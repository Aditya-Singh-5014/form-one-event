// src/components/Modal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Modal.css";

const Modal = ({ children, onClose }) => (
  <AnimatePresence>
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-body">{children}</div>
      </motion.div>
    </div>
  </AnimatePresence>
);

export default Modal;
