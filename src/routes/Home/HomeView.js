import React, { useState, Suspense } from "react"
import PropTypes from "prop-types"

import "./HomeView.css"
import { Link } from "react-router-dom"

const HomeView = () => {
  const [count, setCount] = useState(0)
  return (
    <Suspense fallback={<div>spinner...</div>}>
      <div className="home-view">
        <div>home {count}</div>
        {/* For toggling ssr error */}
        {/* {a()} */}
        <div style={{ marginTop: "50px" }}>
          <button
            style={{ padding: "10px 15px" }}
            type="button"
            onClick={() => setCount(ct => ct + 1)}
          >
            up count
          </button>
          <Link
            to="/404"
            style={{
              color: "white",
              marginLeft: "20pt"
            }}
          >
            go to 404
          </Link>
        </div>
      </div>
    </Suspense>
  )
}

HomeView.propTypes = {
  user: PropTypes.object,
  toggleLogin: PropTypes.func
}

export default HomeView
