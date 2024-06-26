import styled from "styled-components";
import * as Popover from "@radix-ui/react-popover";

export const ContainerCalendar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: end;
  gap: 10px;

  section,
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${(props) => props.theme["gray-100"]};
    font-size: 1.4rem;

    svg {
      color: ${(props) => props.theme["gray-100"]};
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const SectionCalendar = styled(Popover.Content)`
  position: fixed;
  right: -70px;
  background-color: ${(props) => props.theme["gray-900"]};
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  z-index: 1000;
  border-radius: 10px;

  tr {
    align-items: center;
    justify-content: space-between;
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

  button.save {
    justify-content: center;
    background-color: ${(props) => props.theme["green-500"]};
    width: 50%;
    height: 30px;
    border-radius: 10px;

    &:hover {
      background-color: ${(props) => props.theme["green-700"]};
    }
  }
`;
