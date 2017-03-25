var React = require('react');
var Trend = require('react-trend').default;
var PropTypes = React.PropTypes;
var cn=require("classnames");
var css=require("./temperature_card.scss");

function TemperatureUICard(props){
  // console.log(props)
  // let url="./assets/"+props.background
  // console.log(url)
  // let img=require(url)
  // console.log(img)
  let background={
    "backgroundImage":'url("assets/'+props.background+'")'
  }
  return (
    <div onClick={props.onClick} className={css.weather} style={background}>
      <div className={cn(css.main, (props.title=="Indoor" ? css.indoor : ""))}>
        <div className={css.temperature}>
          <div className={css.title}>{props.title}</div>
          <div className={css.temp}>
            <div className={css.temp_value}>{props.temperature}°</div>
            <div className={css.temp_description}>{props.description}</div>
          </div>
        </div>
        {props.open &&
        <Trend
          smooth
          autoDraw
          autoDrawDuration={1500}
          autoDrawEasing="ease-out"
          data={props.data}
          gradient={['white', '#ddd']}
          radius={10}
          strokeWidth={3}
          strokeLinecap={'round'}
          />
        }
      </div>

    </div>
  )
}

TemperatureUICard.propTypes={
  background:PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  temperature:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  open:PropTypes.bool.isRequired,
  onClick:PropTypes.func,
}

module.exports=TemperatureUICard;
