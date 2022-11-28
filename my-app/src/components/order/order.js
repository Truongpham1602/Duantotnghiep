import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Order = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "CustemerName", headerName: "Tên Khách Hàng", width: 130 },
    { field: "ProductName", headerName: "Tên Sản Phẩm", width: 130 },
    {
      field: "Quantity",
      headerName: "Số Lượng",
      type: "number",
      width: 90,
    },
    { field: "Price", headerName: "Tổng tiền", type: "number", width: 130 },
    {
      field: "pay",
      headerName: "Thanh Toán",
      width: 160,
    },
    {
      field: "statusorder",
      headerName: "Trạng thái đơn hàng",
      width: 500,
    },
  ];
  const rows = [
    {
      id: 1,
      CustemerName: "Long",
      ProductName: "Giày nike",
      Quantity: 35,
      Price: 20000,
      pay: "Chưa thanh toán",
      statusorder: "Đang xử lý...",
    },
    {
      id: 2,
      CustemerName: "Trường",
      ProductName: "Giày Da Bò",
      Quantity: 42,
      Price: 20000,
      pay: "Chưa thanh toán",
      statusorder: "Đang xử lý...",
    },
    {
      id: 3,
      CustemerName: "Nghĩa",
      ProductName: "Giày Chạy",
      Quantity: 45,
      Price: 20000,
      pay: "Đã thanh toán",
      statusorder: "Đang xử lý...",
    },
    {
      id: 4,
      CustemerName: "Thơ",
      ProductName: "Giày ADIDAS",
      Quantity: 16,
      Price: 20000,
      pay: "Đã thanh toán",
      statusorder: "Đang xử lý...",
    },
    {
      id: 5,
      CustemerName: "Nguyên",
      ProductName: "Giày Lười",
      Quantity: null,
      Price: 20000,
      pay: "Đã thanh toán",
      statusorder: "Đang xử lý...",
    },
  ];

  return (
    <div className="col-12">
      <div className="card">
        <div className="card__header">
          <h3>Đơn hàng</h3>
        </div>
        <div className="row">
          <div className="col-sm-4 mt-2">
            <select className="form-control">
              <option value="0">Tất cả</option>
            </select>
          </div>
          <div className="col-sm-4 mt-2">
            <select className="form-control">
              <option value="">Chọn năm</option>
              <option value="2019">2019</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="col-sm-4 mt-2">
            <select className="form-control" /*value={month}*/>
              <option value="">Chọn tháng</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 mt-2">
            <input type="date" name="" id="" className="border" />
          </div>

          <div className="col-sm-4 mt-2">
            <input type="date" name="" id="" className="border" />
          </div>
          <button
            className="btn btn-primary mt-2"
            // onClick={() => searchHandler()}
          >
            Tìm kiếm
          </button>
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
