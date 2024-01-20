import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const images = [
  'https://img.freepik.com/free-vector/flat-world-health-day-background_23-2149300397.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/006/795/134/small/children-orthopedic-or-surgery-dept-hospital-or-clinic-banner-with-doctor-and-injured-little-patient-children-medicine-and-medical-insurance-concept-family-healthcare-flat-illustration-vector.jpg',
  'https://media.istockphoto.com/id/837561666/vector/people-and-healthcare.jpg?s=612x612&w=0&k=20&c=R2Ixl0XwELcC-zvI7DR1FR797bMwD3I5-rWQZ6ME54o=',
  'https://i.graphicmama.com/blog/wp-content/uploads/2021/04/13082210/free-medical-illustrations-05.png',
  'https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/11/what-is-cloud-based-healthcare.jpg',
];

const data = [
  {
    id: '1',
    image:
      'https://img.freepik.com/premium-vector/calendar-deadline-with-clock-flat-design_115464-601.jpg',
    title: 'Schedule',
  },
  {
    id: '2',
    image:
      'https://static.vecteezy.com/system/resources/previews/008/570/631/original/medical-consultation-app-for-patient-meeting-with-doctor-on-smartphone-app-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg',
    title: 'Consult History',
  },
  {
    id: '3',
    image:
      'https://img.freepik.com/free-vector/gynecology-consultation-concept-illustration_114360-3406.jpg',
    title: 'Patient Management',
  },
  {
    id: '4',
    image:
      'https://png.pngtree.com/png-clipart/20230809/original/pngtree-virtual-doctor-talking-with-female-patient-medicine-health-medical-vector-png-image_10204374.png',
    title: 'Free Consults',
  },
];



function DocHome() {
  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={{uri: item}} style={styles.sliderImage} />
    </View>
  );

  const renderGridItem = ({item}) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image source={{uri: item.image}} style={styles.gridItemImage} />
      <Text style={styles.gridItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.dhcontainer}>
        {/* show the bio details of a doctor with an image */}

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Dr. Rohit Gupta</Text>
            <Text style={styles.profileSpecialization}>Cardiovascular</Text>
            <Text style={styles.profileDescription}>
            Goregaon, Mumbai, Maharashtra, India
            </Text>
          </View>
        </View>

        {/* search bar */}
        <View style={styles.searchBar}>
          <AntDesign
            name="search1"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
        </View>

        {/* Image Slider */}
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        {/* Grid Layout */}
        <Text style={styles.tasksText}>Tasks for Today</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderGridItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.gridContainer}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dhcontainer: {
    padding: 10,
    backgroundColor: '#247158',
  },

  slide: {
    width: 360,
    height: 200, // Set the width as needed
    marginRight: 10, // Adjust spacing between images
    borderRadius: 8,
    overflow: 'hidden', // Ensure borderRadius works
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  tasksText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },

  
  gridContainer: {
    padding: 10,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  gridItemTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bolder',
    marginTop: 8,
    color: '#FFF',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },


  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#247158',
  },
  profileSpecialization: {
    fontSize: 16,
    color: '#716F6F',
    marginTop: -2,
  },
  profileDescription: {
    fontSize: 14,
    color: '#2E9171',
    marginTop: -2,
    marginBottom: 5,
  },


  scrollView: {
    flex: 1,
  },

});

export default DocHome;
