import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useNavigate } from "react-router-dom";
import "./ProductCharts.css"; 

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProductCharts = () => {
    const [products, setProducts] = useState([]);
    const [warningMessage, setWarningMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8073/category");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProducts();
    }, []);

    // Preparing data for chart
    const chartLabels = products.map(product => product.itemname);
    const chartData = products.map(product => parseFloat(product.quantity)); // Assuming quantity is in kg

    // Check for products with quantity dropping by 1 kg
    const warningIndices = chartData.reduce((indices, quantity, index) => {
        if (quantity <= 1) {  // if quantity is less than or equal to 1 kg
            indices.push(index);
        }
        return indices;
    }, []);
    
    // Bar Chart Data
    const barChartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Product Quantity in KG",
                data: chartData,
                backgroundColor: chartData.map((quantity, index) => warningIndices.includes(index) ? "rgba(255, 99, 132, 0.6)" : "rgba(60, 151, 96, 0.6)"),
                borderColor: chartData.map((quantity, index) => warningIndices.includes(index) ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)"),
                borderWidth: 3,
            },
        ],
    };

    // Pie Chart Data (same as before)
    const pieChartData = {
        labels: chartLabels,
        datasets: [
            {
                data: chartData,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    // Set warning message if products are running low
    useEffect(() => {
        if (warningIndices.length > 0) {
            setWarningMessage("Warning: Some products are running low (less than 1 kg). Please restock.");
        } else {
            setWarningMessage("");
        }
    }, [warningIndices]);

    return (
        <div>
            <button onClick={() => navigate("/")} className="back-button" type = "btn1">--- Back to Products</button>
            <h2 className="chart-heading">Product Quantity Overview</h2>
            <div className="chart-container">
                <Bar data={barChartData} />
            </div>

            <h2 className="chart-heading">Product Quantity Overview</h2>
            <div className="chart-container">
                <Pie data={pieChartData} />
            </div>

            {warningMessage && <div className="warning-message">{warningMessage}</div>}
        </div>
    );
};

export default ProductCharts;
