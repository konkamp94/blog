import { useEffect, useState } from "react"
import postService from "../services/postService"
import userService from "../services/userService"
import { authContext } from "../context/authContext"
import { useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import CenteredSpinner from "../components/spinner"
import PostInList from "../components/postInList"
import CustomPagination from "../components/customPagination"
import useApiErrorHandling from "../hooks/useApiErrorHandling"
import ErrorAlert from "../components/errorAlert"


const Posts = ({favouritePage=false}) => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, handleApiError] = useApiErrorHandling()
    const { user } = useContext(authContext)
    const pageSize = 12

    useEffect(() => {
        window.scrollTo(0, 0)
        const getPosts = async () => {
            setLoading(true)
            try {
                let response = !favouritePage ? await postService.getPosts(page, pageSize)
                                              : await userService.getFavouritePosts(user.id, page, pageSize)
                setPosts(response.data.rows)
                setTotalPages(Math.floor(response.data.count / pageSize))
                setLoading(false)
            } catch(error) {
                console.log(error)
                handleApiError(error)
            }
            setLoading(false)
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
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <CustomPagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage}/>
                        </Col>
                    </Row>
                </>
            )
    }

    return (
        <>  
        <Container>
                <h1 style={{textAlign: 'left'}}>Posts</h1>
                {error && <ErrorAlert errorMessage={error}/>}
                {!loading ? showPosts() : <CenteredSpinner/>}
        </Container>
        </>
    )
}

export default Posts