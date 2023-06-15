import Pill from "../src/lib/Pill.svelte"
import { describe, test, expect } from "vitest"
import { render } from "@testing-library/svelte"

/**@type {import("@testing-library/jest-dom")} */
describe("Test Pill.svelte", () => {
    describe("Mount", () => {
        test("With default parameters", () => {
            const { container } = render(Pill)

            const span = container.querySelector("span")

            expect(span).not.toBeNull()
            expect(span).toHaveClass("pill")
            expect(span).toHaveStyle({color: "#000000"})
            expect(span).toHaveStyle({backgroundColor: "#ffffff"})
        })

        test("With different element parameter", () => {
            const element = "h1"
            const { container } = render(Pill, { props: { element: element }})

            const span = container.querySelector(element) 

            expect(span).not.toBeNull()
            expect(span).toHaveClass("pill")
        })

        test("Without badge class", () => {
            const { container } = render(Pill, { props: { isBadge: false }})

            const span = container.querySelector("span")

            expect(span).not.toBeNull()
            expect(span).toHaveClass("pill")
            expect(span).not.toHaveClass("badge")
        })

        test("With different color parameteres")
    })

    test("With different color parameters", () => {
        const tag = {
            fgColor: "#123123",
            bgColor: "#abcabc"
        }
        const { container } = render(Pill, { props: { tag: tag }})

        const span = container.querySelector("span")

        expect(span).not.toBeNull()
        expect(span).toHaveStyle({color: tag.fgColor})
        expect(span).toHaveStyle({backgroundColor: tag.bgColor})
    })
})