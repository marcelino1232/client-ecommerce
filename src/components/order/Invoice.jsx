import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { MyDocument } from "../invoice/MyDocument";
import { useParams } from "react-router-dom";
import { invoice } from "../../services/orderService";

export const Invoice = () => {
  const { OrderId } = useParams();

  const [response, setResponse] = useState(null);

  useEffect(() => {
    onloading();
  }, [OrderId]);

  const onloading = async () => {
    const request = await invoice(OrderId);
    if (request != null) {
      setResponse(request);
      console.log(request);
    }
  };
  return (
    <>
      {response != null && (
        <PDFViewer style={{ width: "100vw", height: "100vh" }}>
          <MyDocument
            order={response.orderView}
            profile={response.profileView}
          />
        </PDFViewer>
      )}
    </>
  );
};
