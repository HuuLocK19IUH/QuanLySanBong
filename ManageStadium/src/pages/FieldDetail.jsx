import { useState } from "react";
import RuleTab from "../components/RuleTab";
import ReviewTab from "../components/ReviewTab";

function FieldDetail(){

const [activeTab,setActiveTab] = useState("rule");

return(

<div>

<div className="tab-bar">

<button onClick={()=>setActiveTab("info")}>
Thông tin & hình ảnh
</button>

<button onClick={()=>setActiveTab("service")}>
Dịch vụ
</button>

<button onClick={()=>setActiveTab("rule")}>
Điều khoản & quy định
</button>

<button onClick={()=>setActiveTab("review")}>
Đánh giá
</button>

</div>

<div>

{activeTab==="rule" && <RuleTab/>}

{activeTab==="review" && <ReviewTab/>}

</div>

</div>

)

}

export default FieldDetail;