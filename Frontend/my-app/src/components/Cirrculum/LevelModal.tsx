// src/components/Cirrculum/LevelModal.tsx

import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";
import type { Level } from "../../types";

interface LevelModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (levelData: Level) => void;
  mode: "create" | "edit" | "delete";
  initialData?: Level; 
}

const LevelModal: React.FC<LevelModalProps> = ({
  open,
  onClose,
  onSubmit,
  mode,
  initialData,
}) => {
  const [levelName, setLevelName] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setLevelName(initialData.name); // If editing or deleting, pre-fill the level name
    } else {
      setLevelName(""); // Reset for creating a new level
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (levelName.trim()) {
      onSubmit({
          id: initialData?.id ?? 0,
          name: levelName,
          programId: 0,
          shortName: ""
      });
      setLevelName(""); // Reset field after submission
    }
  };

  const handleClose = () => {
    setLevelName(""); // Reset field when modal is closed
    onClose();
  };

  const renderActions = () => {
    if (mode === "create") {
      return (
        <>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create Level
          </Button>
        </>
      );
    }

    if (mode === "edit") {
      return (
        <>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save Changes
          </Button>
        </>
      );
    }

    if (mode === "delete") {
      return (
        <>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Delete Level
          </Button>
        </>
      );
    }
  };
  console.log("LevelModal component rendered");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{mode === "create" ? "Create Level" : mode === "edit" ? "Edit Level" : "Delete Level"}</DialogTitle>
      <DialogContent>
        {mode !== "delete" ? (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="level-name"
              label="Level Name"
              type="text"
              fullWidth
              variant="outlined"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
            />
          </>
        ) : (
          <Typography variant="body1">
            Are you sure you want to delete the level: <strong>{initialData?.name}</strong>?
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {renderActions()}
      </DialogActions>
    </Dialog>
  );
};

export default LevelModal;
