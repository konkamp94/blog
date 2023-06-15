import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({totalPages, currentPage, setCurrentPage}) => {
    const pages = [];
    for(let i = 0; i < totalPages; i++) {
        pages.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                {i + 1}
            </Pagination.Item>
        )
    }

    return (
        <>
        {totalPages === 0 ? null :
            <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}/>
                {pages}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === (totalPages - 1)}/>
            </Pagination>}
        </>
    )
}

export default CustomPagination;