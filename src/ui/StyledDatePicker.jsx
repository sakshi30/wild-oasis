import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

export const StyledDatePicker = styled(DatePicker)`
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 230px;
  position: relative; /* Ensure the wrapper is positioned for absolute positioning */

  /* Target the close button */
  .react-datepicker__close-icon {
    position: absolute;
    right: -1px !important; /* Adjust spacing as needed */
  }
`;
