export default function Ratings(props) {
    //expects props with props.ratings = amount of ratings

    let stars = ''
    let count = 0
    let missingStars = ''
    let missingStarCount = 5
    const fractionStar = ''
    let percent
    let fractionStarStyle = ''
    
    // function to calculate full stars, partial stars, and missing stars
    if (props.ratings) {
        let starCount = props.ratings/10
        for (let i = 1; i < starCount; i++) {
            // for each rating point out of 5, add a star, keep track of the point (to work out the fraction) and add a missing star count
            stars += '★'
            count += 1
            missingStarCount -= 1
        }
        // for each missing star point render a missing star
        for (let j = 1; j < missingStarCount; j++) {
            missingStars += '★'
        }
        // work out the fraction and fill the star fractionally 
        percent = (starCount - count) * 100
        console.log(percent)
        fractionStarStyle = `linear-gradient(90deg, #fc0 ${percent}%, #fff ${percent}%)`;
    }

    return (
        <div className="RatingsContainer">
            <span className="RatingStar RatingStarFull">{stars}</span><span className="RatingStarFraction" style={{background: fractionStarStyle, backgroundClip: 'unset', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{fractionStar}</span><span className="RatingStarEmpty">{missingStars}</span>
        </div>
    )
}