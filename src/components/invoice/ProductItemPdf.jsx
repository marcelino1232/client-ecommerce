import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React, { Fragment } from "react";

export const ProductItemPdf = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: "10px",
      fontSize: "15px",
      marginHorizontal: "8px",
      textAlign: "center",
      fontStyle: "bold",
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
    },
    text: {
      width: "25%",
      borderRight: "1px solid black",
    },
    total: {
      width: "25%",
    },
  });

  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.text}>{item.name + " " + item.brand}</Text>
        <Text style={styles.text}>{item.salesPrice}</Text>
        <Text style={styles.text}>{item.quantity}</Text>
        <Text style={styles.total}>{item.lineTotal}</Text>
      </View>
    </Fragment>
  );
};
