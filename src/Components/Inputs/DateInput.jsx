import classNames from 'classnames';

const DateInput = ({ required = true, minDate = true, maxDate = true, borderColor = "none", value, onChange, placeholder }) => {
       const currentDay = new Date(); // Define currentDay
       const formattedDate = currentDay.toISOString().split('T')[0]; // Format as YYYY-MM-DD

       return (
              <>
                     <input
                            type="date"
                            placeholder={placeholder} // Add this prop to the component
                            className={classNames(
                                   'w-full border-2 py-2 px-3 h-14 shadow rounded-xl outline-none text-2xl text-thirdColor ',
                                   {
                                          'border-none': borderColor === 'none',
                                          'border-mainColor': borderColor === 'mainColor',
                                   }
                            )}
                            value={value}
                            onChange={onChange}
                            min={minDate ? formattedDate : ''} // Use the correctly formatted date
                            max={maxDate ? formattedDate : ''}
                            required={required}
                     />
              </>
       )
}

export default DateInput;
