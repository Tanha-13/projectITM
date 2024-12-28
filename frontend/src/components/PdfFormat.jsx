import universityLogo from "../assets/img/diu.png";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginVertical: 15,
  },
  uniLogo: {
    alignSelf: "center",
    marginBottom: 20,
    width: "100px",
    height: "100px",
  },
  projectTitle: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
  },
  projectText: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
  },
});

function PdfFormat({ project }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={styles.title}
          >{`${project.title} - ${project.name}`}</Text>
          <Image style={styles.uniLogo} src={universityLogo} />
          <Text style={styles.text}>Submitted by</Text>
          <Text
            style={styles.subtitle}
          >{`${project?.student?.user?.firstName} ${project?.student?.user?.lastName}`}</Text>
          <Text
            style={styles.text}
          >{`ID: ${project?.student?.studentId}`}</Text>
          <Text style={styles.subtitle}>
            Department of Information Technology & Management
          </Text>
          <Text style={styles.subtitle}>
            Faculty of Science and Information Technology
          </Text>
          <br />
          <Text style={styles.text}>Submitted to</Text>
          <Text
            style={styles.subtitle}
          >{`${project?.supervisor?.user?.firstName} ${project?.supervisor?.user?.lastName}`}</Text>
          <Text
            style={styles.subtitle}
          >{`${project?.supervisor?.designation}`}</Text>
          <Text style={styles.subtitle}>
            Department of Information Technology & Management
          </Text>
          <Text style={styles.subtitle}>
            Faculty of Science and Information Technology
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Project Details</Text>
          <br />
          <Text style={styles.projectText}>
            Project Type: {project.projectType}
          </Text>
          <Text style={styles.projectText}>Status: {project.status}</Text>
          <Text style={styles.projectText}>
            Start Date: {new Date(project.startDate).toLocaleDateString()}
          </Text>
          <Text style={styles.projectText}>
            End Date: {new Date(project.endDate).toLocaleDateString()}
          </Text>

          <Text style={styles.projectTitle}>Project Overview</Text>
          <Text style={styles.projectText}>{project.overview}</Text>

          <Text style={styles.projectTitle}>Functional Requirements</Text>
          <Text style={styles.projectText}>
            {project.functionalRequirements}
          </Text>

          <Text style={styles.projectTitle}>Non-Functional Requirements</Text>
          <Text style={styles.projectText}>
            {project.nonFunctionalRequirements}
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {project.useCaseDiagram && (
            <View>
              <Text style={styles.projectTitle}>Use Case Diagram</Text>
              <Image
                style={styles.image}
                src={
                  project.useCaseDiagram.preview || project.useCaseDiagram.path
                }
              />
            </View>
          )}
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {project.entityRelationDiagram && (
            <View>
              <Text style={styles.projectTitle}>Entity Relation Diagram</Text>
              <Image
                style={styles.image}
                src={
                  project.entityRelationDiagram.preview ||
                  project.entityRelationDiagram.path
                }
              />
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

export default PdfFormat;

PdfFormat.propTypes = {
  project: PropTypes.obj,
};
