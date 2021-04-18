import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Modal from "react-modal";
export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onClickClose: () => void;
}

export const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  onClickClose,
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
      <Box
        cursor="pointer"
        position="absolute"
        top="2"
        right="3"
        aria-label="close button"
        _hover={{
          filter: "brightness(0.7)",
        }}
        onClick={onClickClose}
      >
        X
      </Box>
    </Modal>
  );
};
