import React, { useMemo, useState, useEffect } from "react";
import { TableInstance, UsePaginationInstanceProps, UseSortByInstanceProps, UsePaginationState, useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { Box } from "../box/Box";
import { v4 as uuidv4 } from 'uuid';
import { AiFillCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { FaSort } from 'react-icons/fa';
import { COLUMNS } from './columns';
import { BoxButton } from '../buttons/BoxButton';
import CharacterService from "../../service/CharacterService";
import { CharacterModel, PageInfoModel } from "../../models/CharacterModel";
export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> &
    UseSortByInstanceProps<T> & {
        state: UsePaginationState<T>;
    };
export default function CharacterTable() {
    const columns = useMemo(() => COLUMNS, []);
    const initialState = { hiddenColumns: ["id"], pageSize: 20 };
    const [character, setCharacter] = useState<CharacterModel[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfoModel>();
    const [canNextPage, setCanNextPage] = useState(Boolean);
    const [canPreviousPage, setCanPreviousPage] = useState(Boolean);
    const [errorMsg, setErrorMessage] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const getCharacter = async (pageIndex: number) => {
        let resp = await CharacterService.getCharacters(pageIndex)
        if (resp.status === 200) {
            setCharacter(resp.data.results);
            setPageInfo(resp.data.info);
            let canNextPage = resp.data.info.next ? true : false;
            let canPreviousPage = resp.data.info.prev ? true : false;
            setCanNextPage(canNextPage);
            setCanPreviousPage(canPreviousPage);
            setErrorMessage("");

        } else {

            setErrorMessage("Something Went Wrong")
        }
    }
    useEffect(() => {
        getCharacter(0);
    }, []);

    const data = useMemo(() => character, [character]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,


        prepareRow,

    } = useTable(
        {
            columns,
            data,
            initialState,

        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [

                ...columns
            ]);
        }
    ) as TableInstanceWithHooks<any>;;

    const gotoNextPage = (pageIndex: number) => {
        pageIndex = pageIndex + 1;
        setPageIndex(pageIndex)
        getCharacter(pageIndex);

    }
    const gotoPreviousPage = (pageIndex: number) => {
        pageIndex = pageIndex - 1;
        setPageIndex(pageIndex)
        getCharacter(pageIndex);

    }
    return (
        <>

            <Box >
                {errorMsg && <div>{errorMsg}</div>}
                {!errorMsg &&
                    <div className="bg-[#ffffff] shadow text-aidonicDarkBlue font-Helvetica p-4 rounded-[5px] border border-[#ccc]">
                        <table
                            {...getTableProps()}
                            className="w-full text-[14px] font-Helvetica text-left "
                        >
                            <thead className="uppercase bg-aidonicSuperLighGrey font-HelveticaBold">
                                {headerGroups.map((headerGroup) => (
                                    <tr
                                        {...headerGroup.getHeaderGroupProps()}
                                        key={uuidv4()}
                                        className="h-12 sticky top-0 bg-[#fff] z-10"
                                    >
                                        {headerGroup.headers.map((column: any) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                key={uuidv4()}
                                                scope="col"
                                                className='py-4 px-2 border-b border-[#999]">'
                                            >
                                                {column.render('Header')}
                                                {column.id !== 'selection' && (
                                                    <span className="pl-2 absolute">
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <AiFillCaretUp></AiFillCaretUp>
                                                            ) : (
                                                                <AiOutlineCaretDown></AiOutlineCaretDown>
                                                            )
                                                        ) : (
                                                            <FaSort></FaSort>
                                                        )}
                                                    </span>
                                                )}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? '' : '') : ''}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            {!errorMsg && <tbody {...getTableBodyProps()}>
                                {page.map((row: any) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            key={uuidv4()}
                                            className="bg-white border-b border-[#ccc] bg-white odd:bg-[#fff] even:bg-[#f2f2f2] hover:bg-[#e1e1e1]"
                                        >
                                            {row.cells.map((cell: any) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps}
                                                        key={uuidv4()}
                                                        className="py-4 px-2 font-Helvetica text-[14px] text-aidonicDarkBlue"
                                                    >
                                                        {(
                                                            cell.render('Cell')
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                            }
                        </table>


                        <div className="text-end pt-4 flex justify-between">
                            <span>
                                Page{' '}
                                <strong className="pl-2">
                                    {pageIndex} of {pageInfo?.pages}
                                </strong>
                            </span>


                            <div className=""> 
                            <BoxButton disabled={!canPreviousPage} onClick={() => gotoPreviousPage(pageIndex)}>
                                Previous
                            </BoxButton>  
                            <BoxButton disabled={!canNextPage} onClick={() => gotoNextPage(pageIndex)}>
                                Next
                            </BoxButton>
                            </div> 
                        </div>

                    </div>
                }
            </Box>
        </>
    );
}