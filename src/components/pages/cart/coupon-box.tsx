import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getItemCoupons } from '../../../data/api';
import { CartActionTypes, UPDATE_COUPON } from '../../../redux/cart/actions';
import { Coupon as CouponState } from '../../../types';
import Coupon from './coupon';

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.66);
  display: flex;
  justify-content: center;
  align-items: center;

  .box-inner {
    width: 360px;
    min-height: 480px;
    background-color: #fff;
    padding: 10px;
    border-radius: 7px;
  }

  .box-close {
    float: right;
    background-color: #fff;
    border: none;
    margin-bottom: 1em;
    outline: none;
    cursor: pointer;
  }

  h4 {
    margin-top: 1em;
    text-align: center;
  }

  .coupon-button {
    margin: 10px 0;
    width: 100%;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #eee;
    cursor: pointer;
  }

  .coupon-hint {
    color: red;
  }
`;

const mapDispatchToProps = (dispatch: Dispatch<CartActionTypes>) => {
  return {
    updateCoupon: (coupon: CouponState) => dispatch({ type: UPDATE_COUPON, payload: { coupon } })
  }
}

const connector = connect(null, mapDispatchToProps);

type CouponBoxProps = {
  totalAmount: number;
  salesAmount: number;
  closeCouponBox: Function;
  prevCoupon?: CouponState;
  updateCoupon: Function;
};

const CouponBox: React.FC<CouponBoxProps> = ({ totalAmount, salesAmount, closeCouponBox, prevCoupon, updateCoupon }) => {
  const [itemCoupons, setItemCoupons] = useState<CouponState[]>([]);
  const [calculatedAmount, setCalculatedAmount] = useState(totalAmount);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponState | undefined>(undefined);

  useEffect(() => {
    const getCoupons = async () => {
      const data = await getItemCoupons();
      setItemCoupons(data as CouponState[]);
    };
    getCoupons();
  }, []);

  useEffect(() => {
    if (selectedCoupon) {
      const calculateAmount = () => {
        const pcs = totalAmount - salesAmount;
        if (selectedCoupon.type === 'rate') {
          setCalculatedAmount(pcs + Math.floor(salesAmount * (1 - (selectedCoupon.discountRate || 100) / 100)));
        } else {
          setCalculatedAmount(pcs + Math.floor(salesAmount - (selectedCoupon.discountAmount || 0)));
        }
      };
      calculateAmount();
    }
  }, [selectedCoupon]);

  useEffect(() => {
    if (prevCoupon) {
      setSelectedCoupon(prevCoupon);
    }
  }, [prevCoupon]);

  const selectCoupon = (coupon: CouponState) => setSelectedCoupon(coupon);

  const handleClose = () => closeCouponBox();

  const handleUpdateCoupon = () => {
    updateCoupon(selectedCoupon);
    handleClose();
  }

  const getResultText = () => {
    if (selectedCoupon) {
      if (selectedCoupon.type === 'rate') {
        return `${totalAmount.toLocaleString('en-US')} * ${1 -(selectedCoupon.discountRate || 100) / 100} = ${calculatedAmount.toLocaleString('en-US')}`;
      } else {
        return `${totalAmount.toLocaleString('en-US')} - ${(selectedCoupon.discountAmount || 0).toLocaleString('en-US')} = ${calculatedAmount.toLocaleString('en-US')}`;
      }
    } else {
      return `${totalAmount.toLocaleString('en-US')} - 0 = ${calculatedAmount.toLocaleString('en-US')}`;
    }
  }

  return (
    <BoxWrapper>
      <div className="box-inner">
        <button className="box-close" onClick={handleClose}>x</button>
        {
          itemCoupons.map((coupon, index) => {
            const checked = selectedCoupon ? (selectedCoupon.title === coupon.title) : false;
            return (<Coupon 
              key={index} 
              index={index} 
              coupon={coupon}
              checked={checked}
              selectCoupon={selectCoupon} 
            />);
          })
        }
        { selectedCoupon && <h4>{getResultText()}???</h4> }
        <button className="coupon-button" onClick={handleUpdateCoupon}>????????????</button>
        <h4 className="coupon-hint">?????? ????????? ???????????? ????????? ????????? ???????????????.</h4>
      </div>
    </BoxWrapper>
  )
};

export default connector(CouponBox);