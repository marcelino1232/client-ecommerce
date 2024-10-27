import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React, { Fragment } from "react";
import { ProductItemPdf } from "./ProductItemPdf";

export const ProductListPdf = ({ order }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: "10px",
      fontSize: "15px",
      marginHorizontal: "8px",
      textAlign: "center",
      fontStyle: "bold",
      border: "1px solid black",
      backgroundColor: "#3F51B5",
      color: "#fff",
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
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>Quantity</Text>
        <Text style={styles.total}>Total</Text>
      </View>
      {order.orderDetails.map((item, indice) => (
        <ProductItemPdf key={indice} item={item} />
      ))}
    </Fragment>
  );
};
