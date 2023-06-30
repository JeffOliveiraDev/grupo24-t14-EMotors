"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { apiEmotors } from "@/services/api";

const CommentItem = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiEmotors.get("/comments");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <li className={styles.liComment}>
      <div className={styles.comment}>
        <span>CL</span>
        <h3>Júlia</h3>
        <h5></h5>
        <h4>há 3 dias</h4>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsam
        tenetur facere enim dignissimos voluptas illum, hic sit, asperiores
        consequuntur culpa architecto autem pariatur quas quibusdam! Cupiditate
        itaque distinctio beatae.
      </p>
    </li>
  );
};

export default CommentItem;
