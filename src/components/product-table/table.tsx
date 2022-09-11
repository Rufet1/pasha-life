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
import { ProductActions } from "./product-actions";
import { TextField } from "@mui/material";

interface Data {
  name: string;
  quantity: number;
  price: number;
  allCount: number;
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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Məhsul adı",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Miqdar",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Qiymət",
  },
  {
    id: "allCount",
    numeric: true,
    disablePadding: false,
    label: "Toplam məbləğ",
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

export const ProductsTable = ({
  products,
  setProductQuantity,
  setSelected,
}) => {
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
            rowCount={products.length}
          />
          <TableBody>
            {stableSort(products as any, getComparator(order, orderBy)).map(
              (product, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    style={{ borderBottom: "1px solid #ECECEE" }}
                  >
                    <TableCell id={labelId} scope="row" padding="none">
                      {product.name}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        defaultValue={product.quantity}
                        style={{ width: 70 }}
                        type="tel"
                        onChange={(e) =>
                          setProductQuantity(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: 700, fontSize: 14 }}
                      align="center"
                    >
                      ${product.price}
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: 700, fontSize: 14 }}
                      align="center"
                    >
                      ${product.allCount}
                    </TableCell>

                    <ProductActions
                      setSelected={setSelected}
                      product={product}
                      key={index}
                    />
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
