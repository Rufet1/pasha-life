import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete as MUIAutoComplete,
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import MuiSnackbar from "@mui/material/Snackbar";
import { Theme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/styles";
import { ReactComponent as Plus } from "assets/plus.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as SelectArrow } from "assets/select-arrow.svg";
import axios from "axios";
import Table from "components/product-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInvoice } from "redux/invoice-slice";
import { Product, reduceProduct } from "redux/product-slice";

type InvoiceDialogProps = {
  open: boolean;
  handleClose: () => void;
  customerFullname: string;
  productsArray: any[];
  invoiceNumber: string;
  closeMenu: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Root = styled(Dialog)(({ theme }: { theme: Theme }) => ({
  paddingBottom: theme.spacing(3),
  "& .MuiPaper-root ": {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
}));

const Snackbar = styled(MuiSnackbar)(({ theme }: { theme: Theme }) => ({
  "& .MuiPaper-elevation": {
    padding: theme.spacing(2),
  },
}));

const Autocomplete = styled(MUIAutoComplete)(() => ({
  "& *::-webkit-scrollbar": {
    width: "0.3em",
    height: "0.1em",
  },
  "& *::-webkit-scrollbar-thumb": {
    backgroundColor: "#8a8787",
    borderRadius: "8px",
  },
}));

export const InvoiceEditDialog: React.FC<InvoiceDialogProps> = ({
  open,
  handleClose,
  customerFullname,
  productsArray,
  invoiceNumber,
  closeMenu,
}) => {
  const products = useSelector(
    (state: { products: Product[] }) => state.products
  );
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState<any>({
    fullName: customerFullname,
  });
  const [product, setProduct] = useState<any>({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [productAlertOpen, setProductAlertOpen] = useState(false);
  const [storedProducts, setStoredProducts] = useState(products);
  const [selected, setSelected] = useState<any>(productsArray);

  const dispatch = useDispatch();
  useEffect(() => {
    setStoredProducts(products);
  }, [products]);

  const addProduct = (product) => {
    setProduct({});
    const prod = storedProducts.find((p) => p.id === product.id);
    if (prod) {
      const index = storedProducts.indexOf(prod as any);
      const mutatedState = [...storedProducts];
      mutatedState[index] = { ...prod, quantity: prod.quantity - 1 };
      setStoredProducts([...mutatedState]);
    }
    product.allCount = product.quantity * product.price;
    setSelected([...selected, product]);
  };

  const setProductQuantity = (id, count) => {
    const product = selected.find((p) => p.id === id);
    const changedProduct = {
      ...product,
      count,
      allCount: count * product.price,
    };
    const mutatedState = selected;
    const index = mutatedState.indexOf(product);
    mutatedState[index] = changedProduct;
    setSelected([...mutatedState]);
  };

  const submitInvoices = () => {
    let allQuantity = 0;
    let allPrice = 0;
    let isSuccess = true;
    selected.map((s) => {
      allPrice = allPrice + s.price * (s.count || 1);
    });
    selected.map((s) => (allQuantity = allQuantity + (s.count || 1)));
    const prdcts: any = [];
    selected.some((invoice) => {
      const product = products.find((p) => p.id === invoice.id);
      if (invoice.count && (product?.quantity as any) < invoice.count) {
        isSuccess = false;
        return false;
      }
      isSuccess = true;
      dispatch(reduceProduct({ id: invoice.id, count: invoice.count || 1 }));

      prdcts.push({
        quantity: invoice.count || 1,
        price: invoice.price,
        name: invoice.name,
      });
    });
    if (isSuccess) {
      dispatch(
        editInvoice({
          invoiceNumber,
          fullName: customerName.fullName,
          allQuantity,
          allPrice,
          product: prdcts,
          status: "gözləyir",
        })
      );

      setStoredProducts(products);
      setSelected([]);
      handleClose();
      closeMenu();
    } else {
      setProductAlertOpen(true);
    }
  };

  const getCustomers = async () => {
    const { data } = await axios.get("http://localhost:3001/customers");
    setCustomers(data);
  };

  const getTotal = () => {
    let sum = 0;
    selected.forEach((s) => (sum += s.price * s.quantity));
    return sum;
  };

  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <Root
      TransitionComponent={Transition}
      onClose={() => {
        handleClose();
        setSelected([]);
      }}
      open={open}
      fullScreen
    >
      <Box display="flex" justifyContent="space-between">
        <Typography color="primary" variant="h3">
          Qaimə
        </Typography>
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Typography variant="body2">Müştəri</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customers}
            sx={{ width: 300 }}
            value={customerName}
            popupIcon={<SelectArrow />}
            onChange={(_e, params: any) =>
              setCustomerName({ fullName: params.fullName })
            }
            getOptionLabel={(option) => (option as any).fullName || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <Search />,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body2">Məhsulun adı</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={storedProducts}
              sx={{ width: 300 }}
              popupIcon={<SelectArrow />}
              value={product}
              onChange={(_e, { id, name, quantity, price }: any) =>
                setProduct({
                  id,
                  name,
                  allCount: quantity * price,
                  quantity,
                  price,
                })
              }
              getOptionLabel={(option) => (option as any).name || ""}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <Search />,
                    }}
                  />
                );
              }}
              renderOption={(props, option: any) => (
                <MenuItem
                  disabled={option.quantity < 1}
                  style={{
                    borderBottom: "1px solid #EDEFF1",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  {...props}
                >
                  <Typography>
                    {option.name}({option.quantity})
                  </Typography>
                  <Typography style={{ fontWeight: 600, fontSize: "14px" }}>
                    {option.price} AZN
                  </Typography>
                </MenuItem>
              )}
            />
            <Button
              onClick={() => {
                if (
                  Object.keys(customerName).length &&
                  Object.keys(product).length
                ) {
                  addProduct({
                    id: product.id,
                    name: product.name,
                    quantity: 1,
                    price: product.price,
                    fullName: customerName.fullName,
                  });
                } else {
                  setAlertOpen(true);
                }
              }}
              style={{ height: 55 }}
              variant="contained"
              color="primary"
            >
              <Plus />
            </Button>
          </Box>
        </Grid>
        <Snackbar
          open={productAlertOpen}
          autoHideDuration={6000}
          onClose={() => setProductAlertOpen(false)}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Seçilən məhsullardan bazada çatışmayanlar var
          </Alert>
        </Snackbar>
        <Grid item md={12} style={{ overflow: "auto" }}>
          <Card style={{ padding: "16px" }}>
            <Table
              products={selected.map((s) => {
                return { ...s, allCount: s.quantity * s.price };
              })}
              setSelected={setSelected}
              setProductQuantity={setProductQuantity}
            />
          </Card>
        </Grid>

        {selected.length ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="flex-end"
            width="100%"
            gap={1}
            mt={1}
          >
            <Typography
              style={{ color: "#0051EC", fontSize: 20, fontWeight: 600 }}
            >
              Toplam:{getTotal()} $
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                onClick={() => {
                  handleClose();
                  setSelected([]);
                }}
                variant="outlined"
                color="primary"
              >
                İmtina et
              </Button>
              <Button
                onClick={submitInvoices}
                variant="contained"
                color="primary"
              >
                Yadda saxla
              </Button>
            </Box>
          </Box>
        ) : null}
      </Grid>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Müştəri və ya məhsul seçilməyib
        </Alert>
      </Snackbar>
    </Root>
  );
};
