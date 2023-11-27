import Div from "../atoms/div";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
const DashboardGrid = () => {
    return (
        <div className="flex gap-4 w-full p-8">
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        <span className="text-sm text-green-500 pl-2">+343</span>
                    </div>
                </div>
            </Div>
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        <span className="text-sm text-green-500 pl-2">+343</span>
                    </div>
                </div>
            </Div>
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        <span className="text-sm text-green-500 pl-2">+343</span>
                    </div>
                </div>
            </Div>
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        <span className="text-sm text-green-500 pl-2">+343</span>
                    </div>
                </div>
            </Div>
        </div>
    )
}

export default DashboardGrid