import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React, { Fragment } from "react";

export const CustomerInfPdf = ({ profile, order }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: "10px",
      fontSize: "15px",
      margin: "8px",
    },
    containerOrder: {
      flexDirection: "column",
      padding: "10px",
      fontSize: "15px",
      margin: "8px",
      alignItems: "flex-end",
    },
    textorder: {
      flexDirection: "row",
      marginBottom: "4px",
    },
    upperCase: {
      textTransform: "uppercase",
      marginBottom: "5px",
    },
    text: {
      marginBottom: "4px",
    },

    title: {
      textAlign: "center",
      marginVertical: "25px",
      textTransform: "uppercase",
      color: "#3F51B5",
      fontSize: "24px",
    },
  });

  const cityCapital = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  const { orderAddress } = order;

  const address =
    orderAddress.street +
    " " +
    orderAddress.houseNumber +
    " " +
    cityCapital(orderAddress.city) +
    " " +
    orderAddress.state +
    " " +
    orderAddress.postalCode;

  return (
    <Fragment>
      <View style={styles.title}>
        <Text>Invoice</Text>
      </View>
      <View style={styles.containerOrder}>
        <View style={styles.textorder}>
          <Text>Document No : </Text>
          <Text>{order.orderId}</Text>
        </View>
        <View style={styles.textorder}>
          <Text>Date : </Text>
          <Text>{order.date}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.upperCase}>
          {profile.firstName + " " + profile.lastName}
        </Text>
        <Text style={styles.text}>{address}</Text>
        <Text style={styles.text}>{profile.cellPhone}</Text>
        <Text>{profile.emailAddress}</Text>
      </View>
    </Fragment>
  );
};
