import { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Form, useLocation, useNavigation, useSearchParams } from "react-router-dom";
import BackArrow from "../Images/BackArrow";

export const loader = ({ request }: { request: Request }) => {
  return new URL(request.url).searchParams.get("message");
};

const CalculationDetails = () => {
  const { state } = useLocation();
  console.log(state);

  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const calcType = searchParams.get("type");
  const [doserateRadioValue, setDoserateRadioValue] = useState("µSv/hr");
  const [distanceRadioValue, setDistanceRadioValue] = useState("metres");

  const doserateUnits = [
    { name: "mSv/hr", value: "mSv/hr" },
    { name: "µSv/hr", value: "µSv/hr" },
  ];
  const distanceUnits = [
    { name: "metres", value: "metres" },
    { name: "feet", value: "feet" },
  ];

  return (
    <div className='d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form>
          <fieldset disabled>
            <div className='d-flex'>
              <div>
                <BackArrow width={20} height={20} />
              </div>
              <h3 className='text-center ps-2'>
                {state.calculation_type === "RDC"
                  ? "Radiation Dose Calculator"
                  : "something else"}
              </h3>
            </div>

            <div className='d-flex justify-content-between '>
              <ButtonGroup>
                {doserateUnits.map((radio, idx) => (
                  <ToggleButton
                    key={`doserate-${idx}`}
                    id={`doserate-${idx}`}
                    type='radio'
                    variant={idx % 2 ? "outline-success" : "outline-danger"}
                    name='doserateRadio'
                    value={radio.value}
                    checked={
                      state
                        ? state.calculation_unit === radio.value
                        : doserateRadioValue === radio.value
                    }
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
                    variant={idx % 2 ? "outline-success" : "outline-danger"}
                    name='distanceRadio'
                    value={radio.value}
                    checked={
                      state
                        ? state.distance_unit === radio.value
                        : distanceRadioValue === radio.value
                    }
                    onChange={(e) => setDistanceRadioValue(e.currentTarget.value)}>
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>

            <div className='d-flex flex-column'>
              <div className='order-0 flex-column d-flex'>
                <label htmlFor='current_doserate'>Current doserate:</label>
                <div className='d-flex justify-content-between'>
                  <input
                    type='number'
                    name='current_doserate'
                    id='current_doserate'
                    placeholder='Enter current doserate'
                    defaultValue={state && state.current_doserate}
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{state.calculation_unit}</span>
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
                    defaultValue={state && state.current_distance}
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{state.distance_unit}</span>
                </div>
              </div>

              <div
                className={`flex-column d-flex ${calcType === "rdc" ? "order-2" : "order-3"}`}>
                <label htmlFor='new_operating_distance'>New operating distance:</label>
                <div className='d-flex justify-content-between '>
                  <input
                    type='number'
                    name='new_operating_distance'
                    id='new_operating_distance'
                    placeholder='Enter new operating distance'
                    disabled={false}
                    defaultValue={state && state.new_operating_distance}
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{state.distance_unit}</span>
                </div>
              </div>

              {state && (
                <div
                  className={` flex-column d-flex ${
                    calcType === "rdc" ? "order-2" : "order-3"
                  }`}>
                  <label htmlFor='new_doserate'>New doserate:</label>
                  <div className='d-flex justify-content-between '>
                    <input
                      type='number'
                      name='new_doserate'
                      id='new_doserate'
                      placeholder='New doserate'
                      disabled={true}
                      defaultValue={state && state.new_doserate}
                      className='rounded p-1 flex-grow-1'
                      style={{ maxWidth: "80%" }}
                    />
                    <span className='p-1'>{state.calculation_unit}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='container text-center mt-4 border border-1'>
              <div className='row'>
                <h5 className='col'>Time (minutes) to reach DRL</h5>
              </div>
              <div className='row'>
                <div className='col bg-success'>
                  DRL1
                  <br />1 mSv
                </div>
                <div className='col bg-warning '>
                  DRL2
                  <br />5 mSv
                </div>
                <div className='col bg-danger'>
                  DRL3
                  <br />
                  100 mSv
                </div>
              </div>
              <div className='row'>
                <div className='col border border-1'>
                  {Math.floor(
                    ((state.calculation_unit === "mSv/hr" ? 1 : 1000) / state.new_doserate) *
                      60
                  )}
                </div>
                <div className='col border border-1'>
                  {Math.floor(
                    ((state.calculation_unit === "mSv/hr" ? 5 : 5000) / state.new_doserate) *
                      60
                  )}
                </div>
                <div className='col border border-1'>
                  {Math.floor(
                    ((state.calculation_unit === "mSv/hr" ? 100 : 100000) /
                      state.new_doserate) *
                      60
                  )}
                </div>
              </div>
            </div>
            <div style={{ fontSize: "10px" }} className='pt-1'>
              Reading taken at: {new Date(state.calculation_date_time).toUTCString()}
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default CalculationDetails;
