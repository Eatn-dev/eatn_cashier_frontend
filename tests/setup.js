import { afterEach } from "vitest"
import { cleanup } from "@testing-library/svelte"
import "@testing-library/jest-dom/extend-expect"

afterEach(() => {
    cleanup()
})