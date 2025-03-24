import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalSizes = {
  xl: 1200,
  lg: 800,
  md: 600,
  sm: 400,
};

const CommonModal = ({ isModalOpen, modalData, modalSize = "md", closeModal }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: modalSizes[modalSize] || 400, // Default to 400px if size is undefined
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-title" variant="h6">
          {modalData || "Default Title"}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CommonModal;
