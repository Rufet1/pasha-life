import Box from "@mui/material/Box";
import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import MUITableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/styles";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { InvoiceActions } from "./invoice-actions";

interface Data {
  invoiceNumber: string;
  fullName: string;
  allQuantity: number;
  allPrice: number;
  status: string;
}

const TableHead = styled(MUITableHead)(() => ({
  "& .MuiButtonBase-root": {
    color: "#6B707C",
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  actions?: React.ReactElement;
}

const headCells: readonly HeadCell[] = [
  {
    id: "invoiceNumber",
    numeric: false,
    disablePadding: true,
    label: "Qaimə №",
  },
  {
    id: "fullName",
    numeric: false,
    disablePadding: false,
    label: "Müştəri",
  },
  {
    id: "allQuantity",
    numeric: true,
    disablePadding: false,
    label: "Məhsul sayı",
  },
  {
    id: "allPrice",
    numeric: true,
    disablePadding: false,
    label: "Toplam məbləğ",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "actions" as any,
    numeric: false,
    disablePadding: false,
    label: "Əmrlər",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const generateStatus = (
  status: string,
  selected: string | undefined = undefined
) => {
  switch (status) {
    case "təstiqlənib":
      return (
        <Box
          style={{
            background: "#ECFDF3",
            color: "#488C6E",
            padding: 8,
            borderRadius: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: selected === status ? "1px solid #488C6E" : "none",
          }}
        >
          {status}
        </Box>
      );
    case "gözləyir":
      return (
        <Box
          style={{
            background: "#FFFAE8",
            color: "#E0B300",
            padding: 8,
            borderRadius: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: selected === status ? "1px solid #E0B300" : "none",
          }}
        >
          {status}
        </Box>
      );
    case "xitam olunub":
      return (
        <Box
          style={{
            background: "#FFF7F7",
            color: "#FF463D",
            padding: 8,
            borderRadius: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: selected === status ? "1px solid #FF463D" : "none",
          }}
        >
          {status}
        </Box>
      );
  }
};

export const Table = ({ invoices }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer style={{ boxShadow: "none", padding: "0" }}>
        <MUITable
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={invoices.length}
          />
          <TableBody>
            {stableSort(invoices as any, getComparator(order, orderBy)).map(
              (invoice, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                const logo = require(`../../assets/${index % 7}.png`);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell id={labelId} scope="row" padding="none">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "100px",
                        gap: 8,
                      }}
                      align="center"
                    >
                      <img src={logo} alt="img" />
                      {invoice.fullName}
                    </TableCell>
                    <TableCell align="center">{invoice.allQuantity}</TableCell>
                    <TableCell align="center">${invoice.allPrice}</TableCell>
                    <TableCell align="right">
                      {generateStatus(invoice.status as string)}
                    </TableCell>
                    <InvoiceActions invoice={invoice} key={index} />
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </MUITable>
      </TableContainer>
    </Box>
  );
};
