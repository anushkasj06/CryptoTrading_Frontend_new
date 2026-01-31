import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import {
  fetchAdminUserAssets,
  fetchAdminUserWallet,
} from "@/Redux/Admin/Action";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminUserDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(fetchAdminUserAssets({ jwt, userId }));
    dispatch(fetchAdminUserWallet({ jwt, userId }));
  }, [dispatch, userId]);

  const wallet = admin.userWallet;

  return (
    <AdminLayout
      title={`User detail #${userId}`}
      subtitle="Live view into this account's portfolio allocation and wallet balance."
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
        <Card className="border border-slate-800/80 bg-slate-900/60 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Portfolio positions
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Avg buy price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admin.userAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">
                    {asset.coin?.symbol}
                  </TableCell>
                  <TableCell>{asset.quantity}</TableCell>
                  <TableCell>{asset.buyPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="border border-slate-800/80 bg-slate-900/60 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Wallet snapshot
          </h2>
          {wallet ? (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Balance</span>
                <span className="font-semibold text-emerald-400">
                  {wallet.balance} USD
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Locked</span>
                <span className="text-slate-200">
                  {wallet.lockedBalance} USD
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No wallet data available.</p>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUserDetail;


