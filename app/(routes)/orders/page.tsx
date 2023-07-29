"use client";
import React, { useEffect, useState } from "react";

interface Order {
  _id: string;
  productTitle: string;
  size: string;
  color: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  orderDate: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch all recent orders from the backend API
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/getOrders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          // Handle the case where orders could not be fetched
          console.error("Error fetching orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="pt-24 min-h-[50vh] mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Recent Orders</h1>
      {orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold mb-2">{order.productTitle}</h2>
              <p className="text-gray-600 mb-2">
                Size: {order.size}, Color: {order.color}
              </p>
              <p className="text-gray-600 mb-4">Quantity: {order.quantity}</p>
              <p className="text-gray-700">Total Price: ₹{order.totalPrice}</p>
              <p className="text-gray-600">
                Ordered by: {order.customerName} ({order.customerEmail})
              </p>
              <p className="text-gray-600">
                Shipping Address: {order.shippingAddress}
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Order Date: {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
