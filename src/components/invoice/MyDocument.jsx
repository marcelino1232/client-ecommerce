import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Note,
} from "@react-pdf/renderer";
import { CustomerInfPdf } from "./CustomerInfPdf";
import { ProductListPdf } from "./ProductListPdf";
import { ProductTotalPdf } from "./ProductTotalPdf";

// Create styles

export const MyDocument = ({ order, profile }) => {
  return (
    <Document>
      <Page size="A4">
        <CustomerInfPdf profile={profile} order={order} />
        <ProductListPdf order={order} />
        <ProductTotalPdf order={order} />
      </Page>
    </Document>
  );
};
