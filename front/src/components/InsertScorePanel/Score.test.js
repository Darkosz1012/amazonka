import { render, screen } from "@testing-library/react";
import Score from "./Score";

describe("Score", () => {
    beforeEach(() => {
        render(<Score />);
    });

    it("should render code panel by default", () => {
        let codePanel = screen.getByTestId("codePanel");
        expect(codePanel).toBeInTheDocument();
    });
});
