import { useTexts } from "@/hooks/textContext";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import BackPage from "../../../components/BackPage";
import UserCart from "../../../components/UserCart";

export function Page() {
  const texts = useTexts();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("/api/user/cart")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {});
  }, []);

  const getTotal = () => {
    let total = 0;
    for (let i of products) {
      total += i.price * i.quantity;
    }
    return total;
  };

  return (
    <div>
      <BackPage />
      <Typography variant="h3" className="text-center">
        {texts.usercartpage.title}
      </Typography>
      <br />
      <Grid2 container spacing={2}>
        <Grid2 lg={8}>
          <UserCart
            products={products}
            cartOrCheckout="cart"
            onChange={setProducts}
          />
        </Grid2>
        <Grid2 lg={4}>
          <Card elevation={10}>
            <CardContent className="text-center">
              <Typography variant="h4">
                {texts.usercartpage.total}: Q.{getTotal()}.00
              </Typography>
              <Button
                className="mt-6"
                variant="outlined"
                color="secondary"
                size="large"
                component="a"
                href="/user/checkout"
              >
                {texts.usercartpage.checkoutbutton}
              </Button>
            </CardContent>
            <CardMedia
              component="img"
              width="100%"
              image="/redwhite.png"
              alt={texts.global.shopname}
              className="p-2"
            />
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
}
