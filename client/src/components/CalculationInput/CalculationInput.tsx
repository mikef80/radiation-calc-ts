import { useState } from "react";
import { Button, ButtonGroup, ToggleButton, Form } from "react-bootstrap";
import { useNavigate, useNavigation } from "react-router-dom";
import { postCalculation } from "../../api/data";

export const loader = ({ request }: { request: Request }) => {
  return new URL(request.url).searchParams.get("message");
};

const CalculationInput = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [doserateRadioValue, setDoserateRadioValue] = useState("µSv/hr");
  const [distanceRadioValue, setDistanceRadioValue] = useState("metres");
  const [calcDetails, setCalcDetails] = useState({
    current_doserate: "",
    current_distance: "",
    new_operating_distance: "",
    new_doserate: "",
  });

  const doserateUnits = [
    { name: "mSv/hr", value: "mSv/hr" },
    { name: "µSv/hr", value: "µSv/hr" },
  ];
  const distanceUnits = [
    { name: "metres", value: "metres" },
    { name: "feet", value: "feet" },
  ];

  const submitCalc = async (e: any) => {
    e.preventDefault();

    const newCalc = {
      calculation_date_time: new Date(),
      calculation_type: "RDC",
      current_doserate: +calcDetails.current_doserate,
      current_distance: +calcDetails.current_distance,
      new_operating_distance: +calcDetails.new_operating_distance,
      new_doserate: +calcDetails.new_doserate,
      calculation_unit: doserateRadioValue,
      distance_unit: distanceRadioValue,
      calculation_id: null,
    };

    if (
      newCalc.current_doserate &&
      newCalc.current_distance &&
      newCalc.new_operating_distance
    ) {
      newCalc.new_doserate = +(
        newCalc.current_doserate *
        Math.pow(+newCalc.current_distance / +newCalc.new_operating_distance, 2)
      ).toFixed(2);
      // (document.getElementById("new_doserate") as HTMLInputElement).value =
      //  new_doserate.toString();

      try {
        const {
          data: {
            calculation: { calculation_id },
          },
        } = await postCalculation(newCalc);
        newCalc.calculation_id = calculation_id;
        navigate(`/calculations/${calculation_id}`, { state: newCalc });
      } catch (error: any) {
        console.log({ error });
        return "Couldn't submit reading";
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form onSubmit={submitCalc}>
          <fieldset disabled={navigation.state === "submitting"}>
            <h3 className='text-center'>RDC - Needs updating</h3>

            <div className='d-flex justify-content-between '>
              <ButtonGroup>
                {doserateUnits.map((radio, idx) => (
                  <ToggleButton
                    key={`doserate-${idx}`}
                    id={`doserate-${idx}`}
                    type='radio'
                    variant='outline-primary'
                    name='doserateRadio'
                    value={radio.value}
                    checked={doserateRadioValue === radio.value}
                    onChange={(e) => setDoserateRadioValue(e.currentTarget.value)}>
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <ButtonGroup>
                {distanceUnits.map((radio, idx) => (
                  <ToggleButton
                    key={`distance-${idx}`}
                    id={`distance-${idx}`}
                    type='radio'
                    variant='outline-primary'
                    name='distanceRadio'
                    value={radio.value}
                    checked={distanceRadioValue === radio.value}
                    onChange={(e) => setDistanceRadioValue(e.currentTarget.value)}>
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>

            {/* These two fields are always present */}

            <div className='d-flex flex-column'>
              <div className='order-0 flex-column d-flex'>
                <label htmlFor='current_doserate'>Current doserate:</label>
                <div className='d-flex justify-content-between'>
                  <input
                    type='number'
                    name='current_doserate'
                    id='current_doserate'
                    placeholder='Enter current doserate'
                    value={calcDetails.current_doserate}
                    onChange={(e) =>
                      setCalcDetails((prevCalcDetails) => {
                        return { ...prevCalcDetails, [e.target.name]: e.target.value };
                      })
                    }
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{doserateRadioValue}</span>
                </div>
              </div>

              <div className='order-1 flex-column d-flex'>
                <label htmlFor='current_distance'>Current distance:</label>
                <div className='d-flex justify-content-between '>
                  <input
                    type='number'
                    name='current_distance'
                    id='current_distance'
                    placeholder='Enter current distance'
                    value={calcDetails.current_distance}
                    onChange={(e) =>
                      setCalcDetails((prevCalcDetails) => {
                        return { ...prevCalcDetails, [e.target.name]: e.target.value };
                      })
                    }
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{distanceRadioValue}</span>
                </div>
              </div>
              {/* These two fields are always present and in this order */}

              <div className={`flex-column d-flex order-2`}>
                <label htmlFor='new_operating_distance'>New operating distance:</label>
                <div className='d-flex justify-content-between '>
                  <input
                    type='number'
                    name='new_operating_distance'
                    id='new_operating_distance'
                    placeholder='Enter new operating distance'
                    value={calcDetails.new_operating_distance}
                    onChange={(e) =>
                      setCalcDetails((prevCalcDetails) => {
                        return { ...prevCalcDetails, [e.target.name]: e.target.value };
                      })
                    }
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{distanceRadioValue}</span>
                </div>
              </div>
              <Button variant='primary' type='submit' className='w-100 order-last mt-2'>
                {navigation.state === "submitting" ? "Calculating..." : "Calculate"}
              </Button>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default CalculationInput;
