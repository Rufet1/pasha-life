import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { createBrowserHistory } from "history";
import { lazy } from "react";
import { Route, Router, Switch } from "react-router-dom";
import customTheme from "theme";
import { Box } from "@mui/material";
import { styled } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "redux/store";

const InvoicesPage = lazy(() => import("./views/invoice-list"));
const Sidebar = lazy(() => import("./components/sidebar"));
const Header = lazy(() => import("./components/header"));
const history = createBrowserHistory();
const muiTheme = customTheme();

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
  height: "100vh",
  marginLeft: 100,
  marginTop: 80,
  padding: "0 20px",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <Router history={history}>
            <Sidebar />
            <Root>
              <Header />
              <Switch>
                <Route exact path="/" component={InvoicesPage} />
              </Switch>
            </Root>
          </Router>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
