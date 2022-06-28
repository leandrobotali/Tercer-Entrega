export default (err, req, res, next) => {
    res.status(500).json({ msg: err.message })
    // let error = err
    // res.render("index", error)
}