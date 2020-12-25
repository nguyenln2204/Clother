import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    "& .MuiInputBase-input": {
      padding: 8,
      fontSize: 20,
      fontWeight: 600,
      textAlign: "center",
      width: 100,
      fontFamily: "'Montserrat', sans-serif !important",
    },
  },
}));

export default function InputAmountGroup(props) {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const { handleInputChange, inStock } = props;
  const handleMinusClick = () => {
    handleInputChange(value - 1);
    setValue(value - 1);
  };

  const handleAddClick = () => {
    handleInputChange(value + 1);
    setValue(value + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="minus"
        disabled={value > 1 ? false : true}
        onClick={handleMinusClick}
      >
        <MinusOutlined />
      </IconButton>
      <TextField
        className={classes.input}
        id="outlined-basic"
        type="number"
        variant="outlined"
        value={value}
      />
      <IconButton
        aria-label="add"
        disabled={value < inStock ? false : true}
        onClick={handleAddClick}
      >
        <PlusOutlined />
      </IconButton>
    </div>
  );
}
