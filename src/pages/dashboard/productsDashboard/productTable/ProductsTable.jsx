import React, { useEffect, useState } from "react";
import "./productsTable.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import Button from "../../../../components/button/Button";
import DataTable from "../../../../components/dashboard/dataTable/DataTable";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../../../redux/apiCalls";
import Swal from "sweetalert2";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);

  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const lastPage = useSelector((state) => state.product.lastPage);

  const token = useSelector((state) => state.admin.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  const handleDelete = (id) => {
    deleteProduct(id, dispatch, configuration);
    Swal.fire({
      title: "product deleted!",
      icon: "success",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      toast: true,
      position: 'top-end',
  })
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  useEffect(() => {
    setpageCount(lastPage);
    getProducts(dispatch, configuration, page);
  }, [dispatch, page]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            {params.row.image ? (
              <img
                className="productImage"
                src={`http://localhost:8000/storage/product/image/${params.row.image}`}
                alt=""
              />
            ) : (
              <div></div>
            )}
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 130,
      renderCell: (params) => {
        return <div>{params.row.title}</div>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      renderCell: (params) => {
        return <div dangerouslySetInnerHTML={{ __html: params.row.content.slice(0,20) }} />;
      },
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 100,
      renderCell: (params) => {
        return <span> {params.row.capacity}</span>;
      },
    },
    {
      field: "update",
      headerName: "UPDATE",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={"/product/" + params.row.id}>
            <button className="update">update</button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "DELETE",
      width: 90,
      renderCell: (params) => {
        return (
          <Link>
            <button
              className="delete"
              onClick={() => handleDelete(params.row.id)}
            >
              delete
            </button>
          </Link>
        );
      },
    },
  ];
  return (
    <>
      <Topbar />
      <div className="productsTable">
        <AdminSidebar />
        <div className="productWrapper">
          <div className="productWrapperTitle">Products</div>
          <Button text="create" url="/newProduct" />
          <DataTable rows={productList} columns={columns} />
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
