import { useTexts } from "@/hooks/textContext";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import CreditCard from "../../../components/CreditCard";
import UserAddress from "../../../components/UserAddress";
import UserCart from "../../../components/UserCart";

export function Page() {
  const texts = useTexts();

  const [products, setProducts] = useState<any[]>([]);
  const [address, setAddress] = useState<any>({});

  useEffect(() => {
    axios
      .get("/api/user/cart")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h2" className="text-center">
        {texts.checkoutpage.title}
      </Typography>
      <br />
      <Grid2 container spacing={2}>
        <Grid2 lg={6}>
          <CreditCard />
        </Grid2>
        <Grid2 lg={6}>
          <UserAddress products={products} />
        </Grid2>
        <Grid2 lg={12}>
          <UserCart
            products={products}
            cartOrCheckout="checkout"
            onChange={setProducts}
            orderId={2}
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
