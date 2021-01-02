import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => {
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
    height: styledBy("isColor", {
      false: 30,
      true: 35
    }),
    minWidth: styledBy("isColor", {
      false: 30,
      true: 35
    }),
    marginRight: 13,
    transition: "all 0.3s ease",
    "&:hover": {
      height: 35,
      minWidth: 35,
      paddingRight: 5,
      marginRight: 8,
      backgroundColor: styledBy("color", {
        white: "white",
        blue: "blue",
        red: "red",
        yellow: "yellow",
        black: "black",
      }),
    },
    boxShadow: "0px 0px 10px #aaaaaa"
  },
  rootContainer: {
    height: 50,
    display: "flex",
    alignItems: "center",
  },
};

const ColorButton = withStyles(styles)(({ classes, color, isColor, ...other }) => {
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
            isColor={props.color === item.color}
            onClick={() => {
              props.history.push(`/product/${item.productId}`);
              // props.history.go(0);
            }}
          />
        );
      })}
    </div>
  );
}

export default withRouter(ColorGroupButton);
