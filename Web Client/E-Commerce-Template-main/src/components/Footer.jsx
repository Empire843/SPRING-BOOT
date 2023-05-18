import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconBriefcase } from "bootstrap-icons/icons/briefcase.svg";
import { ReactComponent as IconBadgeAd } from "bootstrap-icons/icons/badge-ad.svg";
import { ReactComponent as IconGift } from "bootstrap-icons/icons/gift.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
  faApple,
  faWindows,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="container-fluid bg-primary">
          <div className="row ">

          </div>
        </div>
        <div className="container-fluid bg-dark text-white">
          <div className="row ">
            <div className="col-md-3 py-3">
              <div className="h6">Nhóm 02</div>
              <hr />
              <p>
                Web bán đồ điện tử cung cấp đa dạng sản phẩm công nghệ cao cấp như
                laptop, Headset, Phone và Tivi từ các thương hiệu nổi tiếng.
                Với mẫu mã và giá cả phù hợp, đây là lựa chọn hàng đầu cho những
                người yêu công nghệ.
              </p>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Sản Phẩm</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Laptop
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Headset
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Phone
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Tivi
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Địa chỉ</div>
              <hr />
              <address>
                <br />
                278, Nguyễn Trãi, Hà Đông, Hà Nội
              </address>
              <hr />
              <IconTelephone /> 094737437
              <br />
              <IconEnvelope /> kienqoach@gamil.com
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
