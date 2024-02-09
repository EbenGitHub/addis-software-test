import styled from '@emotion/styled';
import { SetStateAction, Dispatch, useCallback, useState } from 'react';
import { space, color, layout, typography } from 'styled-system';
import _debounce from 'lodash/debounce';

const Nav = styled.div`
  ${space}
  ${color}
  ${layout}
  ${typography}
`;

type NavProp = {
    changePage: Dispatch<SetStateAction<"graph" | "music">>,
    currentPage: "graph" | "music",
    setFilter: Dispatch<SetStateAction<string>>,
}

function Navigation({ changePage, currentPage, setFilter }: NavProp) {

    const [search, setSearch] = useState<string>('')

    function applyFilter(text: string) {
        setFilter(text)
    }

    const debounceFn = useCallback(_debounce(applyFilter, 1000), []);

    return (
        <Nav
            style={{ position: 'sticky', top: 0, left: 0, right: 0, height: '5vh', background: '#1F2544', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', fontSize: '10px', zIndex: 2 }}
        >
            <div
                style={{ display: 'flex' }}>
                <button onClick={() => changePage('graph')} style={currentPage === 'graph' ? { border: '3px solid orangered', outline: '0' } : {}}>graph</button>
                <button onClick={() => changePage('music')} style={currentPage === 'music' ? { border: '3px solid orangered', outline: '0' } : {}}>music</button>
            </div>

            {currentPage === 'music' && <div
                style={{ display: 'flex', gap: '20px' }}>
                <label htmlFor="filter-genre">Search using genre</label>
                <input type="text" id='filter-genre' value={search} onChange={(e) => {
                    setSearch(e.target.value)
                    debounceFn(e.target.value)
                }} autoComplete='off' />
            </div>}

            <h1>Songs</h1>
        </Nav>
    )
}

export default Navigation