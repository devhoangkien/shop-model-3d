import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Loader from "../components/Loader";
import { getProductList } from "../redux/actions/productActions";
import { Meta, Slider } from "../components";

const ShoeDraco = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);
  const {
    products,
    pages: totalPage,
    loading,
  } = useSelector((state) => state.productList);
  const { success: productCreated } = useSelector(
    (state) => state.productCreate
  );

  useEffect(() => {
    dispatch(getProductList(keyword, pageNumber));
  }, [dispatch, productCreated, pageNumber, keyword]);

  useEffect(() => {
    if (!totalPage) {
      setPages((page) => page);
    } else {
      setPages(totalPage);
    }
  }, [totalPage]);

  const pageHandler = (page) => {
    setPageNumber(Number(page.selected + 1));
  };

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      {loading && <Loader />}
      <Meta />
      <Slider />
    </motion.div>
  );
};

export default ShoeDraco;
