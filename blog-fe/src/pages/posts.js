import { useEffect, useState } from "react"
import postService from "../services/postService"
import userService from "../services/userService"
import { authContext } from "../context/authContext"
import { useContext } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import CenteredSpinner from "../components/spinner"
import PostInList from "../components/postInList"
import CustomPagination from "../components/customPagination"
import useApiErrorHandling from "../hooks/useApiErrorHandling"
import ErrorAlert from "../components/errorAlert"
import { useLocation } from 'react-router-dom';


const Posts = () => {
    const location = useLocation()
    const [isFavouritePage, setIsFavouritePage] = useState(null)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, handleApiError] = useApiErrorHandling()
    const { getUser } = useContext(authContext)
    
    const pageSize = 12
    useEffect(() => {
        const isFavouritePage = location.pathname === '/blog/favourite-posts';
        setIsFavouritePage(isFavouritePage)
        window.scrollTo(0, 0)
        const getPosts = async () => {
            setLoading(true)
            try {
                let response = !isFavouritePage ? await postService.getPosts(page, pageSize)
                                              : await userService.getFavouritePosts(getUser().id, page, pageSize)
                setPosts(response.data.rows)
                setTotalPages(Math.floor(response.data.count / pageSize))
                setLoading(false)
            } catch(error) {
                setLoading(false)
                handleApiError(error)
            }
            setLoading(false)
        }
        getPosts()
    }, [page, location])

    const deleteAllFavourites = async () => {
        setLoading(true)
        try {
            await postService.addOrRemoveFavouritePosts(getUser().id, posts.map(post => post.id), false)
            setPosts([])
            setPage(0)
            setTotalPages(0)
        } catch(error) {
            handleApiError(error)
        }
        setLoading(false)
    }

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
                <h1 style={{textAlign: 'left'}}>{!isFavouritePage ? 'Posts' : 'Favourite Posts   ' }
                                                {!loading && !error && isFavouritePage ? 
                                                    <Button variant="danger" onClick={() => {deleteAllFavourites()}}>
                                                        Delete all favourites <i class="bi bi-trash3-fill"></i>
                                                    </Button>: null}
                </h1>
                {error && <ErrorAlert errorMessage={error}/>}
                {!loading && !error ? showPosts() : !error ? <CenteredSpinner/> : null}
        </Container>
        </>
    )
}

export default Posts