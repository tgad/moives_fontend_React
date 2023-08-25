import React from 'react'
import { Pagination } from 'react-bootstrap';


const ReviewPagination = ({currentPage, totalPages, setCurrentPage}) => {


    return (
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} />

          

          
          {totalPages > 4 && currentPage > 2 ? <Pagination.Ellipsis /> : null}
    
          {[...Array(totalPages).keys()].map(i => {
            const pageNumber = i + 1;
            if (pageNumber === currentPage) {
              return <Pagination.Item key={pageNumber} active>{pageNumber}</Pagination.Item>
            } else if (pageNumber > currentPage - 2 && pageNumber < currentPage + 2) {
              return <Pagination.Item key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</Pagination.Item>
            } else {
              return null;
            }
          })}
    
          {totalPages > 4 && currentPage <(totalPages - 1) ? <Pagination.Ellipsis /> : null}
          
    
          <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
        </Pagination>
      );
}

export default ReviewPagination
