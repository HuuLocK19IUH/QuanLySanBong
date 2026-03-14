import "../styles/FilterSportFieldbtn.css"
function FilterSportFieldbtn({ icon, text }) {
    return (
        <button className="sport-filter-btn">
            <img src={icon} alt="" />
            {text}
        </button>
    )
}

export default FilterSportFieldbtn;