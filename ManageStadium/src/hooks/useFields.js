import { useState, useEffect } from "react";

export function useFields() {
    const [fields, setFields] = useState([]);

    useEffect(() => {
        // fetch dữ liệu sân
    }, []);

    return fields;
}