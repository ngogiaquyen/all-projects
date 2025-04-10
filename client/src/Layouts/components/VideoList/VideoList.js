import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoList.module.scss";

const cx = classNames.bind(styles);

const VideoList = () => {
  const videos = [
    { id: 1, title: "Hội thoại 1", src: "video1.mp4" },
    { id: 2, title: "Hội thoại 2", src: "video2.mp4" },
    { id: 3, title: "Hội thoại 3", src: "video3.mp4" },
  ];

  return (
    <div className={cx("video-list")}>
      {videos.map((video) => (
        <div key={video.id} className={cx("video-item")}>
          <p>{video.title}</p>
          <button>Xem video</button>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
