import { useState, useCallback, useEffect } from 'react'

const useFetch = (fetch, params) => {
  const [data, setData] = useState({})
  const [newParams] = useState(params)
  const fetchApi = useCallback(async () => {
    const res = await fetch(newParams)
    if (res.code === 1000) {
      setData(res.data)
    }
  }, [fetch, newParams])

  useEffect(() => {
    fetchApi()
  }, [fetchApi])

  return data
}

export default useFetch