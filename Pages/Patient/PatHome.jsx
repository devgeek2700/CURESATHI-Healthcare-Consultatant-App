import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import Chatbot from './Chatbot';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = [
  'https://img.freepik.com/free-vector/flat-world-health-day-background_23-2149300397.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/006/795/134/small/children-orthopedic-or-surgery-dept-hospital-or-clinic-banner-with-doctor-and-injured-little-patient-children-medicine-and-medical-insurance-concept-family-healthcare-flat-illustration-vector.jpg',
  'https://media.istockphoto.com/id/837561666/vector/people-and-healthcare.jpg?s=612x612&w=0&k=20&c=R2Ixl0XwELcC-zvI7DR1FR797bMwD3I5-rWQZ6ME54o=',
  'https://i.graphicmama.com/blog/wp-content/uploads/2021/04/13082210/free-medical-illustrations-05.png',
  'https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/11/what-is-cloud-based-healthcare.jpg',
];

const categories = [
  {
    title: 'Ayurveda',
    image:
      'https://img.freepik.com/premium-vector/modern-medical-health-care-center-ayurvedic-logo-design-vector-illustration_898869-79.jpg', // Add the actual image URL
  },
  {
    title: 'Homeopathy',
    image:
      'https://thumbs.dreamstime.com/b/homeopathic-medicine-green-background-homeopathic-pills-alternative-medicine-homeopathic-medicine-green-background-136689244.jpg', // Add the actual image URL
  },
  {
    title: 'Allopathy',
    image:
      'https://cdn.shopify.com/s/files/1/0276/3112/4591/files/medicine_480x480.jpg?v=1623953735', // Add the actual image URL
  },
];

function PatHome() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        let dataToDisplay;

        if (storedUserData) {
          // If user is logged in, fetch user data
          dataToDisplay = JSON.parse(storedUserData);
          console.log('Data retrieved from AsyncStorage:', dataToDisplay);
        } else {
          // If user is not logged in, fetch dummy data
          const storedDummyData = await AsyncStorage.getItem('dummyData');
          if (storedDummyData) {
            dataToDisplay = JSON.parse(storedDummyData)[0]; // Choose any user from dummy data
            console.log(
              'Dummy data retrieved from AsyncStorage:',
              dataToDisplay,
            );
          }
        }

        if (dataToDisplay) {
          setUserData(dataToDisplay);
        } else {
          console.log('No data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={{uri: item}} style={styles.sliderImage} />
    </View>
  );

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryBox}
      onPress={() => navigateToCategoryPage(item.title)}>
      <Image source={{uri: item.image}} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const navigateToCategoryPage = categoryTitle => {
    let pageName;

    // Determine the page based on the category title
    switch (categoryTitle) {
      case 'Ayurveda':
        pageName = 'AyurvedaDocRecom';
        break;
      case 'Homeopathy':
        pageName = 'HomeopathyDocRecom';
        break;
      case 'Allopathy':
        pageName = 'AllopathyDocRecom';
        break;
      default:
        // Handle other categories if needed
        break;
    }

    // Navigate to the determined page
    if (pageName) {
      navigation.navigate(pageName, {category: categoryTitle});
    }
  };

  const aboutUsText = `Welcome to Our Health Hub! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan accumsan facilisis. Phasellus vel tristique arcu. Proin ultrices, sapien a vehicula aliquam, diam ligula tincidunt tellus, sit amet accumsan nisl turpis vel nisl.`;

  const reviewsData = [
    {
      id: '1',
      user: 'John Doe',
      review:
        'Excellent service! The app is user-friendly, and the doctors are highly professional.',
    },
    {
      id: '2',
      user: 'Jane Smith',
      review:
        'I had a great experience. The consultation was thorough, and the doctor was attentive to my concerns.',
    },
  ];

  const renderReviewItem = ({item}) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewUser}>{item.user}</Text>
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.phcontainer}>
        {/* Patient profile display */}

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri:
                userData?.userimage || 'https://example.com/default-image.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            {/* Display the retrieved user data */}
            <Text style={styles.profileName}>{`Hello, ${
              userData?.name || 'Guest'
            }`}</Text>
            <Text style={styles.profileSpecialization}>{`Age: ${
              userData?.age || 'N/A'
            }`}</Text>
            <Text style={styles.profileDescription}>{`Location: ${
              userData?.location || 'N/A'
            }`}</Text>
          </View>
        </View>

        {/* Image Slider */}

        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        {/* Category Section */}
        <Text style={styles.tasksText}>Category</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={renderCategoryItem}
        />

        {/* About Us Section */}
        <Text style={styles.tasksText}>About Us</Text>
        <Text style={styles.aboutUsText}>{aboutUsText}</Text>

        {/* Navigation Boxes */}
        <Text style={styles.tasksText}>What You Want?</Text>

        <TouchableOpacity
          style={[styles.navigationBox, {backgroundColor: '#FF6347'}]}
          onPress={() => navigation.navigate('YourDisease')}>
          <Text style={styles.navigationText}>Your Disease</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navigationBox, {backgroundColor: '#6495ED'}]}
          onPress={() => navigation.navigate('ConsultDoctor')}>
          <Text style={styles.navigationText}>Ask to Chatbot</Text>
        </TouchableOpacity>

        <View style={{flex: 1}}>
          {/* Other components */}
          <Chatbot />
        </View>

        {/* Reviews Section */}
        <Text style={styles.tasksText}>Reviews</Text>
        <FlatList
          data={reviewsData}
          keyExtractor={item => item.id}
          renderItem={renderReviewItem}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  phcontainer: {
    padding: 10,
    backgroundColor: '#247158',
  },

  // {/* Patient profile display */}

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
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

  //    {/* Image Slider section */}

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

  //    {/* Navigation Boxes  */}

  navigationBox: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#247158',
  },

  //    {/* text line  */}

  tasksText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },

  // {/* Category Section */}

  categoryTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  categoryBox: {
    marginRight: 10,
  },
  categoryImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },

  //  {/* About Us Section */}

  aboutUsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },

  // {/* Reviews Section */}

  reviewItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#247158',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    color: '#716F6F',
  },
});

export default PatHome;
