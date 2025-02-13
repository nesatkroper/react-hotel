import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import PropTypes from "prop-types";
import {
  afterPerDollar,
  cDollar,
  datetimeNow,
  toUnit,
} from "@/utils/dec-format";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/app/reducer/cart-slice";
import { useEffect, useMemo } from "react";

const Tax = 10;

const InvoiceTable = (props) => {
  const { type = "sale" } = props;

  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { total, discount, amount } = useMemo(() => {
    const total = cartData?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const discount = cartData?.reduce(
      (sum, item) =>
        sum +
        (item.product.price * item.quantity * item.product.discount_rate) / 100,
      0
    );

    const amount = total - discount;

    return { total, discount, amount };
  }, [cartData]);

  return (
    <div>
      {type == "sale" ? (
        <Table className="border-collapse border-none">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Product</TableHead>
              <TableHead className="text-center">Unit</TableHead>
              <TableHead className="text-center">QTY</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartData?.map((item, i) => (
              <TableRow key={i} className="!border-none">
                <TableCell className="text-left py-1">
                  <p className="font-medium">{item.product?.product_name}</p>
                  {item.note?.map((m, j) => (
                    <p key={j}>- {m.note}</p>
                  ))}
                </TableCell>
                <TableCell className="text-center align-top py-1">
                  {cDollar(item.product.price)}
                </TableCell>
                <TableCell className="text-center align-top py-1">
                  {toUnit(item.quantity, 0)}
                </TableCell>
                <TableCell className="text-right align-top py-1">
                  {cDollar(item.quantity * item.product?.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Room</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <p>Room-101</p>
                <p>- {datetimeNow()}</p>
                <p>- {datetimeNow(4)}</p>
              </TableCell>
              <TableCell className="align-top">{cDollar(29.99)}</TableCell>
              <TableCell className="align-top">
                {toUnit(4, 0, "days")}
              </TableCell>
              <TableCell className="text-right align-top">
                {cDollar(29.99 * 4)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <Separator />
      <div className="flex flex-col px-1 my-2">
        <div className="flex justify-between font-semibold">
          <p>TOTAL :</p>
          <p className="font-semibold">{cDollar(total)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Tax ({toUnit(Tax, 0, "%")}) :</p>
          <p className="font-semibold">{cDollar(total, Tax)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>DISCOUNT :</p>
          <p className="font-semibold">{cDollar(discount)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>AMOUNT :</p>
          <p className="font-bold text-red-600">
            {afterPerDollar(amount, -Tax)}
          </p>
        </div>
      </div>
    </div>
  );
};

InvoiceTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.string,
};

export default InvoiceTable;
