import { loginFailure, loginRole, loginStart, loginSuccess } from "./userRedux";
import { AdminRequest, publicRequest } from "../requestMethods";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getPageProduct, getProductFailure, getProductStart, getProductSuccess } from "./productRedux";
import { deleteNewsFailure, deleteNewsStart, deleteNewsSuccess, getNewsFailure, getNewsStart, getNewsSuccess, getPageNews } from "./newsRedux";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await AdminRequest.post("/signin", user);
    // console.log(res.data.body.original.role)
    dispatch(loginSuccess(res.data.body.original.access_token));
    dispatch(loginRole(res.data.body.original.role));
  } catch (err) {
    dispatch(loginFailure());
  }
};
/////////////////////////////////products//////////////////////////////////
export const getProducts = async (dispatch, configuration, page) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get(
      `/product/search?page=${page}`,
      configuration
    );
    dispatch(getProductSuccess(res.data.body.data));
    dispatch(getPageProduct(res.data.body.last_page));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
export const deleteProduct = async (id, dispatch, configuration) => {
  dispatch(deleteProductStart());
  try {
    const res = await publicRequest.delete(`/product/delete/${id}`,configuration
    );
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
//////////////////////////news/////////////////////////////////
export const getNews = async (dispatch, configuration, page) => {
  dispatch(getNewsStart());
  try {
    const res = await publicRequest.get(
      `/post/search?page=${page}`,
      configuration
    );
    dispatch(getNewsSuccess(res.data.body.data));
    dispatch(getPageNews(res.data.body.last_page));
  } catch (err) {
    dispatch(getNewsFailure());
  }
};
export const deleteNews = async (id, dispatch, configuration) => {
  dispatch(deleteNewsStart());
  try {
    const res = await publicRequest.delete(`/post/delete/${id}`,configuration
    );
    dispatch(deleteNewsSuccess(id));
  } catch (err) {
    dispatch(deleteNewsFailure());
  }
};