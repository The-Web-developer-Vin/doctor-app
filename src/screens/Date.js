import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

const Date = ({ date, onSelectDate, selected }) => {
  const disable =
    moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? true
      : false;

  const day =
    moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? "Today"
      : moment(date).format("ddd");
  const dayNumber = moment(date).format("D");
  const fullDate = moment(date).format("YYYY-MM-DD");
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        selected === fullDate && { backgroundColor: "#4ce4b1" },
        { opacity: disable ? 0.4 : 1 }
      ]}
    >
      <Text style={[styles.big, selected === fullDate && { color: "#fff" }]}>
        {day}
      </Text>

      <Text
        style={[
          styles.medium,
          selected === fullDate && {
            color: "#fff",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 24,
          },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderColor: "#ddd",
    padding: 18,
    alignItems: "center",
    height: 84,
    width: 85,
    marginRight: 10,
    lineHeight: 85,
  },
  big: {
    color: "#9fabc3",
    fontSize: 14,
    marginBottom: 0,
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
    marginBottom: -7,
  },
  medium: {
    color: "#00053f",
    fontSize: 24,
    marginBottom: 0,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
});
