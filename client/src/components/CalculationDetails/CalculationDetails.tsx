import { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import {
  Form,
  Navigate,
  redirect,
  useLocation,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { postCalculation } from "../../api/data";

export const loader = ({ request }: { request: Request }) => {
  return new URL(request.url).searchParams.get("message");
};

const CalculationDetails = () => {
  const { state } = useLocation();

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
            <h3 className='text-center'>CalculationDetails.tsx</h3>
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
                    // checked={distanceRadioValue === radio.value}
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
                    defaultValue={state && state.current_doserate}
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
                    defaultValue={state && state.current_distance}
                    className='rounded p-1 flex-grow-1'
                    style={{ maxWidth: "80%" }}
                  />
                  <span className='p-1'>{distanceRadioValue}</span>
                </div>
              </div>
              {/* These two fields are always present and in this order */}
              {/* RDC - write access, LOE distance calc - read access */}
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
                  <span className='p-1'>{distanceRadioValue}</span>
                </div>
              </div>
              {/* RDC - read access, LOE distance calc - write access */}
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
                    <span className='p-1'>{doserateRadioValue}</span>
                  </div>
                </div>
              )}
              {!state && (
                <Button variant='primary' type='submit' className='w-100 order-last mt-2'>
                  {navigation.state === "submitting" ? "Calculating..." : "Calculate"}
                </Button>
              )}
            </div>
            <div className='d-flex flex-column mt-4 border-2 border'>
              <h5 className='text-center'>Time (minutes) to reach DRL</h5>
              <table className='table text-center'>
                <thead>
                  <tr>
                    <th scope='col' className='bg-success border border-2'>
                      DRL1 - 1 mSv
                    </th>
                    <th scope='col' className='bg-warning border border-2'>
                      DRL2 - 5 mSv
                    </th>
                    <th scope='col' className='bg-danger border border-2'>
                      DRL3 - 100 mSv
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=' border border-2'>{(1 / state.new_doserate) * 60}</td>
                    <td className=' border border-2'>{(5 / state.new_doserate) * 60}</td>
                    <td className=' border border-2'>{(100 / state.new_doserate) * 60}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default CalculationDetails;
