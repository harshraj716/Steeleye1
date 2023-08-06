import { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const filteredRows = mockData.results.filter((row) => {
    const id = row["&id"].toLowerCase();
    const orderStatus = row.executionDetails.orderStatus.toLowerCase();
    const buySellIndicator = row.executionDetails.buySellIndicator.toLowerCase();
    const searchTextLowerCase = searchText.toLowerCase();
  
    return id.includes(searchTextLowerCase) ||
           orderStatus.includes(searchTextLowerCase) ||
           buySellIndicator.includes(searchTextLowerCase);
  });

  const handleSelectOrder = (order) => {
    setSelectedOrderDetails(order);
    setSelectedOrderTimeStamps(timestamps.results.find((item) => item["&id"] === order["&id"]));
  };
return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle="6 orders" />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.sec}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
            
          />
        </div>
        <div className={styles.sec}>
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        </div>
        <List rows={filteredRows} onSelectOrder={handleSelectOrder}selectedCurrency={currency}
         selectedOrderDetails={setSelectedOrderDetails} selectedOrderTimeStamps={setSelectedOrderTimeStamps} />
      </div>
    </div>
  );
};

export default Dashboard;