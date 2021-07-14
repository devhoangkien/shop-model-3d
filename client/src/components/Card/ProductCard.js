import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { addToCart } from '../../redux/actions/cartActions';
import Rating from '../Rating';
import { Helmet } from "react-helmet";

const ProductCard = ({ product, i }) => {
  const dispatch = useDispatch();

  const fadeUp = {
    initial: { x: 30, opacity: 0 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial='initial'
      animate='animate'
      className='flex flex-col justify-center mx-auto hover:shadow-xl border-2 border-dashed transition-shadow duration-500'
    >
      <Link to={`/product/${product?._id}`} className='flex-1 card-model'>
      <model-viewer
          className="mx-auto w-full max-w-md"
          src={product?.model}
          alt=""
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
        ></model-viewer>
      </Link>
      <div className='px-5 py-3'>
        <div className='flex justify-between items-center'>
          <small className='text-gray-500'>{product?.category}</small>
          <Rating value={product?.rating} />
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to={`/product/${product?._id}`}
            className='text-base text-gray-700 hover:underline flex-1'
          >
            {product?.name}
          </Link>
          <small className='text-gray-400 ml-2'>
            {product?.numReviews} reviews
          </small>
        </div>
      </div>
     
      <Helmet>
        <script type="module" src="/model-viewer.js"></script>
        {/* <script>`try{Typekit.load({ async: true })}catch(e){}`</script> */}
      </Helmet>
    </motion.div>
  );
};

export default ProductCard;
