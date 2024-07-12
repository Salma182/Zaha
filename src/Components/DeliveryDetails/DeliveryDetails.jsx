import React from "react";
import style from "./DeliveryDetails.module.css";

export default function DeliveryDetails() {
  return (
    <>
      <button
        type="button"
        className="btn text-dark fw-bold fs-5"
        data-bs-toggle="modal"
        data-bs-target="#deliverdetails"
      >
        Delivery & Returns
      </button>

      <div
        className="modal fade"
        id="deliverdetails"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="deliverdetailsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered w-100 text-start">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title text-center gold m-auto" id="deliverdetailsLabel">
                Delivery & Return 
              </h5> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h3 className=" m-auto text-center gold p-2 rounded rounded-2">
                Delivery
              </h3>
              <p className="small my-1 ">Estimated Delivery</p>
              <p className="my-1 small">5-7 Working Days</p>
              <hr />
              <h3 className="m-auto text-center gold p-2 rounded rounded-2">
              Returns & Exchange
              </h3>
              {/* <p>Returns & Exchange</p> */}
              <ul className="small">
                <li className="small">
                  Please check the item and try it once when you receive it
                  while the courier is waiting.
                </li>
                <br />
                <li className="small">
                  If you don’t want the item, it can be returned to the courier
                  and only shipping fees will be charged.
                </li>
                <br />
                <li className="small">
                  ⁠In the case of receiving any wrong or damaged items, items
                  can be returned immediately to the courier and shipping fees
                  will be paid by our side.
                </li>
                <br />
                <li className="small">
                  ⁠items are non-refundable once received and paid.
                </li>
                <br />
                <li className="small">
                  ⁠items can be exchanged within 7 days.
                </li>
              </ul>
            </div>

            <hr />
            <div className="modal-body">
  <h3 className="m-auto text-center gold p-2 rounded rounded-2">
    التوصيل
  </h3>
  <p className="small my-1 text-end">التوصيل</p>
  <p className="my-1 small text-end">٥ - ٧ ايام توصيل</p>
  <hr />
  <h3 className="m-auto text-center gold p-2 rounded rounded-2">
    الاسترجاع و الاستبدال
  </h3>
  <ul className="small text-end">
    <li className="small">
      يرجي التحقق من المنتج وتجربته عند استلامه اثناء انتظار المندوب
    </li>
    <br />
    <li className="small">
      إذا كنت لا تريد المنتج، فيمكن استرجاعه إلى شركة الشحن ويتم دفع مصاريف الشحن فقط
    </li>
    <br />
    <li className="small">
      في حالة استلام أي منتجات خاطئة أو تالفة، يمكن استرجاع المنتجات على الفور إلى شركة الشحن ونحن نتكفل بمصاريف الشحن 
    </li>
    <br />
    <li className="small">
      ⁠العناصر غير قابلة للاسترداد بمجرد استلامها ودفع ثمنها
    </li>
    <br />
    <li className="small">
      ⁠ يمكن استبدال العناصر خلال 7 أيام
    </li>
  </ul>
</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
