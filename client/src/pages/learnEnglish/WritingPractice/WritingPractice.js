import React, { useState } from "react";
import styles from "./WritingPractice.module.scss";

const WritingPractice = () => {
  const [paragraph, setParagraph] = useState("");
  const [savedParagraphs, setSavedParagraphs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = () => {
    if (editingIndex !== null) {
      // Update an existing paragraph
      const updatedParagraphs = [...savedParagraphs];
      updatedParagraphs[editingIndex] = paragraph;
      setSavedParagraphs(updatedParagraphs);
      setEditingIndex(null);
    } else {
      // Add a new paragraph
      setSavedParagraphs([...savedParagraphs, paragraph]);
    }
    setParagraph("");
  };

  const handleEdit = (index) => {
    setParagraph(savedParagraphs[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedParagraphs = savedParagraphs.filter((_, i) => i !== index);
    setSavedParagraphs(updatedParagraphs);
  };

  return (
    <div className={styles["writing-practice"]}>
      <h2>Writing Practice</h2>
      <textarea
        className={styles["textarea"]}
        placeholder="Write your paragraph here..."
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
      />
      <button className={styles["save-button"]} onClick={handleSave} disabled={!paragraph.trim()}>
        {editingIndex !== null ? "Update" : "Save"}
      </button>
      <div className={styles["saved-paragraphs"]}>
        <h3>Saved Paragraphs</h3>
        {savedParagraphs.length === 0 ? (
          <p>No paragraphs saved yet. Start writing!</p>
        ) : (
          savedParagraphs.map((item, index) => (
            <div key={index} className={styles["paragraph-item"]}>
              <p>{item}</p>
              <div className={styles["actions"]}>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WritingPractice;
