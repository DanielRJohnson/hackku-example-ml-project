import { useEffect, useState } from 'react'
import './App.css'
import { Slider } from '@mui/material';

function App() {

  const [sliderValues, setSliderValues] = useState([2.360918, 7.611178, 68.880831, 51.539116, 4.447461, 4.509930]);

  const handleSliderChange = (index: number) => (_: any, newValue: number) => {
    const newValues = [...sliderValues];
    newValues[index] = newValue;
    setSliderValues(newValues);
  };

  const [rainResult, setRainResult] = useState("");

  const handleApiRequest = async () => {
    try {
      const response = await fetch("/api/rain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sliderValues),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Got data!", data)
        setRainResult(data);
      } else {
        console.log("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  useEffect(() => {
    handleApiRequest();
  }, [sliderValues]);

  return (
    <>
      <h2>I am not a web developer :)</h2>


      Rainfall: <Slider value={sliderValues[0]} onChange={handleSliderChange(0)} min={0} max={371} valueLabelDisplay="auto"/>
      Sunshine: <Slider value={sliderValues[1]} onChange={handleSliderChange(1)} min={0} max={14.5} valueLabelDisplay="auto"/>
      Humidity9am: <Slider value={sliderValues[2]} onChange={handleSliderChange(2)} min={0} max={100} valueLabelDisplay="auto"/>
      Humidity3pm: <Slider value={sliderValues[3]} onChange={handleSliderChange(3)} min={0} max={100} valueLabelDisplay="auto"/>
      Cloud9am: <Slider value={sliderValues[4]} onChange={handleSliderChange(4)} min={0} max={9} valueLabelDisplay="auto"/>
      Cloud3pm: <Slider value={sliderValues[5]} onChange={handleSliderChange(5)} min={0} max={9} valueLabelDisplay="auto"/>

      <hr/>

      <h2>{rainResult[0] ? "There will be rain!" : "There will NOT be rain!"}</h2>

      <hr/>

    </>
  )
}

export default App
