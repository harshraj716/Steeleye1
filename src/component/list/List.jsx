import React from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import timeStampsData from '../../assets/timeStamps.json'
import styles from "./List.module.css";


const List = ({ rows,selectedCurrency,selectedOrderDetails,selectedOrderTimeStamps }) => {
  const showOrderDetails =(rows)=>{
    selectedOrderDetails(rows.executionDetails)
    selectedOrderTimeStamps(rows.orderTimeStamps)
  }
  const currencyConversions = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.42,
  };
  const calculateOrderVolume = (orderVolumeUSD, currency) => {
    return orderVolumeUSD * currencyConversions[currency];
  };
  const timeStampDataObject = {};

  timeStampsData.results.forEach((item) => {
    timeStampDataObject[item["&id"]] = item.timestamps.orderSubmitted;
  });
  const Data = rows.map((row, index) => ({
    ...row, 
    orderTimeStamps: timeStampsData.results.find((item) => item["&id"] === row["&id"]).timestamps,  
    orderSubmitted: timeStampDataObject[row["&id"]] || null,
  }));

return (
   
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume /{selectedCurrency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {Data.map((row , i) => (
          <ListRow key={i} showOrderDetails = {showOrderDetails} data={row}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.orderSubmitted}</ListRowCell>
            <ListRowCell>{calculateOrderVolume(
            row.bestExecutionData.orderVolume.USD,selectedCurrency)}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
