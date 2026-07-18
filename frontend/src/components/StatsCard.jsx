function StatsCard({title,value,icon}){


return(

<div className="stat-card">


<span className="material-icons">

{icon}

</span>


<h3>

{title}

</h3>


<h2>

{value}

</h2>


</div>

)

}


export default StatsCard;