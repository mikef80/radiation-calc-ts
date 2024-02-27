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

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const current_doserate = formData.get("current_doserate") || null;
  const current_distance = formData.get("current_distance") || null;
  const new_operating_distance = formData.get("new_operating_distance") || null;
  const doserateRadio = formData.get("doserateRadio");
  const distanceRadio = formData.get("distanceRadio");

  if (current_doserate && current_distance && new_operating_distance) {
    const new_doserate =
      +current_doserate * Math.pow(+current_distance / +new_operating_distance, 2);
    // (document.getElementById("new_doserate") as HTMLInputElement).value =
    //  new_doserate.toString();

    try {
      const newCalc = {
        calculation_date_time: new Date(),
        calculation_type: "RDC",
        current_doserate,
        current_distance,
        new_operating_distance,
        new_doserate,
        calculation_unit: doserateRadio,
        distance_unit: distanceRadio,
      };

      const {data:{
        calculation: { calculation_id },
      }} = await postCalculation(newCalc);
      console.log(calculation_id);

      return redirect(`/dashboard`);
    } catch (error: any) {
      return "Couldn't submit reading";
    }
  }

  return null;
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
        <Form method='post' action="/calculations/new">
          <fieldset
            disabled={state ? state.readOnly : false || navigation.state === "submitting"}>
            <h3 className='text-center'>
              {calcType === "rdc" ? "Radiation Dose Calculator" : "Other Calc"}
            </h3>

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
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default CalculationDetails;
