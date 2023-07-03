"use client";
import TagUser from "../TagUser";
import { parseCookies } from "nookies";
import React from "react";
import Ancors from "../Ancors";
import styles from "../../styles.module.scss";

const TagOrAncors = () => {
  const cokies = parseCookies();
  const [user, setUser] = React.useState(cokies.user);

  return (
    <div className={user ? styles.gap : ""}>
      {user ? <TagUser name={JSON.parse(user).name} /> : <Ancors />}
    </div>
  );
};

export default TagOrAncors;
