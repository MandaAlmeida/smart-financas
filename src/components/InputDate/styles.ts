import styled from "styled-components";
import * as Popover from "@radix-ui/react-popover";

export const SectionCalendar = styled(Popover.Content)`
  position: fixed;
  right: -24px;
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  tr {
    align-items: center;
    justify-content: center;
    gap: 10px;

    th {
      width: 100%;
    }
  }

  .rdp-caption_dropdowns {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    select {
      background-color: transparent;
      font-size: 1.4rem;

      option {
        background: ${(props) => props.theme["gray-900"]};
      }
    }
  }

  .rdp-vhidden,
  .rdp-dropdown_month div,
  .rdp-dropdown_year div {
    display: none;
  }
`;
