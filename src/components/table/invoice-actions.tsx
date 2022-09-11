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
import { ReactComponent as EditIcon } from "assets/edit.svg";
import { ReactComponent as StatusIcon } from "assets/status.svg";
import { ReactComponent as TrashIcon } from "assets/trash.svg";
import InvoiceEditDialog from "components/invoice-edit-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeInvoiceStatus, deleteInvoice } from "redux/invoice-slice";
import { generateStatus } from "./table";

type PackageActionsProps = {
  invoice: any;
};

const Root = styled(Dialog)(() => ({
  "& .MuiPaper-root ": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const InvoiceActions: React.FC<PackageActionsProps> = ({ invoice }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState("təstiqlənib");
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event?.currentTarget);
  };

  const handleClickForStatus = (event) => {
    event.stopPropagation();
    setAnchorEl2(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseForStatus = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;
  const secondId = open ? "simple-popover-2" : undefined;

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
                setEditDialogOpen(true);
              }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Düzəliş et" />
            </ListItemButton>
          </ListItem>
          <InvoiceEditDialog
            open={editDialogOpen}
            handleClose={() => setEditDialogOpen(false)}
            productsArray={invoice.product}
            customerFullname={invoice.fullName}
            invoiceNumber={invoice.invoiceNumber}
            closeMenu={() => setAnchorEl(null)}
          />
          <Divider />
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
                    setDialogOpen(false);
                    dispatch(deleteInvoice(invoice.id));
                    setAnchorEl(null);
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
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickForStatus}>
              <ListItemIcon>
                <StatusIcon />
              </ListItemIcon>
              <ListItemText primary="Statusu dəyiş" />
            </ListItemButton>
          </ListItem>
          <Popover
            id={secondId}
            open={open2}
            anchorEl={anchorEl2}
            onClose={handleCloseForStatus}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            style={{ minWidth: "500px" }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelected("təstiqlənib")}>
                  {generateStatus("təstiqlənib", selected)}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelected("gözləyir")}>
                  {generateStatus("gözləyir", selected)}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelected("xitam olunub")}>
                  {generateStatus("xitam olunub", selected)}
                </ListItemButton>
              </ListItem>
            </List>
            <Box m={2} display="flex" gap="8px">
              <Button
                onClick={handleCloseForStatus}
                color="primary"
                variant="outlined"
              >
                İmtina
              </Button>
              <Button
                onClick={() => {
                  dispatch(
                    changeInvoiceStatus({
                      status: selected,
                      invoiceId: invoice.id,
                    })
                  );
                  setAnchorEl(null);
                  setAnchorEl2(null);
                }}
                color="primary"
                variant="contained"
              >
                Təstiqlə
              </Button>
            </Box>
          </Popover>
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
