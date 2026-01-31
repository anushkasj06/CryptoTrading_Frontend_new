import {
  getAllWithdrawalRequest,
  proceedWithdrawal,
} from "@/Redux/Withdrawal/Action";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../Layout/AdminLayout";

const WithdrawalAdmin = () => {
  const dispatch = useDispatch();

  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleProccedWithdrawal = (id, accept) => {
    dispatch(
      proceedWithdrawal({ jwt: localStorage.getItem("jwt"), id, accept })
    );
  };

  return (
    <AdminLayout
      title="Withdrawal queue"
      subtitle="Review and approve user withdrawal requests in real time."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date</TableHead>
            <TableHead className="py-5">User</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Proceed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.requests.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium py-5">
                {readableTimestamp(item?.date)}
              </TableCell>
              <TableCell>
                <p className="font-bold">{item.user.fullName}</p>
                <p className="text-gray-300">{item.user.email}</p>
              </TableCell>
              <TableCell>{"Bank Account"}</TableCell>
              <TableCell className="text-green-500">
                {item.amount} USD
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`text-white ${
                    item.status == "PENDING" ? "bg-red-500 " : "bg-green-500"
                  }`}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" outline-none ">
                    <Button variant="outline">PROCEED</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="">
                      <Button
                        onClick={() => handleProccedWithdrawal(item.id, true)}
                        className="w-full bg-green-500 text-white hover:text-black"
                      >
                        Accept
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        onClick={() =>
                          handleProccedWithdrawal(item.id, false)
                        }
                        className="w-full bg-red-500 text-white hover:text-black"
                      >
                        Decline
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default WithdrawalAdmin;
