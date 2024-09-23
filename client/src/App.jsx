import PostCreate from './components/PostCreate.jsx'
import PostList from './components/PostList.jsx'

const App = () => {
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
