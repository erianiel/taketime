import { useForm } from "react-hook-form";
import { TIME_UNITS } from "../utils/consts";
import { formattedDate, getCompletionDate } from "../utils/helpers";
import { useState } from "react";

function CalcBox({ runtime }) {
  const [completionDate, setCompletionDate] = useState();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      unit: TIME_UNITS.MINUTE,
      cadence: TIME_UNITS.DAY,
    },
    mode: "onChange",
  });

  const validateMessage = "Please type a valid input";

  const { errors, isValid } = formState;

  const calculateCompletionData = (data) => {
    const { time, unit, cadence } = data;
    const date = getCompletionDate({
      runtime,
      time,
      unit,
      cadence,
    });

    setCompletionDate(formattedDate(date));
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      <h3>Let&apos;s take time to watch it!</h3>
      <form onChange={handleSubmit(calculateCompletionData)}>
        <div className="flex gap-2">
          <input
            className="w-16 px-1 rounded-md border-solid focus:outline-none focus:ring focus:ring-cyan-600 bg-red-50"
            type="number"
            min="1"
            id="time"
            name="time"
            {...register("time", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Please, type a valid number",
              },

              maxLength: {
                value: 3,
                message: "Please, the number must be less than 4 digit",
              },
              validate: (value, formValues) => {
                if (
                  formValues.unit === TIME_UNITS.HOUR &&
                  formValues.cadence === TIME_UNITS.DAY
                ) {
                  return value <= 24 || validateMessage;
                }

                if (
                  formValues.unit === TIME_UNITS.HOUR &&
                  formValues.cadence === TIME_UNITS.WEEK
                ) {
                  return value <= 168 || validateMessage;
                }

                if (
                  formValues.unit === TIME_UNITS.HOUR &&
                  formValues.cadence === TIME_UNITS.MONTH
                ) {
                  return value <= 720 || validateMessage;
                }
              },
            })}
          />
          <select
            className="px-1 rounded-md border-solid focus-outline-none focus-ring focus:ring-cyan-600 bg-red-50"
            name="unit"
            {...register("unit", {
              required: "This field is required",
            })}
          >
            <option value={TIME_UNITS.MINUTE}>minutes</option>
            <option value={TIME_UNITS.HOUR}>hours</option>
          </select>

          <p>per</p>

          <select
            className="px-1 rounded-md border-solid focus-outline-none focus-ring focus:ring-cyan-600 bg-red-50"
            name="cadence"
            {...register("cadence", {
              required: "This field is required",
            })}
          >
            <option value={TIME_UNITS.DAY}>day</option>
            <option value={TIME_UNITS.WEEK}>week</option>
            <option value={TIME_UNITS.MONTH}>month</option>
          </select>
        </div>
      </form>

      <div>
        {completionDate && isValid ? (
          <p>
            You will finish for{" "}
            <span className="font-bold text-fuchsia-500">{completionDate}</span>
          </p>
        ) : (
          <span className="text-sm text-red-700">{errors?.time?.message}</span>
        )}
      </div>
    </div>
  );
}

export default CalcBox;
