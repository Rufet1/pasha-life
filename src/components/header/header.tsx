import {
  AppBar,
  Avatar,
  Select,
  MenuItem as MUIMenuItem,
  IconButton,
  Card,
} from "@mui/material";
import profile from "assets/Profile.png";
import pasha_life from "assets/pasha_life_header.png";
import { ReactComponent as Notification } from "assets/notification.svg";
import { ReactComponent as SelectArrow } from "assets/select-arrow.svg";
import { styled } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const Root = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#FFF",
  boxShadow: "none",
  display: "flex",
  paddingRight: theme.spacing(15),
  justifyContent: "flex-end",
  alignItems: "center",
  left: "100px",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
    left: 20,
    height: 75,
    paddingRight: theme.spacing(4),
  },
  flexDirection: "row",
  "& .MuiSelect-iconStandard": {
    top: "calc(50% - 0.3em)",
    right: theme.spacing(0.5),
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
  },
  "& .MuiMenuItem-root": {
    gap: theme.spacing(1),
  },
}));

const MenuItem = styled(MUIMenuItem)(({ theme }: { theme: Theme }) => ({
  gap: theme.spacing(1),
}));

export const Header: React.FC = () => {
  return (
    <Root>
      <Select
        disableUnderline
        variant="standard"
        defaultValue="Pasha Həyat Sığorta"
        IconComponent={SelectArrow}
      >
        <MenuItem value="Pasha Həyat Sığorta">
          <Card
            style={{
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pasha_life} alt="logo" />
          </Card>
          Pasha Həyat Sığorta
        </MenuItem>
      </Select>
      <IconButton>
        <Notification />
      </IconButton>
      <Avatar style={{ cursor: "pointer" }}>
        <img src={profile} alt="profile" />
      </Avatar>
    </Root>
  );
};
