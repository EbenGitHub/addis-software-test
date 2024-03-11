import styled from '@emotion/styled';
import { SetStateAction, Dispatch, useCallback, useState } from 'react';
import { space, color, layout, typography } from 'styled-system';
import _debounce from 'lodash/debounce';
import { css } from '@emotion/css';

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
    setFilterBy: Dispatch<SetStateAction<'genre' | 'artist' | 'album' | 'title'>>,
}

function Navigation({ changePage, currentPage, setFilter, setFilterBy }: NavProp) {

    const [search, setSearch] = useState<string>('')
    const [searchBy, setSearchBy] = useState<'genre' | 'artist' | 'album' | 'title'>('genre')

    function applyFilter(text: string) {
        setFilter(text)
        setFilterBy(searchBy)
    }

    const debounceFn = useCallback(_debounce(applyFilter, 1000), [searchBy]);

    const handleSearchBy = () => {
        if (searchBy === 'genre') {
            setSearchBy('artist')
        } else if (searchBy === 'artist') {
            setSearchBy('album')
        } else if (searchBy === 'album') {
            setSearchBy('title')
        } else {
            setSearchBy('genre')
        }

        setSearch('')
        debounceFn('')

    }

    return (
        <Nav
            style={{ position: 'sticky', top: 0, left: 0, right: 0, height: '5vh', background: '#1F2544', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', fontSize: '10px', zIndex: 2 }}
        >
            <div
                style={{ display: 'flex' }}>
                <button onClick={() => changePage('graph')}
                    className={
                        css([
                            {
                                outline: '0',
                                fontSize: '1.5em',
                                marginRight: '5px',
                            },
                            currentPage === 'graph' && {
                                border: '3px solid orangered',
                            },
                            {
                                ":hover": {
                                    color: 'orangered',
                                    backgroundColor: 'black',
                                }
                            }
                        ])
                    }
                >graph</button>
                <button onClick={() => changePage('music')}
                    className={
                        css([
                            {
                                outline: '0',
                                fontSize: '1.5em',
                                marginLeft: '5px',
                            },
                            currentPage === 'music' && {
                                border: '3px solid orangered',
                            },
                            {
                                ":hover": {
                                    color: 'orangered',
                                    backgroundColor: 'black',
                                }
                            }
                        ])
                    }
                >music</button>
            </div>

            {currentPage === 'music' &&
                <div
                    className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                `}
                >
                    <label htmlFor="filter-genre"
                        className={css`
                    color: #fff;
                    margin-right: 10px;
                    font-size: 1rem;
                `}
                    >Search using <span
                        className={css`
                    color: orangered;
                    font-weight: bold;
                    margin-left: 5px;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 5px;
                    &:hover {
                        background-color: orangered;
                        color: #fff;
                    }
                `}
                        onClick={handleSearchBy}
                    >{searchBy}</span></label>
                    <input type="text" id='filter-genre' value={search} onChange={(e) => {
                        setSearch(e.target.value)
                        debounceFn(e.target.value)
                    }}
                        autoComplete='off'
                        className={css`
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #333;
                    outline: none;
                    font-size: 1rem;
                    color: orangered;
                    font-weight: bold;
                    &:focus {
                        border: 1px solid orangered;
                    }
                `}
                    />
                </div>}

            <h1>Songs</h1>
        </Nav>
    )
}

export default Navigation