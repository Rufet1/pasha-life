import {
  Box,
  Button,
  Card,
  Collapse,
  MenuItem,
  Select,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { styled } from "@mui/styles";
import { ReactComponent as Filter } from "assets/filter.svg";
import { ReactComponent as Plus } from "assets/plus.svg";
import { ReactComponent as Search } from "assets/search.svg";
import axios from "axios";
import InvoiceDialog from "components/invoice-dialog";
import Table from "components/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeInvoices, Invoice } from "redux/invoice-slice";
import { initializeProducts } from "redux/product-slice";
import { ReactComponent as SelectArrow } from "assets/select-arrow.svg";

const Root = styled(Card)(({ theme }: { theme: Theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3, 2),
  overflow: "inherit",
  height: "fit-content",
  borderRadius: 12,
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1, 4),
  },
  "& .actions": {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
  "& .buttons": {
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
    },
  },
}));

const CustomBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  "& .customPage": {
    [theme.breakpoints.down("md")]: {
      visibility: "hidden",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  "& .MuiInputBase-input": {
    padding: "4px 6px",
  },
}));

export const InvoiceList: React.FC = () => {
  const PER_PAGE = 7;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [customPage, setCustomPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [status, setStatus] = useState<string>("none");
  const [range, setRange] = useState<string>("none");
  const invoices = useSelector((state: { invoices: any[] }) => state.invoices);
  const products = useSelector((state: { products: any[] }) => state.products);
  const [filtered, setFiltered] = useState<any[]>(invoices);
  const [paginated, setPaginated] = useState<Invoice[]>(filtered);

  const dispatch = useDispatch();

  const getFilteredInvoices = () => {
    return invoices
      .filter(
        (invoice) =>
          (invoice.fullName && invoice.fullName.startsWith(keyword)) ||
          (invoice.invoiceNumber && invoice.invoiceNumber.startsWith(keyword))
      )
      .filter((invoice) =>
        quantity ? invoice.allQuantity === quantity : invoice
      )
      .filter((invoice) =>
        status !== "none" ? invoice.status === status : invoice
      )
      .filter((invoice) => {
        return range !== "none"
          ? invoice.allPrice > parseInt(range.split("-")[0]) &&
              invoice.allPrice < parseInt(range.split("-")[1])
          : invoice;
      });
  };

  useEffect(() => {
    setFiltered(getFilteredInvoices());
  }, [keyword, quantity, status, range, invoices]);

  useEffect(() => {
    setPaginated(
      filtered.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE)
    );
  }, [filtered, page]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const collapse = () => setCollapsed((collapsed) => !collapsed);

  const getInvoices = async () => {
    const { data } = await axios.get("http://localhost:3001/invoices");
    dispatch(initializeInvoices(data));
  };

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/products");
    dispatch(initializeProducts(data));
  };

  useEffect(() => {
    if (!invoices.length) {
      getInvoices();
    }
    if (!products.length) {
      getProducts();
    }
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      width="100%"
      p={1}
    >
      <Root>
        <Typography style={{ marginBottom: "16px" }} variant="h5">
          Qaimələr
        </Typography>
        <InvoiceDialog handleClose={handleClose} open={open} />
        <Box
          className="actions"
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          gap="16px"
        >
          <Box flex="2" display="flex" flexDirection="column" gap="24px">
            <TextField
              margin="none"
              InputProps={{
                startAdornment: <Search />,
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Qaimə nömrəsi, müştəri adı üzrə axtar"
            />
            <Collapse in={collapsed}>
              <Box
                mb={2}
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Box display="flex" flexDirection="column">
                  <Typography style={{ color: "#233F74" }} variant="h5">
                    Məhsul sayı
                  </Typography>
                  <Select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value as number)}
                  >
                    <MenuItem value={0}>Seç</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography style={{ color: "#233F74" }} variant="h5">
                    Məbləğ aralığı
                  </Typography>
                  <Select
                    value={range}
                    onChange={(e) => setRange(e.target.value as string)}
                  >
                    <MenuItem value="none">Seç</MenuItem>
                    <MenuItem value="50-1500">$ 50 - $ 1500</MenuItem>
                    <MenuItem value="1500-3000">$ 1500 - $ 3000</MenuItem>
                    <MenuItem value="3000-5000">$ 3000 - $ 5000</MenuItem>
                  </Select>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography style={{ color: "#233F74" }} variant="h5">
                    Status
                  </Typography>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as string)}
                  >
                    <MenuItem value="none">Seç</MenuItem>
                    <MenuItem value="təstiqlənib">təstiqlənib</MenuItem>
                    <MenuItem value="gözləyir">gözləyir</MenuItem>
                    <MenuItem value="xitam olunub">xitam olunub</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Collapse>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            flex="3"
            gap="8px"
            width="100%"
            className="buttons"
          >
            {collapsed && (
              <Button
                style={{
                  color: "#7C818D",
                  padding: "8px 16px",
                }}
                onClick={() => {
                  collapse();
                  setQuantity(0);
                  setRange("none");
                  setStatus("none");
                }}
                variant="text"
              >
                Sıfırla
              </Button>
            )}

            <Button
              style={{
                border: "1px solid #B6BCC9",
                color: "#7C818D",
                padding: "8px 16px",
              }}
              onClick={collapse}
              variant="outlined"
              startIcon={<Filter style={{ color: "#7C818D" }} />}
            >
              Filter
            </Button>
            <Button
              style={{
                color: "#FFF",
                padding: "8px 20px",
              }}
              onClick={handleOpen}
              variant="contained"
              startIcon={<Plus style={{ color: "#7C818D" }} />}
            >
              Yeni qaimə
            </Button>
          </Box>
        </Box>
        <Table invoices={paginated} />
      </Root>
      <CustomBox
        p={"20px"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box visibility="hidden" border="1px solid red" flex="1" />
        <Pagination
          color="primary"
          count={Math.ceil(filtered.length / PER_PAGE)}
          onChange={(_e, p) => setPage(p)}
          page={page}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Box
          className="customPage"
          flex="1"
          display="flex"
          justifyContent="flex-end"
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "flex-end",
            }}
          >
            <Typography whiteSpace="nowrap" fontSize={12} color="#51555F">
              Səhifəyə get
            </Typography>
            <TextField
              type="number"
              value={customPage}
              onChange={(e) => setCustomPage(parseInt(e.target.value))}
              style={{ width: 70 }}
            />
            <Button
              endIcon={
                <SelectArrow
                  style={{ color: "#7C818D", transform: "rotate(270deg)" }}
                />
              }
              onClick={() => setPage(customPage)}
              variant="text"
            >
              Get
            </Button>
          </Box>
        </Box>
      </CustomBox>
    </Box>
  );
};
