import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10, textAlign: "center" },
  text: { marginBottom: 5 },
  list: { marginLeft: 10 },
});

const PrescriptionPDF = ({ formData, inputFields }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>Prescription</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Unit Name: {formData.uname}</Text>
        <Text style={styles.text}>Patient Name: {formData.name}</Text>
        <Text style={styles.text}>Age: {formData.age}</Text>
        <Text style={styles.text}>Designation: {formData.designation}</Text>
        <Text style={styles.text}>ID No: {formData._id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Prescribed Medicines:</Text>
        {inputFields.map((field, index) => (
          <Text key={index} style={styles.list}>
            - {field.name}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PrescriptionPDF;
