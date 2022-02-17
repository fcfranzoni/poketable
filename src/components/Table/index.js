import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { getPokeData } from '../../services';
import { StyledTable } from './styles';

function PokeTable({ pokeData: data }) {

    const [state, setState] = useState({
        pokeRecords: [],
        pageIndex: 0,
        nextPage: "",
        previousPage: "",
        totalPages: 0,
    });


    const handleFetchData = useCallback(async (pageTocall) => {
        await getPokeData(pageTocall)
            .then((response) => {
                const { results, count, next, previous } = response.data;
                setState({
                    ...state,
                    pokeRecords: results,
                    totalPages: count,
                    nextPage: next,
                    previousPage: previous
                })
            })
    }, [state])


    useEffect(() => {
        handleFetchData();
    }, [handleFetchData])

    const handleCallNextPage = () => {
        handleFetchData(state.nextPage)
        setState({ ...state, pageIndex: state.pageIndex++ });
    }

    const handleCallPReviosPage = () => {
        handleFetchData(state.previousPage)
        setState({ ...state, pageIndex: state.pageIndex-- });
    }

    if (state.pokeRecords?.length > 0) {
        return (
            <StyledTable>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {state.pokeRecords.map(({ name, url }, i) => {
                        return (<tr key={i}>
                            <td>{name}</td>
                            <td >{url}</td>
                        </tr>)
                    })}
                </tbody>

                {(state.pokeRecords.length !== state.totalPages) &&
                    <tfoot>
                        <tr>
                            <td>
                                {state.previousPage && <button onClick={handleCallPReviosPage}>Anterior</button>}
                                <button onClick={handleCallNextPage}>Proxima</button>
                            </td>
                            <td>
                                Pagina Atual: {state.pageIndex} <p />
                                Total de Paginas: {state.totalPages}
                            </td>
                        </tr>
                    </tfoot>
                }
            </StyledTable>
        )
    }
    else {
        return (<> Carregando ...</>);
    }
}
export default PokeTable;
