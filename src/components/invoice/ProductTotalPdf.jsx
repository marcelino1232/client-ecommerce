import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

export const ProductTotalPdf = ({ order }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      fontSize: "15px",
      marginHorizontal: "8px",
      marginVertical: "15px",
      alignItems: "flex-end",
    },
    row: {
      width: "40%",
      flexDirection: "row",
      padding: "5px",
      justifyContent: "space-between",
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
    },
    lastrow: {
      width: "40%",
      flexDirection: "row",
      justifyContent: "space-between",
      border: "1px solid black",
      padding: "5px",
    },
    thanks: {
      textAlign: "center",
      fontSize: "15px",
      width: "100%",
      margin: "auto",
      paddingVertical: "10px",
      textTransform: "uppercase",
      position: "absolute",
      bottom: "0px",
    },
  });
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.lastrow}>
          <Text style={styles.rigth}>SubTotal</Text>
          <Text>$ {order.subTotal}</Text>
        </View>
        <View style={styles.row}>
          <Text>Tax</Text>
          <Text>$ {order.tax}</Text>
        </View>
        <View style={styles.row}>
          <Text>Shopping</Text>
          <Text>$ {order.shopping}</Text>
        </View>
        <View style={styles.row}>
          <Text>Total</Text>
          <Text>$ {order.total}</Text>
        </View>
      </View>
      <View style={styles.thanks}>
        <Text>Thank You for Your Purchase</Text>
      </View>
    </Fragment>
  );
};
