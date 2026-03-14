import RatingBar from "./RatingBar";
import ReviewCard from "./ReviewCard";

function ReviewTab(){

return(

<div style={{
padding:"25px",
background:"#f5f5f5"
}}>

<RatingBar/>

<ReviewCard/>

<ReviewCard/>

<ReviewCard/>

</div>

)

}

export default ReviewTab;