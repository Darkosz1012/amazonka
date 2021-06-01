import { render, screen } from "@testing-library/react";
import InsertResultRow from "./InsertResultRow";

const withFreePass = {
    participant1: {
        fullname: "Stefan Janicki",
        score: 30,
        pos: 2,
    },
    participant2: {
        fullname: "",
        score: -1,
        pos: 31,
    },
};

const regularPair = {
    participant1: {
        fullname: "Stefan Janicki",
        score: 30,
        pos: 3,
    },
    participant2: {
        fullname: "Jan Kamiński",
        score: 22,
        pos: 30,
    },
};

describe("InsertResultRow", () => {
    beforeEach(() => {
        render(
            <ul>
                <InsertResultRow
                    key={
                        regularPair.participant1.pos +
                        "-" +
                        regularPair.participant2.pos
                    }
                    p1={regularPair.participant1}
                    p2={regularPair.participant2}
                />
            </ul>
        );
    });

    it("should render one list", () => {
        let list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
    });

    it("should have list elements", () => {
        let list = screen.getAllByRole("listitem");
        for (let li of list) {
            expect(li).toBeInTheDocument();
        }
        expect(list).toHaveLength(4);
    });

    it("should have two numeric inputs", () => {
        let numInput = screen.getAllByRole("spinbutton");
        for (let el of numInput) {
            expect(el).toBeInTheDocument();
        }
        expect(numInput).toHaveLength(2);
    });
});

describe("InsertResultRow with free pass", () => {
    beforeEach(() => {
        render(
            <ul>
                <InsertResultRow
                    key={
                        withFreePass.participant1.pos +
                        "-" +
                        withFreePass.participant2.pos
                    }
                    p1={withFreePass.participant1}
                    p2={withFreePass.participant2}
                />
            </ul>
        );
    });

    it("should render one list", () => {
        let list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
    });

    it("should have list elements", () => {
        let list = screen.getAllByRole("listitem");
        for (let li of list) {
            expect(li).toBeInTheDocument();
        }
        expect(list).toHaveLength(4);
    });

    it("should have one numeric inputs", () => {
        let numInput = screen.getAllByRole("spinbutton");
        for (let el of numInput) {
            expect(el).toBeInTheDocument();
        }
        expect(numInput).toHaveLength(1);
    });

    it("should render '/wolne przejście/", () => {
        let pass = screen.getByText(/wolne przejście/i);
        expect(pass).toBeInTheDocument();
    });
});
