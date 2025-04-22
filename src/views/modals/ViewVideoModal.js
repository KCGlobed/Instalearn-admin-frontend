import React from 'react'
import ReactPlayer from 'react-player'

const ViewVideoModal = ({url}) => {
  return (
    <div>
       <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
            url={url}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
        />
    </div>
    </div>
  )
}

export default ViewVideoModal