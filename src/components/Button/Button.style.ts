import styled from '@emotion/styled';

const StyledButton = styled.button(
  {
    padding: '10px 5px',
    width: '200px',
    backgroundColor: 'hotpink',
    borderRadius: '4px',
    color: 'black',
    fontWeight: 'bold',
    '&:hover': {
      color: 'white',
      cursor: 'pointer',
    },
  },
);

export default StyledButton;
