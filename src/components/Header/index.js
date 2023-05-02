import {Menu, Typography,Badge, Drawer, Table, Button, InputNumber, Form, Input, Checkbox, message} from "antd";
import {HomeFilled,ShoppingCartOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCart } from "../../API";

function AppHeader(){
    const navigate=useNavigate();
    const onClickMenu=(item)=>{
        navigate(`/${item.key}`)
   }
    return <div className="appHeader">
        <Menu className="menuClass"
        onClick={onClickMenu}
        mode="horizontal"s
        items={[{
            label:<HomeFilled/>,
            key:""
        },
        {
            label:"Men",
            key:"men",
            children:[{
                label:"Men Shirts",
                key:"mens-shirts"
            },
            {
                label:"Men Shoes",
                key:"mens-shoes"
            },
            {
                label:"Men Watches",
                key:"mens-watches"
            },
        ],
        },
        {
            label:"Women",
            key:"women",
            children:[
            {
                label:"Women's Dresses",
                key:"womens-dresses"
            },
            {
                label:"Women's Shoes",
                key:"womens-shoes"
            },
            {
                label:"Women's Watches",
                key:"womens-watches"
            },
            {
                label:"Women's bags",
                key:"womens-bags"
            },
         ],
        },
        {
            label:"Fragnances",
            key:"fragnances"
        }
        ]}>
       </Menu>
       <Typography.Title >MyOnlineStore</Typography.Title>
       <CartDesign/>

    </div>

}
function CartDesign(){
    const [openDrawer,setopenDrawer]=useState(false);
    const [checkoutDrawer,setcheckoutDrawer]=useState(false);
    const [cartdata,setcartdata]=useState([]);
    useEffect(()=>{
        getSingleCart().then(res=>{setcartdata(res.products)}
        )

    },[])

    const onConfirmOrder=(values)=>{
        console.log(values);
        setcheckoutDrawer(false);
        setopenDrawer(false);
        message.success('Your order has been placed successfully')
    }

    return <div>
        <Badge onClick={()=>{
            setopenDrawer(true)
        }}
         count={cartdata.length} className="shopIcon"><ShoppingCartOutlined /></Badge>
        <Drawer open={openDrawer} 
        onClose={()=>{setopenDrawer(false)}}
        title="Your Cart"
        contentWrapperStyle={{width:500}}
        
        >
        
        <Table columns={[
            {
            title:"title",
            dataIndex:"title"
        },
        {
            title:"Price",
            dataIndex:"price",
            render:(value)=>{
                return <span>${value}</span>
            }
        },
        {
            title:"Quantity",
            dataIndex:"quantity",
            render:(value,record)=>{
                return (
                <InputNumber 
                min={0}
                defaultValue={value} 
                onChange={(value)=>{
                setcartdata((pre)=>
                    pre.map((cart)=>{
                        if(record.id === cart.id){
                            cart.total=cart.price*value;
                        }
                      return cart;
                    })
                );
                }}
                ></InputNumber>)
            },
        },
        {
            title:"Total",
            dataIndex:"total",
            render:(value)=>{
                return <span>${value}</span>
            }
        }
    ]} 
    dataSource={cartdata}
    pagination={false}
    summary={(data)=>{
        const total=data.reduce((pre,curr)=>{
            return pre+curr.total;
        },0)
        return <span>Total:{total}</span>
    }}
    ></Table>
    <Button onClick={()=>{setcheckoutDrawer(true)}} type="primary">Checkout Your Cart</Button>
    
  </Drawer>
  <Drawer
    open={checkoutDrawer}
    onClose={()=>{setcheckoutDrawer(false)}}
    title="Confirm your Order">
        <Form onFinish={onConfirmOrder}>
            <Form.Item
            rules={[{
                required:true,
                message:'Please enter your name'
            }]} label="Full name" name="your_name">
                <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item 
            rules={[{
                required:true,
                message:'Please enter email'
            }]} label="Email" name="your_email">
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item 
            rules={[{
                required:true,
                message:'Please enter your address'
            }]} label="Address" name="your_address">
                <Input placeholder="Enter your address" />
            </Form.Item>
            <Form.Item>
                <Checkbox defaultChecked disabled  >Cash on Delivery</Checkbox>
            </Form.Item>
            <Typography.Text type="secondary">More payment methods coming soon</Typography.Text>
            <Button type="primary" htmlType="submit">Confirm order</Button>
        </Form>


    </Drawer>
    </div>
}
export default AppHeader;