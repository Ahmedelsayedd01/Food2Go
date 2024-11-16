import classNames from 'classnames';

const TimeInput = ({ required = true, borderColor = "none", value, onChange }) => {
       // const currentDay = new Date(); // Define currentDay
       // const formattedDate = currentDay.toISOString().split('T')[0]; // Format as YYYY-MM-DD

       return (
              <>
                     <input
                            type="time"
                            className={classNames(
                                   'w-full border-2 rounded-2xl outline-none px-2 py-3 text-2xl text-thirdColor',
                                   {
                                          'border-none': borderColor === 'none',
                                          'border-mainColor': borderColor === 'mainColor',
                                   }
                            )}
                            value={value}
                            onChange={onChange}
                            required={required}
                     />
              </>
       )
}

export default TimeInput;
