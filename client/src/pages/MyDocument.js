
// import React from 'react';
// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

// const MyDoc = () => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Section #1</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>Section #2</Text>
//             </View>
//         </Page>
//     </Document>
// );


// function MypdfGenerator() {
//     return (
//         <div className="App">
//             <PDFDownloadLink document={<MyDoc />} fileName="clearenceForm.pdf">
//                 {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
//             </PDFDownloadLink>
//         </div>
//     );
// }

// export default MypdfGenerator;



import ReactPDF, { Document, Page } from '@react-pdf/renderer';
import MyComponentWrapper from './componentWrapper';

const handleGeneratePDF = () => {
    ReactPDF.render(
        <Document>
            <Page>
                <MyComponentWrapper prop1="Value 1" prop2="Value 2" />
            </Page>
        </Document>,
        'output.pdf'
    );

    console.log('PDF generated successfully.');
};

export default handleGeneratePDF;