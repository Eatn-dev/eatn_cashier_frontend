import TagDropdown from "../src/lib/TagDropdown.svelte"
import { describe, test, expect, vi } from "vitest"
import { render, fireEvent, waitFor } from "@testing-library/svelte"
// import { screen } from "@testing-library/svelte"

global.fetch = vi.fn()
    .mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return Promise.resolve(
                {
                    message: "Tag assigned successfully."
                }
            )
        }
    })
    .mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return Promise.resolve(
                {
                    message: "Tag removed successfully."
                }
            )
        }
    })

/**@type {import("@testing-library/jest-dom")} */
describe("Test TagDropdown.svelte", () => {
    describe("Mount", () => {
        test("With all minimal parameters", () => {
            // arrange
            const item = {
                id: 1,
                name: "Test item",
                tags: []
            }

            const tags = []

            // act
            const { container } = render(TagDropdown, {
                props: {
                    item: item,
                    itemTags: item.tags,
                    tags: tags
                }
            })

            // assert
            const dropdown = container.querySelector(".dropdown-menu")

            expect(dropdown).not.toBeNull()
            expect(dropdown.querySelector(".list-group")).toBeEmptyDOMElement()
        })

        test("With non-empty tag list", () => {
          // arrange
            const item = {
                id: 1,
                name: "Test item",
                tags: []
            }

            const tags =  [
                {
                    id: 1,
                    name: "Test tag",
                    fgColor: "#000000",
                    bgColor: "#ffffff"      
                },
                {
                    id: 2,
                    name: "Test tag #2",
                    fgColor: "#ffffff",
                    bgColor: "#000000"
                }
            ]

            // act
            const { container } = render(TagDropdown, {
                props: {
                    item: item,
                    itemTags: item.tags,
                    tags: tags
                }
            })

            // assert
            const dropdown = container.querySelector(".dropdown-menu")

            expect(dropdown).not.toBeNull()
            expect(dropdown.querySelector(".list-group")).not.toBeEmptyDOMElement()
            expect(dropdown.querySelector(".list-group").childNodes.length).toBe(2)
        })

        test("With non-empty tag list and 1 tag assigned to item", () => {
            // arrange
            const item = {
                id: 1,
                name: "Test item",
                tags: [
                    {
                        id: 1,
                        name: "Test tag",
                        fgColor: "#000000",
                        bgColor: "#ffffff"      
                    }
                ]
            }

            const tags =  [
                {
                    id: 1,
                    name: "Test tag",
                    fgColor: "#000000",
                    bgColor: "#ffffff"      
                },
                {
                    id: 2,
                    name: "Test tag #2",
                    fgColor: "#ffffff",
                    bgColor: "#000000"
                }
            ]

            // act
            const { container } = render(TagDropdown, {
                props: {
                    item: item,
                    itemTags: item.tags,
                    tags: tags
                }
            })
            
            // assert
            const dropdown = container.querySelector(".dropdown-menu")
            const assignedTagInput = dropdown.querySelector(".list-group").querySelector(`#tag-${tags[0].id}`)

            expect(dropdown).not.toBeNull()
            expect(dropdown.querySelector(".list-group")).not.toBeEmptyDOMElement()
            expect(dropdown.querySelector(".list-group").childNodes.length).toBe(2)
            expect(assignedTagInput.checked).toBe(true)
        })
    })

    describe("Clicking inputs", () => {
        test("With no items assigned", async () => {
            // arrange
            const item = {
                id: 1,
                name: "Test item",
                tags: []
            }

            const tags =  [
                {
                    id: 1,
                    name: "Test tag",
                    fgColor: "#000000",
                    bgColor: "#ffffff"      
                },
                {
                    id: 2,
                    name: "Test tag #2",
                    fgColor: "#ffffff",
                    bgColor: "#000000"
                }
            ]

            // act
            const { container } = render(TagDropdown, {
                props: {
                    item: item,
                    itemTags: item.tags,
                    tags: tags
                }
            })
            
            const dropdown = container.querySelector(".dropdown-menu")
            const assignedTagInput = dropdown.querySelector(".list-group").querySelector(`#tag-${tags[0].id}`)
            
            await fireEvent.click(assignedTagInput)
            
            // assert
            await waitFor(()=> {
                expect(dropdown.querySelector(".list-group")).not.toBeEmptyDOMElement()
                expect(assignedTagInput.checked).toBe(true)
            }, { container: container })
        })
    })

    describe("Clicking inputs", () => {
        test("With item assigned", async () => {
            // arrange
            const item = {
                id: 1,
                name: "Test item",
                tags: [
                    {
                        id: 1,
                        name: "Test tag",
                        fgColor: "#000000",
                        bgColor: "#ffffff"      
                    }
                ]
            }

            const tags =  [
                {
                    id: 1,
                    name: "Test tag",
                    fgColor: "#000000",
                    bgColor: "#ffffff"      
                },
                {
                    id: 2,
                    name: "Test tag #2",
                    fgColor: "#ffffff",
                    bgColor: "#000000"
                }
            ]

            // act
            const { container } = render(TagDropdown, {
                props: {
                    item: item,
                    itemTags: item.tags,
                    tags: tags
                }
            })
            
            const dropdown = container.querySelector(".dropdown-menu")
            const assignedTagInput = dropdown.querySelector(".list-group").querySelector(`#tag-${tags[0].id}`)
            
            await fireEvent.click(assignedTagInput)
            
            // assert
            await waitFor(()=> {
                expect(dropdown.querySelector(".list-group")).not.toBeEmptyDOMElement()
                expect(assignedTagInput.checked).toBe(false)
            }, { container: container })
        })
    })
})