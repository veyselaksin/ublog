import { useEffect, useState } from 'react'
import PostCreate from './components/PostCreate.jsx'
import PostList from './components/PostList.jsx'

const App = () => {
    // request the https://api.viodash.com
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.viodash.com/docs/') // API adresini doğru şekilde ekleyin
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const result = await response.json()
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []) // boş bir bağımlılık dizisi kullanarak sadece bileşen ilk yüklendiğinde çalışmasını sağlıyoruz

    return (
        <div className={'container mt-4'}>
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h2>Posts</h2>
            <PostList />
        </div>
    )
}

export default App
