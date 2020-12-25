import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { logIn } from "../../../redux/actions/accountAction";
import "../style.scss";

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
      className="formContainer"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        className="formItem"
        label="Email"
        colon={false}
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input className="input" />
      </Form.Item>

      <Form.Item
        className="formItem"
        label="Password"
        colon={false}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password className="input" />
      </Form.Item>

      <div className="bottomContainer">
        <Form.Item
          className="bottomFormItem"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox className="checkbox_item">Remember Me</Checkbox>
        </Form.Item>
      </div>
      <div className="bottomContainer">
        <Form.Item style={{ marginBottom: 15 }}>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>
      </div>
      <div style={{ textAlign: "center", color: "#D76411", paddingBottom: 20 }}>
        Forgot Password?
      </div>
    </Form>
  );
}
