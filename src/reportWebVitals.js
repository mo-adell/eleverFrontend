const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}
{
  /* <i className="fa fa-gg fa-2x facolor" aria-hidden="true"></i>
<Link className="brand" to="/">
  Adelotelli
</Link>
</div> */
}
export default reportWebVitals
