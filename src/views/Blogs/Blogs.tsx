import React from "react";

import "./Blogs.scss";

function Blogs() {
  const date = new Date();
  return (
    <div className="blogs-container">
      {/* <div className="blog">
        <div className="blog-title">First Blog I have Written WoW !!</div>
        <div className="blog-info">
          <div className="item">
            <span>Date</span>
            <p>March 15, 2023</p>
          </div>
          <div className="item"></div>
        </div>
      </div>
      <div className="blog">
        <div className="blog-title">This is second blog</div>
        <div className="blog-info">
          <div className="item">
            <span>Date</span>
            <p>March 15, 2023</p>
          </div>
          <div className="item"></div>
        </div>
      </div> */}
      <div className="blog-title">No blogs yet !</div>
    </div>
  );
}

export default Blogs;
