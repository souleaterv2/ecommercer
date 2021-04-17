import { useEffect } from "react";
import Modal from "react-modal";
export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    
      <Modal
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        {children}
      </Modal>
  );
};
