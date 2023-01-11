const lsKey = 'BOFL_v001'

const getLs = () => {
    const ls = localStorage.getItem(lsKey)
    return JSON.parse(ls)
}

const setLs = (value) => {
    const ls = getLs() || {}
    localStorage.setItem(lsKey, JSON.stringify({...ls, ...value}))
}

export {getLs, setLs}