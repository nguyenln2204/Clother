import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => {
  console.log("prop", property);
  return (props) => mapping[props[property]];
};

const styles = {
  root: {
    backgroundColor: styledBy("color", {
      white: "white",
      blue: "blue",
      red: "red",
      yellow: "yellow",
      black: "black",
    }),
    borderRadius: 3,
    borderWidth: "thin",
    borderColor: styledBy("color", {
      white: "black",
      blue: "blue",
      red: "red",
      yellow: "yellow",
      black: "black",
    }),
    height: 30,
    minWidth: 30,
    marginRight: 13,
    transition: "all 0.3s ease",
    "&:hover": {
      height: 35,
      minWidth: 35,
      backgroundColor: styledBy("color", {
        white: "white",
        blue: "blue",
        red: "red",
        yellow: "yellow",
        black: "black",
      }),
    },
  },
  rootContainer: {
    height: 50,
    display: "flex",
    alignItems: "center",
  },
};

const ColorButton = withStyles(styles)(({ classes, color, ...other }) => {
  return <Button className={classes.root} {...other} />;
});

function ColorGroupButton(props) {
  const { colorOptions } = props;
  return (
    <div style={styles.rootContainer}>
      {colorOptions.map((item, index) => {
        return (
          <ColorButton
            key={`color-button-${index}`}
            disabled={item.disabled}
            color={item.color}
          />
        );
      })}
    </div>
  );
}

export default ColorGroupButton;
