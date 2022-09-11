import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TableCell,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import { ReactComponent as TrashIcon } from "assets/trash.svg";
import { useState } from "react";

type PackageActionsProps = {
  product: any;
  setSelected: any;
};

const Root = styled(Dialog)(() => ({
  "& .MuiPaper-root ": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const ProductActions: React.FC<PackageActionsProps> = ({
  product,
  setSelected,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <ListItemIcon>
                <TrashIcon />
              </ListItemIcon>
              <ListItemText primary="Sil" />
            </ListItemButton>
          </ListItem>
          <Root
            open={dialogOpen}
            maxWidth="md"
            onClose={() => setDialogOpen(false)}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "50px",
                height: "300px",
              }}
            >
              <Typography fontSize={24}>
                Qaiməni silməyinizə əminsiniz?
              </Typography>
              <Box display="flex" gap={4}>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                  color="primary"
                  variant="outlined"
                >
                  İmtina
                </Button>
                <Button
                  onClick={() => {
                    setSelected((selected) =>
                      selected.filter((s) => s.id !== product.id)
                    );
                    setDialogOpen(false);
                  }}
                  style={{ padding: "10px 45px" }}
                  color="primary"
                  variant="contained"
                >
                  Sil
                </Button>
              </Box>
            </Box>
          </Root>
          <Divider />
        </List>
      </Popover>
      <TableCell>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </>
  );
};
