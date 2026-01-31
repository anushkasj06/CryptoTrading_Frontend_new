import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../Layout/AdminLayout";
import { fetchAdminUsers } from "@/Redux/Admin/Action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchAdminUsers(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <AdminLayout
      title="Users overview"
      subtitle="Inspect any account, then drill into portfolio, wallet and activity."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admin.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell className="text-slate-300">{user.email}</TableCell>
              <TableCell>
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminUsers;


