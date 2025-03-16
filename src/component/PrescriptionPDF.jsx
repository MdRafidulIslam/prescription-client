import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
 
} from "@react-pdf/renderer";
import { Buffer } from "buffer";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}



// Define styles
const styles = StyleSheet.create({
  horizontalLine: {
    height: 1,
    backgroundColor: "#3B82F6",
    width: "100%",
  },
  verticalLine: {
    width: 1,
    height: 620,
    backgroundColor: "#3B82F6",
  },
  header: {
    backgroundColor: "#cbd5e1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logo: { width: 50, height: 50, marginRight: 10 },
  title: { fontSize: 35, color: "#3b82f6", fontWeight: "bold", marginTop: 10 },
  section: {
    marginVertical: 10,
    marginLeft: 50,
    flexDirection: "row",
    gap: 30,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftSection: {
    width: 180,
    height: 620,
    backgroundColor: "#cbd5e1",
  },
  rightSection: {
    flex: 1,
    height: 620,
    position: "relative", // Needed for absolute background image
  },
  backgroundImage: {
    position: "absolute",
    top: "25%",
    left: "15%",
    transform: "translate(-50%, -50%)", // Center the image
    width: 340, // Adjust width as needed
    height: 360, // Adjust height as needed
    opacity: 0.2, // Adjust transparency
  },
  footerText: {
    position: "absolute",
    bottom: 20, // Align to the bottom
    left: "50%", // Center horizontally
    transform: "translateX(-90%)", // Perfect center
    fontSize: 12,
    color: "#3b82f6",
    textAlign: "center",
  },
  content: {
    zIndex: 1, // Ensures text appears on top of background
    marginLeft: 40,
    marginTop: 40,
  },
});

const PrescriptionPDF = ({ users, inputFields }) => (
  <Document>
    <Page>
      {/* Header */}
      <View style={styles.header}>
        <Image
          src="/1630629403471-removebg-preview (1).png"
          style={styles.logo}
        />
        <View>
          <Text style={styles.title}>FOUR H GROUP</Text>
          <Text style={{ marginTop: 3, fontSize: 12, color: "#3b82f6" }}>
            Unit Name : {users.uname}
          </Text>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      {/* Prescription Details */}
      <View style={styles.section}>
        <Text style={{ fontSize: 12, color: "#3b82f6", width: 300 }}></Text>
        <Text style={{ fontSize: 12, color: "#3b82f6" }}>
          Date : {users.dated}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 12, color: "#3b82f6", width: 300 }}>
          Name : {users.name}
        </Text>
        <Text style={{ fontSize: 12, color: "#3b82f6" }}>
          Age : {users.age}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 12, color: "#3b82f6", width: 300 }}>
          Designation : {users.designation}
        </Text>
        <Text style={{ fontSize: 12, color: "#3b82f6" }}>
          ID No : {users.employeeId}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#3B82F6",
          width: "100%",
          marginTop: 15,
        }}
      />

      {/* Content Section */}
      <View style={styles.container}>
        {/* Left Section */}
        <View style={styles.leftSection} />

        {/* Vertical Line */}
        <View style={styles.verticalLine} />

        {/* Right Section with Background Image */}
        <View style={styles.rightSection}>
          {/* Background Image */}
          <Image
            src="/1630629403471-removebg-preview.png"
            style={styles.backgroundImage}
          />

          {/* Medicine List */}
          <View style={styles.content}>
            {inputFields.map((input, index) => (
              <Text key={index} style={{ marginBottom: 12 }}>
                <Text>
                  {index + 1}. {input.mname}
                </Text>{" "}
                {"\n"}
                <Text>
                  {input.morning ? "1" : "0"} + {input.noon ? "1" : "0"} +{" "}
                  {input.night ? "1" : "0"} - {input.quantity} times
                </Text>
              </Text>
            ))}
          </View>
          {/* Footer Text */}
         
          <Text style={styles.footerText}>Bring the prescription with you to {"\n"} your next appointment</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrescriptionPDF;
