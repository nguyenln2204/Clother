import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { logIn } from "../../../redux/actions/accountAction";

// const layout = {
//   labelCol: {
//     span: 0,
//   },
//   wrapperCol: {
//     span: 10,
//     flex: "flex-end",
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     flex: 2,

//     // offset: 4,
//     // span: 16,
//   },
// };

export default function LoginForm() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(logIn(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      // {...layout}
      style={{ width: "80%" }}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input style={classes.input} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password style={classes.input} />
      </Form.Item>

      <div style={classes.bottomContainer}>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </div>
      <div style={classes.bottomContainer}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

const classes = {
  input: {
    float: "right",
    width: 310,
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "center",
  },
};
