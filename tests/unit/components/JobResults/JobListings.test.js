import {screen, render} from "@testing-library/vue"
import JobListings from "@/components/JobResults/JobListings.vue"
import { RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

vi.mock("axios")

describe("Joblistings", () =>{
it("fetches jobs", () => {
  axios.get.mockResolvedValue({data: []})
  render(JobListings)
  expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs")

})
it("displays maximum of 10 jobs", async()=> {
  axios.get.mockResolvedValue({data: Array(15).fill({})});
  const queryParams = {page: "1"};
  const $route = createRoute(queryParams);

  renderJobListings($route)



  const JobListings = await screen.findAllByRole("listitem")
  expect(JobListings).toHaveLength(10)
});

describe("when params excludes page number", () => {
  it("displays page number 1", () => {
    const queryParams = {page: undefined};
    const $route = createRoute(queryParams);

    renderJobListings($route);

    expect(screen.getByText("Page 1")).toBeInTheDocument();

  })
})

describe("when params include page number", () => {
  it("displays page number", () => {
    const queryParams = {page: "3"};

    renderJobListings($route);

    expect(screen.getByText("Page 3")).toBeInTheDocument();
  })
})

describe("when user is on first page", () => {
  it("does not show link to previous page", async() => {
    axios.get.mockResolvedValue({data: Array(15).fill({})});
    const queryParams = {page: "1"};
    const $route = createRoute(queryParams);

    renderJobListings($route);

    await screen.findAllByRole("listitem")

    const previousLink = screen.queryByRole("link", {name: /previous/i});
    expect(previousLink).not.toBeInTheDocument();
  })
  it("shows link to next page", async() => {
    axios.get.mockResolvedValue({data: Array(15).fill({})})
    const queryParams = {page: "1"};
    const $route = createRoute(queryParams);

    renderJobListings($route);

    await screen.findAllByRole("listitem")
    const nextLink = screen.queryByRole("link", {name: (/next/i)})
    expect(nextLink).toBeInTheDocument();
  })
})
})