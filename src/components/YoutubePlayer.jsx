import ReactPlayer from 'react-player'

// Consider handling cases where `videoKey` might be null or undefined to prevent potential runtime errors.
const YoutubePlayer = ({ videoKey }) => (<ReactPlayer 
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
/>);

export default YoutubePlayer;