import { useEffect, useState } from "react"
import postService from "../services/postService"
import { useNavigate } from "react-router-dom"
import { authContext } from "../context/authContext"
import { useContext } from "react"
import CenteredSpinner from "../components/spinner"
import Error from "../components/error"

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { logout } = useContext(authContext)
    const navigate = useNavigate()
    const pageSize = 10

    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await postService.getPosts(page, pageSize)
                setPosts(response.data.rows)
                setTotalPages(Math.ceil(response.data.count / pageSize))
                // setLoading(false)
            } catch(error) {
                if(error.response.status === 401) {
                    logout()
                    navigate('/login')
                } else if(error.response.status === 500) {
                    setLoading(false)
                    setError('Something went wrong, please try again later')
                    console.log('Something went wrong, please try again later')
                }
            }
        }
        getPosts()
    }, [page])

    const showPosts = () => {
        return (<>
                    {posts.map(post => {
                        return <div key={post.id}>
                                <div>{post.title}</div>
                                <div>{post.author}</div>
                                <div>{post.body}</div>
                               </div>
                    })}
                </>
            )
    }

    return (
        <>
            {!loading ? showPosts() : <CenteredSpinner/>}
        </>
    )
}

export default Posts