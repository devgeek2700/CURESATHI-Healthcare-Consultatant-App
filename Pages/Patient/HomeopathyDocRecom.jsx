import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AllopathyDocData from '../../Data/AllopathyDocData';
import {useNavigation} from '@react-navigation/native';

function HomeopathyDocRecom() {
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(AllopathyDocData);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const priceRanges = [
    { title: '100 - 300', range: [100, 300] },
    { title: '400 - 600', range: [300, 600] },
    { title: '700 - 900', range: [600, 900] },
    { title: '1000 - 1200', range: [900, 1200] },
    { title: '1300 above', range: [1200, Infinity] },
  ];

  const renderPriceFilterButtons = () => (
    <View style={styles.priceFilterContainer}>
      {priceRanges.map(({ title, range }) => (
        <TouchableOpacity
          key={title}
          style={[
            styles.priceFilterButton,
            selectedPriceRange === range && styles.selectedPriceFilter,
          ]}
          onPress={() => handlePriceRangeSelection(range)}
        >
          <Text style={styles.priceFilterButtonText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePriceRangeSelection = (range) => {
    setSelectedPriceRange(range);

    // Filter the list based on the selected price range
    const filtered = AllopathyDocData.filter(
      (item) =>
        item.Price >= range[0] && item.Price <= range[1]
    );
    setFilteredData(filtered);
  };


  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.doctorCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('BookAppointment', {doctorId: item.Doctor_ID})
      }>
      <Image source={{uri: item.imagePath}} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.Doctor}</Text>
        <Text style={styles.price}>{`Price: $ ${item.Price}`}</Text>
        <Text style={styles.doctorDetails}>{item.Specialty}</Text>
        <Text style={styles.doctorDetails}>{item.Location}</Text>
        <Text style={styles.doctorDetails}>{item.Experience}</Text>
        <View style={styles.ratingsAvailabilityContainer}>
          <Text style={styles.ratings}>{`Ratings: ${item.Ratings}`}</Text>
          <Text
            style={
              styles.availability
            }>{`Availability: ${item.Availability}`}</Text>
        </View>
      </View>
      <Button
        title="Book Now"
        onPress={() =>
          navigation.navigate('PatToDocAppoint', {doctorData: item})
        }
        color="#4CAF50"
        style={styles.bookNowButton}
      />
    </TouchableOpacity>
  );

  const renderCategoryItem = (title, imagePath, bgColor, specialty) => (
    <TouchableOpacity
      style={[styles.categoryBox, {backgroundColor: bgColor}]}
      onPress={() => handleCategorySelection(specialty)}>
      <Image source={{uri: imagePath}} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );

  // Function to handle search
  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = AllopathyDocData.filter(
      item =>
        item.Doctor && item.Doctor.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  // Function to handle category selection
  const handleCategorySelection = selectedSpecialty => {
    if (selectedSpecialty === 'ALL') {
      setFilteredData(AllopathyDocData);
    } else {
      const filtered = AllopathyDocData.filter(
        item =>
          item.Specialty &&
          item.Specialty.toLowerCase() === selectedSpecialty.toLowerCase(),
      );
      setFilteredData(filtered);
    }
  };

  // Function to scroll to the top of the page
  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({y: 0, animated: true});
  };

  const scrollViewRef = useRef();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{minHeight: '100%', flex: 1}}
      onScroll={event => {
        const scrollY = event.nativeEvent.contentOffset.y;
        // Show or hide the button based on the scroll position
        setShowScrollToTop(scrollY > 100);
      }}
      ref={scrollViewRef}>
      <View style={styles.container}>
        {/* Search bar */}
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
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Categories */}
        <Text style={styles.tasksText}>Select Category</Text>
        <View style={styles.categoryContainer}>
          {renderCategoryItem(
            'ALL',
            'https://cdn-icons-png.flaticon.com/512/4465/4465239.png',
            '#fff',
            'ALL',
          )}
          {renderCategoryItem(
            'Respiratory',
            'https://cdn-icons-png.flaticon.com/512/9286/9286163.png',
            '#F0E68C',
            'Respiratory',
          )}
          {renderCategoryItem(
            'General Practitioner',
            'https://cdn-icons-png.flaticon.com/512/2869/2869816.png',
            '#ADD8E6',
            'General Practitioner',
          )}
          {renderCategoryItem(
            'Cardiovascular',
            'https://cdn2.iconfinder.com/data/icons/medical-butterscotch-vol-2/512/Heart-512.png',
            '#FA8072',
            'Cardiovascular',
          )}
        </View>

          
        {/* Price Filter Buttons */}
        <Text style={styles.tasksText}>Filter by Price</Text>
        {renderPriceFilterButtons()}


        {/* Doctor list Categories */}
        <Text style={styles.tasksTextRecommDoc}>Recommended Doctors</Text>
        <View style={styles.categoryContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.Doctor_ID.toString()}
            renderItem={renderItem}
            numColumns={numColumns}
            key={numColumns}
          />
        </View>

        {/* Floating button */}
        {showScrollToTop && (
          <TouchableOpacity
            style={styles.scrollToTopButton}
            onPress={handleScrollToTop}>
            <AntDesign name="upcircleo" size={30} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#247158',
  },
  container: {
    padding: 20,
  },

  //   searchBar

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
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  categoryBox: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    width: 80,
    height: 130,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  // Doctor card list
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  doctorInfo: {
    marginLeft: 15,
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  ratingsAvailabilityContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  ratings: {
    fontSize: 12,
    color: '#3498db',
    marginRight: 10,
  },
  availability: {
    fontSize: 12,
    color: '#27ae60',
  },
  bookNowButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //    {/* text line  */}

  tasksText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  //    {/* text line recom doc  */}

  tasksTextRecommDoc: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 5,
  },

  // Scroll to top button styles
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    borderRadius: 50,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  price: {
    fontSize: 18,
    margin: 2,
    color: '#333',
    marginTop: 2,
  },
  
  // Price filter styles
  priceFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  priceFilterButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: '#fff', // Light blue background
    width: '18%', // Adjust the width for 5 buttons in one line
  },
  selectedPriceFilter: {
    backgroundColor: '#3498db',
  },
  priceFilterButtonText: {
    color: '#000', // Black text
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeopathyDocRecom;
