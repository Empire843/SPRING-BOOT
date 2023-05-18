import { Link } from "react-router-dom";

const TopMenu = () => {
  let admin = JSON.parse(localStorage.getItem('admin'));
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      {admin === null ? (
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className="nav-link" to="/category">
                  Category
                </Link>
              </li>

            </ul>
          </div>

        </div>
      ) : (<div className="container-fluid">



        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="navbar-brand" to="/admin/crud-category">
                Category
              </Link>
              <Link className="navbar-brand" to="/admin/crud-product">
                Product
              </Link>
              <Link className="navbar-brand" to="/admin/statistic">
                Statistic
              </Link>
            </li>

          </ul>
        </div>

      </div>)}
    </nav>
  );
};

export default TopMenu;
