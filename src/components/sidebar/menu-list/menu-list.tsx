import { List, Box } from "@mui/material";
import { ReactComponent as First } from "assets/sidebar/first.svg";
import { ReactComponent as Second } from "assets/sidebar/second.svg";
import { ReactComponent as Third } from "assets/sidebar/third.svg";
import { ReactComponent as Four } from "assets/sidebar/four.svg";
import { ReactComponent as Five } from "assets/sidebar/five.svg";
import { ReactComponent as Six } from "assets/sidebar/six.svg";
import { ReactComponent as Seven } from "assets/sidebar/seven.svg";
import { ReactComponent as Eight } from "assets/sidebar/eight.svg";
import { ReactComponent as Nine } from "assets/sidebar/nine.svg";
import { ReactComponent as Ten } from "assets/sidebar/ten.svg";

export type MenuItemChildren = {
  name: string;
  route: string;
  permission?: PermissionName;
  icon?: React.ReactNode;
};
export type MenuItemAdmin = {
  name: string;
  icon: React.ReactNode;
  route?: string;
  children?: MenuItemChildren[];
  permission?: PermissionName;
  badge?: number | null;
};

export const MenuList: React.FC = () => {
  const menuItems: MenuItemAdmin[] = [
    {
      name: "home",
      icon: <First />,
      route: "/d/home",
    },
    {
      name: "customers",
      icon: <Second />,
      route: "/d/customers",
    },
    {
      name: "packages",
      icon: <Third />,
      route: "/d/packages",
    },
    {
      name: "orders",
      icon: <Four />,
      route: "/d/orders",
    },
    {
      name: "couriers",
      icon: <Five />,
      route: "/d/couriers",
    },
    {
      name: "returns",
      icon: <Six />,
      route: "/d/returns",
    },
    {
      name: "balance",
      icon: <Seven />,
      route: "/d/balance",
    },
    {
      name: "reports",
      icon: <Eight />,
      route: "/d/reports",
    },
    {
      name: "stores",
      icon: <Nine />,
      route: "/d/stores",
    },
    {
      name: "messages",
      icon: <Ten />,
      route: "/d/messages",
    },
  ];

  return (
    <List
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {menuItems.map((menuItem, i) => (
        <Box style={{ cursor: "pointer", margin: "10px 0" }} key={i}>
          {menuItem.icon}
        </Box>
      ))}
    </List>
  );
};
