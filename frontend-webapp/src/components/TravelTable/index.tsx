import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PathData } from "../../pages/ActiveRoutes";


interface TravelTableProps {
    routePaths: PathData[];
}


export default function TravelTable({ routePaths }: TravelTableProps) {


    const columns: GridColDef[] = [
        { field: 'driver', headerName: 'Motorista', width: 130 },
        { field: 'city_initial', headerName: 'Cidade Partida', width: 200 },
        { field: 'state_initial', headerName: 'Estado Partida', width: 200,},
        { field: 'city_final', headerName: 'Cidade Destino', width: 200 },
        { field: 'state_final', headerName: 'Estado Destino', width: 200},
      ];


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={routePaths}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                hideFooterSelectedRowCount={true}
                disableSelectionOnClick={true}
                
            />
        </div>
    );
}