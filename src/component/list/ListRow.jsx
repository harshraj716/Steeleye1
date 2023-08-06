import styles from "./ListRow.module.css";

const ListCell = ({ children, showOrderDetails, data }) => {
  return <tr className={styles.cell} onClick={()=>{showOrderDetails(data)}}>{children}</tr>;
};

export default ListCell;
