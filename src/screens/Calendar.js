import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";
import Date from "./Date";

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();


  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
    let year = moment().year();
    setCurrentYear(year);
  }, []);

  const getCurrentMonth = () => {
    const month = moment(dates[0])
      .add(scrollPosition / 60, "days")
      .format("MMMM");
    setCurrentMonth(month);
  };

  useEffect(() => {
    getCurrentMonth();
  }, [scrollPosition]);

  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>
          {currentMonth} {currentYear}
        </Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
            scrollEventThrottle={16}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    marginTop: 20,
  },
  title: {
    color: "#00053f",
    fontSize: 20,
    marginBottom: 0,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
    textAlign: "left",
  },
  dateSection: {
    width: "100%",
  },
  scroll: {
    height: 130,
  },
});
