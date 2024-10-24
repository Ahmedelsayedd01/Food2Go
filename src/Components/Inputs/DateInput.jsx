import classNames from 'classnames';

const DateInput = ({ required = true, minDate = true, borderColor = "none", value, onChange, placeholder }) => {
       const currentDay = new Date(); // Define currentDay
       const formattedDate = currentDay.toISOString().split('T')[0]; // Format as YYYY-MM-DD

       return (
              <>
                     <input
                            type="date"
                            placeholder={placeholder} // Add this prop to the component
                            className={classNames(
                                   'w-full border-2 rounded-2xl outline-none px-2 py-3 text-2xl text-thirdColor',
                                   {
                                          'border-none': borderColor === 'none',
                                          'border-mainColor': borderColor === 'mainColor',
                                   }
                            )}
                            value={value}
                            onChange={onChange}
                            min={minDate ? formattedDate : ''} // Use the correctly formatted date
                            required={required}
                     />
              </>
       )
}

export default DateInput;
