"use client";
import CommentItem from "@/components/CommentsItem/commentsItem";
import { ProductPageContext } from "@/context/ProductPageContext";
import { useContext } from "react";
import styles from "./styles.module.scss";

const CommentSection = () => {
  const { comments } = useContext(ProductPageContext);
  return (
    <div className={styles.commentsSection}>
      <h2>Comentários</h2>
      <ul className={styles.commentsList}>
        {comments.map((e, i) => (
          <CommentItem comments={e} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
