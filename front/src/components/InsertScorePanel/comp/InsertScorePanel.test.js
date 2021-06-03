import React from "react";
import { render, screen } from "@testing-library/react";
import InsertScorePanel from "./InsertScorePanel";

describe("InsertScorePanel", () => {
    beforeEach(() => {
        render(<InsertScorePanel />);
    });

    it("should have 13 buttons", () => {
        let allButtons = screen.getAllByRole("button");
        expect(allButtons).toHaveLength(13);
    });

    it("should have 12 buttons with points having proper placeholder", () => {
        let points = [
            "M",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "X",
        ];
        points.forEach((point) => {
            let btn = screen.getByPlaceholderText(point);
            expect(btn).toBeInTheDocument();
        });
    });
});
