import React from "react";
import styles from "./ListeningPage.module.scss";
import VideoList from "~/Layouts/components/VideoList";
import SubtitleDisplay from "~/Layouts/components/SubtitleDisplay";

const ListeningPage = () => {
  return (
    <div className={styles["listening-page"]}>
      <h1 className={styles.title}>Luyện nghe</h1>
      <p className={styles.description}>
        Chọn một đoạn hội thoại hoặc video để bắt đầu luyện nghe!
      </p>
      <VideoList />
      <SubtitleDisplay />
    </div>
  );
};

export default ListeningPage;
