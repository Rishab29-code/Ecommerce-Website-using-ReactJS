import { useEffect, useState } from "react";
import { getAllProducts,getProductByCategoryId,getaddcart } from "../../API";
import { List,Card,Image, Typography, Badge,Rate, Button, message, Spin, Select, Space } from "antd";
import { useParams } from "react-router-dom";


function Products(){
    const [loading,setloading]=useState(false);
    const [sortinfo,setsortinfo]=useState('az');
    const param=useParams();
    const [items,setitems]=useState([]);
    useEffect(()=>{
        setloading(true);
        (param?.categoryId?getProductByCategoryId(param.categoryId):getAllProducts())
        .then((res)=>{
            setitems(res.products)
            setloading(false);
        })

    },[param])
    const  getSortedItems=()=>{
        const sortedItems=[...items]
        sortedItems.sort((a,b)=>{
            const alow=a.title.toLowerCase();
            const blow=b.title.toLowerCase();
            if(sortinfo==='az'){
                return alow>blow?1:alow===blow?0:-1

            }
            else if(sortinfo==='za'){
                return alow<blow?1:alow===blow?0:-1
            }
            else if(sortinfo==='lh'){
                return a.price>b.price?1:a.price===b.price?0:-1
            }
            else if(sortinfo==='hl'){
                return a.price<b.price?1:a.price===b.price?0:-1
            }
        })
        return sortedItems;
    }
    
  return <div>
    <div className="filterClass">
        <Space direction="horizontal">
        <Typography.Text>Filter items based on:</Typography.Text>
        <Select 
        onChange={(value)=>{setsortinfo(value)}}
        defaultValue={'az'}
        options={[{
            label:"Alphabetically a-z",
            value:'az',
        },
        {
            label:"Alphabetically z-a",
            value:'za',
        },
        {
            label:"Price Low to High ",
            value:"lh",
        },
        {
            label:"Price High to Low",
            value:'hl',
        }]}
        ></Select>
        </Space>
    </div>
    <List 
    loading={loading}
    grid={{column:3}}
    renderItem={(product,index)=>{
        return (
            <Badge.Ribbon  className="itemBadge" text={`${product.discountPercentage}% OFF`} color="pink">
            <Card
            className="itemCard"
            title={product.title}
            key={index}
            cover={<Image className="itemCardImage" src={product.thumbnail}/> }
            actions={[ 
                <Rate allowHalf disabled value={product.rating} />,
                <AddtoCartButton item={product}/>
            ]}
            >
                <Card.Meta
                title={<Typography.Paragraph>
                    Price:${product.price}{" "}
                    <Typography.Text delete type="danger">${parseFloat(product.price+(product.price*product.discountPercentage)/100).toFixed(2)}</Typography.Text>
                </Typography.Paragraph>}
                description={<Typography.Paragraph ellipsis={{rows:2, expandable:true, symbol:'more'}} >{product.description}</Typography.Paragraph>}
                ></Card.Meta>
            </Card>
            </Badge.Ribbon>
        )
    }}
    dataSource={getSortedItems()}
    >
    </List>
  </div>
  }
function AddtoCartButton({item}){
    const [loading,setloading]=useState(false);
    const onaddcart=()=>{
        setloading(true);
        getaddcart(item.id).then(res=>{
            message.success(`${item.title} has been added to the cart`)
            setloading(false);
        })

    }
    return (<div><Button loading={loading} onClick={onaddcart}>Add to cart</Button></div>)
}
export default Products;