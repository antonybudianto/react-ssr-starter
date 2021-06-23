import "react-hot-loader"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import CoreLayout from "../layouts/CoreLayout"

const Root = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <CoreLayout />
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default Root
