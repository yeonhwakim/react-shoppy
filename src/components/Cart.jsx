import React from "react";

function Cart(props) {
  return (
    <div>
      <div>내 장바구니</div>
      <div>
        <ul>
          <li>
            <div>
              <img src="" alt="" />
              <div>
                <p>제품명</p>
                <p>사이즈</p>
                <p>가격</p>
              </div>
            </div>
            <div>
              <div>
                <button>+</button>
                <span>2</span>
                <button>-</button>
              </div>
              <button></button>
            </div>
          </li>
          <li>
            <div>
              <img src="" alt="" />
              <div>
                <p>제품명</p>
                <p>사이즈</p>
                <p>가격</p>
              </div>
            </div>
            <div>
              <div>
                <button>+</button>
                <span>2</span>
                <button>-</button>
              </div>
              <button></button>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <span>상품총액</span>
          <span>₩3000</span>
        </div>
        <div>+</div>
        <div>
          <span>배송비</span>
          <span>₩3000</span>
        </div>
        <div>=</div>
        <div>
          <span>총가격</span>
          <span>₩6000</span>
        </div>
      </div>
      <button>주문하기</button>
    </div>
  );
}

export default Cart;
