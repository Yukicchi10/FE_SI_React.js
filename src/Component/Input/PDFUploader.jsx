// ** React Imports
import { useState } from "react";

// ** MUI Imports
import { Box, Button, IconButton, Typography } from "@mui/material";
import { AiOutlineClose, AiOutlineFilePdf } from "react-icons/ai";

export const PDFFileUploader = ({
  label,
  onUpload,
  onRemove,
  helperText,
  initialFile,
}) => {
  // ** State
  const [files, setFiles] = useState();
  const handleUpload = (e) => {
    setFiles(e.target.files[0]);
    onUpload(e.target.files[0]);
  };
  const handleRemove = (e) => {
    setFiles(null);
    onRemove();
  };
  return (
    <Box>
      <Typography sx={{ my: "auto" }} color="textSecondary">
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "#d2d1d3",
          borderRadius: "6px",
          p: 2,
          gap: 2,
        }}
      >
        {files || initialFile ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 4,
                alignItems: "center",
              }}
            >
              <AiOutlineFilePdf className="text-xl" />
              <Typography
                sx={{ my: "auto" }}
                color="textPrimary"
                fontWeight="medium"
              >
                {files?.name ?? initialFile?.name}
              </Typography>
            </Box>
            <IconButton onClick={handleRemove}>
              <AiOutlineClose />
            </IconButton>
          </Box>
        ) : (
          <>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => handleUpload(e)}
              />
            </Button>
            <Typography sx={{ my: "auto" }} color="textSecondary">
              No File Selected
            </Typography>
          </>
        )}
      </Box>
      <Typography sx={{ my: "auto" }} color="textSecondary">
        {helperText}
      </Typography>
    </Box>
  );
};
