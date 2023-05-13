import React from "react";
import { Pagination } from "antd";
import "./RecipePagination.css";
const RecipePagination = ({ total, pageSize, current, onChange }) => {
    return (
        <Pagination className="pagination"
            total={total}
            pageSize={pageSize}
            current={current}
            onChange={onChange}
            showSizeChanger={false}
        />
    );
};

export { RecipePagination };
