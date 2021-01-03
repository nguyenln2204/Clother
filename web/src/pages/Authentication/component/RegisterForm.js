import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { register } from "../../../redux/actions/accountAction";
import "../style.scss";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(register(payload));
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
        name="email"
        rules={[
          {
            type: 'email',
            message: "Invalid email!",
          },
          {
            required: true,
            message: 'Please input your email!'
          }
        ]}
      >
        <Input className="input" />
      </Form.Item>

      <Form.Item
        className="formItem"
        label="Password"
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

      <Form.Item
        className="formItem"
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
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
          <Checkbox className="checkbox_item">Remember me</Checkbox>
        </Form.Item>
      </div>

      <div className="bottomContainer">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            REGISTER
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
