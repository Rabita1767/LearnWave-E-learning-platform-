import DashboardGrid from "../molecules/dashboardGrid";
import Table from "../molecules/table";
const Dashboard: React.FC = () => {
    return (
        <div>
            <div className="flex gap-4">
                <DashboardGrid />
            </div>
            <Table />
        </div>

    )
}

export default Dashboard