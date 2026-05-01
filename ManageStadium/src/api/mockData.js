// Mock data cho các chức năng
export const mockOrders = [{
        _id: "1",
        id_order: "O001",
        id_user: "user123",
        id_sportfield: "field1",
        start_hour: new Date("2026-03-06T17:00:00"),
        end_hour: new Date("2026-03-06T18:30:00"),
        state: "completed",
        total_price: 290000,
        services: [
            { name: "Cầu lông", price: 200000, qty: 1 },
            { name: "Suối khoáng nhỏ", price: 10000, qty: 3 }
        ],
        sportfield: {
            sportfield_id: "field1",
            title: "Sân cầu lông ABC",
            sportfield_type: "Cầu lông",
            address: "123 Đường ABC, Quận 1",
            price_per_hour: 160000,
            images: ["https://example.com/field1.jpg"]
        }
    },
    {
        _id: "2",
        id_order: "O002",
        id_user: "user123",
        id_sportfield: "field2",
        start_hour: new Date("2026-03-07T19:00:00"),
        end_hour: new Date("2026-03-07T20:30:00"),
        state: "pending",
        total_price: 180000,
        services: [],
        sportfield: {
            sportfield_id: "field2",
            title: "Sân bóng đá mini XYZ",
            sportfield_type: "Bóng đá",
            address: "456 Đường XYZ, Quận 2",
            price_per_hour: 180000,
            images: ["https://example.com/field2.jpg"]
        }
    },
    {
        _id: "3",
        id_order: "O003",
        id_user: "user123",
        id_sportfield: "field3",
        start_hour: new Date("2026-03-08T14:00:00"),
        end_hour: new Date("2026-03-08T16:00:00"),
        state: "completed",
        total_price: 320000,
        services: [
            { name: "Nước uống", price: 15000, qty: 2 }
        ],
        sportfield: {
            sportfield_id: "field3",
            title: "Sân tennis Pro",
            sportfield_type: "Tennis",
            address: "789 Đường Pro, Quận 3",
            price_per_hour: 160000,
            images: ["https://example.com/field3.jpg"]
        }
    }
];

export const mockCartItems = [{
        id: 1,
        title: "Sân cầu lông 4 người",
        tag: "Cầu lông",
        img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
        status: "đang chờ thanh toán",
        sportfield_id: "field1",
        price: 160000,
        date: "2026-03-10",
        time: "17:00-18:30"
    },
    {
        id: 2,
        title: "Sân bóng đá mini",
        tag: "Bóng đá",
        img: "https://images.unsplash.com/photo-1508385082359-f09d44560f67",
        status: "đang chờ thanh toán",
        sportfield_id: "field2",
        price: 180000,
        date: "2026-03-11",
        time: "19:00-20:30"
    },
    {
        id: 3,
        title: "Sân tennis đơn",
        tag: "Tennis",
        img: "https://images.unsplash.com/photo-1534430480873-8f9c7e86be4a",
        status: "đang chờ thanh toán",
        sportfield_id: "field3",
        price: 160000,
        date: "2026-03-12",
        time: "14:00-16:00"
    }
];

export const mockSportFields = [{
        _id: "field1",
        sportfield_id: "field1",
        title: "Sân cầu lông ABC",
        sportfield_type: "Cầu lông",
        description: "Sân cầu lông chất lượng cao với sân đấu chuyên nghiệp",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        price_per_hour: 160000,
        images: ["https://images.unsplash.com/photo-1599058917212-d750089bc07e"],
        facilities: ["Phòng thay đồ", "Nước uống", "Đèn chiếu sáng"],
        rating: 4.5,
        reviews: []
    },
    {
        _id: "field2",
        sportfield_id: "field2",
        title: "Sân bóng đá mini XYZ",
        sportfield_type: "Bóng đá",
        description: "Sân bóng đá mini phù hợp cho các trận đấu giao hữu",
        address: "456 Đường XYZ, Quận 2, TP.HCM",
        price_per_hour: 180000,
        images: ["https://images.unsplash.com/photo-1508385082359-f09d44560f67"],
        facilities: ["Phòng thay đồ", "Nước uống", "Trọng tài"],
        rating: 4.2,
        reviews: []
    },
    {
        _id: "field3",
        sportfield_id: "field3",
        title: "Sân tennis Pro",
        sportfield_type: "Tennis",
        description: "Sân tennis chuyên nghiệp với bề mặt cao su chất lượng",
        address: "789 Đường Pro, Quận 3, TP.HCM",
        price_per_hour: 160000,
        images: ["https://images.unsplash.com/photo-1534430480873-8f9c7e86be4a"],
        facilities: ["Phòng thay đồ", "Nước uống", "Hướng dẫn viên"],
        rating: 4.7,
        reviews: []
    }
];