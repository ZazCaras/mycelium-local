import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";

type OrderProduct = {
  orderProductId: number;
  productPrice: number;
  quantity: number;
  pictures: string[];
  productName: string;
  productDesc: string;
  productBrand: string;
  status: {
    id: number;
    name: string;
  };
  messages: {
    unsaved?: boolean;
    statusId: number;
    name: string;
  }[];
};

export default function AdminOrderDet({
  products,
  onChange,
  reloadProducts,
}: {
  products: OrderProduct[];
  onChange: (value: OrderProduct[]) => void;
  reloadProducts: () => void;
}) {
  const handleCommentChange = (i, value) => {
    let temp = [...products];
    const mi = temp[i].messages.findIndex(
      (m) => m.statusId === temp[i].status.id
    );
    if (mi > -1) {
      temp[i].messages[mi].name = value;
    } else {
      temp[i].messages.push({
        unsaved: true,
        name: value,
        statusId: temp[i].status.id,
      });
    }
    onChange(temp);
  };

  const handleBlur = (i: number, op: OrderProduct) => {
    let req: Promise<AxiosResponse<any, any>>;
    const message = op.messages.find((m) => m.statusId === op.status.id);
    if (!message) return;
    if (message.unsaved) {
      req = axios.post(
        `/api/user/orderproduct/${op.orderProductId}/message/${op.status.id}`,
        {
          international: false,
          name: message.name,
        }
      );
    } else {
      req = axios.put(
        `/api/user/orderproduct/${op.orderProductId}/message/${op.status.id}`,
        {
          international: false,
          name: message.name,
        }
      );
    }

    req.then((response) => {
      reloadProducts();
    });
  };

  const statuses = [
    {
      id: 1,
      name: "Initiated",
    },
    {
      id: 2,
      name: "Preparing",
    },
    {
      id: 3,
      name: "Sent",
    },
    // {
    //   id: 4,
    //   name: "Cancelled",
    // },
    // {
    //   id: 5,
    //   name: "Lost",
    // },
    {
      id: 6,
      name: "Delivered",
    },
  ];

  const changeState = (i: number, op: OrderProduct) => {
    const temp = [...products];
    temp[i] = op;
    onChange(temp);
    axios.put(`/api/user/orderproduct/`, op).then((response) => {
      reloadProducts();
    });
  };

  return (
    <div>
      {products.map((e, i) => (
        <Card
          elevation={10}
          sx={{ display: "flex", marginBottom: "10px" }}
          key={i}
        >
          <CardMedia
            sx={{ width: 250 }}
            component="img"
            image={e.pictures[0]}
            alt="Imagen de Producto"
          />
          <CardContent>
            <div className="flex justify-start">
              <Typography variant="h4" className="mr-5">
                {e.productName}
              </Typography>
            </div>
            <div className="text-left">
              <Typography variant="h6">{e.productDesc}</Typography>
              <Typography>
                <strong>Brand:</strong>&nbsp;{e.productBrand}
              </Typography>
            </div>
          </CardContent>
          <div className="text-right p-5">
            <Typography variant="h4">{`Q.${e.productPrice}.00`}</Typography>
            <Typography variant="subtitle1">
              <strong>{`Qty. ${e.quantity}`}</strong>
            </Typography>
            <div className="mt-8">
              <FormControl>
                <InputLabel>Campo</InputLabel>
                <Select
                  label="Campo"
                  value={e.status.id}
                  onChange={(ev) => {
                    const newVal =
                      typeof ev.target.value === "string"
                        ? parseInt(ev.target.value, 10)
                        : ev.target.value;
                    changeState(i, {
                      ...e,
                      status: {
                        id: newVal,
                        name: statuses.find((s) => s.id === newVal)?.name ?? "",
                      },
                    });
                  }}
                >
                  {statuses.map((f, i) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                className="mt-2"
                label="Status Comment"
                value={
                  e.messages.find((m) => m.statusId === e.status.id)?.name ?? ""
                }
                variant="standard"
                size="small"
                multiline
                rows={2}
                onChange={(ev) => handleCommentChange(i, ev.target.value)}
                onBlur={() => handleBlur(i, e)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
