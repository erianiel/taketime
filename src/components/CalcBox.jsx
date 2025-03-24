import { useForm } from "react-hook-form";
import { TIME_UNITS } from "../utils/consts";
import { completionDateData } from "../utils/signalsStore";
function CalcBox() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: completionDateData.value,
    mode: "onChange",
  });

  const validateMessage = "Type a valid input";

  const { errors, isValid } = formState;

  const calculateCompletionData = (data) => {
    const { time, unit, cadence } = data;

    completionDateData.value = {
      time,
      unit,
      cadence,
    };
  };

  return (
    <div className="flex w-full flex-col gap-2 pb-3 pl-0">
      <h3 className="text-md text-neutral-700 sm:text-lg">
        Time you can spare for watching:
      </h3>
      <form
        className="flex items-center gap-2"
        onChange={handleSubmit(calculateCompletionData)}
      >
        <input
          className={`h-9 w-16 rounded-md border border-solid bg-stone-50 px-1 py-2 text-neutral-700 focus:outline-none focus:ring-2 ${
            formState.errors.time
              ? "border-pink-700 focus:ring-pink-700"
              : "border-slate-400 focus:ring-blue-400"
          }`}
          type="number"
          min="1"
          id="time"
          name="time"
          {...register("time", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Type a valid number",
            },

            maxLength: {
              value: 3,
              message: "The number must be less than 4 digits",
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
          className="custom-select w-full min-w-2"
          name="unit"
          {...register("unit", {
            required: "This field is required",
          })}
        >
          <option
            className="bg-stone-50 bg-opacity-75"
            value={TIME_UNITS.MINUTE}
          >
            minutes
          </option>
          <option className="bg-stone-50 bg-opacity-75" value={TIME_UNITS.HOUR}>
            hours
          </option>
        </select>

        <p>per</p>

        <select
          className="custom-select"
          name="cadence"
          {...register("cadence", {
            required: "This field is required",
          })}
        >
          <option value={TIME_UNITS.DAY}>day</option>
          <option value={TIME_UNITS.WEEK}>week</option>
          <option value={TIME_UNITS.MONTH}>month</option>
        </select>
      </form>
      <div>
        {!isValid && (
          <span className="text-sm text-pink-700">{errors?.time?.message}</span>
        )}
      </div>
    </div>
  );
}

export default CalcBox;
