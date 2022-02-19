module.exports = (req, res) => {
    res.status(404).json({
        error: 'Pagina no encontrada'
    })
    console.log(req.path)
}