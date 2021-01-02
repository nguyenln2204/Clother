const optionsWithDisabled = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L", disabled: true },
];

const colorOptions = [
  {
    label: "white",
    color: "white",
    disabled: false,
  },
  {
    label: "black",
    color: "black",
    disabled: false,
  },
  {
    label: "yellow",
    color: "yellow",
    disabled: false,
  },
  {
    label: "blue",
    color: "blue",
    disabled: true,
  },
];

const dummyProduct = {
  name: "SCORPION T-SHIRT",
  sku: "FOM0030",
  price: 600000,
  sizes: optionsWithDisabled,
  colors: colorOptions,
  inStock: 10,
  size: "M",
  color: "black",
  amount: 2,
  image:
    "https://product.hstatic.net/200000075347/product/img_7046-scaled_46a6acadafa8431f962b07a3b30da793_master.jpg",
  description: `<p> - Chất liệu 100% cotton 4 chiều nhập khẩu từ Hàn 
    <br/>- Họa tiết được in trực tiếp lên sản phẩm và có độ bền lâu 
    <br/>- Form áo Oversize <br/>- Thông tin thêm: 
    </br> Để bảo quản áo cũng như chất liệu hình in, chúng tôi khuyên bạn lộn mặt trái khi giặt và ủi. 
    <br/> Khuyến khích dùng phương pháp giặt hấp </p>`,
};

export default dummyProduct;
