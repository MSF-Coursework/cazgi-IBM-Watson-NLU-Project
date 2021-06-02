import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let emotionJSON = JSON.parse(this.props.emotions);
        //console.log(typeof(emotionJSON));
        //console.log(emotionJSON);

        let listOfEmotions = emotionJSON;
        let listOfEmotionsAsArray = Object.entries(listOfEmotions);

        //console.log("1: ", listOfEmotions);
        //console.log("2: ", listOfEmotionsAsArray);

        let emotionDetails = listOfEmotionsAsArray.map((emotionDetial)=>{
          let emotionListCollection = Object.entries(emotionDetial);
          //console.log("3: ", emotionDetial, emotionListCollection);
          return <tr><td>{emotionDetial[0]}</td><td>{emotionDetial[1]}</td></tr>
        });
    

        //console.log(emotionDetails);

      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/* JSON.stringify(this.props.emotions) */}
          <table className="table table-bordered">
            <tbody>
            {
                emotionDetails
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
