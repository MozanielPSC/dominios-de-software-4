import { useCallback, useEffect, useState } from "react";
import TravelTable from "../../components/TravelTable";
import { api } from "../../service";
import { ContentContainer } from "./style";
import { RouteInfo } from '../../hooks/route';
import { Sidebar } from "../../components/SideBar";
import { Box } from "@mui/material";

export interface PathData {
    id: string;
    city_initial: string;
    city_final: string;
    state_initial: string;
    state_final: string;
    driver: string;
}

export function ActiveRoutes() {
    const [loading, setLoading] = useState(true);

    const [routePathsArray, setRoutePathsArray] = useState<PathData[]>([]);

    const getRoutePathsArray = useCallback(async (travel: RouteInfo) => {
        const response = await api.get(`paths/byRouteWithDriver/${travel.id}`);
        setRoutePathsArray(prevState => [...prevState, response.data]);
    }, []);


    const getRoutes = async (travels: RouteInfo[]) => {
        try {
            await Promise.all(
                travels.map(async (travel) => {
                    await getRoutePathsArray(travel);
                })
            )
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const getTravels = async () => {
        try {
            return await api.get('routes/routes/all')
                .then(response => {
                    getRoutes(response.data)
                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getTravels();
    }, []);

    return (
        <ContentContainer maxWidth="xl" >
            <Box style={{ minHeight: "100%", width: '100vw' }}> 
                <Sidebar />

                <h1>Rotas Ativas</h1>
                {loading ? <h1>Carregando...</h1> : <TravelTable routePaths={routePathsArray} />}
            </Box>
        </ContentContainer>
    )
}