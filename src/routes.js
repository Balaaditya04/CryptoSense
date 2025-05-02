import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Exchanges from "./components/Exchanges";
import News from "./components/News";
import App from "./App";  // Import App

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/exchanges", element: <Exchanges /> },
        { path: "/cryptocurrencies", element: <Cryptocurrencies /> },
        { path: "/crypto/:coinId", element: <CryptoDetails /> },
        { path: "/news", element: <News /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
