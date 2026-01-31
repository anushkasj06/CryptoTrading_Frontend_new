import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../Layout/AdminLayout";
import { fetchAdminOrders } from "@/Redux/Admin/Action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { readableDate } from "@/Util/readableDate";
import { Badge } from "@/components/ui/badge";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchAdminOrders(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <AdminLayout
      title="Global orders"
      subtitle="Track all buy and sell orders across the platform."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Side</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admin.orders.map((order) => {
            const dt = readableDate(order.timestamp);
            return (
            <TableRow key={order.id}>
              <TableCell>{dt.date} {dt.time}</TableCell>
              <TableCell className="text-slate-300">
                {order.user?.fullName}
              </TableCell>
              <TableCell>{order.coin?.symbol}</TableCell>
              <TableCell>
                <Badge
                  className={
                    order.orderType === "BUY"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-red-500/20 text-red-300 border border-red-500/40"
                  }
                >
                  {order.orderType}
                </Badge>
              </TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.quantity}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminOrders;


