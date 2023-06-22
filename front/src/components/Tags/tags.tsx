import style from "../Tags/style.tag.module.scss";

const Tag = ({
  children,
  type,
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <>
      <button
        // whileHover={{ opacity: 0.5 }}
        className={style.conteiner}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default Tag;
