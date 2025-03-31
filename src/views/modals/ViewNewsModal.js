import React from 'react'

const ViewNewsModal = ({item}) => {
    return (
        <div className="container mt-4">
          <h2 className="fs-5">News Feed</h2>
   
            <div className="list-group">
              {
                <div  className="list-group-item list-group-item-action">
                  {/* {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="img-fluid mb-2" style={{ maxHeight: "150px" }} />} */}
                  <h5 className="fs-6">{item.title}</h5>
                  <p className="mb-1 small">{item.description}</p>
                  <small className="text-muted">Source: {item.source} | {item.date}</small>
                  <div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">Read More</a>
                  </div>
                </div>
             }
            </div>
          
        </div>
      );
}

export default ViewNewsModal