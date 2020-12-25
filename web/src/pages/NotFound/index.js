import React from "react";
// import { connect } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../components/Wrapper";

function NotFoundPage() {
  return <div>not found</div>;
}

export default Wrapper()(NotFoundPage);
