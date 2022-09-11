import {
  Box,
  Drawer as MuiDrawer,
  useMediaQuery,
  useTheme,
  ButtonBase,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { styled } from "@mui/styles";
import logo from "assets/PASHA_LOGO.png";
import { useState } from "react";
import { MenuList } from "./menu-list";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Link } from "react-router-dom";

const Root = styled(Box)(() => ({
  position: "fixed",
  zIndex: 10000,
  "& .collapsed-icon": {
    color: "text.secondary",
    transform: "rotate(270deg)",
  },
  "& .collapsed-button": {
    width: 24,
    height: 54,
    top: 20,
    backgroundColor: "rgba(59, 67, 242, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    position: "fixed",
    left: 0,
  },
}));

const Drawer = styled(MuiDrawer)(({ theme }: { theme: Theme }) => ({
  "& .MuiPaper-root": {
    padding: theme.spacing(1),
    height: "calc(100vh - 40px)",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#266AEB",
    display: "flex",
    alignItems: "center",
    margin: "12px",
  },

  "& .logo": {
    margin: theme.spacing(2, 0, 4, 0),
  },
}));

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const collapse = () => setCollapsed((collapsed) => !collapsed);

  return (
    <Root>
      <Drawer
        variant={isMobile ? undefined : "permanent"}
        anchor="left"
        open={collapsed}
        className="drawer"
        onClose={() => isMobile && setCollapsed(false)}
      >
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <MenuList />
      </Drawer>

      {isMobile && !collapsed && (
        <ButtonBase className="collapsed-button" onClick={collapse}>
          <KeyboardArrowDownOutlinedIcon className="collapsed-icon" />
        </ButtonBase>
      )}
    </Root>
  );
};
