import styled from '@emotion/styled';
import { space, color, layout, typography } from 'styled-system';

const Nav = styled.div`
  ${space}
  ${color}
  ${layout}
  ${typography}
`;


function Navigation() {
    return (
        <Nav
            style={{ position: 'sticky', top: 0, left: 0, right: 0, height: '5vh', background: '#1F2544', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', fontSize: '10px' }}
        >
            <h1>Navigation</h1>
            <h1>Navigation</h1>
        </Nav>
    )
}

export default Navigation