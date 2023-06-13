import { useEffect, useState } from "react"
import postService from "../services/postService"
import { useNavigate } from "react-router-dom"
import { authContext } from "../context/authContext"
import { useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import CenteredSpinner from "../components/spinner"
import PostInList from "../components/postInList"
import Error from "../components/error"

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { logout } = useContext(authContext)
    const navigate = useNavigate()
    const pageSize = 12

    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await postService.getPosts(page, pageSize)
                setPosts(response.data.rows)
                setTotalPages(Math.ceil(response.data.count / pageSize))
                setLoading(false)
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
                    <Row>
                        {posts.map(post => {
                            
                            return (
                                <Col sm={6} md={3} lg={3} className='d-flex justify-content-center align-items-stretch p-2'>
                                    <PostInList key={post.id} post={post}/>
                                </Col>)
                        })}
                    </Row>
                </>
            )
    }

    return (
        <>  
        <Container>
                <h1 style={{textAlign: 'left'}}>Posts</h1>
                {!loading ? showPosts() : <CenteredSpinner/>}
        </Container>
        </>
    )
}

export default Posts