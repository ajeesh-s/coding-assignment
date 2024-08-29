import ReactPlayer from "react-player";
import Modal from "./Modal";

const YoutubePlayer = ({ videoKey, isModalOpen, setModalOpen }) => (
  <Modal isOpen={isModalOpen} onClose={() => setModalOpen()}>
    {videoKey ? (
      <ReactPlayer
        className="video-player"
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        controls={true}
        playing={true}
        data-testid="youtube-player"
      />
    ) : (
      <div className="p-3">
        <h6>no trailer available. Try another movie</h6>
      </div>
    )}
  </Modal>
);

export default YoutubePlayer;
